// Evidence-pack rendering of Windows event rows.
//
// The defect this guards: renderRow() cut every message at 240 characters. A
// rendered Windows event message puts the subject block first and the evidence
// after it, so on a real 480,581-row domain-controller timeline the fields an
// analyst needs reached the model in 0% of rows -- 4688 New/Creator Process
// Name, 4624 Source Network Address and logged-on account, 4769 Client Address.
//
// The fixtures below reproduce the EXACT layout Velociraptor's EvtxHunter emits
// (title line, "Section:" headers, "\tLabel:\t\tValue" lines, "!S!" artefacts,
// mixed \r\n, trailing boilerplate paragraphs) -- copied from real rows, with
// every identifying value replaced by a synthetic one. Because a fixture written
// from the same belief as the parser cannot falsify that belief, there is ALSO an
// opt-in check against a real collection: set IRTRIAGE_REAL_TIMELINE to a
// timeline.jsonl and the last test measures field survival over every row.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createReadStream, existsSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { renderRow, compactEventMessage, EVENT_MESSAGE_MAX_CHARS, MESSAGE_MAX_CHARS } from '../assets/js/analysis/reduce.js';

const HASH = 'a'.repeat(64);

function eventRow(id, channel, message) {
  return {
    row_hash: HASH, timestamp_utc: '2026-03-10T09:15:00.0000000Z', host: 'DC01', source: 'eventlog',
    artifact: 'Windows.EventLogs.EvtxHunter', severity_max: 'none', detections: [], target: channel,
    event: { channel, event_id: id, record_id: 1, computer: 'DC01.corp.example' }, message,
  };
}

const BOILER_4688 = '\nToken Elevation Type indicates the type of token that was assigned to the new process in accordance with User Account Control policy.\n\nType 1 is a full token with no privileges removed or groups disabled.  A full token is only used if User Account Control is disabled or if the user is the built-in Administrator account or a service account.\r\n';

const MSG_4688 =
  'EventID 4688 on Security: A new process has been created.\n\nCreator Subject:\n\tSecurity ID:\t\tS-1-5-21-1111111111-2222222222-3333333333-500\n\tAccount Name:\t\tsvc-backup\n\tAccount Domain:\t\tCORP\n\tLogon ID:\t\t0x3E7\n\n' +
  'Target Subject:\n\tSecurity ID:\t\tS-1-0-0\n\tAccount Name:\t\t-\n\tAccount Domain:\t\t-\n\tLogon ID:\t\t0x0\n\n' +
  'Process Information:\n\tNew Process ID:\t\t0x1a2c\n\tNew Process Name:\tC:\\Windows\\System32\\example-tool.exe!S!\n\tToken Elevation Type:\tTokenElevationTypeDefault (1)\r\n\n\tMandatory Label:\t\tS-1-16-12288\n\tCreator Process ID:\t0x1a00\n\tCreator Process Name:\tC:\\Windows\\System32\\cmd.exe!S!\n\tProcess Command Line:\texample-tool.exe /mode report /out C:\\Temp\\out.txt!S!\n' +
  BOILER_4688;

const MSG_4624 =
  'EventID 4624 on Security: An account was successfully logged on.\n\nSubject:\n\tSecurity ID:\t\tS-1-0-0\n\tAccount Name:\t\t-\n\tAccount Domain:\t\t-\n\tLogon ID:\t\t0\n\n' +
  'Logon Information:\n\tLogon Type:\t\t3\n\tRestricted Admin Mode:\t-\n\tVirtual Account:\t\tNo\r\n\n\tElevated Token:\t\tYes\r\n\n\nImpersonation Level:\t\tImpersonation\r\n\n\n' +
  'New Logon:\n\tSecurity ID:\t\tS-1-5-21-1111111111-2222222222-3333333333-1105\n\tAccount Name:\t\tjdoe\n\tAccount Domain:\t\tCORP.EXAMPLE\n\tLogon ID:\t\t3054649\n\tLinked Logon ID:\t\t0\n\tNetwork Account Name:\t-\n\tNetwork Account Domain:\t-\n\tLogon GUID:\t\t00000000-1111-2222-3333-444444444444\n\n' +
  'Process Information:\n\tProcess ID:\t\t0\n\tProcess Name:\t\t-\n\nNetwork Information:\n\tWorkstation Name:\tWKS-0042\n\tSource Network Address:\t192.0.2.44\n\tSource Port:\t\t55041\n\n' +
  'Detailed Authentication Information:\n\tLogon Process:\t\tNtLmSsp \n\tAuthentication Package:\tNTLM\n\tTransited Services:\t-\n\tPackage Name (NTLM only):\tNTLM V2\n\tKey Length:\t\t128\n\n' +
  'This event is generated when a logon session is created. It is generated on the computer that was accessed.\n\nThe subject fields indicate the account on the local system which requested the logon.\n';

