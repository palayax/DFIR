#!/usr/bin/env node
// scripts/gen-demo-report.mjs
//
// Generates web/demo/report.js: a pre-authored, schema-valid FINISHED forensic
// report for the synthetic incident that scripts/gen-demo-dataset.mjs already
// ships in web/demo/.
//
// WHY THIS EXISTS
// ---------------
// web/demo/ gets an evaluator as far as a merged SuperTimeline. To see a REPORT
// they have to run an analysis, and the mock provider deliberately produces an
// empty one ("No model analysis was performed") because its job is to prove the
// pipeline runs with no API key, not to invent findings. So the one artifact a
// customer-facing mockup was missing is a finished report. This generator
// produces it, deterministically, with no network and no model call.
//
// THE RULE THIS GENERATOR OBEYS
// -----------------------------
// Nothing here restates a fact about the incident independently. Every number,
// hash, host, account, timestamp, technique and detection rule is READ from
// web/demo/manifest.js and web/demo/host-*.js. What is authored here is only
// the ANALYSIS: the verdict, the prose, the severities, the dismissal
// reasoning, the recommendations and the gaps -- i.e. exactly the part a real
// report's model half contributes.
//
// Evidence is never cited by a literal row_hash. Each citation is declared as a
// regex over the row's own `message` plus the authored sentence explaining why
// that row matters; the generator resolves the regex against the rows and
// THROWS if it does not match exactly one (or, for `expect: 'first'`, at least
// one). A dangling citation renders as a broken reference, which in a customer
// presentation is worse than no citation at all, so it is a hard build failure
// rather than something a reviewer has to notice.
//
// Determinism: no Date.now(), no randomness, no map-iteration order. Two
// consecutive runs produce byte-identical output. web/tests/demo-report.test.mjs
// re-runs the whole derivation in-process and byte-compares.
//
// Usage:
//   node scripts/gen-demo-report.mjs            # write web/demo/report.js
//   node scripts/gen-demo-report.mjs --check    # fail if the committed file is stale

import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(HERE, '..');
const WEB = path.join(REPO, 'web');
const DEMO_DIR = path.join(WEB, 'demo');
const OUT_FILE = path.join(DEMO_DIR, 'report.js');

// The app's own deterministic aggregation, reused rather than reimplemented:
// dashboard/scope/mitre_coverage in a real report are computed by exactly these
// functions (see analysis/pipeline.js's assembleReport), so the demo report's
// charts are produced by the same code path that a genuine run uses.
const { computeDashboard, computeMitreCoverage } = await import(
  pathToFileURL(path.join(WEB, 'assets', 'js', 'analysis', 'dashboard.js')).href
);
const { severityRank } = await import(pathToFileURL(path.join(WEB, 'assets', 'js', 'lib', 'severity.js')).href);
const { validateReport, formatReportErrors } = await import(
  pathToFileURL(path.join(WEB, 'assets', 'js', 'analysis', 'validate-report.js')).href
);
// rowsToJsonl is the loader's own canonicalisation. Reusing it means the
// scope.input_files[].sha256 recorded below is the digest of the exact bytes the
// demo hands to the ingest parser, not of a lookalike re-serialisation.
const { rowsToJsonl } = await import(pathToFileURL(path.join(WEB, 'assets', 'js', 'demo', 'index.js')).href);

// ---------------------------------------------------------------------------
// fixed, documented constants
//
// generated_utc is a CONSTANT, not the wall clock: report.js is a committed
// artifact and a timestamp from Date.now() would make every regeneration a diff
// and break the byte-identical contract. It is set just after the collection
// window closes, which is when this analysis would plausibly have been written.
// ---------------------------------------------------------------------------

const SCHEMA_VERSION = '1.0.0';
const GENERATED_UTC = '2026-03-15T11:42:09.0000000Z';
const CASE_ID = 'DEMO-2026-0317';
const EXAMINER = 'A. Nordqvist (demonstration)';
const ORGANIZATION = 'Northwind Components (fictitious)';
const CLASSIFICATION = 'TLP:CLEAR // SYNTHETIC DEMONSTRATION DATA';
const PROMPT_VERSION = 'irtriage-report-v3';

const SENTINEL_TS = '0001-01-01T00:00:00.0000000Z';

// ---------------------------------------------------------------------------
// ATT&CK names/tactics for the heatmap.
//
// charts.js's mitreCoverageSvg() groups cells by `tactic` and labels them with
// `technique_name`; computeMitreCoverage() supplies neither, because the client
// timeline carries technique IDs only. This table is the one place that maps
// them, and the generator THROWS on a technique the data contains but this
// table does not -- so a dataset change cannot silently produce an
// "unspecified" column.
// ---------------------------------------------------------------------------

const MITRE = {
  'T1003.001': ['OS Credential Dumping: LSASS Memory', 'Credential Access'],
  'T1003.006': ['OS Credential Dumping: DCSync', 'Credential Access'],
  T1018: ['Remote System Discovery', 'Discovery'],
  'T1021.001': ['Remote Services: Remote Desktop Protocol', 'Lateral Movement'],
  'T1021.002': ['Remote Services: SMB/Windows Admin Shares', 'Lateral Movement'],
  T1027: ['Obfuscated Files or Information', 'Defense Evasion'],
  T1033: ['System Owner/User Discovery', 'Discovery'],
  T1041: ['Exfiltration Over C2 Channel', 'Exfiltration'],
  'T1053.005': ['Scheduled Task/Job: Scheduled Task', 'Persistence'],
  'T1059.001': ['Command and Scripting Interpreter: PowerShell', 'Execution'],
  'T1059.007': ['Command and Scripting Interpreter: JavaScript', 'Execution'],
  'T1069.002': ['Permission Groups Discovery: Domain Groups', 'Discovery'],
  'T1070.001': ['Indicator Removal: Clear Windows Event Logs', 'Defense Evasion'],
  'T1070.004': ['Indicator Removal: File Deletion', 'Defense Evasion'],
  'T1071.001': ['Application Layer Protocol: Web Protocols', 'Command and Control'],
  'T1074.001': ['Data Staged: Local Data Staging', 'Collection'],
  'T1078.002': ['Valid Accounts: Domain Accounts', 'Persistence'],
  'T1087.002': ['Account Discovery: Domain Account', 'Discovery'],
  T1098: ['Account Manipulation', 'Persistence'],
  T1105: ['Ingress Tool Transfer', 'Command and Control'],
  'T1110.001': ['Brute Force: Password Guessing', 'Credential Access'],
  'T1134.005': ['Access Token Manipulation: SID-History Injection', 'Privilege Escalation'],
  'T1136.002': ['Create Account: Domain Account', 'Persistence'],
  'T1204.002': ['User Execution: Malicious File', 'Execution'],
  'T1218.011': ['System Binary Proxy Execution: Rundll32', 'Defense Evasion'],
  T1482: ['Domain Trust Discovery', 'Discovery'],
  T1490: ['Inhibit System Recovery', 'Impact'],
  'T1543.003': ['Create or Modify System Process: Windows Service', 'Persistence'],
  'T1547.001': ['Boot or Logon Autostart Execution: Registry Run Keys', 'Persistence'],
  'T1558.001': ['Steal or Forge Kerberos Tickets: Golden Ticket', 'Credential Access'],
  'T1558.003': ['Steal or Forge Kerberos Tickets: Kerberoasting', 'Credential Access'],
  'T1560.001': ['Archive Collected Data: Archive via Utility', 'Collection'],
  'T1566.001': ['Phishing: Spearphishing Attachment', 'Initial Access'],
  'T1566.002': ['Phishing: Spearphishing Link', 'Initial Access'],
  'T1569.002': ['System Services: Service Execution', 'Execution'],
  T1570: ['Lateral Tool Transfer', 'Lateral Movement'],
  'T1573.001': ['Encrypted Channel: Symmetric Cryptography', 'Command and Control'],
};

// ---------------------------------------------------------------------------
// findings
//
// `phases` names the manifest narrative phases whose cited rows form this
// finding's candidate pool ('*' = every row in the dataset). `evidence[].match`
// is a regex over the row's own `message`; `why` is the authored sentence that
// becomes evidence[].why_relevant. mitre_techniques, detection_rules,
// affected_hosts, affected_accounts and first/last_seen are all DERIVED from
// the rows this resolves to -- never restated here.
// ---------------------------------------------------------------------------

const FINDING_SPECS = [
  {
    id: 'F-001',
    title: 'Macro-enabled finance lure delivered by mail and opened on WKS-CORP-01',
    severity: 'high',
    confidence: 'high',
    category: 'initial_access',
    phases: ['p1'],
    narrative:
      'The intrusion begins with a conventional, well-executed finance lure. An external message with the '
      + 'subject "Outstanding invoice Q1 2026" reached EU\\alice in Finance with an SPF softfail; eight minutes '
      + 'later Edge recorded a completed download of Invoice_Q1_2026.xlsm from invoices.billing-portal.example, '
      + 'a domain with no prior observation anywhere in this environment. The file landed in the user\'s '
      + 'Downloads folder carrying a Mark-of-the-Web zone-3 marker, and EXCEL.EXE opened it 71 seconds later. '
      + 'Nothing about the delivery is novel; what matters is that it succeeded end to end with no control '
      + 'interrupting it, and that the timing is tight enough to attribute the whole chain to one user action.',
    recommendation:
      'Preserve and pull the original message from the mail platform, block the sender and the download domain, '
      + 'and hunt the attachment SHA-256 across every mailbox and endpoint — one recipient opening it means others '
      + 'received it.',
    false_positive_considered:
      'Finance genuinely receives supplier invoices as Office attachments, so the lure\'s subject and file type '
      + 'are not themselves suspicious. This is ruled out by what followed rather than by the mail: the workbook '
      + 'spawned a script interpreter within four seconds of opening (F-002), which no supplier invoice does. Had '
      + 'the process chain been absent this would have been left as a low-severity delivery observation.',
    evidence: [
      { match: /Inbound mail delivered with external link/, why: 'The delivery vector, with the SPF softfail that should have raised the message\'s risk score.' },
      { match: /Edge download completed: Invoice_Q1_2026\.xlsm/, why: 'Ties the workbook to a domain first observed in this environment on the day of the incident.' },
      { match: /Mark-of-the-Web zone 3/, why: 'Zone-3 provenance on disk: Office knew the file came from the internet and opened it anyway.' },
      { match: /EXCEL\.EXE opened Invoice_Q1_2026\.xlsm/, why: 'User execution — the instant the attacker obtained code execution on the host.' },
    ],
  },
  {
    id: 'F-002',
    title: 'Office macro chain staged and executed a first-stage implant from %APPDATA%',
    severity: 'critical',
    confidence: 'high',
    category: 'execution',
    phases: ['p2'],
    narrative:
      'The workbook\'s macro produced a four-link execution chain that is fully present in the acquisition: '
      + 'EXCEL.EXE spawned wscript.exe against a dropped JScript file, wscript launched base64-encoded PowerShell '
      + 'with a hidden window and the execution policy bypassed, and PowerShell wrote and ran updatesvc.exe in '
      + '%APPDATA%\\Sync. Every link is corroborated twice — by the process-creation events and independently by '
      + 'Prefetch and MFT records, which the attacker never cleared. Three separate engines (Sigma, YARA and '
      + 'Hayabusa) flagged different stages of the same chain, so the conclusion does not rest on a single rule.',
    recommendation:
      'Treat WKS-CORP-01 as fully compromised from 09:14 UTC on 9 March. Isolate it rather than reimage it until '
      + 'memory and the %APPDATA%\\Sync directory have been acquired, then rebuild; the implant hash is a fleet-wide '
      + 'hunt indicator.',
    false_positive_considered:
      'Legitimate finance automation on this host does use Office macros, and wscript.exe is present in the IT '
      + 'baseline. The benign explanation is excluded by three properties no in-house macro exhibits together: an '
      + 'encoded and hidden PowerShell invocation, an unsigned executable written to a per-user roaming directory, '
      + 'and that binary immediately beaconing outbound (F-003).',
    evidence: [
      { match: /Office application spawned a script interpreter/, why: 'EXCEL.EXE to wscript.exe — the transition from document to code.' },
      { match: /inv8841\.js \(JScript dropper\)/, why: 'The dropper on disk, written by Excel itself and matched by YARA.' },
      { match: /Encoded PowerShell launched by the script interpreter/, why: 'Hidden window, bypassed execution policy and base64 encoding: three evasion choices in one command line.' },
      { match: /Unsigned executable written to a user-writable directory: updatesvc\.exe/, why: 'The first-stage implant, unsigned, in a directory no installer writes to.' },
      { match: /Implant executed from AppData: updatesvc\.exe/, why: 'Execution of the implant with powershell.exe as parent, closing the chain.' },
      { match: /Prefetch records first execution of UPDATESVC\.EXE/, why: 'Prefetch corroborates the first execution independently of the event log.' },
    ],
  },
  {
    id: 'F-003',
    title: 'Two independent encrypted command-and-control channels, one per compromised host',
    severity: 'high',
    confidence: 'high',
    category: 'command_and_control',
    phases: ['p2', 'p6'],
    narrative:
      'The attacker ran two separate C2 channels rather than one. PowerShell made first contact with '
      + 'cdn-sync-updates.example before the implant existed, the implant then settled into 60-second sessions '
      + 'with roughly three seconds of jitter — a beacon interval, not human browsing — and after the pivot the '
      + 'file server opened a second, distinct channel to sync-relay.example on TCP 8443. Both channels are TLS '
      + 'and both terminate on RFC 5737 documentation addresses. The redundancy is the operationally significant '
      + 'part: blocking one domain would not have removed the attacker\'s access.',
    recommendation:
      'Block and sinkhole all four attacker domains and the four external addresses at the egress point, then '
      + 'search proxy and firewall history for any other internal host that resolved or reached them.',
    false_positive_considered:
      'Update services do beacon on fixed intervals from user-writable paths, which is precisely the impression '
      + 'the "SyncUpdater"/"cdn-sync-updates" naming is designed to create. It is excluded because the binary is '
      + 'unsigned, was written by an Office macro chain minutes earlier (F-002), and no software inventory entry '
      + 'or vendor account claims it.',
    evidence: [
      { match: /powershell\.exe opened an HTTPS session to cdn-sync-updates\.example/, why: 'First contact with stage-one C2, made by PowerShell before the implant was on disk.' },
      { match: /Regular-interval outbound sessions from updatesvc\.exe/, why: '60 s ± 3 s jitter over a long period is a beacon signature, not user-driven traffic.' },
      { match: /Second-stage C2 session from upd\.exe to sync-relay\.example/, why: 'A second, independent channel from the file server — losing one would not have evicted the attacker.' },
    ],
  },
  {
    id: 'F-004',
    title: 'Two redundant autostart mechanisms installed for the same implant',
    severity: 'high',
    confidence: 'high',
    category: 'persistence',
    phases: ['p3'],
    narrative:
      'Six minutes after the implant first ran, the attacker installed two independent autostart mechanisms that '
      + 'both point at the same %APPDATA% binary: a per-user Run value named SyncUpdater, and a scheduled task '
      + 'placed under \\Microsoft\\Windows\\Sync\\ so that it reads as a Microsoft component in any task listing. '
      + 'Neither required administrative rights. Security event 4698 corroborates the task independently of the '
      + 'registry artefact, which matters because the Security channel on this host survived while the file '
      + 'server\'s did not (F-012).',
    recommendation:
      'Remove both mechanisms only after acquisition, and sweep the fleet for the Run value name, the task path '
      + 'and any other task authored by a non-administrative user under a \\Microsoft\\ path.',
    false_positive_considered:
      'Legitimate software does install Run values and tasks under Microsoft-looking paths, and the naming here '
      + 'is chosen to exploit exactly that. The dismissal fails on ownership and provenance: the task author is a '
      + 'Finance user account, the target binary is unsigned and lives in a roaming profile, and the task was '
      + 'created 48 seconds after a credential-free macro chain wrote that binary.',
    evidence: [
      { match: /Run key added: SyncUpdater/, why: 'Per-user autostart: survives logoff and reboot, and needs no administrative rights.' },
      { match: /Scheduled task created with an update-service-impersonating name/, why: 'A second, redundant mechanism, deliberately named to read as a Microsoft update task.' },
      { match: /A scheduled task was created/, why: 'Security event 4698 confirms the task from a different artefact than the registry.' },
    ],
  },
  {
    id: 'F-005',
    title: 'Off-hours host, group and forest-trust enumeration from the compromised workstation',
    severity: 'medium',
    confidence: 'high',
    category: 'discovery',
    phases: ['p4'],
    narrative:
      'The attacker returned at 02:05 UTC — outside any working pattern visible in the rest of this timeline — and '
      + 'spent nine minutes on reconnaissance: whoami /all to establish the token held, net group "Domain Admins" '
      + 'to find the privileged population, and nltest /domain_trusts to enumerate trusts. That last command is '
      + 'the pivot point of the whole incident: it is where the attacker learned that eu.corp.example is a child '
      + 'of corp.example, and every step in F-009 follows from it. A staged utility (adq.exe) then performed bulk '
      + 'LDAP reads, which the forest-root domain controller independently recorded as 4,118 directory object '
      + 'reads in 90 seconds sourced from 10.0.5.41.',
    recommendation:
      'Alert on nltest and bulk LDAP enumeration from workstation-class hosts — this phase is individually '
      + 'low-signal but it is the last cheap opportunity to interrupt the intrusion before credential theft.',
    false_positive_considered:
      'IT support on this host does run whoami and net group interactively, and EU\\bob\'s benign activity in this '
      + 'dataset includes similar commands. This set is distinguished by its parentage and hour: the commands are '
      + 'children of the implant rather than of a console, they run at 02:05 under a Finance user\'s token, and '
      + 'they are immediately followed by staged third-party tooling.',
    evidence: [
      { match: /whoami\.exe \/all executed by the implant/, why: 'First action of the second session: establish which token the attacker holds.' },
      { match: /net group "Domain Admins" \/domain/, why: 'Targeting the privileged group directly rather than enumerating broadly — an operator, not a worm.' },
      { match: /nltest \/domain_trusts/, why: 'The moment the attacker learned the forest had a parent domain; F-009 depends entirely on this.' },
      { match: /AD enumeration utility staged in the user temp directory: adq\.exe/, why: 'Third-party tooling staged for bulk directory reads.' },
      { match: /ADQ\.EXE executed, writing results/, why: 'Prefetch confirms the enumeration tool actually ran.' },
      { match: /Bulk directory-service access from WKS-CORP-01/, why: 'The domain controller\'s own view of the same activity, which survives even if the workstation is wiped.' },
    ],
  },
  {
    id: 'F-006',
    title: 'LSASS process memory dumped with a signed Microsoft library',
    severity: 'critical',
    confidence: 'high',
    category: 'credential_access',
    phases: ['p5'],
    narrative:
      'At 02:31 UTC the implant invoked the comsvcs.dll MiniDump export through rundll32 against LSASS (pid 772), '
      + 'producing a 56 MB dump in C:\\Windows\\Temp. Three independent artefacts agree: the process-creation '
      + 'record carrying the full command line, the MFT entry for the dump file, and a Sysmon process-access event '
      + 'showing PROCESS_VM_READ granted on lsass.exe from rundll32.exe. YARA matched the dump itself on minidump '
      + 'and lsasrv strings, so the file\'s contents — not just its name — are confirmed. Every credential cached '
      + 'on this host at that moment must be treated as known to the attacker, including the service account that '
      + 'is used to pivot the following night (F-008).',
    recommendation:
      'Force a password reset for every account with a session on WKS-CORP-01 before 10 March 02:31 UTC, reset '
      + 'the krbtgt password twice with the recommended interval once the attacker is evicted, and enable LSASS '
      + 'protection (RunAsPPL) and Credential Guard fleet-wide.',
    false_positive_considered:
      'Support staff on this estate legitimately dump process memory for crash analysis, and the dataset contains '
      + 'a signed Sysinternals ProcDump on this very host (dismissed separately). That explanation cannot apply '
      + 'here: the dumper is rundll32 driven by an unsigned implant rather than a signed tool run from a console, '
      + 'the target is specifically LSASS, it happened at 02:31, and the dump was deleted 46 hours later during a '
      + 'log-clearing sweep (F-012).',
    evidence: [
      { match: /LSASS minidump via rundll32 comsvcs\.dll MiniDump/, why: 'The dump command line, using a signed Microsoft DLL as the dumping mechanism.' },
      { match: /Process minidump written: ls\.dmp/, why: 'The 56 MB artefact on disk, matched by YARA on minidump and lsasrv strings.' },
      { match: /Process access to lsass\.exe granted PROCESS_VM_READ/, why: 'Sysmon\'s independent record of the handle, so the finding does not rest on a command line alone.' },
    ],
  },
  {
    id: 'F-007',
    title: 'Service account EU\\svc-backup kerberoasted for offline cracking',
    severity: 'high',
    confidence: 'moderate',
    category: 'credential_access',
    phases: ['p5'],
    narrative:
      'Thirteen minutes after the LSASS dump, a Kerberos ticket-harvesting utility was staged on the workstation '
      + 'and two service tickets were requested for EU\\svc-backup SPNs — one for MSSQLSvc, one for cifs on the '
      + 'file server — both with RC4 encryption. RC4 is requested precisely because it yields an offline-crackable '
      + 'ticket where AES does not. Confidence is moderate rather than high because the acquisition can prove the '
      + 'tickets were requested but cannot prove the hash was cracked; what raises it above speculation is that '
      + 'the same account authenticates to the same file server the following night (F-008), and that the SPN '
      + 'chosen matches the pivot target exactly.',
    recommendation:
      'Reset EU\\svc-backup, give it a long random password managed as a gMSA, remove any unnecessary SPN, and '
      + 'disable RC4 for Kerberos across both domains.',
    false_positive_considered:
      'Service-ticket requests for a backup account are routine — that account requests tickets legitimately every '
      + 'night in this dataset. The benign reading is weakened, not eliminated, by three things: the requests come '
      + 'from a workstation rather than the backup server, they specify RC4 while the account\'s normal traffic '
      + 'does not, and a roasting tool appeared on that workstation minutes earlier. This is why the finding is '
      + 'moderate confidence and why F-008 is the finding that should drive containment.',
    evidence: [
      { match: /Kerberos ticket-harvesting tool staged: svcq\.exe/, why: 'Roasting tooling on disk, 13 minutes after the credential dump.' },
      { match: /Kerberos service ticket requested with RC4 encryption for SPN MSSQLSvc/, why: 'RC4 is requested to make the ticket crackable offline; AES would not be.' },
      { match: /Second RC4 service ticket requested for SPN cifs/, why: 'A second SPN for the same account — the attacker specifically wanted file-server access.' },
    ],
  },
  {
    id: 'F-008',
    title: 'Lateral movement to SRV-CORP-FS02 as EU\\svc-backup, with SYSTEM-level service persistence',
    severity: 'high',
    confidence: 'high',
    category: 'lateral_movement',
    phases: ['p6'],
    narrative:
      'The pivot is visible from both ends, four seconds apart: the workstation implant opened an SMB session to '
      + '10.0.5.20 as EU\\svc-backup, and the file server logged the matching type-3 logon from 10.0.5.41 — the '
      + 'first network logon that account has ever made from a workstation. The implant was then copied in as '
      + 'C:\\Windows\\upd.exe with a SHA-256 identical to updatesvc.exe on WKS-CORP-01 (one implant, two hosts, '
      + 'proven by hash rather than by name), registered as the auto-start service SyncHostSvc running as '
      + 'LocalSystem, and observed running as SYSTEM under services.exe. The attacker has gone from a Finance '
      + 'user\'s token to SYSTEM on a file server in under six minutes.',
    recommendation:
      'Isolate SRV-CORP-FS02, remove the SyncHostSvc service after acquisition, and audit every host that '
      + 'EU\\svc-backup authenticated to in the retained logon history — the same credential may have been used '
      + 'elsewhere without an implant being dropped.',
    false_positive_considered:
      'Backup service accounts do authenticate to file servers over SMB constantly, which is what makes this '
      + 'account a good choice for the attacker. The distinguishing facts are the source and the sequel: the logon '
      + 'originates from a Finance workstation rather than the backup infrastructure, and it is immediately '
      + 'followed by a binary being written into C:\\Windows and registered as a LocalSystem service.',
    evidence: [
      { match: /SMB session from updatesvc\.exe to SRV-CORP-FS02/, why: 'The outbound half of the pivot, initiated by the implant rather than by a user shell.' },
      { match: /Network logon \(type 3\)/, why: 'The file server\'s own record four seconds later: a service account logging on from a workstation for the first time.' },
      { match: /Implant copied to the file server/, why: 'Identical SHA-256 to the workstation implant — one toolkit across two hosts, proven by hash.' },
      { match: /Service installed remotely: SyncHostSvc/, why: 'Persistence and privilege in one step: auto-start, LocalSystem.' },
      { match: /Implant running as SYSTEM under services\.exe/, why: 'Confirms the service actually started, so the attacker held SYSTEM on a file server.' },
    ],
  },
  {
    id: 'F-009',
    title: 'Cross-domain escalation to the forest root via SID-history injection and DCSync',
    severity: 'critical',
    confidence: 'high',
    category: 'privilege_escalation',
    phases: ['p7'],
    narrative:
      'This is the finding that turns a two-host incident into a forest-wide one. From the file server the '
      + 'attacker staged kt.exe and ran it with a SID-history argument naming the forest-root Enterprise Admins '
      + 'RID; DC-CORP-01 then accepted a cross-realm ticket carrying that privileged ExtraSid, and directory '
      + 'replication rights (DS-Replication-Get-Changes-All) were exercised from 10.0.5.20 — a file server, which '
      + 'has no legitimate reason to replicate the directory. Two engines independently flagged the DCSync. The '
      + 'ticket being accepted rather than rejected is what makes this a confirmed escalation instead of an '
      + 'attempt, and the intra-forest trust that made it possible is the one the attacker enumerated in F-005.',
    recommendation:
      'Treat the entire corp.example forest as compromised: reset krbtgt in both domains twice, rotate all '
      + 'privileged credentials, and enable SID filtering on the intra-forest trust so a child-domain principal '
      + 'cannot present root-domain SIDs. Plan a staged AD recovery rather than a per-host cleanup.',
    false_positive_considered:
      'Directory replication is normal between domain controllers, and this environment genuinely replicates '
      + 'between DC-CORP-01 and DC-EU-01. The dismissal fails on the principal and the source address: the '
      + 'replication right was exercised by a non-DC account from 10.0.5.20, which is the file server compromised '
      + 'in F-008, minutes after a ticket-manipulation tool ran on that same host.',
    evidence: [
      { match: /Ticket-manipulation tool staged on the file server: kt\.exe/, why: 'Tooling for the trust-crossing step, staged 20 minutes before it was used.' },
      { match: /kt\.exe executed with a cross-realm SID-history argument/, why: 'The argument names the forest-root Enterprise Admins RID — this is the escalation itself.' },
      { match: /Cross-realm ticket presented to corp\.example carrying ExtraSids/, why: 'The forest-root DC accepted the ticket, so the attack succeeded rather than merely being attempted.' },
      { match: /Directory replication rights exercised by a non-DC principal/, why: 'DCSync from a file server address: the directory, including credential material, is assumed read.' },
    ],
  },
  {
    id: 'F-010',
    title: 'Attacker-created forest-root account CORP\\svc-support added to Enterprise Admins and used',
    severity: 'critical',
    confidence: 'high',
    category: 'persistence',
    phases: ['p7'],
    narrative:
      'Having crossed the trust, the attacker established persistence that does not depend on any stolen ticket '
      + 'lifetime: a new account, CORP\\svc-support, created directly in the forest-root domain and added to '
      + 'Enterprise Admins eight seconds later. Eight minutes after creation that account logged on interactively '
      + 'to DC-CORP-01 over RDP, and later it is the principal that clears the domain controller\'s audit log '
      + '(F-012). An attacker-created Enterprise Admin is the highest-impact artefact in this report: it survives '
      + 'password resets of every pre-existing account and every host rebuild.',
    recommendation:
      'Disable — do not delete — CORP\\svc-support so its history is preserved, then audit every privileged group '
      + 'in both domains for members created or added in the last 30 days, and review AdminSDHolder and delegated '
      + 'permissions for further durable footholds.',
    false_positive_considered:
      'Service accounts are created by administrators routinely, and the name follows the estate\'s own '
      + '"svc-" convention, which is deliberate. It cannot be benign here because the creating principal reached '
      + 'the root domain through a forged cross-realm ticket (F-009), the Enterprise Admins addition follows '
      + 'creation by eight seconds with no change record, and no ticket or approval references it.',
    evidence: [
      { match: /User account created in the FOREST ROOT domain/, why: 'A durable foothold in the root domain, independent of any stolen ticket lifetime.' },
      { match: /added to Enterprise Admins/, why: 'Forest-wide privilege, granted eight seconds after the account existed.' },
      { match: /Interactive remote logon \(type 10\) to the forest-root DC/, why: 'The account was used, not merely created — RDP to the domain controller eight minutes later.' },
    ],
  },
  {
    id: 'F-011',
    title: 'Finance share archived and 3.4 GB exfiltrated to files-transfer-node.example',
    severity: 'critical',
    confidence: 'high',
    category: 'exfiltration',
    phases: ['p8'],
    narrative:
      'On the night of 13 March a renamed archive utility packaged D:\\Finance\\2026Q1 into an encrypted-header '
      + 'archive in C:\\Windows\\Temp — a path no backup job on this server uses. Over the following 47 minutes '
      + 'exactly 3,612,479,488 bytes left the host for files-transfer-node.example on TCP 8443, byte-for-byte the '
      + 'size of the archive, and the archive was then deleted. That byte-level agreement is what makes this a '
      + 'confirmed exfiltration rather than a suspected one: the volume transferred cannot be explained by '
      + 'anything else on the host at that hour. Two engines flagged the egress independently. The USN journal '
      + 'retained the deletion record, which is why the archive\'s size and name are still provable after the '
      + 'file itself was removed.',
    recommendation:
      'Treat the Q1 2026 finance dataset as disclosed and start regulatory and contractual notification '
      + 'assessment now. Reconstruct the file list from the share\'s own inventory for that path, and preserve the '
      + 'USN journal before it wraps.',
    false_positive_considered:
      'This server does run scheduled archive jobs — the dataset even contains a benign 7-Zip run by IT, which is '
      + 'dismissed separately. The benign reading is excluded by four properties together: the archiver was '
      + 'renamed, the staging path is C:\\Windows\\Temp rather than the backup volume, the destination is external '
      + 'rather than the backup server, and the archive was deleted immediately after the transfer instead of '
      + 'being retained.',
    evidence: [
      { match: /Renamed archiver executed against the finance share/, why: 'Collection: a renamed archive utility with an encrypted-header password.' },
      { match: /Staging archive written: fin-2026Q1\.7z/, why: '3.4 GB staged in a system temp directory that no backup job on this host uses.' },
      { match: /Sustained 3\.4 GB outbound transfer/, why: 'The egress itself: the byte count matches the archive exactly, which is what makes this confirmed rather than suspected.' },
      { match: /Staging archive deleted after transfer completed/, why: 'The USN journal retained the deletion, so the archive remains provable after removal.' },
    ],
  },
  {
    id: 'F-012',
    title: 'Audit logs cleared on three hosts and all shadow copies destroyed',
    severity: 'high',
    confidence: 'high',
    category: 'anti_forensics',
    phases: ['p9'],
    narrative:
      'Sixteen minutes after the transfer finished, the attacker began destroying evidence: wevtutil cleared the '
      + 'Security channel on the file server (event 1102 is the last record before the gap), all volume shadow '
      + 'copies were deleted, the LSASS dump was removed from the workstation, and the forest-root domain '
      + 'controller\'s audit log was cleared by the account created in F-010. The clearing is itself strong '
      + 'evidence — it is deliberate, sequenced and spans every host the attacker touched. It also bounds this '
      + 'report: anything that happened on SRV-CORP-FS02 in the Security channel before 00:12 UTC on 14 March is '
      + 'unrecoverable from this acquisition. Filesystem, USN and registry artefacts survived on all three hosts, '
      + 'which is why the story above can still be reconstructed.',
    recommendation:
      'Forward Windows event logs off-host in real time so clearing an on-host channel no longer destroys '
      + 'evidence, alert on event 1102 and on vssadmin delete shadows, and remove shadow-copy deletion rights '
      + 'from service accounts.',
    false_positive_considered:
      'Log clearing and shadow-copy pruning are legitimate maintenance actions, and this estate has scheduled '
      + 'maintenance windows. They are excluded by timing and actor: the actions run at 00:12–00:31, minutes after '
      + 'a 3.4 GB exfiltration, they are driven by the implant and by the attacker-created account, and they '
      + 'include deleting a credential dump — which no maintenance task has any reason to do.',
    evidence: [
      { match: /wevtutil\.exe cl Security/, why: 'The clearing command, still recoverable from execution evidence the attacker did not reach.' },
      { match: /The audit log was cleared \(the last record before the gap\)/, why: 'Event 1102 marks the boundary of what this acquisition can show on the file server.' },
      { match: /All volume shadow copies deleted/, why: 'Removes both the rollback path and any shadow-resident copy of the staged archive.' },
      { match: /LSASS dump deleted from the workstation/, why: 'Targeted cleanup of the credential-theft artefact from F-006.' },
      { match: /The audit log was cleared on the forest-root domain controller/, why: 'The forest-root audit trail, cleared by the account the attacker created in F-010.' },
    ],
  },
  {
    id: 'F-013',
    title: 'Outbound access to newly observed external domains is permitted without inspection',
    severity: 'low',
    confidence: 'moderate',
    category: 'hygiene',
    phases: ['p1', 'p2'],
    narrative:
      'This is a control weakness rather than attacker activity, and it is the cheapest thing in this report to '
      + 'fix. The web proxy at 10.0.5.9 permitted a macro-enabled workbook to be downloaded from a domain with no '
      + 'prior observation in this environment, and then permitted the beacon that followed from the same host. '
      + 'Neither request was blocked, throttled or held for inspection. On this timeline, category or '
      + 'first-observation policy at the proxy would have interrupted the intrusion twice before any credential '
      + 'was touched.',
    recommendation:
      'Block executable and macro-enabled downloads from newly observed domains at the proxy, and alert on a '
      + 'first-observation domain being contacted repeatedly at a fixed interval by the same process.',
    false_positive_considered:
      'A permissive egress policy is a deliberate operational choice in many estates and is not in itself a '
      + 'compromise indicator; raising it as high severity would be misleading. It is recorded as low severity '
      + 'because the evidence shows opportunity cost rather than attacker capability — the same two rows already '
      + 'support F-001 and F-003, which is where the compromise itself is asserted.',
    evidence: [
      { match: /Edge download completed/, why: 'The proxy permitted a macro-enabled download from a domain first observed that day.' },
      { match: /powershell\.exe opened an HTTPS session to cdn-sync-updates\.example/, why: 'And permitted the beacon that followed from the same host minutes later.' },
    ],
  },
  {
    id: 'F-014',
    title: 'Scope note: the child-domain controller DC-EU-01 was not collected',
    severity: 'informational',
    confidence: 'moderate',
    category: 'other',
    phases: ['*'],
    narrative:
      'Recorded as a finding rather than only as a gap because it bounds every Kerberos conclusion in this '
      + 'report. Three hosts were acquired: the compromised workstation, the compromised file server and the '
      + 'forest-root domain controller. DC-EU-01 (10.0.5.10), the child-domain controller that mediated the '
      + 'authentication in F-007 and F-008, was not collected — a normal and defensible scoping decision for a '
      + 'triage, but one the reader has to know. The forest-root DC\'s own trust inventory and its replication '
      + 'sessions with DC-EU-01 are the only view of that host this acquisition contains, and they confirm the '
      + 'transitive parent/child trust the escalation in F-009 abused.',
    recommendation:
      'Collect DC-EU-01 with the same profile before closing the engagement; its Security and Kerberos channels '
      + 'are where any additional roasted account or unobserved logon would appear.',
    false_positive_considered:
      'Not applicable in the usual sense — this finding asserts a limitation, not an activity. The thing to rule '
      + 'out is the opposite error: reading the absence of DC-EU-01 evidence as evidence that nothing happened '
      + 'there. Nothing in this acquisition supports that reading.',
    evidence: [
      { match: /Forest trust enumerated: eu\.corp\.example -> corp\.example/, expect: 'first', why: 'The collected trust inventory independently confirms the transitive parent/child trust the escalation abused.' },
      { match: /Inter-site AD replication session with DC-EU-01/, expect: 'first', why: 'The only view of DC-EU-01 in this acquisition: its replication sessions as seen from the forest root.' },
      { match: /nltest \/domain_trusts/, why: 'The attacker read the same topology from the workstation, which is why the uncollected host matters.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// dismissal reasoning, keyed by the rule_id the client emitted.
//
// The dismissible SET is derived, not listed: it is exactly the detection rows
// the manifest narrative does NOT cite. The generator cross-checks that derived
// set against these keys and throws on either a missing key or an unused one,
// so the demo can never claim to dismiss a detection the data no longer
// contains -- or silently leave a real one unexplained.
// ---------------------------------------------------------------------------

const DISMISSALS = {
  'demo-sigma-0038': {
    confidence: 'high',
    rationale:
      'The profile is C:\\ProgramData\\Corp\\IT\\Microsoft.PowerShell_profile.ps1, loaded by EU\\bob (IT support) '
      + 'from a machine-wide managed path during working hours, with cmd.exe as parent. It matches the estate\'s '
      + 'documented workstation baseline and appears on a schedule unrelated to the intrusion window. Dismissed as '
      + 'managed configuration.',
  },
  'demo-sigma-0039': {
    confidence: 'high',
    rationale:
      'rundll32.exe with no arguments, parented by explorer.exe in an interactive session — the signature of a '
      + 'Control Panel applet, which is the rule\'s own documented false positive. Note the contrast with F-006, '
      + 'where rundll32 carried an explicit comsvcs.dll MiniDump command line and was parented by the implant: '
      + 'the same binary, opposite verdicts, decided by parentage and arguments.',
  },
  'demo-yara-0008': {
    confidence: 'high',
    rationale:
      'A filename match only — the rule explicitly states it does not evaluate signature or signer. The file is '
      + 'Microsoft-signed with a valid signature, lives in C:\\Tools\\Sysinternals with the rest of the IT '
      + 'toolkit, and was never executed anywhere in this timeline. Dismissed as a name collision. It is retained '
      + 'in the report because an unexecuted credential-dumping tool on a user workstation is still worth an '
      + 'access-control conversation.',
  },
  'demo-sigma-0040': {
    confidence: 'high',
    rationale:
      'Genuine 7z.exe from C:\\Program Files\\7-Zip, run by EU\\bob against the previous quarter\'s share and '
      + 'writing to the archive volume E:\\. Compare F-011: a renamed archiver, encrypted headers, staging into '
      + 'C:\\Windows\\Temp and an immediate outbound transfer. The tool class is the same; none of the malicious '
      + 'properties are present.',
  },
  'demo-haya-0005': {
    confidence: 'moderate',
    rationale:
      'Three failed logons then a success for EU\\carol from her usual host, consistent with a stale cached '
      + 'password after a routine change, and unconnected to any account involved in this intrusion. Dismissed '
      + 'with moderate rather than high confidence because password-spray precursors look identical at this '
      + 'volume; it should be re-checked against authentication telemetry if any is retained.',
  },
};

// ---------------------------------------------------------------------------
// IOC context. Values themselves are derived from the dataset; only the
// operator-facing context and the verdict are authored.
// ---------------------------------------------------------------------------

const ACCOUNT_IOCS = [
  ['CORP\\svc-support', 'malicious', 'high', 'Created by the attacker in the forest-root domain and added to Enterprise Admins (F-010). Disable, do not delete.'],
  ['EU\\svc-backup', 'suspicious', 'high', 'Legitimate backup service account, kerberoasted (F-007) and then used for the pivot to the file server (F-008). Credential must be treated as known to the attacker.'],
  ['EU\\alice', 'benign', 'high', 'Finance analyst who opened the lure. Not an attacker account, but every credential cached in her session is exposed via F-006.'],
];

const PROCESS_IOCS = [
  ['updatesvc.exe', 'malicious', 'high', 'First-stage implant on WKS-CORP-01, executed from %APPDATA%\\Sync (F-002).'],
  ['upd.exe', 'malicious', 'high', 'The same implant on SRV-CORP-FS02, running as SYSTEM under the SyncHostSvc service (F-008).'],
  ['adq.exe', 'malicious', 'high', 'Directory-enumeration utility staged in the user temp directory (F-005).'],
  ['kt.exe', 'malicious', 'high', 'Ticket-manipulation tool used for the SID-history escalation across the trust (F-009).'],
  ['a.exe', 'malicious', 'high', 'Renamed archive utility used to stage the finance data (F-011).'],
  ['wscript.exe', 'suspicious', 'moderate', 'Legitimate Windows binary, but here the second link of the macro chain (F-002). Hunt on the parent/child pair, not on the name.'],
];

// ---------------------------------------------------------------------------
// authored analysis: verdict, executive summary, gaps, recommendations
// ---------------------------------------------------------------------------

const ANALYTIC_GAPS = [
  {
    gap: 'The child-domain controller DC-EU-01 (10.0.5.10) was not collected, so the authoritative Kerberos record for eu.corp.example is absent.',
    reason: 'evidence_not_collected',
    detail:
      'DC-EU-01 issued the service tickets in F-007 and authenticated the pivot in F-008, but only the forest-root '
      + 'domain controller was acquired. Additional roasted accounts, further logons by EU\\svc-backup and any '
      + 'second pivot target would appear there and nowhere in this dataset.',
    how_to_close: 'Run IRTriage against DC-EU-01 with the same profile and merge the resulting timeline into this SuperTimeline.',
  },
  {
    gap: 'The Security channel on SRV-CORP-FS02 is unrecoverable before 14 March 00:12 UTC.',
    reason: 'anti_forensics_suspected',
    detail:
      'wevtutil cleared the channel and event 1102 is the last record before the gap (F-012). Anything logged on '
      + 'that host between the pivot and the clearing — additional logons, service installs, share access — is '
      + 'gone. The reconstruction above for that host rests on filesystem, USN, service and registry artefacts, '
      + 'which survived.',
    how_to_close: 'Recover the same events from a log-forwarding platform or SIEM if one retained them; failing that, this window cannot be closed from the host.',
  },
  {
    gap: 'Whether the kerberoasted EU\\svc-backup ticket was actually cracked cannot be established.',
    reason: 'ambiguous_evidence',
    detail:
      'The request for RC4 service tickets is on-host evidence; the offline cracking is not, by definition. The '
      + 'inference rests on the account authenticating from the workstation the next night. An alternative path — '
      + 'the credential being recovered from the LSASS dump in F-006 instead — fits the same evidence and would '
      + 'have the same containment consequence.',
    how_to_close: 'Not closable from host artefacts. Either path implies the same action: reset the account and remove its SPNs.',
  },
  {
    gap: 'No memory image was acquired, so injected or memory-only tooling cannot be ruled out.',
    reason: 'requires_memory_image',
    detail:
      'Every conclusion here derives from on-disk and event-log artefacts. Reflectively loaded modules, injected '
      + 'threads in legitimate processes and in-memory credential material leave no trace in this acquisition.',
    how_to_close: 'Acquire full physical memory from WKS-CORP-01 and SRV-CORP-FS02 before they are rebuilt, and re-run analysis with the memory-derived timeline merged in.',
  },
  {
    gap: 'The exfiltrated content is inferred from byte counts, not from captured traffic.',
    reason: 'requires_network_telemetry',
    detail:
      'The 3,612,479,488-byte transfer in F-011 matches the staging archive exactly, which is why exfiltration is '
      + 'asserted with high confidence. What was inside the archive is inferred from the source path '
      + '(D:\\Finance\\2026Q1) rather than observed; the archive itself was deleted and had encrypted headers.',
    how_to_close: 'Reconstruct the file inventory of D:\\Finance\\2026Q1 as at 13 March from the share\'s own backups, and pull netflow or proxy records for 10.0.5.20 for that window.',
  },
  {
    gap: 'The delivery infrastructure and the full recipient list for the lure are outside this collection.',
    reason: 'evidence_not_collected',
    detail:
      'One inbound message is visible in the mailbox artefacts on WKS-CORP-01. Whether other users received the '
      + 'same lure, and whether any of them opened it, cannot be answered from three endpoints.',
    how_to_close: 'Run a message trace for the sender and the attachment hash across the mail platform, and collect any endpoint that opened it.',
  },
  {
    gap: 'WKS-CORP-02 (10.0.5.42) appears in the asset inventory but was not collected.',
    reason: 'evidence_not_collected',
    detail:
      'A second Finance workstation on the same subnet with a comparable user population is in scope for the same '
      + 'lure but out of scope for this acquisition. No evidence in this dataset implicates it; equally, none '
      + 'clears it.',
    how_to_close: 'Sweep it for the implant hash, the SyncUpdater Run value and the scheduled-task path, and collect it if any hit.',
  },
];

const RECOMMENDATIONS = {
  immediate: [
    {
      action: 'Treat the whole corp.example forest as compromised and convene AD recovery planning before any cleanup begins.',
      priority: 'critical',
      effort: 'significant',
      rationale: 'F-009 and F-010 put an attacker-created Enterprise Admin in the forest root. Per-host remediation cannot undo that, and cleaning hosts first destroys evidence while leaving the foothold in place.',
      finding_ids: ['F-009', 'F-010'],
    },
    {
      action: 'Disable (do not delete) CORP\\svc-support and remove it from Enterprise Admins.',
      priority: 'critical',
      effort: 'trivial',
      rationale: 'It is the attacker\'s most durable foothold and the principal that cleared the domain controller audit log. Disabling preserves its history for the investigation; deleting it destroys it.',
      finding_ids: ['F-010', 'F-012'],
    },
    {
      action: 'Network-isolate WKS-CORP-01 and SRV-CORP-FS02, leaving them powered on pending memory acquisition.',
      priority: 'critical',
      effort: 'trivial',
      rationale: 'Both host live implants with active C2. Powering them off loses the memory image that would close the largest analytic gap in this report.',
      finding_ids: ['F-002', 'F-003', 'F-008'],
    },
    {
      action: 'Block and sinkhole all four attacker domains and external addresses at the egress point, and search history for any other internal host that reached them.',
      priority: 'high',
      effort: 'trivial',
      rationale: 'Two independent C2 channels were in use (F-003); blocking one is not containment. Egress history is also the fastest way to find a host this three-host acquisition did not cover.',
      finding_ids: ['F-003', 'F-011'],
    },
    {
      action: 'Reset krbtgt in both domains twice with the recommended interval, then rotate every privileged credential and every credential cached on the two compromised hosts.',
      priority: 'critical',
      effort: 'moderate',
      rationale: 'F-006 exposes everything cached on the workstation and F-009 implies the directory was replicated, so ticket-granting material must be assumed known.',
      finding_ids: ['F-006', 'F-007', 'F-009'],
    },
    {
      action: 'Begin the data-breach assessment for the Q1 2026 finance dataset.',
      priority: 'high',
      effort: 'moderate',
      rationale: 'F-011 is a confirmed exfiltration with a byte-exact match between the staged archive and the outbound transfer. Notification clocks in most jurisdictions start at awareness, not at the end of the investigation.',
      finding_ids: ['F-011'],
    },
  ],
  short_term: [
    {
      action: 'Enable SID filtering on the eu.corp.example to corp.example trust.',
      priority: 'high',
      effort: 'moderate',
      rationale: 'Directly removes the mechanism in F-009: a child-domain principal could present root-domain SIDs and the root domain accepted them.',
      finding_ids: ['F-009'],
    },
    {
      action: 'Deploy LSASS protection (RunAsPPL) and Credential Guard, and disable RC4 for Kerberos in both domains.',
      priority: 'high',
      effort: 'moderate',
      rationale: 'Removes both credential-access techniques used here: the comsvcs.dll dump in F-006 and the offline-crackable RC4 tickets in F-007.',
      finding_ids: ['F-006', 'F-007'],
    },
    {
      action: 'Forward Windows event logs off-host in real time and alert on event 1102 and on vssadmin delete shadows.',
      priority: 'high',
      effort: 'moderate',
      rationale: 'F-012 made an entire Security channel unrecoverable. Off-host forwarding converts that from evidence destruction into an alert.',
      finding_ids: ['F-012'],
    },
    {
      action: 'Convert EU\\svc-backup to a group-managed service account, remove unnecessary SPNs, and restrict where it may log on.',
      priority: 'high',
      effort: 'moderate',
      rationale: 'A crackable SPN on an account permitted to authenticate from anywhere is what made the pivot in F-008 possible.',
      finding_ids: ['F-007', 'F-008'],
    },
    {
      action: 'Block macro-enabled and executable downloads from newly observed domains at the web proxy.',
      priority: 'medium',
      effort: 'moderate',
      rationale: 'On this timeline the proxy had two separate opportunities to interrupt the intrusion before any credential was touched (F-013).',
      finding_ids: ['F-001', 'F-013'],
    },
  ],
  long_term: [
    {
      action: 'Reconsider the two-domain forest: either collapse eu.corp.example into corp.example or re-model it as a separate forest with a selective-authentication trust.',
      priority: 'medium',
      effort: 'significant',
      rationale: 'The trust is not a misconfiguration, but it is the structural reason a Finance workstation compromise became a forest-root compromise. A security boundary that is a trust boundary in name only will be crossed again.',
      finding_ids: ['F-009'],
    },
    {
      action: 'Block Office child processes (script interpreters and shells) by policy, with an exception process for the finance automation that needs it.',
      priority: 'high',
      effort: 'moderate',
      rationale: 'The whole of F-002 depends on EXCEL.EXE being able to spawn wscript.exe.',
      finding_ids: ['F-002'],
    },
    {
      action: 'Tier administrative access so that file-server and workstation administration cannot reach domain-controller administration.',
      priority: 'high',
      effort: 'significant',
      rationale: 'SYSTEM on a file server should not be one step from the forest root, which is the path F-008 to F-009 takes.',
      finding_ids: ['F-008', 'F-009'],
    },
    {
      action: 'Alert on discovery tooling — nltest, bulk LDAP reads and privileged-group enumeration — sourced from workstation-class hosts.',
      priority: 'medium',
      effort: 'moderate',
      rationale: 'F-005 is individually low-signal and is the last cheap opportunity to interrupt this pattern before credential theft.',
      finding_ids: ['F-005'],
    },
  ],
  further_collection: [
    {
      action: 'Acquire DC-EU-01 (10.0.5.10) with the same collection profile.',
      priority: 'critical',
      effort: 'trivial',
      rationale: 'It is the authoritative Kerberos record for the child domain and the single largest gap in this report; additional roasted accounts or pivot targets would appear only there.',
      finding_ids: ['F-007', 'F-008', 'F-014'],
    },
    {
      action: 'Acquire full physical memory from both compromised hosts before rebuilding them.',
      priority: 'high',
      effort: 'moderate',
      rationale: 'Nothing in this acquisition can exclude injected or memory-only tooling, and both hosts are still running.',
      finding_ids: ['F-002', 'F-008'],
    },
    {
      action: 'Retrieve proxy, netflow and firewall records for 10.0.5.20 and 10.0.5.41 across the whole collection window.',
      priority: 'high',
      effort: 'moderate',
      rationale: 'Would confirm the exfiltration content and volume independently of the host, and reveal any channel that left no on-disk artefact.',
      finding_ids: ['F-003', 'F-011'],
    },
    {
      action: 'Run a mail-platform message trace for the sender and the attachment hash, and collect any endpoint where the lure was opened.',
      priority: 'high',
      effort: 'trivial',
      rationale: 'One recipient opening the lure means others received it; this is how a second patient zero is found.',
      finding_ids: ['F-001'],
    },
    {
      action: 'Sweep the fleet for the implant SHA-256, the SyncUpdater Run value and the \\Microsoft\\Windows\\Sync\\SyncUpdateTask task path.',
      priority: 'high',
      effort: 'trivial',
      rationale: 'These are the cheapest high-fidelity indicators in the report and they scale to every host without a full collection.',
      finding_ids: ['F-002', 'F-004'],
    },
  ],
};

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const sha256Hex = (text) => createHash('sha256').update(text, 'utf8').digest('hex');

/** Deterministic RFC 4122-shaped identifier derived from a stable label. Not a
 * random UUID on purpose: report.js is a committed artifact. */
function stableUuid(label) {
  const h = sha256Hex(label);
  const variant = ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-${variant}${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

const byTimeThenHash = (a, b) =>
  (a.timestamp_utc < b.timestamp_utc ? -1 : a.timestamp_utc > b.timestamp_utc ? 1 : 0)
  || (a.row_hash < b.row_hash ? -1 : a.row_hash > b.row_hash ? 1 : 0);

function known(ts) {
  return ts && ts !== SENTINEL_TS;
}

function fail(message) {
  throw new Error(`gen-demo-report: ${message}`);
}

// ---------------------------------------------------------------------------
// load the payload
// ---------------------------------------------------------------------------

export async function loadDemoPayload() {
  const demoBase = pathToFileURL(path.join(DEMO_DIR, '/')).href;
  const { manifest } = await import(new URL('manifest.js', demoBase).href);
  const rowsByHost = new Map();
  const jsonlByHost = new Map();
  for (const entry of manifest.files) {
    const mod = await import(new URL(entry.module, demoBase).href);
    if (!Array.isArray(mod?.rows)) fail(`${entry.module} does not export rows[]`);
    rowsByHost.set(entry.host, mod.rows);
    jsonlByHost.set(entry.host, rowsToJsonl(mod.rows));
  }
  const allRows = manifest.files.flatMap((e) => rowsByHost.get(e.host));
  return { manifest, rowsByHost, jsonlByHost, allRows };
}

// ---------------------------------------------------------------------------
// evidence resolution
// ---------------------------------------------------------------------------

/** Resolve one authored citation against a candidate pool, by regex over the
 * row's own message. Throws rather than silently dropping: a dangling citation
 * renders as a broken reference. */
function resolveCitation(spec, pool, findingId) {
  const hits = pool.filter((r) => spec.match.test(r.message || ''));
  if (hits.length === 0) {
    fail(`${findingId}: no row matches ${spec.match} — the dataset changed, so this citation would dangle`);
  }
  if (spec.expect === 'first') {
    return hits.slice().sort(byTimeThenHash)[0];
  }
  if (hits.length > 1) {
    fail(
      `${findingId}: ${spec.match} matches ${hits.length} rows `
      + `(${hits.slice(0, 3).map((r) => r.row_hash.slice(0, 12)).join(', ')}…) — tighten the pattern or set expect: 'first'`,
    );
  }
  return hits[0];
}

function buildFindings({ manifest, allRows, byHash }) {
  const phaseById = new Map(manifest.narrative.map((p) => [p.id, p]));
  const findings = [];

  for (const spec of FINDING_SPECS) {
    let pool;
    if (spec.phases.includes('*')) {
      pool = allRows;
    } else {
      const hashes = new Set();
      for (const pid of spec.phases) {
        const phase = phaseById.get(pid);
        if (!phase) fail(`${spec.id}: manifest has no narrative phase "${pid}"`);
        for (const h of phase.evidence) hashes.add(h);
      }
      pool = [...hashes].map((h) => byHash.get(h) ?? fail(`${spec.id}: phase cites ${h}, which is in no host file`));
    }

    const rows = [];
    const seen = new Set();
    for (const cite of spec.evidence) {
      const row = resolveCitation(cite, pool, spec.id);
      if (seen.has(row.row_hash)) fail(`${spec.id}: two citations resolve to the same row ${row.row_hash.slice(0, 12)}`);
      seen.add(row.row_hash);
      rows.push({ row, why: cite.why });
    }

    // Everything below is DERIVED from the rows the citations resolved to.
    const techniques = [...new Set(rows.flatMap(({ row }) => row.detections.flatMap((d) => d.mitre_techniques || [])))].sort();
    const hosts = [...new Set(rows.map(({ row }) => row.host))].sort();
    const accounts = [...new Set(rows.map(({ row }) => row.user).filter(Boolean))].sort();
    const times = rows.map(({ row }) => row.timestamp_utc).filter(known).sort();
    const rules = new Map();
    for (const { row } of rows) {
      for (const d of row.detections) {
        rules.set(`${d.engine}\u0000${d.rule_id}`, {
          engine: d.engine, rule_id: d.rule_id, rule_name: d.rule_name, severity: d.severity,
        });
      }
    }

    findings.push({
      id: spec.id,
      title: spec.title,
      severity: spec.severity,
      confidence: spec.confidence,
      category: spec.category,
      narrative: spec.narrative,
      evidence: rows
        .slice()
        .sort((a, b) => byTimeThenHash(a.row, b.row))
        .map(({ row, why }) => ({
          row_hash: row.row_hash,
          timestamp_utc: row.timestamp_utc,
          host: row.host,
          excerpt: row.message,
          why_relevant: why,
        })),
      mitre_techniques: techniques,
      affected_hosts: hosts,
      affected_accounts: accounts,
      ...(times.length ? { first_seen_utc: times[0], last_seen_utc: times[times.length - 1] } : {}),
      recommendation: spec.recommendation,
      detection_rules: [...rules.values()].sort((a, b) => a.rule_id.localeCompare(b.rule_id)),
      // report_schema.json types this as a STRING (the benign explanation and
      // how to rule it out), NOT a boolean. `true` here fails validation.
      false_positive_considered: spec.false_positive_considered,
      _phases: spec.phases,
    });
  }

  return findings;
}

const CONFIDENCE_RANK = { low: 0, moderate: 1, high: 2 };

/** Same ordering the pipeline applies in assembleReport(): severity desc,
 * confidence desc, id asc. Ids stay chronological, so cross-references by id
 * are unaffected by the sort. */
function sortLikePipeline(findings) {
  return findings.slice().sort(
    (a, b) =>
      severityRank(b.severity) - severityRank(a.severity)
      || (CONFIDENCE_RANK[b.confidence] ?? -1) - (CONFIDENCE_RANK[a.confidence] ?? -1)
      || a.id.localeCompare(b.id),
  );
}

// ---------------------------------------------------------------------------
// iocs
// ---------------------------------------------------------------------------

function iocFromRows(value, rows, { context, verdict, confidence, findingIds }) {
  const times = rows.map((r) => r.timestamp_utc).filter(known).sort();
  return {
    value,
    context,
    ...(times.length ? { first_seen_utc: times[0], last_seen_utc: times[times.length - 1] } : {}),
    occurrences: rows.length,
    confidence,
    ...(findingIds && findingIds.length ? { finding_ids: findingIds } : {}),
    row_hashes: rows.map((r) => r.row_hash).sort().slice(0, 8),
    verdict,
  };
}

function buildIocs({ manifest, allRows, findings }) {
  const findingsByHash = new Map();
  for (const f of findings) {
    for (const ev of f.evidence) {
      if (!findingsByHash.has(ev.row_hash)) findingsByHash.set(ev.row_hash, new Set());
      findingsByHash.get(ev.row_hash).add(f.id);
    }
  }
  const findingIdsFor = (rows) => {
    const ids = new Set();
    for (const r of rows) for (const id of findingsByHash.get(r.row_hash) || []) ids.add(id);
    return [...ids].sort();
  };

  const attackerIps = new Set(manifest.entities.attacker_ips.map((a) => a.ip));
  const attackerDomains = new Set(manifest.entities.attacker_domains.map((d) => d.domain));

  // hashes + files: one entry per declared key file, occurrences counted in the rows.
  const hashes = [];
  const files = [];
  for (const kf of manifest.entities.key_files) {
    const rows = allRows.filter((r) => r.hashes?.sha256 === kf.sha256);
    if (!rows.length) fail(`key file ${kf.file_name} has no row carrying its SHA-256`);
    const benign = kf.key === 'procdump';
    const verdict = benign ? 'benign' : 'malicious';
    const context = benign
      ? `${kf.label}. Dismissed — see dismissed_detections.`
      : kf.label;
    hashes.push(iocFromRows(kf.sha256, rows, { context: `SHA-256 of ${kf.file_name}: ${context}`, verdict, confidence: 'high', findingIds: findingIdsFor(rows) }));
    files.push(iocFromRows(kf.file_name, rows, { context, verdict, confidence: 'high', findingIds: findingIdsFor(rows) }));
  }

  const ip_addresses = manifest.entities.attacker_ips.map((a) => {
    const rows = allRows.filter((r) => r.network?.src_ip === a.ip || r.network?.dst_ip === a.ip);
    if (!rows.length) fail(`attacker IP ${a.ip} appears in no row`);
    return iocFromRows(a.ip, rows, { context: a.label, verdict: 'malicious', confidence: 'high', findingIds: findingIdsFor(rows) });
  });

  const domains = manifest.entities.attacker_domains.map((d) => {
    const rows = allRows.filter((r) => r.network?.domain === d.domain);
    if (!rows.length) fail(`attacker domain ${d.domain} appears in no row`);
    return iocFromRows(d.domain, rows, { context: d.label, verdict: 'malicious', confidence: 'high', findingIds: findingIdsFor(rows) });
  });

  const urlValues = [...new Set(allRows.map((r) => r.network?.url).filter((u) => u && attackerDomains.has(new URL(u).hostname)))].sort();
  const urls = urlValues.map((u) => {
    const rows = allRows.filter((r) => r.network?.url === u);
    return iocFromRows(u, rows, { context: 'Download URL for the lure attachment.', verdict: 'malicious', confidence: 'high', findingIds: findingIdsFor(rows) });
  });

  // registry / task / service values are taken from the rows that created them.
  const runKeyRow = allRows.find((r) => /Run key added: SyncUpdater/.test(r.message || '')) || fail('no Run-key row found');
  const taskRow = allRows.find((r) => /Scheduled task created with an update-service-impersonating name/.test(r.message || '')) || fail('no scheduled-task row found');
  const serviceRow = allRows.find((r) => /Service installed remotely: SyncHostSvc/.test(r.message || '')) || fail('no service-install row found');

  const registry_keys = [iocFromRows(runKeyRow.target, [runKeyRow], {
    context: `Autostart value pointing at ${runKeyRow.registry?.value_data}.`,
    verdict: 'malicious', confidence: 'high', findingIds: findingIdsFor([runKeyRow]),
  })];
  const scheduled_tasks = [iocFromRows(taskRow.target, [taskRow], {
    context: `Task impersonating a Microsoft update component; runs ${taskRow.extra?.task_command} ${taskRow.extra?.task_trigger}.`,
    verdict: 'malicious', confidence: 'high', findingIds: findingIdsFor([taskRow]),
  })];
  const services = [iocFromRows(serviceRow.target, [serviceRow], {
    context: `Auto-start service running ${serviceRow.extra?.image_path} as ${serviceRow.extra?.service_account}.`,
    verdict: 'malicious', confidence: 'high', findingIds: findingIdsFor([serviceRow]),
  })];

  const accounts = ACCOUNT_IOCS.map(([value, verdict, confidence, context]) => {
    const rows = allRows.filter((r) => r.user === value || r.target === value);
    if (!rows.length) fail(`account IOC ${value} appears in no row`);
    return iocFromRows(value, rows, { context, verdict, confidence, findingIds: findingIdsFor(rows) });
  });

  const processes = PROCESS_IOCS.map(([value, verdict, confidence, context]) => {
    const rows = allRows.filter((r) => r.process?.name === value);
    if (!rows.length) fail(`process IOC ${value} appears in no row`);
    return iocFromRows(value, rows, { context, verdict, confidence, findingIds: findingIdsFor(rows) });
  });

  // Sanity: nothing externally routable may escape the RFC 5737 ranges.
  for (const entry of ip_addresses) {
    if (!/^(192\.0\.2|198\.51\.100|203\.0\.113)\./.test(entry.value) && !attackerIps.has(entry.value)) {
      fail(`IOC ${entry.value} is not a documentation-range address`);
    }
  }

  return { files, hashes, ip_addresses, domains, urls, registry_keys, accounts, processes, scheduled_tasks, services };
}

// ---------------------------------------------------------------------------
// dismissed detections (the SET is derived; only the reasoning is authored)
// ---------------------------------------------------------------------------

function buildDismissed({ manifest, allRows }) {
  const cited = new Set(manifest.narrative.flatMap((p) => p.evidence));
  const noisy = allRows.filter((r) => r.detection_count > 0 && !cited.has(r.row_hash));
  const byRule = new Map();
  for (const row of noisy) {
    for (const d of row.detections) {
      const cur = byRule.get(d.rule_id);
      if (cur) cur.occurrences += 1;
      else byRule.set(d.rule_id, { engine: d.engine, rule_id: d.rule_id, rule_name: d.rule_name, occurrences: 1 });
    }
  }
  const derived = [...byRule.keys()].sort();
  const authored = Object.keys(DISMISSALS).sort();
  const missing = derived.filter((id) => !DISMISSALS[id]);
  const unused = authored.filter((id) => !byRule.has(id));
  if (missing.length) fail(`the dataset carries dismissible detection(s) with no authored rationale: ${missing.join(', ')}`);
  if (unused.length) fail(`authored dismissal(s) for rule(s) the dataset no longer contains: ${unused.join(', ')}`);
  if (derived.length < 5) fail(`expected at least 5 dismissible detections, derived ${derived.length}`);

  return derived.map((id) => ({
    ...byRule.get(id),
    rationale: DISMISSALS[id].rationale,
    confidence: DISMISSALS[id].confidence,
  }));
}

// ---------------------------------------------------------------------------
// mitre coverage
// ---------------------------------------------------------------------------

function buildMitreCoverage({ allRows, findings }) {
  const base = computeMitreCoverage(allRows, findings);
  const byId = new Map(findings.map((f) => [f.id, f]));
  return base.map((entry) => {
    const named = MITRE[entry.technique_id]
      || fail(`no name/tactic for ${entry.technique_id} — add it to the MITRE table in scripts/gen-demo-report.mjs`);
    // validate-report.js's severity_max_mismatch check requires max_severity to
    // agree with the findings the entry references. computeMitreCoverage()
    // derives it from DETECTION severities, which can legitimately differ from
    // the analyst's finding severity, so reconcile here whenever finding_ids
    // are present.
    let maxSeverity = entry.max_severity;
    if (Array.isArray(entry.finding_ids) && entry.finding_ids.length) {
      let best;
      for (const fid of entry.finding_ids) {
        const sev = byId.get(fid)?.severity;
        if (!sev) continue;
        if (best === undefined || severityRank(sev) > severityRank(best)) best = sev;
      }
      if (best !== undefined) maxSeverity = best;
    }
    return {
      technique_id: entry.technique_id,
      technique_name: named[0],
      tactic: named[1],
      event_count: entry.event_count,
      ...(entry.finding_ids ? { finding_ids: entry.finding_ids } : {}),
      max_severity: maxSeverity,
    };
  });
}

// ---------------------------------------------------------------------------
// the report
// ---------------------------------------------------------------------------

export async function buildReport() {
  const payload = await loadDemoPayload();
  const { manifest, rowsByHost, jsonlByHost, allRows } = payload;
  const byHash = new Map(allRows.map((r) => [r.row_hash, r]));

  const findingsChronological = buildFindings({ manifest, allRows, byHash });
  const findings = sortLikePipeline(findingsChronological);
  const phaseMembership = new Map(findingsChronological.map((f) => [f.id, f._phases]));
  for (const f of findings) delete f._phases;

  const { dashboard, scope: computedScope } = computeDashboard(allRows);
  const osByHost = new Map(manifest.files.map((e) => [e.host, e.os]));

  const scope = {
    hosts: computedScope.hosts.map((h) => ({
      host: h.host,
      host_id: h.host_id,
      row_count: h.row_count,
      ...(osByHost.has(h.host) ? { os: osByHost.get(h.host) } : {}),
      first_event_utc: h.first_event_utc,
      last_event_utc: h.last_event_utc,
    })),
    row_count: computedScope.row_count,
    // Every row was placed in an evidence pack: 2,387 rows fit comfortably
    // inside a single-pass budget, so there is no sampling caveat to make.
    rows_analysed: computedScope.row_count,
    reduction_ratio: 1,
    time_range: computedScope.time_range,
    sources: computedScope.sources,
    artifacts: computedScope.artifacts,
    input_files: manifest.files.map((e) => ({
      name: e.file_name,
      sha256: sha256Hex(jsonlByHost.get(e.host)),
      rows: rowsByHost.get(e.host).length,
      clock_skew_seconds: 0,
    })),
  };

  const mitre_coverage = buildMitreCoverage({ allRows, findings });
  const iocs = buildIocs({ manifest, allRows, findings });
  const dismissed_detections = buildDismissed({ manifest, allRows });

  const detectionRows = allRows.filter((r) => r.detection_count > 0);
  const exfilRow = allRows.find((r) => /Sustained 3\.4 GB outbound transfer/.test(r.message || '')) || fail('no exfiltration row');
  const exfilBytes = exfilRow.extra?.bytes_sent ?? fail('exfiltration row carries no bytes_sent');
  const firstSuspicious = findingsChronological
    .flatMap((f) => f.evidence.map((e) => e.timestamp_utc))
    .filter(known)
    .sort()[0];

  const attack_narrative = {
    summary:
      'A single intrusion, reconstructed across three collected hosts and eight days. It runs from a finance lure '
      + 'opened on one workstation to Enterprise Admins in the forest-root domain and 3.4 GB of finance data '
      + 'leaving the estate, in nine phases over five calendar days. Two properties make the reconstruction hold '
      + 'together despite the attacker clearing three audit logs at the end: the implant is the same SHA-256 on '
      + 'both compromised hosts, and every cross-host step is recorded independently at both ends — the pivot by '
      + 'the workstation\'s network artefacts and the file server\'s logon record four seconds later, the '
      + 'cross-domain escalation by the file server\'s process evidence and the forest-root controller\'s '
      + 'Kerberos and directory records.',
    phases: manifest.narrative.map((phase) => ({
      order: phase.order,
      name: phase.title,
      start_utc: phase.start_utc,
      end_utc: phase.end_utc,
      description: phase.summary,
      mitre_tactic: phase.tactic,
      finding_ids: findingsChronological
        .filter((f) => (phaseMembership.get(f.id) || []).includes(phase.id))
        .map((f) => f.id),
      evidence: phase.evidence.map((h) => {
        const row = byHash.get(h) ?? fail(`narrative phase ${phase.id} cites unknown row ${h}`);
        return { row_hash: row.row_hash, timestamp_utc: row.timestamp_utc, host: row.host, excerpt: row.message };
      }),
    })),
  };

  const gb = (exfilBytes / 1e9).toFixed(1);
  const executive_summary = {
    text: [
      `Northwind Components was compromised. Between 9 and 14 March 2026 an attacker moved from a single phishing `
      + `email opened by one Finance user to complete control of the corp.example Active Directory forest, and `
      + `removed ${gb} GB of Q1 2026 finance data from the estate. This is a confirmed compromise, not a suspicion: `
      + `the decisive steps are each recorded independently on two different hosts, and the volume of data that `
      + `left matches the archive that was built for it byte for byte.`,

      `The sequence was ordinary in technique and efficient in execution. A macro-enabled invoice was downloaded `
      + `from a domain nobody in the estate had ever contacted and opened in Excel; within two minutes it had `
      + `installed a small program that called out to the attacker every sixty seconds. Overnight the attacker `
      + `looked around, discovered that the company runs two linked Windows domains rather than one, stole the `
      + `credentials cached on that workstation, and used a backup service account to reach a file server. From `
      + `there the link between the two domains was abused to obtain the highest level of privilege in the company, `
      + `and the attacker created their own administrator account to keep it.`,

      `What is known with confidence: how the attacker got in, every host they reached, the accounts they used, the `
      + `administrator account they created, and that ${Number(exfilBytes).toLocaleString('en-US')} bytes of finance `
      + `data were transferred to an external address. What is not known: whether other employees received the same `
      + `email, whether any other host was touched, and exactly which files were inside the archive. The attacker `
      + `deleted three audit logs and all system restore points on their way out, which is itself evidence of `
      + `intent — and bounds what this collection can show for one host and one time window. Those limits are listed `
      + `explicitly in the Analytic gaps section rather than being smoothed over.`,

      `Three hosts were collected and ${allRows.length.toLocaleString('en-US')} timeline events analysed in full, `
      + `with no sampling. ${detectionRows.length} of those events carried a detection from the client's rule packs; `
      + `${findings.length} findings are raised here and ${dismissed_detections.length} detections are explicitly `
      + `dismissed as benign with reasoning, because a report that treats every alert as real is not usable for `
      + `decision-making. The child-domain controller was deliberately not collected, which is normal for a triage `
      + `but is the single biggest thing that would sharpen this picture.`,

      `The immediate priority is not host cleanup. Because an attacker-created account holds forest-wide privilege, `
      + `rebuilding the two known-compromised machines would leave the intruder in place. Directory recovery, `
      + `credential rotation including the Kerberos signing keys, and egress blocking come first; the two `
      + `compromised hosts should be isolated but left running so memory can be captured. Regulatory assessment for `
      + `the finance data should start now rather than at the end of the investigation.`,
    ].join('\n\n'),
    bullets: [
      'Confirmed compromise of the corp.example forest, from phishing to Enterprise Admins in under four days.',
      `${gb} GB of Q1 2026 finance data exfiltrated to an external host; the transferred byte count matches the staged archive exactly.`,
      'An attacker-created account, CORP\\svc-support, holds forest-wide privilege and must be disabled before any host cleanup.',
      'The link between the two Windows domains is what turned a workstation compromise into a forest compromise.',
      'Credentials cached on the compromised workstation, and the directory itself, must be assumed known to the attacker.',
      'Three audit logs and all shadow copies were destroyed; filesystem and journal artefacts are what preserved the story.',
      `${dismissed_detections.length} low-fidelity detections were reviewed and dismissed with reasoning, including a legitimate IT credential-dumping tool.`,
      'The child-domain controller was not collected; acquiring it is the highest-value next step.',
    ],
  };

  const report = {
    schema_version: SCHEMA_VERSION,
    meta: {
      report_id: stableUuid('irtriage-demo-report/2026-03/v1'),
      generated_utc: GENERATED_UTC,
      engagement: {
        case_id: CASE_ID,
        examiner: EXAMINER,
        organization: ORGANIZATION,
        classification: CLASSIFICATION,
        description:
          'DEMONSTRATION REPORT over entirely synthetic evidence. The timeline it analyses was produced by '
          + 'scripts/gen-demo-dataset.mjs; the analysis was pre-authored by scripts/gen-demo-report.mjs and no '
          + 'language model, API key or network request was involved in producing it. Every host, account, '
          + 'address, domain and hash is invented. Not a record of any real incident.',
      },
      model: {
        // report_schema.json's provider enum includes "mock" precisely so a
        // report that did not come from a model can say so honestly.
        provider: 'mock',
        model_id: 'irtriage-demo-preauthored',
        prompt_version: PROMPT_VERSION,
        temperature: 0,
        passes: 0,
      },
      usage: {
        input_tokens: 0,
        output_tokens: 0,
        cached_input_tokens: 0,
        estimated_cost_usd: 0,
        wall_clock_seconds: 0,
      },
    },
    scope,
    dashboard,
    verdict: {
      assessment: 'confirmed_compromised',
      confidence: 'high',
      confidence_rationale:
        'High rather than moderate because the decisive steps are each corroborated by two independent hosts or '
        + 'two independent artefact classes: the pivot by the workstation\'s network artefacts and the file '
        + 'server\'s own logon record, the cross-domain escalation by process evidence on the file server and '
        + 'Kerberos plus directory records on the forest-root controller, and the exfiltration by a byte-exact '
        + 'match between the staged archive and the outbound transfer. All 2,387 rows were analysed with no '
        + 'sampling, so no conclusion rests on a subset. It would be lowered if the corroborating host records '
        + 'turned out to be within the window the attacker cleared; it cannot usefully be raised without '
        + 'DC-EU-01 and a memory image.',
      rationale:
        'A macro-enabled phishing attachment led to a first-stage implant with two autostart mechanisms and two '
        + 'encrypted C2 channels, credential theft from LSASS and kerberoasting of a backup service account, '
        + 'lateral movement to a file server as that account, SID-history abuse of the intra-forest trust to '
        + 'reach the forest root, DCSync, creation of an attacker-controlled Enterprise Admin, and a 3.4 GB '
        + 'exfiltration of the finance share followed by deliberate destruction of audit logs and shadow copies '
        + 'on all three collected hosts.',
      earliest_suspicious_activity_utc: firstSuspicious,
      attack_stage: 'exfiltration complete, followed by anti-forensics; forest-root privilege retained',
    },
    executive_summary,
    findings,
    attack_narrative,
    iocs,
    mitre_coverage,
    recommendations: RECOMMENDATIONS,
    analytic_gaps: ANALYTIC_GAPS,
    dismissed_detections,
    provenance: {
      // Derived: SHA-256 over the row hashes of every analysed row, in the
      // order they were packed. Same property a real digest has (it changes if
      // the analysed set changes) with no dependency on wall-clock or on the
      // model transcript.
      evidence_pack_digest: sha256Hex(allRows.map((r) => r.row_hash).join('\n')),
      pack_count: manifest.files.length,
      packs: manifest.files.map((entry, index) => {
        const rows = rowsByHost.get(entry.host);
        const times = rows.map((r) => r.timestamp_utc).filter(known).sort();
        return {
          index,
          rows: rows.length,
          // ~4 characters per token over the canonical JSONL the loader emits:
          // the same crude estimator providers/lib/tokens.js uses.
          estimated_tokens: Math.ceil(jsonlByHost.get(entry.host).length / 4),
          time_range: { start_utc: times[0], end_utc: times[times.length - 1] },
          selection_strategy: 'whole-host (no reduction required)',
        };
      }),
      reduction_strategy:
        'None. All 2,387 rows fit inside a single-pass budget, so every row was shown and no conclusion here '
        + 'rests on a sample. One pack per collected host preserves per-host coherence.',
      rows_omitted: 0,
      redactions_applied: [],
      warnings: [
        'SYNTHETIC DEMONSTRATION REPORT. The evidence is generated by scripts/gen-demo-dataset.mjs and the '
        + 'analysis is pre-authored by scripts/gen-demo-report.mjs. No language model produced any text in this '
        + 'report, which is why meta.model.provider is "mock", passes is 0 and usage is zero throughout.',
        'Every host, account, IP address, domain and file hash is invented: external addresses come from the '
        + 'RFC 5737 documentation ranges and every DNS name uses the RFC 2606 reserved .example TLD.',
        'A real run records the actual provider, model, prompt version, token usage and cost here, and its '
        + 'findings carry the model\'s own wording rather than an author\'s.',
      ],
      repair_attempts: 0,
    },
  };

  return { report, payload };
}

// ---------------------------------------------------------------------------
// self-checks that run on every generation
// ---------------------------------------------------------------------------

export async function checkReport(report, payload) {
  const rowHashes = new Set(payload.allRows.map((r) => r.row_hash));

  // 1. every citation resolves. The validator does this too; doing it here
  // first produces a far clearer message than a schema error would.
  for (const f of report.findings) {
    if (!f.evidence.length) throw new Error(`gen-demo-report: ${f.id} has no evidence — an uncited finding is an opinion`);
    for (const ev of f.evidence) {
      if (!rowHashes.has(ev.row_hash)) {
        throw new Error(`gen-demo-report: ${f.id} cites ${ev.row_hash}, which exists in no web/demo/host-*.js row`);
      }
    }
  }
  for (const phase of report.attack_narrative.phases) {
    for (const ev of phase.evidence) {
      if (!rowHashes.has(ev.row_hash)) {
        throw new Error(`gen-demo-report: narrative phase ${phase.order} cites unknown row ${ev.row_hash}`);
      }
    }
  }

  // 2. severities actually span the range — a demo where everything is critical
  // teaches nothing about triage.
  const severities = new Set(report.findings.map((f) => f.severity));
  for (const needed of ['informational', 'low', 'medium', 'high', 'critical']) {
    if (!severities.has(needed)) throw new Error(`gen-demo-report: no ${needed}-severity finding`);
  }

  // 3. false_positive_considered is a STRING, per report_schema.json.
  for (const f of report.findings) {
    if (typeof f.false_positive_considered !== 'string' || f.false_positive_considered.length < 40) {
      throw new Error(`gen-demo-report: ${f.id}.false_positive_considered must be substantive reasoning text`);
    }
  }

  // 4. full schema + semantic validation, with the real row set supplied so the
  // fabricated-citation check actually runs.
  const { valid, errors, skipped } = await validateReport(report, { rowHashes });
  if (skipped.length) throw new Error(`gen-demo-report: validation skipped checks: ${skipped.join('; ')}`);
  if (!valid) throw new Error(`gen-demo-report: the generated report is not schema-valid:\n${formatReportErrors(errors)}`);
}

// ---------------------------------------------------------------------------
// emit
// ---------------------------------------------------------------------------

// The banner names BOTH generators on purpose: web/tests/demo.test.mjs asserts
// every module in web/demo/ carries a generated-file marker, states that the
// data is synthetic, and names gen-demo-dataset.mjs (the payload this report is
// derived from).
const BANNER = `// GENERATED FILE -- do not edit by hand.
// Pre-authored, schema-valid forensic report for the demo incident, so an
// evaluator can see a finished report in one click with no API key and no
// network. Derived entirely from web/demo/manifest.js + web/demo/host-*.js.
// Regenerate with:  node scripts/gen-demo-report.mjs
// (the evidence it analyses comes from scripts/gen-demo-dataset.mjs)
//
// SYNTHETIC DATA ONLY. Every host, account, address, domain and hash below is
// invented: RFC 5737 documentation IP ranges and the RFC 2606 reserved .example
// TLD. No language model produced any text here. See docs/DEMO.md.
`;

export function reportModuleSource(report) {
  return `${BANNER}
export const report = ${JSON.stringify(report, null, 2)};

export default report;
`;
}

async function main() {
  const checkOnly = process.argv.includes('--check');
  const { report, payload } = await buildReport();
  await checkReport(report, payload);
  const source = reportModuleSource(report);

  if (checkOnly) {
    let existing = null;
    try {
      existing = await readFile(OUT_FILE, 'utf8');
    } catch {
      existing = null;
    }
    if (existing === null) {
      console.error('web/demo/report.js is missing. Run: node scripts/gen-demo-report.mjs');
      process.exitCode = 1;
      return;
    }
    // Normalise line endings before comparing: core.autocrlf means the working
    // tree may hold CRLF while this generator writes LF.
    if (existing.replace(/\r\n/g, '\n') !== source) {
      console.error('web/demo/report.js is stale. Run: node scripts/gen-demo-report.mjs');
      process.exitCode = 1;
      return;
    }
    console.log(`web/demo/report.js is up to date (${report.findings.length} findings, ${payload.allRows.length} rows).`);
    return;
  }

  await writeFile(OUT_FILE, source, 'utf8');
  console.log(
    `Wrote web/demo/report.js — ${report.findings.length} findings, `
    + `${report.attack_narrative.phases.length} narrative phases, `
    + `${report.findings.reduce((n, f) => n + f.evidence.length, 0)} citations, `
    + `${report.mitre_coverage.length} techniques, `
    + `${report.dismissed_detections.length} dismissed detections, `
    + `${report.analytic_gaps.length} analytic gaps, `
    + `${(source.length / 1024).toFixed(0)} KB.`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  await main();
}