const MSG_4769 =
  'EventID 4769 on Security: A Kerberos service ticket was requested.\n\nAccount Information:\n\tAccount Name:\t\tjdoe@CORP.EXAMPLE\n\tAccount Domain:\t\tCORP.EXAMPLE\n\tLogon GUID:\t\t8C9E2C80-0000-0000-0000-BA265E035D4F\n\tMSDS-SupportedEncryptionTypes:\tN/A\n\tAvailable Keys:\tN/A\n\n' +
  'Service Information:\n\tService Name:\t\tsvc-sql\n\tService ID:\t\tS-1-5-21-1111111111-2222222222-3333333333-1300\n\tMSDS-SupportedEncryptionTypes:\t0x1F (DES, RC4, AES128-SHA96, AES256-SHA96)\n\tAvailable Keys:\tAES-SHA1, RC4\n\n' +
  'Domain Controller Information:\n\tMSDS-SupportedEncryptionTypes:\t0x1F (DES, RC4, AES128-SHA96, AES256-SHA96)\n\tAvailable Keys:\tAES-SHA1, RC4\n\n' +
  'Network Information:\n\tClient Address:\t\t::ffff:192.0.2.77\n\tClient Port:\t\t51234\n\tAdvertized Etypes:\t\n\t\tRC4-HMAC-NT\n\n' +
  'Additional Information:\n\tTicket Options:\t\t0x40810000\n\tTicket Encryption Type:\t0x17\n\tSession Encryption Type:\t0x17\n\tFailure Code:\t\t0x0\n\tTransited Services:\t-\n\n' +
  'This event is generated every time access is requested to a resource such as a computer or a Windows service.\r\n';

const MSG_4698 =
  'EventID 4698 on Security: A scheduled task was created.\n\nSubject:\n\tSecurity ID:\t\tS-1-5-18\n\tAccount Name:\t\tDC01$\n\tAccount Domain:\t\tCORP\n\tLogon ID:\t\t999\n\n' +
  'Task Information:\n\tTask Name: \t\t\\Example\\NightlyReport\n\tTask Content: \t\t<?xml version="1.0" encoding="UTF-16"?>\n<Task version="1.3" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">\n  <Actions Context="LocalSystem">\n    <Exec>\n      <Command>C:\\Tools\\report.exe</Command>\n      <Arguments>--nightly --quiet</Arguments>\n    </Exec>\n  </Actions>\n</Task>\n\n' +
  'Other Information:\n\tProcessCreationTime: \t\t1407374883553354\n\tClientProcessId: \t\t\t3188\n';

const MSG_4104 = 'EventID 4104 on Microsoft-Windows-PowerShell/Operational: Creating Scriptblock text (1 of 1):\n\r\nGet-ChildItem -Path C:\\Reports | Measure-Object\r\n';

test('4688: process names and command line survive; boilerplate and !S! do not', () => {
  const line = renderRow(eventRow(4688, 'Security', MSG_4688));
  for (const v of ['C:\\Windows\\System32\\example-tool.exe', 'C:\\Windows\\System32\\cmd.exe', 'example-tool.exe /mode report /out C:\\Temp\\out.txt', 'svc-backup']) {
    assert.ok(line.includes(v), `missing ${v}: ${line}`);
  }
  assert.doesNotMatch(line, /!S!/);
  assert.doesNotMatch(line, /Token Elevation Type indicates/);
  // The process name is the FIRST field, ahead of the subject block.
  assert.ok(line.indexOf('New Process Name=') < line.indexOf('svc-backup'));
});

test('4624: logon type, source address, workstation and the LOGGED-ON account survive', () => {
  const line = renderRow(eventRow(4624, 'Security', MSG_4624));
  for (const v of ['Logon Type=3', '192.0.2.44', 'WKS-0042', 'jdoe', 'NTLM']) assert.ok(line.includes(v), `missing ${v}: ${line}`);
  assert.doesNotMatch(line, /This event is generated/);
});

test('4769: client address, service and ticket encryption type survive', () => {
  const line = renderRow(eventRow(4769, 'Security', MSG_4769));
  for (const v of ['::ffff:192.0.2.77', 'Service Name=svc-sql', 'Ticket Encryption Type=0x17', 'jdoe@CORP.EXAMPLE']) assert.ok(line.includes(v), `missing ${v}: ${line}`);
});

test('4698: the task XML collapses to its command and arguments', () => {
  const msg = compactEventMessage(eventRow(4698, 'Security', MSG_4698));
  assert.match(msg, /Task Name=\\Example\\NightlyReport/);
  assert.match(msg, /Task Content=C:\\Tools\\report\.exe --nightly --quiet/);
  assert.doesNotMatch(msg, /<\?xml|<Task/);
});

test('messages without label/value structure keep their text (4104 script block)', () => {
  const msg = compactEventMessage(eventRow(4104, 'Microsoft-Windows-PowerShell/Operational', MSG_4104));
  assert.match(msg, /Get-ChildItem -Path C:\\Reports \| Measure-Object/);
});

test('rendered event message respects its cap and the channel is not repeated as target', () => {
  const huge = MSG_4688.replace('example-tool.exe /mode', `${'x'.repeat(2000)} /mode`);
  const cols = renderRow(eventRow(4688, 'Security', huge)).split('\t');
  assert.equal(cols.length, 9);
  assert.equal(cols[7], '', 'target equal to the channel is redundant with the message prefix');
  assert.ok(cols[8].length <= EVENT_MESSAGE_MAX_CHARS);
});

test('non-event rows render exactly as before (240-char cut, target kept)', () => {
  const r = { row_hash: HASH, timestamp_utc: '2026-03-10T09:15:00.0000000Z', host: 'H', source: 'filesystem', severity_max: 'none', detections: [], target: 'C:\\x', message: 'M'.repeat(500) };
  const cols = renderRow(r).split('\t');
  assert.equal(cols[7], 'C:\\x');
  assert.equal(cols[8].length, MESSAGE_MAX_CHARS);
});

// Opt-in: field survival over a REAL collection's timeline.jsonl.
const REAL = process.env.IRTRIAGE_REAL_TIMELINE;
test('real timeline: deciding fields of 4688/4624/4769 survive in every row', { skip: !REAL || !existsSync(REAL) ? 'set IRTRIAGE_REAL_TIMELINE to a timeline.jsonl' : false }, async () => {
  const KEYS = { 4688: ['New Process Name', 'Creator Process Name'], 4624: ['Source Network Address'], 4769: ['Client Address', 'Ticket Encryption Type'] };
  const misses = [];
  let checked = 0;
  const rl = createInterface({ input: createReadStream(REAL), crlfDelay: Infinity });
  for await (const line of rl) {
    const r = JSON.parse(line);
    const labels = KEYS[r.event?.event_id];
    if (r.source !== 'eventlog' || !labels) continue;
    const rendered = renderRow(r);
    for (const label of labels) {
      const m = new RegExp(`${label}:[ \\t]*\\t[ \\t]*([^\\r\\n]*)`).exec(r.message);
      const v = m?.[1].replace(/!S!/g, '').trim();
      if (!v || v === '-') continue;
      checked++;
      if (!rendered.includes(v)) misses.push(`${r.row_hash.slice(0, 12)} ${label}=${v}`);
    }
  }
  assert.ok(checked > 0, 'the real timeline held none of the measured events');
  assert.deepEqual(misses.slice(0, 10), [], `${misses.length} of ${checked} fields lost`);
});
