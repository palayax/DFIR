// GENERATED FILE -- do not edit by hand.
// ACME.Corp business-risk mock dataset (663 assets, 126 cyber risks, 39 KPIs,
// 8 SLOs, 14 processes, 50 components, 232 evidence records).
// Regenerate with:  node scripts/gen-acme-dataset.mjs
//
// SYNTHETIC DATA ONLY. ACME.Corp is a fictional company; see docs/ACME_DEMO.md.

export const context = {
 "as_of": "2026-09-30",
 "assets": [
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-DC01",
   "internet_facing": false,
   "ip": "10.10.1.40",
   "name": "dc01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IAM",
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-DC02",
   "internet_facing": false,
   "ip": "10.10.1.151",
   "name": "dc02.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IAM",
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-DC01",
   "internet_facing": false,
   "ip": "10.20.1.245",
   "name": "dc-dub01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IAM",
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-SIN-DC01",
   "internet_facing": false,
   "ip": "10.30.1.63",
   "name": "dc-sin01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IAM",
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-DC01",
   "internet_facing": false,
   "ip": "10.40.1.81",
   "name": "dc-tlv01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IAM",
    "SVC-IT"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-JMP01",
   "internet_facing": false,
   "ip": "10.10.1.59",
   "name": "soc-jump01.acme.example",
   "owner": "SOC Engineering",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-JMP01",
   "internet_facing": false,
   "ip": "10.20.1.219",
   "name": "soc-jump-dub01.acme.example",
   "owner": "SOC Engineering",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-SIN-JMP01",
   "internet_facing": false,
   "ip": "10.30.1.189",
   "name": "soc-jump-sin01.acme.example",
   "owner": "SOC Engineering",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "SIN",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-SOAR01",
   "internet_facing": false,
   "ip": "10.10.1.38",
   "name": "soar01.acme.example",
   "owner": "SOC Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "high",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-BLD01",
   "internet_facing": false,
   "ip": "10.40.1.33",
   "name": "build01.rnd.acme.example",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "high",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-BLD02",
   "internet_facing": false,
   "ip": "10.40.1.133",
   "name": "build02.rnd.acme.example",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "high",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-BLD03",
   "internet_facing": false,
   "ip": "10.40.1.98",
   "name": "build03.rnd.acme.example",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "high",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-BLD04",
   "internet_facing": false,
   "ip": "10.40.1.182",
   "name": "build04.rnd.acme.example",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-FS01",
   "internet_facing": false,
   "ip": "10.10.1.166",
   "name": "fs01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "high",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-FS01",
   "internet_facing": false,
   "ip": "10.20.1.14",
   "name": "fs-dub01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "low",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-PRN01",
   "internet_facing": false,
   "ip": "10.10.1.66",
   "name": "print01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2016",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-SQL01",
   "internet_facing": false,
   "ip": "10.20.1.247",
   "name": "finsql-dub01.acme.example",
   "owner": "Finance Systems",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-FIN"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-BKP01",
   "internet_facing": false,
   "ip": "10.10.1.96",
   "name": "backup01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN",
    "SVC-IAM"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "high",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-HR01",
   "internet_facing": false,
   "ip": "10.10.1.85",
   "name": "hris-sync01.acme.example",
   "owner": "HR Systems",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IAM"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "critical",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-PKI01",
   "internet_facing": false,
   "ip": "10.10.1.231",
   "name": "pki01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IAM",
    "SVC-CICD"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "high",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-PS01",
   "internet_facing": false,
   "ip": "10.20.1.210",
   "name": "ps-tools-dub01.acme.example",
   "owner": "Professional Services",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-PS"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-LEGACY01",
   "internet_facing": false,
   "ip": "10.10.1.213",
   "name": "legacy-erp01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2012 R2",
   "service_ids": [
    "SVC-FIN"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-SIN-FS01",
   "internet_facing": false,
   "ip": "10.30.1.28",
   "name": "fs-sin01.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2016",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL01",
   "internet_facing": false,
   "ip": "10.10.1.86",
   "name": "util01.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 20.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "low",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-UTL02",
   "internet_facing": false,
   "ip": "10.20.1.137",
   "name": "util02.dub.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2019",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-SIN-UTL03",
   "internet_facing": false,
   "ip": "10.30.1.214",
   "name": "util03.sin.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2019",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "low",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-UTL04",
   "internet_facing": false,
   "ip": "10.40.1.143",
   "name": "util04.tlv.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL05",
   "internet_facing": false,
   "ip": "10.10.1.63",
   "name": "util05.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2019",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL06",
   "internet_facing": false,
   "ip": "10.10.1.204",
   "name": "util06.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2019",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "low",
   "edr": false,
   "environment": "corp",
   "id": "SRV-DUB-UTL07",
   "internet_facing": false,
   "ip": "10.20.1.81",
   "name": "util07.dub.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-SIN-UTL08",
   "internet_facing": false,
   "ip": "10.30.1.184",
   "name": "util08.sin.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 20.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-UTL09",
   "internet_facing": false,
   "ip": "10.40.1.26",
   "name": "util09.tlv.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "low",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL10",
   "internet_facing": false,
   "ip": "10.10.1.173",
   "name": "util10.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "RHEL 9",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL11",
   "internet_facing": false,
   "ip": "10.10.1.158",
   "name": "util11.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2019",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-UTL12",
   "internet_facing": false,
   "ip": "10.20.1.233",
   "name": "util12.dub.acme.example",
   "owner": "IT Infrastructure",
   "platform": "RHEL 9",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-SIN-UTL13",
   "internet_facing": false,
   "ip": "10.30.1.147",
   "name": "util13.sin.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "low",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-UTL14",
   "internet_facing": false,
   "ip": "10.40.1.48",
   "name": "util14.tlv.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL15",
   "internet_facing": false,
   "ip": "10.10.1.136",
   "name": "util15.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "low",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL16",
   "internet_facing": false,
   "ip": "10.10.1.145",
   "name": "util16.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-UTL17",
   "internet_facing": false,
   "ip": "10.20.1.28",
   "name": "util17.dub.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2019",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-SIN-UTL18",
   "internet_facing": false,
   "ip": "10.30.1.146",
   "name": "util18.sin.acme.example",
   "owner": "IT Infrastructure",
   "platform": "RHEL 9",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-TLV-UTL19",
   "internet_facing": false,
   "ip": "10.40.1.33",
   "name": "util19.tlv.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2022",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-09",
    "status": "stale"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "low",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL20",
   "internet_facing": false,
   "ip": "10.10.1.101",
   "name": "util20.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2019",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-BOS-UTL21",
   "internet_facing": false,
   "ip": "10.10.1.125",
   "name": "util21.bos.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Windows Server 2019",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "server",
   "cloud": null,
   "criticality": "medium",
   "edr": true,
   "environment": "corp",
   "id": "SRV-DUB-UTL22",
   "internet_facing": false,
   "ip": "10.20.1.211",
   "name": "util22.dub.acme.example",
   "owner": "IT Infrastructure",
   "platform": "Ubuntu 20.04",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-ACCT-MDR",
   "internet_facing": false,
   "name": "aws: mdr-prod (account)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "CLOUD",
   "subtype": "account",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-EKS-MDR",
   "internet_facing": false,
   "name": "aws: mdr-ingest (EKS)",
   "owner": "Cloud Platform",
   "region": "us-east-1",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "CLOUD",
   "subtype": "kubernetes",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-MSK-MDR",
   "internet_facing": false,
   "name": "aws: mdr-stream (MSK)",
   "owner": "Cloud Platform",
   "region": "us-east-1",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "CLOUD",
   "subtype": "streaming",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-S3-MDR-TEL",
   "internet_facing": false,
   "name": "aws: s3://acme-mdr-telemetry",
   "owner": "Cloud Platform",
   "region": "us-east-1",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "CLOUD",
   "subtype": "object_storage",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-EKS-MDR-EU",
   "internet_facing": false,
   "name": "aws: mdr-ingest-eu (EKS)",
   "owner": "Cloud Platform",
   "region": "eu-west-1",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "CLOUD",
   "subtype": "kubernetes",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-ACCT-TIP",
   "internet_facing": false,
   "name": "aws: tip-prod (account)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "subtype": "account",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-EKS-TIP",
   "internet_facing": false,
   "name": "aws: tip-api (EKS)",
   "owner": "Cloud Platform",
   "region": "us-east-1",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "subtype": "kubernetes",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-APIGW-TIP",
   "internet_facing": true,
   "ip": "203.0.113.11",
   "name": "aws: api.tip.acme.example (API Gateway)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "subtype": "api_gateway",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-RDS-TIP",
   "internet_facing": false,
   "name": "aws: tip-db (RDS PostgreSQL)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "subtype": "database",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-ACCT-PORTAL",
   "internet_facing": false,
   "name": "aws: portal-prod (account)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-PORTAL"
   ],
   "site": "CLOUD",
   "subtype": "account",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-ALB-PORTAL",
   "internet_facing": true,
   "ip": "203.0.113.12",
   "name": "aws: portal.acme.example (ALB)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-PORTAL"
   ],
   "site": "CLOUD",
   "subtype": "load_balancer",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-ECS-PORTAL-API",
   "internet_facing": false,
   "name": "aws: portal-api (ECS)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-PORTAL"
   ],
   "site": "CLOUD",
   "subtype": "container_service",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AWS-RDS-PORTAL",
   "internet_facing": false,
   "name": "aws: portal-db (RDS)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-PORTAL"
   ],
   "site": "CLOUD",
   "subtype": "database",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AWS-S3-PORTAL-EXP",
   "internet_facing": false,
   "name": "aws: s3://acme-portal-exports",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-PORTAL"
   ],
   "site": "CLOUD",
   "subtype": "object_storage",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AWS-ACCT-SHARED",
   "internet_facing": false,
   "name": "aws: shared-services (account)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "CLOUD",
   "subtype": "account",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AWS-S3-LOGS",
   "internet_facing": false,
   "name": "aws: s3://acme-central-logs",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-MDR",
    "SVC-IT"
   ],
   "site": "CLOUD",
   "subtype": "object_storage",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AWS-ECR",
   "internet_facing": false,
   "name": "aws: container registry (ECR)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "CLOUD",
   "subtype": "registry",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AZ-SUB-CORP",
   "internet_facing": false,
   "name": "azure: corp (subscription)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "CLOUD",
   "subtype": "subscription",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AZ-SUB-BI",
   "internet_facing": false,
   "name": "azure: analytics (subscription)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-BI"
   ],
   "site": "CLOUD",
   "subtype": "subscription",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AZ-SYN-BI",
   "internet_facing": false,
   "name": "azure: acme-dw (Synapse)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-BI"
   ],
   "site": "CLOUD",
   "subtype": "data_warehouse",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AZ-STG-BI",
   "internet_facing": false,
   "name": "azure: acmebilake (Storage)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-BI"
   ],
   "site": "CLOUD",
   "subtype": "object_storage",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AZ-SQL-FIN",
   "internet_facing": false,
   "name": "azure: fin-billing (Azure SQL)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-FIN"
   ],
   "site": "CLOUD",
   "subtype": "database",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AZ-APP-BILLING",
   "internet_facing": true,
   "ip": "203.0.113.13",
   "name": "azure: pay.acme.example (App Service)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-FIN"
   ],
   "site": "CLOUD",
   "subtype": "web_app",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "medium",
   "edr": null,
   "environment": "prod",
   "id": "AZ-AKS-PS",
   "internet_facing": false,
   "name": "azure: ps-tooling (AKS)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-PS"
   ],
   "site": "CLOUD",
   "subtype": "kubernetes",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "AZ-KV-CORP",
   "internet_facing": false,
   "name": "azure: kv-corp (Key Vault)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "CLOUD",
   "subtype": "secrets",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "azure",
   "criticality": "critical",
   "edr": null,
   "environment": "prod",
   "id": "AZ-APPGW-PORTAL-EU",
   "internet_facing": true,
   "ip": "203.0.113.14",
   "name": "azure: eu.portal.acme.example (App Gateway + WAF)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-PORTAL"
   ],
   "site": "CLOUD",
   "subtype": "load_balancer",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "gcp",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "GCP-PRJ-TIP",
   "internet_facing": false,
   "name": "gcp: tip-analytics (project)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "subtype": "project",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "gcp",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "GCP-BQ-TIP",
   "internet_facing": false,
   "name": "gcp: tip_intel (BigQuery)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "subtype": "data_warehouse",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "gcp",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "GCP-GKE-TIP-ML",
   "internet_facing": false,
   "name": "gcp: tip-ml (GKE)",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "subtype": "kubernetes",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "gcp",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "GCP-GCS-TIP-FEEDS",
   "internet_facing": false,
   "name": "gcp: gs://acme-tip-feeds",
   "owner": "Cloud Platform",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "subtype": "object_storage",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "high",
   "edr": null,
   "environment": "prod",
   "id": "WEB-CDN",
   "internet_facing": true,
   "ip": "203.0.113.15",
   "name": "aws: www.acme.example (CDN distribution)",
   "owner": "Marketing Technology",
   "service_ids": [
    "SVC-CRM"
   ],
   "site": "CLOUD",
   "subtype": "cdn",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cloud_resource",
   "cloud": "aws",
   "criticality": "medium",
   "edr": null,
   "environment": "prod",
   "id": "WEB-ORIGIN",
   "internet_facing": true,
   "ip": "203.0.113.16",
   "name": "aws: www-origin (marketing CMS origin)",
   "owner": "Marketing Technology",
   "service_ids": [
    "SVC-CRM"
   ],
   "site": "CLOUD",
   "subtype": "vm",
   "triage": {
    "collector": "Cloud API (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-IDP",
   "internet_facing": false,
   "name": "Workforce identity provider (SSO)",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-IAM"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-HRIS",
   "internet_facing": false,
   "name": "HR information system",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-IAM"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-CODE",
   "internet_facing": false,
   "name": "Source-code hosting (enterprise)",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-CRM",
   "internet_facing": false,
   "name": "CRM platform",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-CRM"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-COLLAB",
   "internet_facing": false,
   "name": "Email & collaboration suite",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-BI",
   "internet_facing": false,
   "name": "BI & dashboards (Power BI)",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-BI"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-ITSM",
   "internet_facing": false,
   "name": "ITSM & GRC (ServiceNow)",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-PAY",
   "internet_facing": false,
   "name": "Payment processor",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-FIN"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-CHAT",
   "internet_facing": false,
   "name": "Team chat",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "saas",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "SAAS-TRACK",
   "internet_facing": false,
   "name": "Issue tracking (Jira)",
   "owner": "IT Applications",
   "service_ids": [
    "SVC-CICD",
    "SVC-IT"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "CICD-RUNNER-01",
   "internet_facing": false,
   "name": "self-hosted runner 1",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "CICD-RUNNER-02",
   "internet_facing": false,
   "name": "self-hosted runner 2",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "CICD-RUNNER-03",
   "internet_facing": false,
   "name": "self-hosted runner 3",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "CICD-RUNNER-04",
   "internet_facing": false,
   "name": "self-hosted runner 4",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "CICD-RUNNER-05",
   "internet_facing": false,
   "name": "self-hosted runner 5",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "CICD-RUNNER-06",
   "internet_facing": false,
   "name": "self-hosted runner 6",
   "owner": "Platform Engineering",
   "platform": "Ubuntu 22.04",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "CICD-ARTIFACTS",
   "internet_facing": false,
   "name": "Artifact repository",
   "owner": "Platform Engineering",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "CICD-VAULT",
   "internet_facing": false,
   "name": "Secrets manager (Vault)",
   "owner": "Platform Engineering",
   "service_ids": [
    "SVC-CICD",
    "SVC-MDR",
    "SVC-TIP"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "CICD-ARGO",
   "internet_facing": false,
   "name": "GitOps deployer (Argo CD)",
   "owner": "Platform Engineering",
   "service_ids": [
    "SVC-CICD",
    "SVC-TIP",
    "SVC-PORTAL"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "cicd",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "CICD-SIGN",
   "internet_facing": false,
   "name": "Code-signing service",
   "owner": "Platform Engineering",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "TLV",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "NET-BOS-FW01",
   "internet_facing": false,
   "ip": "10.10.0.1",
   "name": "fw01.bos (next-gen firewall)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "NET-BOS-CORE01",
   "internet_facing": false,
   "ip": "10.10.0.2",
   "name": "core01.bos (core switch)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "NET-BOS-WLC01",
   "internet_facing": false,
   "ip": "10.10.0.3",
   "name": "wlc01.bos (wireless controller)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "NET-DUB-FW01",
   "internet_facing": false,
   "ip": "10.20.0.1",
   "name": "fw01.dub (next-gen firewall)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "NET-DUB-CORE01",
   "internet_facing": false,
   "ip": "10.20.0.2",
   "name": "core01.dub (core switch)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "NET-DUB-WLC01",
   "internet_facing": false,
   "ip": "10.20.0.3",
   "name": "wlc01.dub (wireless controller)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "NET-SIN-FW01",
   "internet_facing": false,
   "ip": "10.30.0.1",
   "name": "fw01.sin (next-gen firewall)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "NET-SIN-CORE01",
   "internet_facing": false,
   "ip": "10.30.0.2",
   "name": "core01.sin (core switch)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "NET-SIN-WLC01",
   "internet_facing": false,
   "ip": "10.30.0.3",
   "name": "wlc01.sin (wireless controller)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "NET-TLV-FW01",
   "internet_facing": false,
   "ip": "10.40.0.1",
   "name": "fw01.tlv (next-gen firewall)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "NET-TLV-CORE01",
   "internet_facing": false,
   "ip": "10.40.0.2",
   "name": "core01.tlv (core switch)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "NET-TLV-WLC01",
   "internet_facing": false,
   "ip": "10.40.0.3",
   "name": "wlc01.tlv (wireless controller)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "NET-BOS-VPN01",
   "internet_facing": true,
   "ip": "203.0.113.17",
   "name": "vpn.acme.example (remote-access VPN, NA)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR",
    "SVC-PS"
   ],
   "site": "BOS",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "NET-DUB-VPN01",
   "internet_facing": true,
   "ip": "203.0.113.18",
   "name": "vpn-eu.acme.example (remote-access VPN, EU)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR",
    "SVC-PS"
   ],
   "site": "DUB",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "NET-SIN-FWMGMT",
   "internet_facing": true,
   "ip": "203.0.113.19",
   "name": "fw-mgmt.sin (firewall management interface)",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "network_device",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "NET-SDWAN",
   "internet_facing": false,
   "name": "SD-WAN orchestrator",
   "owner": "Network Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "triage": {
    "collector": "Config export (mock)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-BADGE01",
   "internet_facing": false,
   "ip": "10.10.8.10",
   "name": "badge reader HQ-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-BADGE02",
   "internet_facing": false,
   "ip": "10.10.8.56",
   "name": "badge reader HQ-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-BADGE03",
   "internet_facing": false,
   "ip": "10.10.8.153",
   "name": "badge reader HQ-3",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-BADGE04",
   "internet_facing": false,
   "ip": "10.10.8.155",
   "name": "badge reader HQ-4",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-BADGE05",
   "internet_facing": false,
   "ip": "10.10.8.212",
   "name": "badge reader HQ-5",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-BADGE06",
   "internet_facing": false,
   "ip": "10.10.8.80",
   "name": "badge reader HQ-6",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-BADGE07",
   "internet_facing": false,
   "ip": "10.10.8.217",
   "name": "badge reader HQ-7",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-BADGE08",
   "internet_facing": false,
   "ip": "10.10.8.48",
   "name": "badge reader HQ-8",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-BADGE01",
   "internet_facing": false,
   "ip": "10.20.8.24",
   "name": "badge reader EU-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-BADGE02",
   "internet_facing": false,
   "ip": "10.20.8.23",
   "name": "badge reader EU-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-BADGE03",
   "internet_facing": false,
   "ip": "10.20.8.189",
   "name": "badge reader EU-3",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-BADGE04",
   "internet_facing": false,
   "ip": "10.20.8.156",
   "name": "badge reader EU-4",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "badge_reader",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-PRN01",
   "internet_facing": false,
   "ip": "10.10.8.209",
   "name": "printer BOS-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-PRN02",
   "internet_facing": false,
   "ip": "10.10.8.142",
   "name": "printer BOS-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-PRN03",
   "internet_facing": false,
   "ip": "10.10.8.11",
   "name": "printer BOS-3",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-CONF01",
   "internet_facing": false,
   "ip": "10.10.8.121",
   "name": "conference room system BOS-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "conference_system",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-CONF02",
   "internet_facing": false,
   "ip": "10.10.8.228",
   "name": "conference room system BOS-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "conference_system",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-PRN01",
   "internet_facing": false,
   "ip": "10.20.8.234",
   "name": "printer DUB-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-PRN02",
   "internet_facing": false,
   "ip": "10.20.8.155",
   "name": "printer DUB-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-PRN03",
   "internet_facing": false,
   "ip": "10.20.8.241",
   "name": "printer DUB-3",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-CONF01",
   "internet_facing": false,
   "ip": "10.20.8.197",
   "name": "conference room system DUB-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "conference_system",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-DUB-CONF02",
   "internet_facing": false,
   "ip": "10.20.8.209",
   "name": "conference room system DUB-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "conference_system",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-SIN-PRN01",
   "internet_facing": false,
   "ip": "10.30.8.52",
   "name": "printer SIN-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-SIN-PRN02",
   "internet_facing": false,
   "ip": "10.30.8.137",
   "name": "printer SIN-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-SIN-PRN03",
   "internet_facing": false,
   "ip": "10.30.8.117",
   "name": "printer SIN-3",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-SIN-CONF01",
   "internet_facing": false,
   "ip": "10.30.8.213",
   "name": "conference room system SIN-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "conference_system",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-SIN-CONF02",
   "internet_facing": false,
   "ip": "10.30.8.15",
   "name": "conference room system SIN-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "conference_system",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-TLV-PRN01",
   "internet_facing": false,
   "ip": "10.40.8.82",
   "name": "printer TLV-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-TLV-PRN02",
   "internet_facing": false,
   "ip": "10.40.8.80",
   "name": "printer TLV-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-TLV-PRN03",
   "internet_facing": false,
   "ip": "10.40.8.202",
   "name": "printer TLV-3",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "subtype": "printer",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-TLV-CONF01",
   "internet_facing": false,
   "ip": "10.40.8.116",
   "name": "conference room system TLV-1",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "subtype": "conference_system",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "low",
   "edr": null,
   "environment": "corp",
   "id": "IOT-TLV-CONF02",
   "internet_facing": false,
   "ip": "10.40.8.56",
   "name": "conference room system TLV-2",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "subtype": "conference_system",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-BOS-NVR01",
   "internet_facing": false,
   "ip": "10.10.8.163",
   "name": "CCTV recorder HQ",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "cctv",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "peripheral_iot",
   "cloud": null,
   "criticality": "medium",
   "edr": null,
   "environment": "corp",
   "id": "IOT-SIN-NVR01",
   "internet_facing": false,
   "ip": "10.30.8.206",
   "name": "CCTV recorder APAC",
   "owner": "Facilities",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "cctv",
   "triage": {
    "collector": "Network discovery (mock)",
    "last_collected": "2026-09-27",
    "status": "not_collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SEC-EDR",
   "internet_facing": false,
   "name": "EDR platform",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SEC-SIEM",
   "internet_facing": false,
   "name": "Internal SIEM",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SEC-SOAR",
   "internet_facing": false,
   "name": "SOAR / automation",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SEC-MAILGW",
   "internet_facing": false,
   "name": "Email security gateway",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SEC-WAF",
   "internet_facing": false,
   "name": "Web application firewall (portal)",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-PORTAL"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "SEC-CASB",
   "internet_facing": false,
   "name": "Cloud access security broker",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SEC-PAM",
   "internet_facing": false,
   "name": "Privileged access management",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-IAM"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "SEC-DLP",
   "internet_facing": false,
   "name": "Data loss prevention",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "SEC-VULN",
   "internet_facing": false,
   "name": "Vulnerability scanner",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "critical",
   "edr": null,
   "environment": "corp",
   "id": "SEC-BACKUP",
   "internet_facing": false,
   "name": "Backup & recovery platform",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN",
    "SVC-IAM"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "security_control",
   "cloud": null,
   "criticality": "high",
   "edr": null,
   "environment": "corp",
   "id": "SEC-IRTRIAGE",
   "internet_facing": false,
   "name": "IRTriage collectors (portable triage)",
   "owner": "Security Engineering",
   "service_ids": [
    "SVC-PS",
    "SVC-MDR"
   ],
   "site": "SAAS",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "ai_system",
   "cloud": null,
   "criticality": "high",
   "description": "Retrieval-augmented assistant over wiki, contracts and HR knowledge base.",
   "edr": null,
   "environment": "corp",
   "id": "AI-ASSIST",
   "internet_facing": false,
   "name": "Internal LLM assistant (\"Ask ACME\")",
   "owner": "AI Platform",
   "service_ids": [
    "SVC-IT",
    "SVC-BI"
   ],
   "site": "CLOUD",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "ai_system",
   "cloud": null,
   "criticality": "critical",
   "description": "Ranks and summarises customer alerts for SOC analysts; processes customer email and tickets.",
   "edr": null,
   "environment": "corp",
   "id": "AI-TRIAGE",
   "internet_facing": false,
   "name": "MDR alert-triage model",
   "owner": "AI Platform",
   "service_ids": [
    "SVC-MDR"
   ],
   "site": "CLOUD",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "ai_system",
   "cloud": null,
   "criticality": "high",
   "description": "Summarises and tags intelligence before publication to customers.",
   "edr": null,
   "environment": "corp",
   "id": "AI-TIP-ENRICH",
   "internet_facing": false,
   "name": "TIP enrichment LLM pipeline",
   "owner": "AI Platform",
   "service_ids": [
    "SVC-TIP"
   ],
   "site": "CLOUD",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "ai_system",
   "cloud": null,
   "criticality": "medium",
   "description": "Drafts proposals from CRM data.",
   "edr": null,
   "environment": "corp",
   "id": "AI-SALES",
   "internet_facing": false,
   "name": "Sales copilot (browser extension)",
   "owner": "AI Platform",
   "service_ids": [
    "SVC-CRM"
   ],
   "site": "CLOUD",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "ai_system",
   "cloud": null,
   "criticality": "medium",
   "description": "IDE assistant with repository context.",
   "edr": null,
   "environment": "corp",
   "id": "AI-CODE",
   "internet_facing": false,
   "name": "Code assistant integration",
   "owner": "AI Platform",
   "service_ids": [
    "SVC-CICD"
   ],
   "site": "CLOUD",
   "triage": {
    "collector": "API connector (mock)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0001",
   "internet_facing": false,
   "ip": "10.10.37.52",
   "name": "bos-lt-0001.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0002",
   "internet_facing": false,
   "ip": "10.10.33.62",
   "name": "bos-lt-0002.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0003",
   "internet_facing": false,
   "ip": "10.10.35.24",
   "name": "bos-lt-0003.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0004",
   "internet_facing": false,
   "ip": "10.10.51.119",
   "name": "bos-lt-0004.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0005",
   "internet_facing": false,
   "ip": "10.10.50.206",
   "name": "bos-lt-0005.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0006",
   "internet_facing": false,
   "ip": "10.10.26.135",
   "name": "bos-lt-0006.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0007",
   "internet_facing": false,
   "ip": "10.10.27.91",
   "name": "bos-lt-0007.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0008",
   "internet_facing": false,
   "ip": "10.10.55.192",
   "name": "bos-lt-0008.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0009",
   "internet_facing": false,
   "ip": "10.10.55.221",
   "name": "bos-lt-0009.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0010",
   "internet_facing": false,
   "ip": "10.10.59.179",
   "name": "bos-lt-0010.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-01",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0011",
   "internet_facing": false,
   "ip": "10.10.28.240",
   "name": "bos-lt-0011.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0012",
   "internet_facing": false,
   "ip": "10.10.58.126",
   "name": "bos-lt-0012.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0013",
   "internet_facing": false,
   "ip": "10.10.49.102",
   "name": "bos-lt-0013.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0014",
   "internet_facing": false,
   "ip": "10.10.51.231",
   "name": "bos-lt-0014.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0015",
   "internet_facing": false,
   "ip": "10.10.39.161",
   "name": "bos-lt-0015.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0016",
   "internet_facing": false,
   "ip": "10.10.34.237",
   "name": "bos-lt-0016.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0017",
   "internet_facing": false,
   "ip": "10.10.51.5",
   "name": "bos-lt-0017.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0018",
   "internet_facing": false,
   "ip": "10.10.42.105",
   "name": "bos-lt-0018.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0019",
   "internet_facing": false,
   "ip": "10.10.33.158",
   "name": "bos-lt-0019.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0020",
   "internet_facing": false,
   "ip": "10.10.26.84",
   "name": "bos-lt-0020.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-06",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0021",
   "internet_facing": false,
   "ip": "10.10.46.186",
   "name": "bos-lt-0021.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0022",
   "internet_facing": false,
   "ip": "10.10.34.239",
   "name": "bos-lt-0022.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0023",
   "internet_facing": false,
   "ip": "10.10.49.17",
   "name": "bos-lt-0023.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0024",
   "internet_facing": false,
   "ip": "10.10.30.79",
   "name": "bos-lt-0024.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0025",
   "internet_facing": false,
   "ip": "10.10.34.225",
   "name": "bos-lt-0025.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0026",
   "internet_facing": false,
   "ip": "10.10.33.250",
   "name": "bos-lt-0026.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0027",
   "internet_facing": false,
   "ip": "10.10.57.219",
   "name": "bos-lt-0027.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0028",
   "internet_facing": false,
   "ip": "10.10.26.96",
   "name": "bos-lt-0028.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0029",
   "internet_facing": false,
   "ip": "10.10.27.103",
   "name": "bos-lt-0029.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0030",
   "internet_facing": false,
   "ip": "10.10.21.58",
   "name": "bos-lt-0030.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0031",
   "internet_facing": false,
   "ip": "10.10.49.90",
   "name": "bos-lt-0031.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0032",
   "internet_facing": false,
   "ip": "10.10.41.175",
   "name": "bos-lt-0032.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0033",
   "internet_facing": false,
   "ip": "10.10.27.200",
   "name": "bos-lt-0033.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0034",
   "internet_facing": false,
   "ip": "10.10.29.138",
   "name": "bos-lt-0034.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0035",
   "internet_facing": false,
   "ip": "10.10.22.150",
   "name": "bos-lt-0035.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0036",
   "internet_facing": false,
   "ip": "10.10.46.229",
   "name": "bos-lt-0036.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0037",
   "internet_facing": false,
   "ip": "10.10.40.29",
   "name": "bos-lt-0037.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0038",
   "internet_facing": false,
   "ip": "10.10.29.165",
   "name": "bos-lt-0038.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0039",
   "internet_facing": false,
   "ip": "10.10.39.37",
   "name": "bos-lt-0039.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0040",
   "internet_facing": false,
   "ip": "10.10.57.150",
   "name": "bos-lt-0040.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0041",
   "internet_facing": false,
   "ip": "10.20.33.234",
   "name": "dub-lt-0041.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0042",
   "internet_facing": false,
   "ip": "10.20.21.71",
   "name": "dub-lt-0042.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0043",
   "internet_facing": false,
   "ip": "10.20.34.109",
   "name": "dub-lt-0043.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0044",
   "internet_facing": false,
   "ip": "10.20.29.190",
   "name": "dub-lt-0044.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0045",
   "internet_facing": false,
   "ip": "10.20.40.67",
   "name": "dub-lt-0045.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0046",
   "internet_facing": false,
   "ip": "10.20.59.48",
   "name": "dub-lt-0046.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0047",
   "internet_facing": false,
   "ip": "10.20.60.101",
   "name": "dub-lt-0047.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0048",
   "internet_facing": false,
   "ip": "10.20.33.36",
   "name": "dub-lt-0048.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0049",
   "internet_facing": false,
   "ip": "10.20.56.96",
   "name": "dub-lt-0049.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0050",
   "internet_facing": false,
   "ip": "10.20.30.30",
   "name": "dub-lt-0050.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-12",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0051",
   "internet_facing": false,
   "ip": "10.20.21.177",
   "name": "dub-lt-0051.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0052",
   "internet_facing": false,
   "ip": "10.20.58.221",
   "name": "dub-lt-0052.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0053",
   "internet_facing": false,
   "ip": "10.20.48.95",
   "name": "dub-lt-0053.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0054",
   "internet_facing": false,
   "ip": "10.20.57.85",
   "name": "dub-lt-0054.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0055",
   "internet_facing": false,
   "ip": "10.20.57.183",
   "name": "dub-lt-0055.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0056",
   "internet_facing": false,
   "ip": "10.20.56.83",
   "name": "dub-lt-0056.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0057",
   "internet_facing": false,
   "ip": "10.20.28.95",
   "name": "dub-lt-0057.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-18",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0058",
   "internet_facing": false,
   "ip": "10.20.27.107",
   "name": "dub-lt-0058.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0059",
   "internet_facing": false,
   "ip": "10.20.54.21",
   "name": "dub-lt-0059.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-01",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0060",
   "internet_facing": false,
   "ip": "10.20.21.90",
   "name": "dub-lt-0060.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0061",
   "internet_facing": false,
   "ip": "10.20.25.122",
   "name": "dub-lt-0061.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0062",
   "internet_facing": false,
   "ip": "10.20.26.180",
   "name": "dub-lt-0062.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0063",
   "internet_facing": false,
   "ip": "10.20.27.209",
   "name": "dub-lt-0063.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0064",
   "internet_facing": false,
   "ip": "10.20.35.21",
   "name": "dub-lt-0064.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0065",
   "internet_facing": false,
   "ip": "10.20.32.180",
   "name": "dub-lt-0065.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0066",
   "internet_facing": false,
   "ip": "10.20.41.35",
   "name": "dub-lt-0066.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0067",
   "internet_facing": false,
   "ip": "10.20.41.31",
   "name": "dub-lt-0067.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0068",
   "internet_facing": false,
   "ip": "10.20.37.194",
   "name": "dub-lt-0068.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0069",
   "internet_facing": false,
   "ip": "10.20.41.133",
   "name": "dub-lt-0069.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0070",
   "internet_facing": false,
   "ip": "10.20.47.118",
   "name": "dub-lt-0070.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0071",
   "internet_facing": false,
   "ip": "10.30.55.156",
   "name": "sin-lt-0071.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0072",
   "internet_facing": false,
   "ip": "10.30.46.82",
   "name": "sin-lt-0072.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0073",
   "internet_facing": false,
   "ip": "10.30.25.18",
   "name": "sin-lt-0073.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0074",
   "internet_facing": false,
   "ip": "10.30.46.11",
   "name": "sin-lt-0074.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0075",
   "internet_facing": false,
   "ip": "10.30.58.78",
   "name": "sin-lt-0075.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0076",
   "internet_facing": false,
   "ip": "10.30.55.94",
   "name": "sin-lt-0076.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0077",
   "internet_facing": false,
   "ip": "10.30.30.26",
   "name": "sin-lt-0077.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0078",
   "internet_facing": false,
   "ip": "10.30.59.117",
   "name": "sin-lt-0078.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0079",
   "internet_facing": false,
   "ip": "10.30.49.146",
   "name": "sin-lt-0079.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0080",
   "internet_facing": false,
   "ip": "10.30.35.45",
   "name": "sin-lt-0080.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0081",
   "internet_facing": false,
   "ip": "10.30.22.236",
   "name": "sin-lt-0081.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0082",
   "internet_facing": false,
   "ip": "10.30.28.221",
   "name": "sin-lt-0082.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-14",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0083",
   "internet_facing": false,
   "ip": "10.30.25.40",
   "name": "sin-lt-0083.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0084",
   "internet_facing": false,
   "ip": "10.30.56.65",
   "name": "sin-lt-0084.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0085",
   "internet_facing": false,
   "ip": "10.30.33.97",
   "name": "sin-lt-0085.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0086",
   "internet_facing": false,
   "ip": "10.30.40.124",
   "name": "sin-lt-0086.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0087",
   "internet_facing": false,
   "ip": "10.30.54.214",
   "name": "sin-lt-0087.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0088",
   "internet_facing": false,
   "ip": "10.30.31.65",
   "name": "sin-lt-0088.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0089",
   "internet_facing": false,
   "ip": "10.30.33.209",
   "name": "sin-lt-0089.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0090",
   "internet_facing": false,
   "ip": "10.30.28.112",
   "name": "sin-lt-0090.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0091",
   "internet_facing": false,
   "ip": "10.30.46.146",
   "name": "sin-lt-0091.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "SOC Operations",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0092",
   "internet_facing": false,
   "ip": "10.30.52.190",
   "name": "sin-lt-0092.acme.example",
   "owner": "SOC Operations",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-MDR"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0093",
   "internet_facing": false,
   "ip": "10.40.43.80",
   "name": "tlv-lt-0093.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0094",
   "internet_facing": false,
   "ip": "10.40.20.71",
   "name": "tlv-lt-0094.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0095",
   "internet_facing": false,
   "ip": "10.40.32.94",
   "name": "tlv-lt-0095.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0096",
   "internet_facing": false,
   "ip": "10.40.49.89",
   "name": "tlv-lt-0096.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0097",
   "internet_facing": false,
   "ip": "10.40.51.20",
   "name": "tlv-lt-0097.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0098",
   "internet_facing": false,
   "ip": "10.40.31.92",
   "name": "tlv-lt-0098.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0099",
   "internet_facing": false,
   "ip": "10.40.38.96",
   "name": "tlv-lt-0099.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-16",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0100",
   "internet_facing": false,
   "ip": "10.40.30.164",
   "name": "tlv-lt-0100.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-19",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0101",
   "internet_facing": false,
   "ip": "10.40.22.76",
   "name": "tlv-lt-0101.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0102",
   "internet_facing": false,
   "ip": "10.40.33.70",
   "name": "tlv-lt-0102.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0103",
   "internet_facing": false,
   "ip": "10.40.51.182",
   "name": "tlv-lt-0103.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0104",
   "internet_facing": false,
   "ip": "10.40.40.198",
   "name": "tlv-lt-0104.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0105",
   "internet_facing": false,
   "ip": "10.40.21.246",
   "name": "tlv-lt-0105.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0106",
   "internet_facing": false,
   "ip": "10.40.60.173",
   "name": "tlv-lt-0106.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0107",
   "internet_facing": false,
   "ip": "10.40.54.43",
   "name": "tlv-lt-0107.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0108",
   "internet_facing": false,
   "ip": "10.40.59.90",
   "name": "tlv-lt-0108.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0109",
   "internet_facing": false,
   "ip": "10.40.60.129",
   "name": "tlv-lt-0109.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0110",
   "internet_facing": false,
   "ip": "10.40.20.153",
   "name": "tlv-lt-0110.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0111",
   "internet_facing": false,
   "ip": "10.40.38.181",
   "name": "tlv-lt-0111.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0112",
   "internet_facing": false,
   "ip": "10.40.28.175",
   "name": "tlv-lt-0112.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0113",
   "internet_facing": false,
   "ip": "10.40.53.136",
   "name": "tlv-lt-0113.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0114",
   "internet_facing": false,
   "ip": "10.40.36.67",
   "name": "tlv-lt-0114.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0115",
   "internet_facing": false,
   "ip": "10.40.21.158",
   "name": "tlv-lt-0115.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0116",
   "internet_facing": false,
   "ip": "10.40.31.12",
   "name": "tlv-lt-0116.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0117",
   "internet_facing": false,
   "ip": "10.40.36.203",
   "name": "tlv-lt-0117.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0118",
   "internet_facing": false,
   "ip": "10.40.52.128",
   "name": "tlv-lt-0118.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0119",
   "internet_facing": false,
   "ip": "10.40.40.81",
   "name": "tlv-lt-0119.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0120",
   "internet_facing": false,
   "ip": "10.40.38.33",
   "name": "tlv-lt-0120.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0121",
   "internet_facing": false,
   "ip": "10.40.48.30",
   "name": "tlv-lt-0121.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0122",
   "internet_facing": false,
   "ip": "10.40.59.12",
   "name": "tlv-lt-0122.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0123",
   "internet_facing": false,
   "ip": "10.40.37.47",
   "name": "tlv-lt-0123.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0124",
   "internet_facing": false,
   "ip": "10.40.22.219",
   "name": "tlv-lt-0124.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0125",
   "internet_facing": false,
   "ip": "10.40.24.5",
   "name": "tlv-lt-0125.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0126",
   "internet_facing": false,
   "ip": "10.40.24.178",
   "name": "tlv-lt-0126.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0127",
   "internet_facing": false,
   "ip": "10.40.48.201",
   "name": "tlv-lt-0127.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0128",
   "internet_facing": false,
   "ip": "10.40.39.148",
   "name": "tlv-lt-0128.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0129",
   "internet_facing": false,
   "ip": "10.40.51.7",
   "name": "tlv-lt-0129.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0130",
   "internet_facing": false,
   "ip": "10.40.28.81",
   "name": "tlv-lt-0130.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0131",
   "internet_facing": false,
   "ip": "10.40.26.80",
   "name": "tlv-lt-0131.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0132",
   "internet_facing": false,
   "ip": "10.40.33.64",
   "name": "tlv-lt-0132.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0133",
   "internet_facing": false,
   "ip": "10.40.46.59",
   "name": "tlv-lt-0133.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0134",
   "internet_facing": false,
   "ip": "10.40.29.169",
   "name": "tlv-lt-0134.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0135",
   "internet_facing": false,
   "ip": "10.40.57.223",
   "name": "tlv-lt-0135.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0136",
   "internet_facing": false,
   "ip": "10.40.51.153",
   "name": "tlv-lt-0136.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0137",
   "internet_facing": false,
   "ip": "10.40.23.246",
   "name": "tlv-lt-0137.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0138",
   "internet_facing": false,
   "ip": "10.40.49.222",
   "name": "tlv-lt-0138.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-12",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0139",
   "internet_facing": false,
   "ip": "10.40.53.163",
   "name": "tlv-lt-0139.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0140",
   "internet_facing": false,
   "ip": "10.40.25.227",
   "name": "tlv-lt-0140.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0141",
   "internet_facing": false,
   "ip": "10.40.45.222",
   "name": "tlv-lt-0141.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0142",
   "internet_facing": false,
   "ip": "10.40.57.232",
   "name": "tlv-lt-0142.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0143",
   "internet_facing": false,
   "ip": "10.40.43.65",
   "name": "tlv-lt-0143.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0144",
   "internet_facing": false,
   "ip": "10.40.55.222",
   "name": "tlv-lt-0144.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0145",
   "internet_facing": false,
   "ip": "10.40.50.249",
   "name": "tlv-lt-0145.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0146",
   "internet_facing": false,
   "ip": "10.40.47.129",
   "name": "tlv-lt-0146.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0147",
   "internet_facing": false,
   "ip": "10.40.49.227",
   "name": "tlv-lt-0147.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": false,
   "environment": "corp",
   "id": "EP-TLV-0148",
   "internet_facing": false,
   "ip": "10.40.51.33",
   "name": "tlv-lt-0148.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0149",
   "internet_facing": false,
   "ip": "10.40.20.17",
   "name": "tlv-lt-0149.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0150",
   "internet_facing": false,
   "ip": "10.40.24.240",
   "name": "tlv-lt-0150.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0151",
   "internet_facing": false,
   "ip": "10.40.47.233",
   "name": "tlv-lt-0151.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0152",
   "internet_facing": false,
   "ip": "10.40.36.245",
   "name": "tlv-lt-0152.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0153",
   "internet_facing": false,
   "ip": "10.40.32.154",
   "name": "tlv-lt-0153.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0154",
   "internet_facing": false,
   "ip": "10.40.52.123",
   "name": "tlv-lt-0154.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0155",
   "internet_facing": false,
   "ip": "10.40.57.74",
   "name": "tlv-lt-0155.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0156",
   "internet_facing": false,
   "ip": "10.40.37.244",
   "name": "tlv-lt-0156.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0157",
   "internet_facing": false,
   "ip": "10.40.36.34",
   "name": "tlv-lt-0157.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0158",
   "internet_facing": false,
   "ip": "10.40.27.132",
   "name": "tlv-lt-0158.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0159",
   "internet_facing": false,
   "ip": "10.40.49.48",
   "name": "tlv-lt-0159.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0160",
   "internet_facing": false,
   "ip": "10.40.40.224",
   "name": "tlv-lt-0160.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0161",
   "internet_facing": false,
   "ip": "10.40.37.217",
   "name": "tlv-lt-0161.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0162",
   "internet_facing": false,
   "ip": "10.40.41.133",
   "name": "tlv-lt-0162.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0163",
   "internet_facing": false,
   "ip": "10.10.45.26",
   "name": "bos-lt-0163.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0164",
   "internet_facing": false,
   "ip": "10.10.38.218",
   "name": "bos-lt-0164.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0165",
   "internet_facing": false,
   "ip": "10.10.53.31",
   "name": "bos-lt-0165.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0166",
   "internet_facing": false,
   "ip": "10.10.43.12",
   "name": "bos-lt-0166.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0167",
   "internet_facing": false,
   "ip": "10.10.41.176",
   "name": "bos-lt-0167.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0168",
   "internet_facing": false,
   "ip": "10.10.50.50",
   "name": "bos-lt-0168.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0169",
   "internet_facing": false,
   "ip": "10.10.20.198",
   "name": "bos-lt-0169.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0170",
   "internet_facing": false,
   "ip": "10.10.44.228",
   "name": "bos-lt-0170.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0171",
   "internet_facing": false,
   "ip": "10.10.54.183",
   "name": "bos-lt-0171.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0172",
   "internet_facing": false,
   "ip": "10.10.55.107",
   "name": "bos-lt-0172.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0173",
   "internet_facing": false,
   "ip": "10.10.22.242",
   "name": "bos-lt-0173.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0174",
   "internet_facing": false,
   "ip": "10.10.44.84",
   "name": "bos-lt-0174.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0175",
   "internet_facing": false,
   "ip": "10.10.32.100",
   "name": "bos-lt-0175.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0176",
   "internet_facing": false,
   "ip": "10.10.59.208",
   "name": "bos-lt-0176.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0177",
   "internet_facing": false,
   "ip": "10.10.35.84",
   "name": "bos-lt-0177.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0178",
   "internet_facing": false,
   "ip": "10.10.45.187",
   "name": "bos-lt-0178.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0179",
   "internet_facing": false,
   "ip": "10.10.42.125",
   "name": "bos-lt-0179.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0180",
   "internet_facing": false,
   "ip": "10.10.58.79",
   "name": "bos-lt-0180.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0181",
   "internet_facing": false,
   "ip": "10.10.55.58",
   "name": "bos-lt-0181.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0182",
   "internet_facing": false,
   "ip": "10.10.39.135",
   "name": "bos-lt-0182.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0183",
   "internet_facing": false,
   "ip": "10.10.49.144",
   "name": "bos-lt-0183.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-12",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0184",
   "internet_facing": false,
   "ip": "10.10.56.22",
   "name": "bos-lt-0184.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0185",
   "internet_facing": false,
   "ip": "10.10.36.22",
   "name": "bos-lt-0185.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0186",
   "internet_facing": false,
   "ip": "10.10.27.77",
   "name": "bos-lt-0186.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0187",
   "internet_facing": false,
   "ip": "10.10.45.193",
   "name": "bos-lt-0187.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0188",
   "internet_facing": false,
   "ip": "10.20.48.46",
   "name": "dub-lt-0188.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0189",
   "internet_facing": false,
   "ip": "10.20.55.79",
   "name": "dub-lt-0189.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0190",
   "internet_facing": false,
   "ip": "10.20.39.72",
   "name": "dub-lt-0190.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0191",
   "internet_facing": false,
   "ip": "10.20.24.6",
   "name": "dub-lt-0191.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0192",
   "internet_facing": false,
   "ip": "10.20.42.43",
   "name": "dub-lt-0192.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0193",
   "internet_facing": false,
   "ip": "10.20.35.246",
   "name": "dub-lt-0193.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0194",
   "internet_facing": false,
   "ip": "10.20.58.54",
   "name": "dub-lt-0194.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0195",
   "internet_facing": false,
   "ip": "10.20.37.217",
   "name": "dub-lt-0195.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-05",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0196",
   "internet_facing": false,
   "ip": "10.20.49.201",
   "name": "dub-lt-0196.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0197",
   "internet_facing": false,
   "ip": "10.20.31.163",
   "name": "dub-lt-0197.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-14",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0198",
   "internet_facing": false,
   "ip": "10.20.26.241",
   "name": "dub-lt-0198.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0199",
   "internet_facing": false,
   "ip": "10.20.55.198",
   "name": "dub-lt-0199.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0200",
   "internet_facing": false,
   "ip": "10.20.41.120",
   "name": "dub-lt-0200.acme.example",
   "owner": "Engineering",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-13",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0201",
   "internet_facing": false,
   "ip": "10.20.42.79",
   "name": "dub-lt-0201.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0202",
   "internet_facing": false,
   "ip": "10.20.59.226",
   "name": "dub-lt-0202.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0203",
   "internet_facing": false,
   "ip": "10.50.23.40",
   "name": "rem-lt-0203.acme.example",
   "owner": "Engineering",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0204",
   "internet_facing": false,
   "ip": "10.50.42.199",
   "name": "rem-lt-0204.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0205",
   "internet_facing": false,
   "ip": "10.50.49.70",
   "name": "rem-lt-0205.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0206",
   "internet_facing": false,
   "ip": "10.50.24.196",
   "name": "rem-lt-0206.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0207",
   "internet_facing": false,
   "ip": "10.50.40.240",
   "name": "rem-lt-0207.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Engineering",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0208",
   "internet_facing": false,
   "ip": "10.50.32.126",
   "name": "rem-lt-0208.acme.example",
   "owner": "Engineering",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CICD"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0209",
   "internet_facing": false,
   "ip": "10.40.51.188",
   "name": "tlv-lt-0209.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0210",
   "internet_facing": false,
   "ip": "10.40.47.243",
   "name": "tlv-lt-0210.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0211",
   "internet_facing": false,
   "ip": "10.40.51.56",
   "name": "tlv-lt-0211.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0212",
   "internet_facing": false,
   "ip": "10.40.24.6",
   "name": "tlv-lt-0212.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0213",
   "internet_facing": false,
   "ip": "10.40.44.2",
   "name": "tlv-lt-0213.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0214",
   "internet_facing": false,
   "ip": "10.40.25.145",
   "name": "tlv-lt-0214.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0215",
   "internet_facing": false,
   "ip": "10.40.20.73",
   "name": "tlv-lt-0215.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0216",
   "internet_facing": false,
   "ip": "10.40.34.55",
   "name": "tlv-lt-0216.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0217",
   "internet_facing": false,
   "ip": "10.40.26.167",
   "name": "tlv-lt-0217.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0218",
   "internet_facing": false,
   "ip": "10.40.21.12",
   "name": "tlv-lt-0218.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0219",
   "internet_facing": false,
   "ip": "10.40.34.141",
   "name": "tlv-lt-0219.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0220",
   "internet_facing": false,
   "ip": "10.40.57.100",
   "name": "tlv-lt-0220.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0221",
   "internet_facing": false,
   "ip": "10.40.29.70",
   "name": "tlv-lt-0221.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0222",
   "internet_facing": false,
   "ip": "10.40.52.211",
   "name": "tlv-lt-0222.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0223",
   "internet_facing": false,
   "ip": "10.40.38.79",
   "name": "tlv-lt-0223.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0224",
   "internet_facing": false,
   "ip": "10.40.34.239",
   "name": "tlv-lt-0224.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0225",
   "internet_facing": false,
   "ip": "10.40.22.41",
   "name": "tlv-lt-0225.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0226",
   "internet_facing": false,
   "ip": "10.40.46.94",
   "name": "tlv-lt-0226.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0227",
   "internet_facing": false,
   "ip": "10.20.38.181",
   "name": "dub-lt-0227.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0228",
   "internet_facing": false,
   "ip": "10.20.33.167",
   "name": "dub-lt-0228.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0229",
   "internet_facing": false,
   "ip": "10.20.59.64",
   "name": "dub-lt-0229.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0230",
   "internet_facing": false,
   "ip": "10.20.45.61",
   "name": "dub-lt-0230.acme.example",
   "owner": "Threat Research",
   "platform": "Ubuntu 24.04",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0231",
   "internet_facing": false,
   "ip": "10.20.56.30",
   "name": "dub-lt-0231.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Threat Research",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0232",
   "internet_facing": false,
   "ip": "10.20.33.108",
   "name": "dub-lt-0232.acme.example",
   "owner": "Threat Research",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-TIP"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0233",
   "internet_facing": false,
   "ip": "10.10.44.202",
   "name": "bos-lt-0233.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0234",
   "internet_facing": false,
   "ip": "10.10.20.220",
   "name": "bos-lt-0234.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-01",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0235",
   "internet_facing": false,
   "ip": "10.10.36.3",
   "name": "bos-lt-0235.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0236",
   "internet_facing": false,
   "ip": "10.10.32.100",
   "name": "bos-lt-0236.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0237",
   "internet_facing": false,
   "ip": "10.10.26.220",
   "name": "bos-lt-0237.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0238",
   "internet_facing": false,
   "ip": "10.10.36.225",
   "name": "bos-lt-0238.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0239",
   "internet_facing": false,
   "ip": "10.10.20.123",
   "name": "bos-lt-0239.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0240",
   "internet_facing": false,
   "ip": "10.10.24.107",
   "name": "bos-lt-0240.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0241",
   "internet_facing": false,
   "ip": "10.10.22.148",
   "name": "bos-lt-0241.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0242",
   "internet_facing": false,
   "ip": "10.10.52.144",
   "name": "bos-lt-0242.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0243",
   "internet_facing": false,
   "ip": "10.10.20.124",
   "name": "bos-lt-0243.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0244",
   "internet_facing": false,
   "ip": "10.10.37.65",
   "name": "bos-lt-0244.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0245",
   "internet_facing": false,
   "ip": "10.10.29.121",
   "name": "bos-lt-0245.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0246",
   "internet_facing": false,
   "ip": "10.10.56.213",
   "name": "bos-lt-0246.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0247",
   "internet_facing": false,
   "ip": "10.10.29.153",
   "name": "bos-lt-0247.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0248",
   "internet_facing": false,
   "ip": "10.10.40.136",
   "name": "bos-lt-0248.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0249",
   "internet_facing": false,
   "ip": "10.10.39.101",
   "name": "bos-lt-0249.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0250",
   "internet_facing": false,
   "ip": "10.10.49.197",
   "name": "bos-lt-0250.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0251",
   "internet_facing": false,
   "ip": "10.10.58.50",
   "name": "bos-lt-0251.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0252",
   "internet_facing": false,
   "ip": "10.10.26.175",
   "name": "bos-lt-0252.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0253",
   "internet_facing": false,
   "ip": "10.10.50.217",
   "name": "bos-lt-0253.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0254",
   "internet_facing": false,
   "ip": "10.10.36.138",
   "name": "bos-lt-0254.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0255",
   "internet_facing": false,
   "ip": "10.20.59.43",
   "name": "dub-lt-0255.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0256",
   "internet_facing": false,
   "ip": "10.20.39.199",
   "name": "dub-lt-0256.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0257",
   "internet_facing": false,
   "ip": "10.20.40.140",
   "name": "dub-lt-0257.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0258",
   "internet_facing": false,
   "ip": "10.20.38.151",
   "name": "dub-lt-0258.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0259",
   "internet_facing": false,
   "ip": "10.20.39.14",
   "name": "dub-lt-0259.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0260",
   "internet_facing": false,
   "ip": "10.20.29.213",
   "name": "dub-lt-0260.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0261",
   "internet_facing": false,
   "ip": "10.20.29.30",
   "name": "dub-lt-0261.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0262",
   "internet_facing": false,
   "ip": "10.20.32.16",
   "name": "dub-lt-0262.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0263",
   "internet_facing": false,
   "ip": "10.20.54.73",
   "name": "dub-lt-0263.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0264",
   "internet_facing": false,
   "ip": "10.20.49.41",
   "name": "dub-lt-0264.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0265",
   "internet_facing": false,
   "ip": "10.20.40.146",
   "name": "dub-lt-0265.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0266",
   "internet_facing": false,
   "ip": "10.20.46.24",
   "name": "dub-lt-0266.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0267",
   "internet_facing": false,
   "ip": "10.20.22.45",
   "name": "dub-lt-0267.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0268",
   "internet_facing": false,
   "ip": "10.20.26.32",
   "name": "dub-lt-0268.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0269",
   "internet_facing": false,
   "ip": "10.20.24.244",
   "name": "dub-lt-0269.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0270",
   "internet_facing": false,
   "ip": "10.20.59.43",
   "name": "dub-lt-0270.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0271",
   "internet_facing": false,
   "ip": "10.20.36.84",
   "name": "dub-lt-0271.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0272",
   "internet_facing": false,
   "ip": "10.20.32.95",
   "name": "dub-lt-0272.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0273",
   "internet_facing": false,
   "ip": "10.20.22.158",
   "name": "dub-lt-0273.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0274",
   "internet_facing": false,
   "ip": "10.20.37.247",
   "name": "dub-lt-0274.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0275",
   "internet_facing": false,
   "ip": "10.20.49.232",
   "name": "dub-lt-0275.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0276",
   "internet_facing": false,
   "ip": "10.20.56.161",
   "name": "dub-lt-0276.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0277",
   "internet_facing": false,
   "ip": "10.20.48.190",
   "name": "dub-lt-0277.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0278",
   "internet_facing": false,
   "ip": "10.20.45.207",
   "name": "dub-lt-0278.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0279",
   "internet_facing": false,
   "ip": "10.50.24.183",
   "name": "rem-lt-0279.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0280",
   "internet_facing": false,
   "ip": "10.50.39.161",
   "name": "rem-lt-0280.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0281",
   "internet_facing": false,
   "ip": "10.50.38.76",
   "name": "rem-lt-0281.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0282",
   "internet_facing": false,
   "ip": "10.50.45.194",
   "name": "rem-lt-0282.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0283",
   "internet_facing": false,
   "ip": "10.50.43.109",
   "name": "rem-lt-0283.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-10",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0284",
   "internet_facing": false,
   "ip": "10.50.50.88",
   "name": "rem-lt-0284.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0285",
   "internet_facing": false,
   "ip": "10.50.28.66",
   "name": "rem-lt-0285.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0286",
   "internet_facing": false,
   "ip": "10.50.50.56",
   "name": "rem-lt-0286.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0287",
   "internet_facing": false,
   "ip": "10.50.53.231",
   "name": "rem-lt-0287.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0288",
   "internet_facing": false,
   "ip": "10.50.42.142",
   "name": "rem-lt-0288.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0289",
   "internet_facing": false,
   "ip": "10.50.31.236",
   "name": "rem-lt-0289.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0290",
   "internet_facing": false,
   "ip": "10.50.60.107",
   "name": "rem-lt-0290.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0291",
   "internet_facing": false,
   "ip": "10.50.41.140",
   "name": "rem-lt-0291.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0292",
   "internet_facing": false,
   "ip": "10.50.40.106",
   "name": "rem-lt-0292.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0293",
   "internet_facing": false,
   "ip": "10.50.42.58",
   "name": "rem-lt-0293.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0294",
   "internet_facing": false,
   "ip": "10.50.45.181",
   "name": "rem-lt-0294.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0295",
   "internet_facing": false,
   "ip": "10.50.49.102",
   "name": "rem-lt-0295.acme.example",
   "owner": "Professional Services",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Professional Services",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0296",
   "internet_facing": false,
   "ip": "10.50.32.120",
   "name": "rem-lt-0296.acme.example",
   "owner": "Professional Services",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-PS"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-04",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0297",
   "internet_facing": false,
   "ip": "10.10.31.86",
   "name": "bos-lt-0297.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0298",
   "internet_facing": false,
   "ip": "10.10.27.228",
   "name": "bos-lt-0298.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0299",
   "internet_facing": false,
   "ip": "10.10.42.227",
   "name": "bos-lt-0299.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0300",
   "internet_facing": false,
   "ip": "10.10.45.166",
   "name": "bos-lt-0300.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0301",
   "internet_facing": false,
   "ip": "10.10.35.194",
   "name": "bos-lt-0301.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0302",
   "internet_facing": false,
   "ip": "10.10.27.231",
   "name": "bos-lt-0302.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0303",
   "internet_facing": false,
   "ip": "10.10.46.91",
   "name": "bos-lt-0303.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0304",
   "internet_facing": false,
   "ip": "10.10.57.222",
   "name": "bos-lt-0304.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-19",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0305",
   "internet_facing": false,
   "ip": "10.10.56.93",
   "name": "bos-lt-0305.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0306",
   "internet_facing": false,
   "ip": "10.10.47.162",
   "name": "bos-lt-0306.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0307",
   "internet_facing": false,
   "ip": "10.10.23.76",
   "name": "bos-lt-0307.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0308",
   "internet_facing": false,
   "ip": "10.10.46.35",
   "name": "bos-lt-0308.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0309",
   "internet_facing": false,
   "ip": "10.10.42.15",
   "name": "bos-lt-0309.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0310",
   "internet_facing": false,
   "ip": "10.10.40.54",
   "name": "bos-lt-0310.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0311",
   "internet_facing": false,
   "ip": "10.10.55.94",
   "name": "bos-lt-0311.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0312",
   "internet_facing": false,
   "ip": "10.10.51.122",
   "name": "bos-lt-0312.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0313",
   "internet_facing": false,
   "ip": "10.10.49.142",
   "name": "bos-lt-0313.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0314",
   "internet_facing": false,
   "ip": "10.10.29.41",
   "name": "bos-lt-0314.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0315",
   "internet_facing": false,
   "ip": "10.10.33.17",
   "name": "bos-lt-0315.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0316",
   "internet_facing": false,
   "ip": "10.10.56.131",
   "name": "bos-lt-0316.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0317",
   "internet_facing": false,
   "ip": "10.10.49.198",
   "name": "bos-lt-0317.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0318",
   "internet_facing": false,
   "ip": "10.10.25.121",
   "name": "bos-lt-0318.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0319",
   "internet_facing": false,
   "ip": "10.10.53.123",
   "name": "bos-lt-0319.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0320",
   "internet_facing": false,
   "ip": "10.10.54.96",
   "name": "bos-lt-0320.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0321",
   "internet_facing": false,
   "ip": "10.10.35.99",
   "name": "bos-lt-0321.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0322",
   "internet_facing": false,
   "ip": "10.10.36.108",
   "name": "bos-lt-0322.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0323",
   "internet_facing": false,
   "ip": "10.10.31.136",
   "name": "bos-lt-0323.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0324",
   "internet_facing": false,
   "ip": "10.10.28.35",
   "name": "bos-lt-0324.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0325",
   "internet_facing": false,
   "ip": "10.10.25.128",
   "name": "bos-lt-0325.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0326",
   "internet_facing": false,
   "ip": "10.10.48.38",
   "name": "bos-lt-0326.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0327",
   "internet_facing": false,
   "ip": "10.10.36.41",
   "name": "bos-lt-0327.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0328",
   "internet_facing": false,
   "ip": "10.10.27.232",
   "name": "bos-lt-0328.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0329",
   "internet_facing": false,
   "ip": "10.10.31.135",
   "name": "bos-lt-0329.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0330",
   "internet_facing": false,
   "ip": "10.10.59.139",
   "name": "bos-lt-0330.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0331",
   "internet_facing": false,
   "ip": "10.10.35.138",
   "name": "bos-lt-0331.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0332",
   "internet_facing": false,
   "ip": "10.10.55.153",
   "name": "bos-lt-0332.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0333",
   "internet_facing": false,
   "ip": "10.20.51.67",
   "name": "dub-lt-0333.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0334",
   "internet_facing": false,
   "ip": "10.20.40.164",
   "name": "dub-lt-0334.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0335",
   "internet_facing": false,
   "ip": "10.20.32.24",
   "name": "dub-lt-0335.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0336",
   "internet_facing": false,
   "ip": "10.20.31.129",
   "name": "dub-lt-0336.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0337",
   "internet_facing": false,
   "ip": "10.20.32.162",
   "name": "dub-lt-0337.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0338",
   "internet_facing": false,
   "ip": "10.20.34.196",
   "name": "dub-lt-0338.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0339",
   "internet_facing": false,
   "ip": "10.20.44.43",
   "name": "dub-lt-0339.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0340",
   "internet_facing": false,
   "ip": "10.20.52.73",
   "name": "dub-lt-0340.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0341",
   "internet_facing": false,
   "ip": "10.20.40.24",
   "name": "dub-lt-0341.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0342",
   "internet_facing": false,
   "ip": "10.20.58.213",
   "name": "dub-lt-0342.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0343",
   "internet_facing": false,
   "ip": "10.20.55.73",
   "name": "dub-lt-0343.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0344",
   "internet_facing": false,
   "ip": "10.20.32.155",
   "name": "dub-lt-0344.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0345",
   "internet_facing": false,
   "ip": "10.20.44.42",
   "name": "dub-lt-0345.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0346",
   "internet_facing": false,
   "ip": "10.20.39.103",
   "name": "dub-lt-0346.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0347",
   "internet_facing": false,
   "ip": "10.30.24.164",
   "name": "sin-lt-0347.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0348",
   "internet_facing": false,
   "ip": "10.30.21.107",
   "name": "sin-lt-0348.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0349",
   "internet_facing": false,
   "ip": "10.30.28.130",
   "name": "sin-lt-0349.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0350",
   "internet_facing": false,
   "ip": "10.30.46.14",
   "name": "sin-lt-0350.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0351",
   "internet_facing": false,
   "ip": "10.30.31.15",
   "name": "sin-lt-0351.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0352",
   "internet_facing": false,
   "ip": "10.30.25.81",
   "name": "sin-lt-0352.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0353",
   "internet_facing": false,
   "ip": "10.30.31.94",
   "name": "sin-lt-0353.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0354",
   "internet_facing": false,
   "ip": "10.30.22.103",
   "name": "sin-lt-0354.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0355",
   "internet_facing": false,
   "ip": "10.30.32.88",
   "name": "sin-lt-0355.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0356",
   "internet_facing": false,
   "ip": "10.30.22.11",
   "name": "sin-lt-0356.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0357",
   "internet_facing": false,
   "ip": "10.30.37.183",
   "name": "sin-lt-0357.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0358",
   "internet_facing": false,
   "ip": "10.30.28.68",
   "name": "sin-lt-0358.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0359",
   "internet_facing": false,
   "ip": "10.30.38.225",
   "name": "sin-lt-0359.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0360",
   "internet_facing": false,
   "ip": "10.30.60.48",
   "name": "sin-lt-0360.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0361",
   "internet_facing": false,
   "ip": "10.30.25.151",
   "name": "sin-lt-0361.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0362",
   "internet_facing": false,
   "ip": "10.30.25.151",
   "name": "sin-lt-0362.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0363",
   "internet_facing": false,
   "ip": "10.30.40.38",
   "name": "sin-lt-0363.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0364",
   "internet_facing": false,
   "ip": "10.30.44.114",
   "name": "sin-lt-0364.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0365",
   "internet_facing": false,
   "ip": "10.30.36.201",
   "name": "sin-lt-0365.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0366",
   "internet_facing": false,
   "ip": "10.30.34.237",
   "name": "sin-lt-0366.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0367",
   "internet_facing": false,
   "ip": "10.30.33.229",
   "name": "sin-lt-0367.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0368",
   "internet_facing": false,
   "ip": "10.30.40.155",
   "name": "sin-lt-0368.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0369",
   "internet_facing": false,
   "ip": "10.30.30.165",
   "name": "sin-lt-0369.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0370",
   "internet_facing": false,
   "ip": "10.30.42.121",
   "name": "sin-lt-0370.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0371",
   "internet_facing": false,
   "ip": "10.30.31.64",
   "name": "sin-lt-0371.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0372",
   "internet_facing": false,
   "ip": "10.30.40.4",
   "name": "sin-lt-0372.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0373",
   "internet_facing": false,
   "ip": "10.50.22.94",
   "name": "rem-lt-0373.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0374",
   "internet_facing": false,
   "ip": "10.50.23.39",
   "name": "rem-lt-0374.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0375",
   "internet_facing": false,
   "ip": "10.50.52.36",
   "name": "rem-lt-0375.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0376",
   "internet_facing": false,
   "ip": "10.50.25.30",
   "name": "rem-lt-0376.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0377",
   "internet_facing": false,
   "ip": "10.50.34.90",
   "name": "rem-lt-0377.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0378",
   "internet_facing": false,
   "ip": "10.50.49.56",
   "name": "rem-lt-0378.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-11",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0379",
   "internet_facing": false,
   "ip": "10.50.43.159",
   "name": "rem-lt-0379.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0380",
   "internet_facing": false,
   "ip": "10.50.52.39",
   "name": "rem-lt-0380.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0381",
   "internet_facing": false,
   "ip": "10.50.40.110",
   "name": "rem-lt-0381.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0382",
   "internet_facing": false,
   "ip": "10.50.50.136",
   "name": "rem-lt-0382.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0383",
   "internet_facing": false,
   "ip": "10.50.36.220",
   "name": "rem-lt-0383.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0384",
   "internet_facing": false,
   "ip": "10.50.48.105",
   "name": "rem-lt-0384.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0385",
   "internet_facing": false,
   "ip": "10.50.20.106",
   "name": "rem-lt-0385.acme.example",
   "owner": "Sales",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Sales",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0386",
   "internet_facing": false,
   "ip": "10.50.43.220",
   "name": "rem-lt-0386.acme.example",
   "owner": "Sales",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-CRM"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0387",
   "internet_facing": false,
   "ip": "10.10.56.23",
   "name": "bos-lt-0387.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-11",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0388",
   "internet_facing": false,
   "ip": "10.10.20.151",
   "name": "bos-lt-0388.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0389",
   "internet_facing": false,
   "ip": "10.10.32.75",
   "name": "bos-lt-0389.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0390",
   "internet_facing": false,
   "ip": "10.10.56.113",
   "name": "bos-lt-0390.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0391",
   "internet_facing": false,
   "ip": "10.10.50.29",
   "name": "bos-lt-0391.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": false,
   "environment": "corp",
   "id": "EP-BOS-0392",
   "internet_facing": false,
   "ip": "10.10.48.159",
   "name": "bos-lt-0392.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-09",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0393",
   "internet_facing": false,
   "ip": "10.10.20.158",
   "name": "bos-lt-0393.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0394",
   "internet_facing": false,
   "ip": "10.10.52.172",
   "name": "bos-lt-0394.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0395",
   "internet_facing": false,
   "ip": "10.10.39.72",
   "name": "bos-lt-0395.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0396",
   "internet_facing": false,
   "ip": "10.10.39.183",
   "name": "bos-lt-0396.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": false,
   "environment": "corp",
   "id": "EP-BOS-0397",
   "internet_facing": false,
   "ip": "10.10.48.170",
   "name": "bos-lt-0397.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-04",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0398",
   "internet_facing": false,
   "ip": "10.10.30.233",
   "name": "bos-lt-0398.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0399",
   "internet_facing": false,
   "ip": "10.10.56.226",
   "name": "bos-lt-0399.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-08",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0400",
   "internet_facing": false,
   "ip": "10.10.53.244",
   "name": "bos-lt-0400.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0401",
   "internet_facing": false,
   "ip": "10.10.51.6",
   "name": "bos-lt-0401.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0402",
   "internet_facing": false,
   "ip": "10.10.29.87",
   "name": "bos-lt-0402.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0403",
   "internet_facing": false,
   "ip": "10.10.57.224",
   "name": "bos-lt-0403.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-17",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0404",
   "internet_facing": false,
   "ip": "10.10.37.135",
   "name": "bos-lt-0404.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0405",
   "internet_facing": false,
   "ip": "10.20.51.193",
   "name": "dub-lt-0405.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0406",
   "internet_facing": false,
   "ip": "10.20.60.16",
   "name": "dub-lt-0406.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0407",
   "internet_facing": false,
   "ip": "10.20.47.145",
   "name": "dub-lt-0407.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0408",
   "internet_facing": false,
   "ip": "10.20.31.204",
   "name": "dub-lt-0408.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0409",
   "internet_facing": false,
   "ip": "10.20.29.232",
   "name": "dub-lt-0409.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "Finance",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0410",
   "internet_facing": false,
   "ip": "10.20.60.134",
   "name": "dub-lt-0410.acme.example",
   "owner": "Finance",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-FIN"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0411",
   "internet_facing": false,
   "ip": "10.10.29.184",
   "name": "bos-lt-0411.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0412",
   "internet_facing": false,
   "ip": "10.10.60.121",
   "name": "bos-lt-0412.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0413",
   "internet_facing": false,
   "ip": "10.10.59.188",
   "name": "bos-lt-0413.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0414",
   "internet_facing": false,
   "ip": "10.10.30.24",
   "name": "bos-lt-0414.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0415",
   "internet_facing": false,
   "ip": "10.10.41.219",
   "name": "bos-lt-0415.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0416",
   "internet_facing": false,
   "ip": "10.10.50.165",
   "name": "bos-lt-0416.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0417",
   "internet_facing": false,
   "ip": "10.10.39.240",
   "name": "bos-lt-0417.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0418",
   "internet_facing": false,
   "ip": "10.10.35.105",
   "name": "bos-lt-0418.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0419",
   "internet_facing": false,
   "ip": "10.10.49.126",
   "name": "bos-lt-0419.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0420",
   "internet_facing": false,
   "ip": "10.10.42.234",
   "name": "bos-lt-0420.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0421",
   "internet_facing": false,
   "ip": "10.20.60.98",
   "name": "dub-lt-0421.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0422",
   "internet_facing": false,
   "ip": "10.20.52.120",
   "name": "dub-lt-0422.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "People & HR",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0423",
   "internet_facing": false,
   "ip": "10.20.43.144",
   "name": "dub-lt-0423.acme.example",
   "owner": "People & HR",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT",
    "SVC-IAM"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0424",
   "internet_facing": false,
   "ip": "10.10.52.76",
   "name": "bos-lt-0424.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0425",
   "internet_facing": false,
   "ip": "10.10.49.74",
   "name": "bos-lt-0425.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0426",
   "internet_facing": false,
   "ip": "10.10.25.40",
   "name": "bos-lt-0426.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0427",
   "internet_facing": false,
   "ip": "10.10.25.163",
   "name": "bos-lt-0427.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0428",
   "internet_facing": false,
   "ip": "10.10.46.184",
   "name": "bos-lt-0428.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0429",
   "internet_facing": false,
   "ip": "10.10.36.58",
   "name": "bos-lt-0429.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0430",
   "internet_facing": false,
   "ip": "10.10.21.183",
   "name": "bos-lt-0430.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0431",
   "internet_facing": false,
   "ip": "10.10.44.79",
   "name": "bos-lt-0431.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0432",
   "internet_facing": false,
   "ip": "10.10.43.221",
   "name": "bos-lt-0432.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0433",
   "internet_facing": false,
   "ip": "10.10.51.43",
   "name": "bos-lt-0433.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-18",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0434",
   "internet_facing": false,
   "ip": "10.10.29.158",
   "name": "bos-lt-0434.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0435",
   "internet_facing": false,
   "ip": "10.10.57.48",
   "name": "bos-lt-0435.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0436",
   "internet_facing": false,
   "ip": "10.10.34.162",
   "name": "bos-lt-0436.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0437",
   "internet_facing": false,
   "ip": "10.10.33.129",
   "name": "bos-lt-0437.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-19",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0438",
   "internet_facing": false,
   "ip": "10.10.26.6",
   "name": "bos-lt-0438.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0439",
   "internet_facing": false,
   "ip": "10.10.43.222",
   "name": "bos-lt-0439.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0440",
   "internet_facing": false,
   "ip": "10.10.50.44",
   "name": "bos-lt-0440.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0441",
   "internet_facing": false,
   "ip": "10.10.21.56",
   "name": "bos-lt-0441.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0442",
   "internet_facing": false,
   "ip": "10.10.50.237",
   "name": "bos-lt-0442.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0443",
   "internet_facing": false,
   "ip": "10.10.40.151",
   "name": "bos-lt-0443.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0444",
   "internet_facing": false,
   "ip": "10.10.26.120",
   "name": "bos-lt-0444.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0445",
   "internet_facing": false,
   "ip": "10.10.54.43",
   "name": "bos-lt-0445.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0446",
   "internet_facing": false,
   "ip": "10.20.55.189",
   "name": "dub-lt-0446.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-11",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0447",
   "internet_facing": false,
   "ip": "10.20.54.215",
   "name": "dub-lt-0447.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-14",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0448",
   "internet_facing": false,
   "ip": "10.20.44.178",
   "name": "dub-lt-0448.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-11",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0449",
   "internet_facing": false,
   "ip": "10.20.55.227",
   "name": "dub-lt-0449.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0450",
   "internet_facing": false,
   "ip": "10.20.40.133",
   "name": "dub-lt-0450.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0451",
   "internet_facing": false,
   "ip": "10.20.45.173",
   "name": "dub-lt-0451.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0452",
   "internet_facing": false,
   "ip": "10.20.55.165",
   "name": "dub-lt-0452.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0453",
   "internet_facing": false,
   "ip": "10.30.57.61",
   "name": "sin-lt-0453.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0454",
   "internet_facing": false,
   "ip": "10.30.51.154",
   "name": "sin-lt-0454.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0455",
   "internet_facing": false,
   "ip": "10.30.20.50",
   "name": "sin-lt-0455.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-13",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0456",
   "internet_facing": false,
   "ip": "10.30.23.131",
   "name": "sin-lt-0456.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0457",
   "internet_facing": false,
   "ip": "10.30.47.6",
   "name": "sin-lt-0457.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0458",
   "internet_facing": false,
   "ip": "10.30.47.7",
   "name": "sin-lt-0458.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0459",
   "internet_facing": false,
   "ip": "10.40.50.140",
   "name": "tlv-lt-0459.acme.example",
   "owner": "IT & Security",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-22",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "high",
   "department": "IT & Security",
   "edr": true,
   "environment": "corp",
   "id": "EP-TLV-0460",
   "internet_facing": false,
   "ip": "10.40.22.138",
   "name": "tlv-lt-0460.acme.example",
   "owner": "IT & Security",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "TLV",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0461",
   "internet_facing": false,
   "ip": "10.10.27.188",
   "name": "bos-lt-0461.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0462",
   "internet_facing": false,
   "ip": "10.10.28.216",
   "name": "bos-lt-0462.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0463",
   "internet_facing": false,
   "ip": "10.10.42.195",
   "name": "bos-lt-0463.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0464",
   "internet_facing": false,
   "ip": "10.10.49.149",
   "name": "bos-lt-0464.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-18",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0465",
   "internet_facing": false,
   "ip": "10.10.57.120",
   "name": "bos-lt-0465.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0466",
   "internet_facing": false,
   "ip": "10.10.54.125",
   "name": "bos-lt-0466.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0467",
   "internet_facing": false,
   "ip": "10.10.25.107",
   "name": "bos-lt-0467.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0468",
   "internet_facing": false,
   "ip": "10.10.57.105",
   "name": "bos-lt-0468.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0469",
   "internet_facing": false,
   "ip": "10.10.24.153",
   "name": "bos-lt-0469.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0470",
   "internet_facing": false,
   "ip": "10.10.33.155",
   "name": "bos-lt-0470.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": false,
   "environment": "corp",
   "id": "EP-BOS-0471",
   "internet_facing": false,
   "ip": "10.10.58.52",
   "name": "bos-lt-0471.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0472",
   "internet_facing": false,
   "ip": "10.10.49.176",
   "name": "bos-lt-0472.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0473",
   "internet_facing": false,
   "ip": "10.10.29.112",
   "name": "bos-lt-0473.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0474",
   "internet_facing": false,
   "ip": "10.10.59.45",
   "name": "bos-lt-0474.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0475",
   "internet_facing": false,
   "ip": "10.10.56.59",
   "name": "bos-lt-0475.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0476",
   "internet_facing": false,
   "ip": "10.10.58.176",
   "name": "bos-lt-0476.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0477",
   "internet_facing": false,
   "ip": "10.10.34.174",
   "name": "bos-lt-0477.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0478",
   "internet_facing": false,
   "ip": "10.10.56.7",
   "name": "bos-lt-0478.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0479",
   "internet_facing": false,
   "ip": "10.10.51.248",
   "name": "bos-lt-0479.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-11",
    "status": "stale"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0480",
   "internet_facing": false,
   "ip": "10.10.22.22",
   "name": "bos-lt-0480.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0481",
   "internet_facing": false,
   "ip": "10.10.41.136",
   "name": "bos-lt-0481.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": null,
    "status": "not_collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0482",
   "internet_facing": false,
   "ip": "10.10.44.120",
   "name": "bos-lt-0482.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0483",
   "internet_facing": false,
   "ip": "10.10.41.78",
   "name": "bos-lt-0483.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0484",
   "internet_facing": false,
   "ip": "10.10.33.111",
   "name": "bos-lt-0484.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-25",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0485",
   "internet_facing": false,
   "ip": "10.10.26.209",
   "name": "bos-lt-0485.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0486",
   "internet_facing": false,
   "ip": "10.10.56.10",
   "name": "bos-lt-0486.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-BOS-0487",
   "internet_facing": false,
   "ip": "10.10.43.184",
   "name": "bos-lt-0487.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "BOS",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-21",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0488",
   "internet_facing": false,
   "ip": "10.20.59.198",
   "name": "dub-lt-0488.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0489",
   "internet_facing": false,
   "ip": "10.20.40.92",
   "name": "dub-lt-0489.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0490",
   "internet_facing": false,
   "ip": "10.20.56.47",
   "name": "dub-lt-0490.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0491",
   "internet_facing": false,
   "ip": "10.20.58.166",
   "name": "dub-lt-0491.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-DUB-0492",
   "internet_facing": false,
   "ip": "10.20.55.22",
   "name": "dub-lt-0492.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "DUB",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0493",
   "internet_facing": false,
   "ip": "10.30.55.46",
   "name": "sin-lt-0493.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-26",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0494",
   "internet_facing": false,
   "ip": "10.30.25.224",
   "name": "sin-lt-0494.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-30",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0495",
   "internet_facing": false,
   "ip": "10.30.38.14",
   "name": "sin-lt-0495.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-24",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-SIN-0496",
   "internet_facing": false,
   "ip": "10.30.32.137",
   "name": "sin-lt-0496.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-28",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0497",
   "internet_facing": false,
   "ip": "10.30.46.238",
   "name": "sin-lt-0497.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-23",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": false,
   "environment": "corp",
   "id": "EP-SIN-0498",
   "internet_facing": false,
   "ip": "10.30.26.184",
   "name": "sin-lt-0498.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "SIN",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-27",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0499",
   "internet_facing": false,
   "ip": "10.50.20.233",
   "name": "rem-lt-0499.acme.example",
   "owner": "Executive & G&A",
   "platform": "macOS 15",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-29",
    "status": "collected"
   }
  },
  {
   "class": "endpoint",
   "cloud": null,
   "criticality": "medium",
   "department": "Executive & G&A",
   "edr": true,
   "environment": "corp",
   "id": "EP-REM-0500",
   "internet_facing": false,
   "ip": "10.50.58.195",
   "name": "rem-lt-0500.acme.example",
   "owner": "Executive & G&A",
   "platform": "Windows 11",
   "service_ids": [
    "SVC-IT"
   ],
   "site": "REM",
   "subtype": "laptop",
   "triage": {
    "collector": "IRTriage.exe (basic profile)",
    "last_collected": "2026-09-20",
    "status": "collected"
   }
  }
 ],
 "bia_policies": [
  {
   "cadence": "Monthly, continuous",
   "id": "POL-B01",
   "owner": "COO",
   "slo_links": [
    {
     "slo_id": "SLO-SLA",
     "weight": 0.052
    },
    {
     "slo_id": "SLO-GRR",
     "weight": 0.0053
    },
    {
     "slo_id": "SLO-NRR",
     "weight": 0.0084
    },
    {
     "slo_id": "SLO-NPS",
     "weight": 0.0528
    },
    {
     "slo_id": "SLO-ARR",
     "weight": 0.0102
    }
   ],
   "statement": "Detect P1 threats within 15 min and respond within 60 min for every MDR customer, every month.",
   "title": "Meet MDR contractual SLAs every month"
  },
  {
   "cadence": "Monthly",
   "id": "POL-B02",
   "owner": "CTO",
   "slo_links": [
    {
     "slo_id": "SLO-SLA",
     "weight": 0.039
    },
    {
     "slo_id": "SLO-GRR",
     "weight": 0.0027
    },
    {
     "slo_id": "SLO-NPS",
     "weight": 0.036
    },
    {
     "slo_id": "SLO-ARR",
     "weight": 0.0068
    },
    {
     "slo_id": "SLO-NEWARR",
     "weight": 0.0152
    }
   ],
   "statement": "Portal, TIP API and website available at least 99.95% each month; degradations communicated within 30 min.",
   "title": "Keep customer-facing platforms available"
  },
  {
   "cadence": "Per renewal, quarterly review",
   "id": "POL-B03",
   "owner": "CRO (Revenue)",
   "slo_links": [
    {
     "slo_id": "SLO-GRR",
     "weight": 0.0159
    },
    {
     "slo_id": "SLO-NRR",
     "weight": 0.0308
    },
    {
     "slo_id": "SLO-ARR",
     "weight": 0.0272
    }
   ],
   "statement": "Hold a QBR at least 60 days before every renewal; resolve open security and service issues before the renewal date.",
   "title": "Renew at least 95% of contracts at term"
  },
  {
   "cadence": "Quarterly",
   "id": "POL-B04",
   "owner": "CRO (Revenue)",
   "slo_links": [
    {
     "slo_id": "SLO-NEWARR",
     "weight": 0.133
    },
    {
     "slo_id": "SLO-ARR",
     "weight": 0.0204
    }
   ],
   "statement": "Keep pipeline at three times the quarterly bookings target; website and CRM must be available for lead capture.",
   "title": "Generate 3x pipeline coverage every quarter"
  },
  {
   "cadence": "Continuous",
   "id": "POL-B05",
   "owner": "General Counsel",
   "slo_links": [
    {
     "slo_id": "SLO-GRR",
     "weight": 0.0085
    },
    {
     "slo_id": "SLO-NRR",
     "weight": 0.014
    },
    {
     "slo_id": "SLO-ARR",
     "weight": 0.0204
    },
    {
     "slo_id": "SLO-TRUST",
     "weight": 0.075
    },
    {
     "slo_id": "SLO-NPS",
     "weight": 0.0432
    },
    {
     "slo_id": "SLO-NEWARR",
     "weight": 0.0304
    }
   ],
   "statement": "Zero reportable customer-data breaches; any suspected breach assessed within 24 h and notified within 72 h (GDPR Art. 33).",
   "title": "Protect customer data"
  },
  {
   "cadence": "Weekly; Q2 milestone",
   "id": "POL-B06",
   "owner": "CTO",
   "slo_links": [
    {
     "slo_id": "SLO-NEWARR",
     "weight": 0.0684
    },
    {
     "slo_id": "SLO-ARR",
     "weight": 0.0102
    },
    {
     "slo_id": "SLO-TRUST",
     "weight": 0.03
    }
   ],
   "statement": "Every production release is signed and carries an SBOM; EU sovereign MDR region generally available by end of Q2 FY27.",
   "title": "Ship signed, attested releases every week"
  },
  {
   "cadence": "Monthly",
   "id": "POL-B07",
   "owner": "CFO",
   "slo_links": [
    {
     "slo_id": "SLO-MARGIN",
     "weight": 0.006
    }
   ],
   "statement": "Invoices issued within 2 days of period end at 99.5% accuracy; DSO at or below 45 days.",
   "title": "Bill accurately and collect within 45 days"
  },
  {
   "cadence": "Monthly; annual QSA audit",
   "id": "POL-B08",
   "owner": "CFO",
   "slo_links": [
    {
     "slo_id": "SLO-MARGIN",
     "weight": 0.003
    },
    {
     "slo_id": "SLO-TRUST",
     "weight": 0.05
    }
   ],
   "statement": "Month-end close within 6 business days; card payments only through PCI DSS 4.0 compliant flows.",
   "title": "Close the books in 6 days; keep payments PCI compliant"
  },
  {
   "cadence": "Daily; quarterly review",
   "id": "POL-B09",
   "owner": "CISO",
   "slo_links": [
    {
     "slo_id": "SLO-TRUST",
     "weight": 0.0625
    },
    {
     "slo_id": "SLO-MARGIN",
     "weight": 0.0012
    }
   ],
   "statement": "Access granted by role, privileged access reviewed quarterly, leaver access removed within 24 h.",
   "title": "Least-privilege access, leavers removed within 24 h"
  },
  {
   "cadence": "Per engagement",
   "id": "POL-B10",
   "owner": "COO",
   "slo_links": [
    {
     "slo_id": "SLO-SLA",
     "weight": 0.0156
    },
    {
     "slo_id": "SLO-NRR",
     "weight": 0.0084
    },
    {
     "slo_id": "SLO-NPS",
     "weight": 0.0192
    }
   ],
   "statement": "For every retainer customer, a qualified responder engages within 2 h of the call, 24x7.",
   "title": "Engage an IR responder within 2 h"
  },
  {
   "cadence": "Continuous",
   "id": "POL-B11",
   "owner": "CTO",
   "slo_links": [
    {
     "slo_id": "SLO-SLA",
     "weight": 0.0104
    },
    {
     "slo_id": "SLO-NRR",
     "weight": 0.0084
    },
    {
     "slo_id": "SLO-ARR",
     "weight": 0.0068
    }
   ],
   "statement": "Curated intelligence reaches TIP customers within 30 min of validation, with integrity checks on every feed.",
   "title": "Publish validated intelligence within 30 min"
  },
  {
   "cadence": "Monthly",
   "id": "POL-B12",
   "owner": "CFO",
   "slo_links": [
    {
     "slo_id": "SLO-MARGIN",
     "weight": 0.0072
    }
   ],
   "statement": "Billable utilisation at least 75%; unplanned operating cost (including incidents) within 1% of plan.",
   "title": "Keep utilisation at 75% and costs within plan"
  },
  {
   "cadence": "Quarterly test; on incident",
   "id": "POL-B13",
   "owner": "COO",
   "slo_links": [
    {
     "slo_id": "SLO-SLA",
     "weight": 0.013
    },
    {
     "slo_id": "SLO-MARGIN",
     "weight": 0.0024
    },
    {
     "slo_id": "SLO-GRR",
     "weight": 0.0021
    }
   ],
   "statement": "Tier-1 services restored within RTO from immutable backups; recovery tested every quarter.",
   "title": "Recover every tier-1 service within its RTO"
  }
 ],
 "bp_components": [
  {
   "asset_ids": [
    "SEC-PAM",
    "SEC-SIEM"
   ],
   "category": "people",
   "headcount": 4,
   "id": "PPL-CISO",
   "name": "CISO & security leadership",
   "owner": "CISO"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "SOC Operations"
   },
   "category": "people",
   "headcount": 92,
   "id": "PPL-SOC",
   "name": "SOC analysts (tiers 1–3)",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "CICD-ARGO",
    "AWS-ACCT-SHARED"
   ],
   "category": "people",
   "headcount": 14,
   "id": "PPL-SRE",
   "name": "SRE on-call engineers",
   "owner": "CTO"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "Engineering"
   },
   "category": "people",
   "headcount": 116,
   "id": "PPL-ENG",
   "name": "Software engineers",
   "owner": "CTO"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "Threat Research"
   },
   "category": "people",
   "headcount": 24,
   "id": "PPL-RES",
   "name": "Threat researchers",
   "owner": "CTO"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "Professional Services"
   },
   "category": "people",
   "headcount": 64,
   "id": "PPL-IR",
   "name": "IR consultants",
   "owner": "COO"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "Sales"
   },
   "category": "people",
   "headcount": 90,
   "id": "PPL-SALES",
   "name": "Account executives & customer success",
   "owner": "CRO (Revenue)"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "Finance"
   },
   "category": "people",
   "headcount": 24,
   "id": "PPL-FIN",
   "name": "Finance & billing team",
   "owner": "CFO"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "People & HR"
   },
   "category": "people",
   "headcount": 13,
   "id": "PPL-HR",
   "name": "HR operations",
   "owner": "COO"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "IT & Security"
   },
   "category": "people",
   "headcount": 37,
   "id": "PPL-IDADM",
   "name": "Identity & IT administrators",
   "owner": "CISO"
  },
  {
   "asset_query": {
    "class": "endpoint",
    "department": "Executive & G&A"
   },
   "category": "people",
   "headcount": 40,
   "id": "PPL-EXEC",
   "name": "Executives & board",
   "owner": "CEO"
  },
  {
   "asset_ids": [
    "SEC-SOAR",
    "SAAS-CHAT"
   ],
   "category": "process",
   "id": "PRC-ESC",
   "name": "P1 escalation runbook",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "SAAS-ITSM",
    "SAAS-TRACK"
   ],
   "category": "process",
   "id": "PRC-CAB",
   "name": "Change approval (CAB)",
   "owner": "CTO"
  },
  {
   "asset_ids": [
    "CICD-SIGN",
    "SRV-BOS-PKI01"
   ],
   "category": "process",
   "id": "PRC-SIGN",
   "name": "Release signing & attestation",
   "owner": "CTO"
  },
  {
   "asset_ids": [
    "SEC-PAM",
    "SAAS-ITSM"
   ],
   "category": "process",
   "id": "PRC-ACR",
   "name": "Quarterly access review",
   "owner": "CISO"
  },
  {
   "asset_ids": [
    "SEC-BACKUP"
   ],
   "category": "process",
   "id": "PRC-RESTORE",
   "name": "Backup restore testing",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "AI-TIP-ENRICH",
    "GCP-GCS-TIP-FEEDS"
   ],
   "category": "process",
   "id": "PRC-FEEDVAL",
   "name": "Feed validation & publishing workflow",
   "owner": "CTO"
  },
  {
   "asset_ids": [
    "SAAS-PAY"
   ],
   "category": "process",
   "id": "PRC-RECON",
   "name": "Payment reconciliation",
   "owner": "CFO"
  },
  {
   "asset_ids": [
    "SAAS-CRM",
    "SAAS-BI"
   ],
   "category": "process",
   "id": "PRC-QBR",
   "name": "Quarterly business review",
   "owner": "CRO (Revenue)"
  },
  {
   "asset_ids": [
    "SAAS-HRIS",
    "SRV-BOS-HR01"
   ],
   "category": "process",
   "id": "PRC-DEPROV",
   "name": "Leaver deprovisioning",
   "owner": "CISO"
  },
  {
   "asset_ids": [
    "AWS-S3-MDR-TEL",
    "AWS-MSK-MDR",
    "AWS-S3-LOGS"
   ],
   "category": "data",
   "classification": "customer_confidential",
   "id": "DATA-TEL",
   "name": "Customer security telemetry",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "AWS-RDS-PORTAL",
    "AWS-S3-PORTAL-EXP"
   ],
   "category": "data",
   "classification": "customer_pii",
   "id": "DATA-PII",
   "name": "Customer account PII",
   "owner": "General Counsel"
  },
  {
   "asset_ids": [
    "GCP-BQ-TIP",
    "GCP-GCS-TIP-FEEDS",
    "AWS-RDS-TIP"
   ],
   "category": "data",
   "classification": "customer_confidential",
   "id": "DATA-INTEL",
   "name": "Threat-intel corpus & feeds",
   "owner": "CTO"
  },
  {
   "asset_ids": [
    "SAAS-CODE",
    "CICD-ARTIFACTS",
    "AWS-ECR"
   ],
   "category": "data",
   "classification": "source_code",
   "id": "DATA-CODE",
   "name": "Source code & build artifacts",
   "owner": "CTO"
  },
  {
   "asset_ids": [
    "SAAS-PAY",
    "AZ-APP-BILLING",
    "AZ-SQL-FIN"
   ],
   "category": "data",
   "classification": "cardholder_financial",
   "id": "DATA-CARD",
   "name": "Cardholder data",
   "owner": "CFO"
  },
  {
   "asset_ids": [
    "SAAS-HRIS",
    "SRV-BOS-HR01",
    "AZ-SYN-BI"
   ],
   "category": "data",
   "classification": "employee_pii",
   "id": "DATA-HR",
   "name": "Employee records",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "SAAS-CRM",
    "SAAS-COLLAB",
    "AI-ASSIST"
   ],
   "category": "data",
   "classification": "internal_confidential",
   "id": "DATA-CONTRACT",
   "name": "Contracts & pricing",
   "owner": "General Counsel"
  },
  {
   "asset_ids": [
    "SRV-DUB-SQL01",
    "AZ-SQL-FIN",
    "SRV-BOS-LEGACY01"
   ],
   "category": "data",
   "classification": "cardholder_financial",
   "id": "DATA-LEDGER",
   "name": "Financial ledger",
   "owner": "CFO"
  },
  {
   "asset_ids": [
    "CICD-VAULT",
    "CICD-SIGN",
    "SRV-BOS-PKI01",
    "AZ-KV-CORP"
   ],
   "category": "data",
   "classification": "secret",
   "id": "DATA-KEYS",
   "name": "Signing keys & secrets",
   "owner": "CISO"
  },
  {
   "asset_ids": [
    "WEB-CDN",
    "WEB-ORIGIN"
   ],
   "category": "system",
   "id": "SYS-WEB",
   "name": "Company website (www)",
   "owner": "CRO (Revenue)"
  },
  {
   "asset_ids": [
    "AWS-ALB-PORTAL",
    "AWS-ECS-PORTAL-API",
    "AZ-APPGW-PORTAL-EU",
    "SEC-WAF",
    "AWS-ACCT-PORTAL"
   ],
   "category": "system",
   "id": "SYS-PORTAL",
   "name": "Customer Portal & API",
   "owner": "CTO"
  },
  {
   "asset_ids": [
    "AWS-APIGW-TIP",
    "AWS-EKS-TIP",
    "GCP-GKE-TIP-ML",
    "AWS-ACCT-TIP",
    "GCP-PRJ-TIP"
   ],
   "category": "system",
   "id": "SYS-TIP",
   "name": "TIP SaaS platform & API",
   "owner": "CTO"
  },
  {
   "asset_ids": [
    "AWS-EKS-MDR",
    "AWS-MSK-MDR",
    "AWS-EKS-MDR-EU",
    "AWS-ACCT-MDR"
   ],
   "category": "system",
   "id": "SYS-MDR",
   "name": "MDR ingestion & analytics platform",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "SRV-BOS-SOAR01",
    "SRV-BOS-JMP01",
    "SRV-DUB-JMP01",
    "SRV-SIN-JMP01",
    "SEC-SOAR"
   ],
   "category": "system",
   "id": "SYS-SOAR",
   "name": "SOAR & SOC jump hosts",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "SEC-SIEM",
    "SEC-EDR",
    "SEC-VULN",
    "SEC-CASB",
    "SEC-DLP",
    "SEC-IRTRIAGE",
    "SEC-MAILGW"
   ],
   "category": "system",
   "id": "SYS-SIEM",
   "name": "SIEM, EDR & security tooling",
   "owner": "CISO"
  },
  {
   "asset_ids": [
    "CICD-RUNNER-01",
    "CICD-RUNNER-02",
    "CICD-RUNNER-03",
    "CICD-RUNNER-04",
    "CICD-RUNNER-05",
    "CICD-RUNNER-06",
    "CICD-ARGO",
    "SRV-TLV-BLD01",
    "SRV-TLV-BLD02",
    "SRV-TLV-BLD03",
    "SRV-TLV-BLD04",
    "AI-CODE"
   ],
   "category": "system",
   "id": "SYS-CICD",
   "name": "CI/CD pipeline",
   "owner": "CTO"
  },
  {
   "asset_ids": [
    "SAAS-IDP",
    "SRV-BOS-DC01",
    "SRV-BOS-DC02",
    "SRV-DUB-DC01",
    "SRV-SIN-DC01",
    "SRV-TLV-DC01",
    "SEC-PAM"
   ],
   "category": "system",
   "id": "SYS-IDP",
   "name": "Identity provider & directory",
   "owner": "CISO"
  },
  {
   "asset_ids": [
    "SAAS-CRM",
    "AI-SALES"
   ],
   "category": "system",
   "id": "SYS-CRM",
   "name": "CRM & sales tooling",
   "owner": "CRO (Revenue)"
  },
  {
   "asset_ids": [
    "SRV-DUB-SQL01",
    "SRV-BOS-LEGACY01",
    "AZ-SQL-FIN"
   ],
   "category": "system",
   "id": "SYS-ERP",
   "name": "Finance & ERP systems",
   "owner": "CFO"
  },
  {
   "asset_ids": [
    "AZ-APP-BILLING",
    "SAAS-PAY"
   ],
   "category": "system",
   "id": "SYS-PAY",
   "name": "Payment page & processor",
   "owner": "CFO"
  },
  {
   "asset_ids": [
    "AZ-SYN-BI",
    "AZ-STG-BI",
    "SAAS-BI",
    "AZ-SUB-BI"
   ],
   "category": "system",
   "id": "SYS-BI",
   "name": "Data warehouse & BI",
   "owner": "CFO"
  },
  {
   "asset_ids": [
    "SEC-BACKUP",
    "SRV-BOS-BKP01"
   ],
   "category": "system",
   "id": "SYS-BACKUP",
   "name": "Backup & recovery platform",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "NET-BOS-VPN01",
    "NET-DUB-VPN01"
   ],
   "category": "system",
   "id": "SYS-VPN",
   "name": "Remote-access VPN",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "SAAS-COLLAB",
    "SAAS-CHAT",
    "SAAS-TRACK",
    "SAAS-ITSM"
   ],
   "category": "system",
   "id": "SYS-COLLAB",
   "name": "Email & collaboration",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "AI-TRIAGE",
    "AI-ASSIST",
    "AI-TIP-ENRICH"
   ],
   "category": "system",
   "id": "SYS-AI",
   "name": "AI models (alert triage, assistant, enrichment)",
   "owner": "CTO"
  },
  {
   "asset_query": {
    "class": "network_device"
   },
   "category": "system",
   "id": "SYS-NET",
   "name": "Site networks & firewalls",
   "owner": "COO"
  },
  {
   "asset_query": {
    "class": "server"
   },
   "category": "system",
   "id": "SYS-SRV",
   "name": "Corporate servers (file, print, utility)",
   "owner": "COO"
  },
  {
   "asset_ids": [
    "AWS-ACCT-SHARED",
    "AWS-S3-LOGS",
    "AWS-ECR",
    "AZ-SUB-CORP",
    "AZ-KV-CORP",
    "AZ-AKS-PS"
   ],
   "category": "system",
   "id": "SYS-CLOUD",
   "name": "Cloud landing zones & shared services",
   "owner": "CTO"
  },
  {
   "asset_query": {
    "class": "endpoint"
   },
   "category": "system",
   "id": "SYS-ENDPOINT",
   "name": "Workforce endpoints",
   "owner": "COO"
  },
  {
   "asset_query": {
    "class": "peripheral_iot"
   },
   "category": "system",
   "id": "SYS-FAC",
   "name": "Facilities (badge, CCTV, meeting rooms, printers)",
   "owner": "COO"
  }
 ],
 "business_goals": [
  {
   "horizon": "FY2027",
   "id": "G1",
   "kpi_ids": [
    "MDR-NRR",
    "TIP-ARR",
    "CRM-PIPE",
    "CRM-WIN"
   ],
   "owner": "CEO",
   "title": "Grow ARR 25% to $150M"
  },
  {
   "horizon": "FY2027",
   "id": "G2",
   "kpi_ids": [
    "CRM-CHURN",
    "MDR-CSAT",
    "POR-AVAIL",
    "MDR-MTTD"
   ],
   "owner": "CRO (Revenue)",
   "title": "Retain at least 95% of gross revenue"
  },
  {
   "horizon": "Continuous",
   "id": "G3",
   "kpi_ids": [
    "MDR-MTTD",
    "MDR-MTTR",
    "MDR-ESC",
    "POR-AVAIL",
    "TIP-AVAIL"
   ],
   "owner": "COO",
   "title": "Meet every contractual SLA for MDR and Portal customers"
  },
  {
   "horizon": "FY2027 Q2",
   "id": "G4",
   "kpi_ids": [
    "CI-DF",
    "CI-LT",
    "CI-CFR",
    "CI-SBOM"
   ],
   "owner": "CTO",
   "title": "Ship the EU sovereign MDR region (NIS2-ready) by Q2"
  },
  {
   "horizon": "FY2027",
   "id": "G5",
   "kpi_ids": [
    "FIN-PCI",
    "IT-PATCH",
    "IT-EDR",
    "IAM-MFA",
    "IAM-PRIV"
   ],
   "owner": "CISO",
   "title": "Zero major non-conformities in ISO 27001 / SOC 2 / PCI audits"
  },
  {
   "horizon": "FY2027",
   "id": "G6",
   "kpi_ids": [
    "PS-UTIL",
    "FIN-DSO",
    "FIN-CLOSE"
   ],
   "owner": "CFO",
   "title": "Hold operating margin at or above 18%"
  }
 ],
 "business_processes": [
  {
   "components": [
    {
     "id": "PPL-SOC",
     "role": "essential"
    },
    {
     "id": "PRC-ESC",
     "role": "essential"
    },
    {
     "id": "DATA-TEL",
     "role": "essential"
    },
    {
     "id": "SYS-MDR",
     "role": "essential"
    },
    {
     "id": "SYS-SOAR",
     "role": "essential"
    },
    {
     "id": "SYS-IDP",
     "role": "essential"
    },
    {
     "id": "SYS-SIEM",
     "role": "supporting"
    },
    {
     "id": "SYS-AI",
     "role": "supporting"
    },
    {
     "id": "SYS-VPN",
     "role": "supporting"
    },
    {
     "id": "PPL-CISO",
     "role": "supporting"
    }
   ],
   "frequency": "Continuous",
   "id": "PR-TRIAGE",
   "name": "24x7 alert triage & escalation",
   "owner": "COO",
   "policy_ids": [
    "POL-B01",
    "POL-B13"
   ],
   "rto_hours": 1,
   "service_ids": [
    "SVC-MDR"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-SRE",
     "role": "essential"
    },
    {
     "id": "SYS-PORTAL",
     "role": "essential"
    },
    {
     "id": "SYS-MDR",
     "role": "essential"
    },
    {
     "id": "DATA-PII",
     "role": "essential"
    },
    {
     "id": "DATA-TEL",
     "role": "essential"
    },
    {
     "id": "PPL-SALES",
     "role": "supporting"
    },
    {
     "id": "PRC-CAB",
     "role": "supporting"
    }
   ],
   "frequency": "Per customer",
   "id": "PR-ONBOARD",
   "name": "Customer onboarding & telemetry integration",
   "owner": "COO",
   "policy_ids": [
    "POL-B01",
    "POL-B03"
   ],
   "rto_hours": 24,
   "service_ids": [
    "SVC-MDR",
    "SVC-PORTAL"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-RES",
     "role": "essential"
    },
    {
     "id": "PRC-FEEDVAL",
     "role": "essential"
    },
    {
     "id": "DATA-INTEL",
     "role": "essential"
    },
    {
     "id": "SYS-TIP",
     "role": "essential"
    },
    {
     "id": "SYS-AI",
     "role": "supporting"
    },
    {
     "id": "SYS-CICD",
     "role": "supporting"
    }
   ],
   "frequency": "Continuous",
   "id": "PR-INTEL",
   "name": "Threat-intel curation & publishing",
   "owner": "CTO",
   "policy_ids": [
    "POL-B11",
    "POL-B02"
   ],
   "rto_hours": 4,
   "service_ids": [
    "SVC-TIP"
   ]
  },
  {
   "components": [
    {
     "id": "SYS-PORTAL",
     "role": "essential"
    },
    {
     "id": "DATA-PII",
     "role": "essential"
    },
    {
     "id": "SYS-IDP",
     "role": "essential"
    },
    {
     "id": "SYS-WEB",
     "role": "supporting"
    },
    {
     "id": "PPL-SRE",
     "role": "supporting"
    }
   ],
   "frequency": "Continuous",
   "id": "PR-PORTAL",
   "name": "Customer self-service (cases, reports, API)",
   "owner": "CTO",
   "policy_ids": [
    "POL-B02",
    "POL-B05"
   ],
   "rto_hours": 2,
   "service_ids": [
    "SVC-PORTAL"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-SALES",
     "role": "essential"
    },
    {
     "id": "PRC-QBR",
     "role": "essential"
    },
    {
     "id": "SYS-CRM",
     "role": "essential"
    },
    {
     "id": "DATA-CONTRACT",
     "role": "essential"
    },
    {
     "id": "PPL-CISO",
     "role": "supporting"
    },
    {
     "id": "SYS-COLLAB",
     "role": "supporting"
    },
    {
     "id": "SYS-PORTAL",
     "role": "supporting"
    }
   ],
   "frequency": "Quarterly",
   "id": "PR-RENEW",
   "name": "Contract renewal & QBR",
   "owner": "CRO (Revenue)",
   "policy_ids": [
    "POL-B03"
   ],
   "rto_hours": 72,
   "service_ids": [
    "SVC-CRM"
   ]
  },
  {
   "components": [
    {
     "id": "SYS-WEB",
     "role": "essential"
    },
    {
     "id": "SYS-CRM",
     "role": "essential"
    },
    {
     "id": "PPL-SALES",
     "role": "essential"
    },
    {
     "id": "DATA-CONTRACT",
     "role": "supporting"
    },
    {
     "id": "SYS-COLLAB",
     "role": "supporting"
    }
   ],
   "frequency": "Continuous",
   "id": "PR-LEADGEN",
   "name": "Lead generation & pipeline management",
   "owner": "CRO (Revenue)",
   "policy_ids": [
    "POL-B04"
   ],
   "rto_hours": 24,
   "service_ids": [
    "SVC-CRM"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-ENG",
     "role": "essential"
    },
    {
     "id": "PRC-SIGN",
     "role": "essential"
    },
    {
     "id": "SYS-CICD",
     "role": "essential"
    },
    {
     "id": "DATA-CODE",
     "role": "essential"
    },
    {
     "id": "DATA-KEYS",
     "role": "essential"
    },
    {
     "id": "PRC-CAB",
     "role": "supporting"
    },
    {
     "id": "SYS-IDP",
     "role": "supporting"
    },
    {
     "id": "PPL-CISO",
     "role": "supporting"
    },
    {
     "id": "SYS-CLOUD",
     "role": "supporting"
    }
   ],
   "frequency": "Weekly",
   "id": "PR-RELEASE",
   "name": "Build, sign & release",
   "owner": "CTO",
   "policy_ids": [
    "POL-B06",
    "POL-B02"
   ],
   "rto_hours": 8,
   "service_ids": [
    "SVC-CICD"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-IR",
     "role": "essential"
    },
    {
     "id": "SYS-ENDPOINT",
     "role": "essential"
    },
    {
     "id": "SYS-VPN",
     "role": "essential"
    },
    {
     "id": "PPL-CISO",
     "role": "supporting"
    },
    {
     "id": "SYS-COLLAB",
     "role": "supporting"
    },
    {
     "id": "DATA-CONTRACT",
     "role": "supporting"
    }
   ],
   "frequency": "Per engagement",
   "id": "PR-IRENG",
   "name": "Incident-response engagement",
   "owner": "COO",
   "policy_ids": [
    "POL-B10",
    "POL-B12"
   ],
   "rto_hours": 2,
   "service_ids": [
    "SVC-PS"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-FIN",
     "role": "essential"
    },
    {
     "id": "SYS-ERP",
     "role": "essential"
    },
    {
     "id": "DATA-LEDGER",
     "role": "essential"
    },
    {
     "id": "SYS-CRM",
     "role": "supporting"
    },
    {
     "id": "PRC-RECON",
     "role": "supporting"
    },
    {
     "id": "SYS-COLLAB",
     "role": "supporting"
    }
   ],
   "frequency": "Monthly",
   "id": "PR-BILL",
   "name": "Invoicing & collections",
   "owner": "CFO",
   "policy_ids": [
    "POL-B07"
   ],
   "rto_hours": 24,
   "service_ids": [
    "SVC-FIN"
   ]
  },
  {
   "components": [
    {
     "id": "SYS-PAY",
     "role": "essential"
    },
    {
     "id": "DATA-CARD",
     "role": "essential"
    },
    {
     "id": "PRC-RECON",
     "role": "essential"
    },
    {
     "id": "PPL-FIN",
     "role": "supporting"
    }
   ],
   "frequency": "Continuous",
   "id": "PR-PAY",
   "name": "Card payment processing",
   "owner": "CFO",
   "policy_ids": [
    "POL-B07",
    "POL-B08"
   ],
   "rto_hours": 12,
   "service_ids": [
    "SVC-FIN"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-FIN",
     "role": "essential"
    },
    {
     "id": "SYS-ERP",
     "role": "essential"
    },
    {
     "id": "SYS-BI",
     "role": "essential"
    },
    {
     "id": "DATA-LEDGER",
     "role": "essential"
    },
    {
     "id": "PPL-EXEC",
     "role": "supporting"
    },
    {
     "id": "DATA-HR",
     "role": "supporting"
    }
   ],
   "frequency": "Monthly",
   "id": "PR-CLOSE",
   "name": "Month-end close & board reporting",
   "owner": "CFO",
   "policy_ids": [
    "POL-B08",
    "POL-B12"
   ],
   "rto_hours": 48,
   "service_ids": [
    "SVC-FIN",
    "SVC-BI"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-HR",
     "role": "essential"
    },
    {
     "id": "PPL-IDADM",
     "role": "essential"
    },
    {
     "id": "PRC-DEPROV",
     "role": "essential"
    },
    {
     "id": "SYS-IDP",
     "role": "essential"
    },
    {
     "id": "DATA-HR",
     "role": "essential"
    },
    {
     "id": "PRC-ACR",
     "role": "supporting"
    },
    {
     "id": "PPL-CISO",
     "role": "supporting"
    }
   ],
   "frequency": "Daily",
   "id": "PR-JML",
   "name": "Joiner / mover / leaver",
   "owner": "CISO",
   "policy_ids": [
    "POL-B09",
    "POL-B05"
   ],
   "rto_hours": 24,
   "service_ids": [
    "SVC-IAM"
   ]
  },
  {
   "components": [
    {
     "id": "PPL-IDADM",
     "role": "essential"
    },
    {
     "id": "PRC-RESTORE",
     "role": "essential"
    },
    {
     "id": "SYS-BACKUP",
     "role": "essential"
    },
    {
     "id": "SYS-SRV",
     "role": "supporting"
    },
    {
     "id": "SYS-NET",
     "role": "supporting"
    },
    {
     "id": "SYS-CLOUD",
     "role": "supporting"
    },
    {
     "id": "PPL-CISO",
     "role": "supporting"
    },
    {
     "id": "SYS-FAC",
     "role": "supporting"
    }
   ],
   "frequency": "Quarterly test",
   "id": "PR-DR",
   "name": "Backup & disaster recovery",
   "owner": "COO",
   "policy_ids": [
    "POL-B13"
   ],
   "rto_hours": 2,
   "service_ids": [
    "SVC-IT"
   ]
  },
  {
   "components": [
    {
     "id": "SYS-BI",
     "role": "essential"
    },
    {
     "id": "SYS-COLLAB",
     "role": "essential"
    },
    {
     "id": "PPL-EXEC",
     "role": "supporting"
    },
    {
     "id": "SYS-CRM",
     "role": "supporting"
    },
    {
     "id": "SYS-ENDPOINT",
     "role": "supporting"
    }
   ],
   "frequency": "Weekly",
   "id": "PR-PLAN",
   "name": "Resource planning & utilisation",
   "owner": "CFO",
   "policy_ids": [
    "POL-B12"
   ],
   "rto_hours": 72,
   "service_ids": [
    "SVC-PS",
    "SVC-BI"
   ]
  }
 ],
 "business_services": [
  {
   "annual_revenue_usd": 48000000,
   "cost_of_downtime_per_hour_usd": 5500,
   "customers": 210,
   "data_classification": "customer_confidential",
   "depends_on": [
    "SVC-IAM"
   ],
   "description": "24x7 follow-the-sun SOC monitoring customer environments; the largest revenue line.",
   "id": "SVC-MDR",
   "impact": {
    "expected_outage_hours": 12,
    "recovery_usd": 400000,
    "regulatory_usd": 1500000,
    "reputation_usd": 3000000
   },
   "mtpd_hours": 4,
   "name": "Managed Detection & Response (MDR)",
   "owner": "COO",
   "rpo_hours": 0.25,
   "rto_hours": 1,
   "sla": {
    "contract": "MDR Master Services Agreement v4",
    "credit": "10% of monthly fee per breached month",
    "penalty_usd": 900000,
    "terms": "MTTD within 15 min, MTTR within 60 min, platform 99.9%"
   },
   "tier": 1
  },
  {
   "annual_revenue_usd": 22000000,
   "cost_of_downtime_per_hour_usd": 2500,
   "customers": 180,
   "data_classification": "customer_confidential",
   "depends_on": [
    "SVC-IAM"
   ],
   "description": "Multi-tenant SaaS delivering curated threat intelligence via portal and API.",
   "id": "SVC-TIP",
   "impact": {
    "expected_outage_hours": 16,
    "recovery_usd": 250000,
    "regulatory_usd": 500000,
    "reputation_usd": 1500000
   },
   "mtpd_hours": 24,
   "name": "Threat-Intelligence Platform (SaaS)",
   "owner": "CTO",
   "rpo_hours": 1,
   "rto_hours": 4,
   "sla": {
    "contract": "TIP Subscription Terms v2",
    "credit": "5% of annual fee per breached quarter",
    "penalty_usd": 350000,
    "terms": "API 99.95%, feed freshness within 30 min"
   },
   "tier": 1
  },
  {
   "annual_revenue_usd": 15000000,
   "cost_of_downtime_per_hour_usd": 3200,
   "customers": 340,
   "data_classification": "customer_pii",
   "depends_on": [
    "SVC-IAM"
   ],
   "description": "Single customer entry point for MDR cases, reports, TIP access and billing; holds customer PII.",
   "id": "SVC-PORTAL",
   "impact": {
    "expected_outage_hours": 10,
    "recovery_usd": 300000,
    "regulatory_usd": 2500000,
    "reputation_usd": 2000000
   },
   "mtpd_hours": 8,
   "name": "Customer Portal & API",
   "owner": "CTO",
   "rpo_hours": 0.5,
   "rto_hours": 2,
   "sla": {
    "contract": "Customer Portal SLA (all contracts)",
    "credit": "Tiered service credits up to 25%",
    "penalty_usd": 600000,
    "terms": "Availability 99.95% monthly"
   },
   "tier": 1
  },
  {
   "annual_revenue_usd": 0,
   "cost_of_downtime_per_hour_usd": 1800,
   "customers": 0,
   "data_classification": "source_code",
   "depends_on": [
    "SVC-IAM"
   ],
   "description": "Source, build, test, sign and deploy pipeline for every ACME product; supply-chain integrity critical.",
   "id": "SVC-CICD",
   "impact": {
    "expected_outage_hours": 24,
    "recovery_usd": 350000,
    "regulatory_usd": 0,
    "reputation_usd": 2500000
   },
   "mtpd_hours": 72,
   "name": "Product Build & Release (CI/CD)",
   "owner": "CTO",
   "rpo_hours": 4,
   "rto_hours": 8,
   "sla": null,
   "tier": 2
  },
  {
   "annual_revenue_usd": 18000000,
   "cost_of_downtime_per_hour_usd": 2100,
   "customers": 95,
   "data_classification": "customer_confidential",
   "depends_on": [
    "SVC-IAM",
    "SVC-IT"
   ],
   "description": "Incident-response retainers, penetration testing and compliance assessments.",
   "id": "SVC-PS",
   "impact": {
    "expected_outage_hours": 24,
    "recovery_usd": 100000,
    "regulatory_usd": 400000,
    "reputation_usd": 800000
   },
   "mtpd_hours": 120,
   "name": "Professional Services (IR & Assessments)",
   "owner": "COO",
   "rpo_hours": 8,
   "rto_hours": 24,
   "sla": {
    "contract": "IR Retainer Agreement",
    "credit": "Retainer hours credited",
    "penalty_usd": 200000,
    "terms": "Responder engaged within 2 h"
   },
   "tier": 2
  },
  {
   "annual_revenue_usd": 0,
   "cost_of_downtime_per_hour_usd": 2500,
   "customers": 0,
   "data_classification": "internal_confidential",
   "depends_on": [
    "SVC-IAM"
   ],
   "description": "Pipeline, quoting and renewals across all regions, fed by the corporate website (lead generation).",
   "id": "SVC-CRM",
   "impact": {
    "expected_outage_hours": 24,
    "recovery_usd": 80000,
    "regulatory_usd": 150000,
    "reputation_usd": 300000
   },
   "mtpd_hours": 72,
   "name": "Sales & CRM",
   "owner": "CRO (Revenue)",
   "rpo_hours": 4,
   "rto_hours": 24,
   "sla": null,
   "tier": 2
  },
  {
   "annual_revenue_usd": 0,
   "cost_of_downtime_per_hour_usd": 3000,
   "customers": 0,
   "data_classification": "cardholder_financial",
   "depends_on": [
    "SVC-IAM"
   ],
   "description": "Invoicing, card payments, revenue recognition and close; PCI DSS scope.",
   "id": "SVC-FIN",
   "impact": {
    "expected_outage_hours": 20,
    "recovery_usd": 150000,
    "regulatory_usd": 1200000,
    "reputation_usd": 500000
   },
   "mtpd_hours": 72,
   "name": "Finance & Billing",
   "owner": "CFO",
   "rpo_hours": 1,
   "rto_hours": 12,
   "sla": null,
   "tier": 2
  },
  {
   "annual_revenue_usd": 0,
   "cost_of_downtime_per_hour_usd": 600,
   "customers": 0,
   "data_classification": "employee_pii",
   "depends_on": [
    "SVC-IAM"
   ],
   "description": "Data warehouse and executive dashboards feeding board reporting and pricing decisions.",
   "id": "SVC-BI",
   "impact": {
    "expected_outage_hours": 48,
    "recovery_usd": 80000,
    "regulatory_usd": 400000,
    "reputation_usd": 200000
   },
   "mtpd_hours": 168,
   "name": "BI & Decision Support",
   "owner": "CFO",
   "rpo_hours": 24,
   "rto_hours": 48,
   "sla": null,
   "tier": 3
  },
  {
   "annual_revenue_usd": 0,
   "cost_of_downtime_per_hour_usd": 9000,
   "customers": 0,
   "data_classification": "employee_pii",
   "depends_on": [],
   "description": "Workforce identity, SSO, directory and HR system of record; every other service depends on it.",
   "id": "SVC-IAM",
   "impact": {
    "expected_outage_hours": 8,
    "recovery_usd": 300000,
    "regulatory_usd": 600000,
    "reputation_usd": 1000000
   },
   "mtpd_hours": 8,
   "name": "Identity & Access (SSO, Directory, HR)",
   "owner": "CISO",
   "rpo_hours": 1,
   "rto_hours": 2,
   "sla": null,
   "tier": 1
  },
  {
   "annual_revenue_usd": 0,
   "cost_of_downtime_per_hour_usd": 2500,
   "customers": 0,
   "data_classification": "internal_confidential",
   "depends_on": [
    "SVC-IAM"
   ],
   "description": "Endpoints, email, collaboration, networks and facilities systems at every site.",
   "id": "SVC-IT",
   "impact": {
    "expected_outage_hours": 16,
    "recovery_usd": 120000,
    "regulatory_usd": 100000,
    "reputation_usd": 200000
   },
   "mtpd_hours": 72,
   "name": "Corporate IT & Collaboration",
   "owner": "COO",
   "rpo_hours": 24,
   "rto_hours": 8,
   "sla": null,
   "tier": 3
  }
 ],
 "connectors": [
  {
   "category": "BI / DSS",
   "id": "CON-PBI",
   "kind": "api",
   "last_sync": "2026-09-30T06:00:00Z",
   "name": "Power BI (KPIs & SLO metrics)",
   "records": 37,
   "schedule": "hourly",
   "status": "connected"
  },
  {
   "category": "GRC",
   "id": "CON-SNOW",
   "kind": "api",
   "last_sync": "2026-09-30T05:30:00Z",
   "name": "ServiceNow GRC (controls, policies, risks)",
   "records": 55,
   "schedule": "daily",
   "status": "connected"
  },
  {
   "category": "Cloud posture",
   "id": "CON-AWS",
   "kind": "api",
   "last_sync": "2026-09-30T07:15:00Z",
   "name": "AWS Security Hub",
   "records": 41,
   "schedule": "hourly",
   "status": "connected"
  },
  {
   "category": "Cloud posture",
   "id": "CON-AZ",
   "kind": "api",
   "last_sync": "2026-09-30T07:10:00Z",
   "name": "Microsoft Defender for Cloud",
   "records": 17,
   "schedule": "hourly",
   "status": "connected"
  },
  {
   "category": "Cloud posture",
   "id": "CON-GCP",
   "kind": "api",
   "last_sync": "2026-09-29T22:40:00Z",
   "name": "Google Security Command Center",
   "note": "API quota exceeded on last two runs",
   "records": 9,
   "schedule": "hourly",
   "status": "degraded"
  },
  {
   "category": "Vulnerabilities",
   "id": "CON-VULN",
   "kind": "api",
   "last_sync": "2026-09-30T04:00:00Z",
   "name": "Vulnerability scanner",
   "records": 63,
   "schedule": "daily",
   "status": "connected"
  },
  {
   "category": "Security controls",
   "id": "CON-EDR",
   "kind": "api",
   "last_sync": "2026-09-30T07:20:00Z",
   "name": "EDR console (coverage & alerts)",
   "records": 512,
   "schedule": "15 min",
   "status": "connected"
  },
  {
   "category": "Workflow",
   "id": "CON-JIRA",
   "kind": "api",
   "last_sync": "2026-09-30T07:00:00Z",
   "name": "Jira (remediation tickets)",
   "records": 88,
   "schedule": "hourly",
   "status": "connected"
  },
  {
   "category": "BI / DSS",
   "id": "CON-MCP-BI",
   "kind": "mcp",
   "last_sync": "2026-09-30T07:22:00Z",
   "name": "acme-bi MCP server (Streamable HTTP)",
   "note": "Tools: query_kpi, list_services, get_bia",
   "records": 12,
   "schedule": "on demand",
   "status": "connected"
  },
  {
   "category": "GRC",
   "id": "CON-MCP-GRC",
   "kind": "mcp",
   "last_sync": null,
   "name": "grc-evidence MCP server",
   "records": 0,
   "schedule": "on demand",
   "status": "not_configured"
  },
  {
   "category": "Triage",
   "id": "CON-IRT",
   "kind": "file",
   "last_sync": "2026-09-30T03:12:00Z",
   "name": "IRTriage collections (ZIP upload)",
   "records": 543,
   "schedule": "manual",
   "status": "connected"
  }
 ],
 "controls": [
  {
   "domain": "Identify",
   "effectiveness": 0.85,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.9"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "ID.AM-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(i)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "12.5.1"
    }
   ],
   "id": "CTL-01",
   "last_tested": "2026-05-11",
   "owner": "IT Operations",
   "status": "implemented",
   "title": "Asset inventory & ownership"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.55,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.8"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC7.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "ID.RA-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(e)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "6.3.1"
    }
   ],
   "id": "CTL-02",
   "last_tested": "2026-06-09",
   "owner": "Security Engineering",
   "status": "partial",
   "title": "Vulnerability management"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.5,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.8"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC7.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.PS-02"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(e)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "6.3.3"
    }
   ],
   "id": "CTL-03",
   "last_tested": "2026-06-27",
   "owner": "IT Operations",
   "status": "partial",
   "title": "Patch management (endpoints & servers)"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.6,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.9"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC7.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.PS-01"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "2.2.1"
    }
   ],
   "id": "CTL-04",
   "last_tested": "2026-09-06",
   "owner": "IT Operations",
   "status": "partial",
   "title": "Secure configuration baselines"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.7,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.23"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.6"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.PS-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(d)"
    }
   ],
   "id": "CTL-05",
   "last_tested": "2026-03-04",
   "owner": "Cloud Platform",
   "status": "implemented",
   "title": "Cloud security posture management"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.6,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.5"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.AA-03"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(j)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "8.4.2"
    }
   ],
   "id": "CTL-06",
   "last_tested": "2026-09-14",
   "owner": "Identity Team",
   "status": "partial",
   "title": "Multi-factor authentication"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.55,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.2"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.3"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.AA-05"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "7.2.1"
    }
   ],
   "id": "CTL-07",
   "last_tested": "2026-06-13",
   "owner": "Identity Team",
   "status": "partial",
   "title": "Privileged access management"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.5,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.18"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.2"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.AA-01"
    },
    {
     "framework": "GDPR",
     "ref": "Art.32"
    }
   ],
   "id": "CTL-08",
   "last_tested": "2026-07-23",
   "owner": "People & HR",
   "status": "partial",
   "title": "Joiner / mover / leaver process"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.7,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.18"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.3"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.AA-05"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "7.2.4"
    }
   ],
   "id": "CTL-09",
   "last_tested": "2026-09-22",
   "owner": "Identity Team",
   "status": "implemented",
   "title": "Periodic access reviews"
  },
  {
   "domain": "Detect",
   "effectiveness": 0.8,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.7"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.8"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "DE.CM-09"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(b)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "5.2.1"
    }
   ],
   "id": "CTL-10",
   "last_tested": "2026-07-24",
   "owner": "Security Operations",
   "status": "implemented",
   "title": "Endpoint detection & response coverage"
  },
  {
   "domain": "Detect",
   "effectiveness": 0.8,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.15"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC7.2"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "DE.CM-01"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "10.2.1"
    }
   ],
   "id": "CTL-11",
   "last_tested": "2026-09-02",
   "owner": "Security Operations",
   "status": "implemented",
   "title": "Centralised logging & SIEM"
  },
  {
   "domain": "Detect",
   "effectiveness": 0.85,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.16"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC7.2"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "DE.AE-02"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(b)"
    }
   ],
   "id": "CTL-12",
   "last_tested": "2026-04-13",
   "owner": "Security Operations",
   "status": "implemented",
   "title": "24x7 security monitoring"
  },
  {
   "domain": "Respond",
   "effectiveness": 0.75,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.24"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC7.4"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "RS.MA-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.23"
    },
    {
     "framework": "GDPR",
     "ref": "Art.33"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "12.10.1"
    }
   ],
   "id": "CTL-13",
   "last_tested": "2026-05-11",
   "owner": "CISO Office",
   "status": "implemented",
   "title": "Incident response plan & exercises"
  },
  {
   "domain": "Recover",
   "effectiveness": 0.5,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.13"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "A1.2"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "RC.RP-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(c)"
    }
   ],
   "id": "CTL-14",
   "last_tested": "2026-05-03",
   "owner": "IT Operations",
   "status": "partial",
   "title": "Immutable backups & recovery testing"
  },
  {
   "domain": "Recover",
   "effectiveness": 0.7,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.30"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "A1.3"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "RC.RP-02"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(c)"
    }
   ],
   "id": "CTL-15",
   "last_tested": "2026-08-06",
   "owner": "COO Office",
   "status": "implemented",
   "title": "Business continuity & disaster recovery"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.55,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.22"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.6"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.IR-01"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "1.3.1"
    }
   ],
   "id": "CTL-16",
   "last_tested": "2026-07-02",
   "owner": "Network Engineering",
   "status": "partial",
   "title": "Network segmentation"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.45,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.20"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.6"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.IR-01"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "6.4.2"
    }
   ],
   "id": "CTL-17",
   "last_tested": "2026-05-15",
   "owner": "Security Engineering",
   "status": "partial",
   "title": "Web application firewall (blocking mode)"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.7,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.24"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.7"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.DS-02"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "4.2.1"
    }
   ],
   "id": "CTL-18",
   "last_tested": "2026-06-01",
   "owner": "Security Engineering",
   "status": "implemented",
   "title": "TLS & certificate lifecycle"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.85,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.24"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.DS-01"
    },
    {
     "framework": "GDPR",
     "ref": "Art.32"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "3.5.1"
    }
   ],
   "id": "CTL-19",
   "last_tested": "2026-07-22",
   "owner": "Cloud Platform",
   "status": "implemented",
   "title": "Encryption at rest"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.45,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.12"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "C1.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.DS-01"
    },
    {
     "framework": "GDPR",
     "ref": "Art.5"
    }
   ],
   "id": "CTL-20",
   "last_tested": "2026-09-02",
   "owner": "Privacy Office",
   "status": "partial",
   "title": "Data classification & DLP"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.5,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.17"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.DS-01"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "8.3.2"
    }
   ],
   "id": "CTL-21",
   "last_tested": "2026-06-28",
   "owner": "Platform Engineering",
   "status": "partial",
   "title": "Secrets management"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.75,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.25"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC8.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.PS-06"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(e)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "6.2.1"
    }
   ],
   "id": "CTL-22",
   "last_tested": "2026-08-24",
   "owner": "Engineering",
   "status": "implemented",
   "title": "Secure SDLC & code review"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.5,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.21"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC8.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "GV.SC-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(d)"
    }
   ],
   "id": "CTL-23",
   "last_tested": "2026-06-01",
   "owner": "Platform Engineering",
   "status": "partial",
   "title": "Software supply-chain integrity (signing, SBOM)"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.45,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.31"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC8.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.PS-06"
    }
   ],
   "id": "CTL-24",
   "last_tested": "2026-08-09",
   "owner": "Platform Engineering",
   "status": "partial",
   "title": "CI/CD pipeline hardening"
  },
  {
   "domain": "Govern",
   "effectiveness": 0.65,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.19"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC9.2"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "GV.SC-07"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(d)"
    },
    {
     "framework": "GDPR",
     "ref": "Art.28"
    }
   ],
   "id": "CTL-25",
   "last_tested": "2026-06-13",
   "owner": "Procurement",
   "status": "implemented",
   "title": "Third-party & supplier risk"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.8,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.6.3"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC2.2"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.AT-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(g)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "12.6.1"
    }
   ],
   "id": "CTL-26",
   "last_tested": "2026-09-23",
   "owner": "CISO Office",
   "status": "implemented",
   "title": "Security awareness training"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.8,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.23"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.8"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "DE.CM-09"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "5.4.1"
    }
   ],
   "id": "CTL-27",
   "last_tested": "2026-06-14",
   "owner": "Security Engineering",
   "status": "implemented",
   "title": "Email security & phishing protection"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.1,
   "framework_refs": [
    {
     "framework": "PCI DSS 4.0",
     "ref": "6.4.3"
    },
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.26"
    }
   ],
   "id": "CTL-28",
   "last_tested": "2026-04-21",
   "owner": "Finance Systems",
   "status": "not_implemented",
   "title": "Payment-page script integrity"
  },
  {
   "domain": "Identify",
   "effectiveness": 0.2,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.1"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.8"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "ID.AM-01"
    }
   ],
   "id": "CTL-29",
   "last_tested": "2026-08-01",
   "owner": "Facilities",
   "status": "planned",
   "title": "IoT / facilities device management"
  },
  {
   "domain": "Govern",
   "effectiveness": 0.35,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.12"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "GV.OC-03"
    },
    {
     "framework": "GDPR",
     "ref": "Art.35"
    }
   ],
   "id": "CTL-30",
   "last_tested": "2026-04-04",
   "owner": "AI Platform",
   "status": "partial",
   "title": "AI system governance & data access"
  },
  {
   "domain": "Govern",
   "effectiveness": 0.7,
   "framework_refs": [
    {
     "framework": "GDPR",
     "ref": "Art.35"
    },
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.34"
    }
   ],
   "id": "CTL-31",
   "last_tested": "2026-05-07",
   "owner": "Privacy Office",
   "status": "implemented",
   "title": "Data protection impact assessments"
  },
  {
   "domain": "Respond",
   "effectiveness": 0.8,
   "framework_refs": [
    {
     "framework": "GDPR",
     "ref": "Art.33"
    },
    {
     "framework": "NIS2",
     "ref": "Art.23"
    },
    {
     "framework": "ISO 27001:2022",
     "ref": "A.5.26"
    }
   ],
   "id": "CTL-32",
   "last_tested": "2026-03-24",
   "owner": "General Counsel",
   "status": "implemented",
   "title": "Breach notification procedure"
  },
  {
   "domain": "Govern",
   "effectiveness": 0.75,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "Cl.6.1"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC3.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "GV.RM-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(1)"
    }
   ],
   "id": "CTL-33",
   "last_tested": "2026-03-23",
   "owner": "CISO Office",
   "status": "implemented",
   "title": "Enterprise risk management"
  },
  {
   "domain": "Govern",
   "effectiveness": 0.7,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "Cl.5.1"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC1.2"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "GV.RR-01"
    },
    {
     "framework": "NIS2",
     "ref": "Art.20"
    }
   ],
   "id": "CTL-34",
   "last_tested": "2026-05-13",
   "owner": "CEO Office",
   "status": "implemented",
   "title": "Board cyber oversight"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.75,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.7.2"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.4"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.AA-06"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "9.2.1"
    }
   ],
   "id": "CTL-35",
   "last_tested": "2026-07-26",
   "owner": "Facilities",
   "status": "implemented",
   "title": "Physical access control"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.5,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.7.10"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.7"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.DS-01"
    }
   ],
   "id": "CTL-36",
   "last_tested": "2026-08-10",
   "owner": "IT Operations",
   "status": "partial",
   "title": "Removable media & peripherals"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.5,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.6.7"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC6.6"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.AA-03"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(j)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "8.4.3"
    }
   ],
   "id": "CTL-37",
   "last_tested": "2026-07-15",
   "owner": "Network Engineering",
   "status": "partial",
   "title": "Remote access security"
  },
  {
   "domain": "Detect",
   "effectiveness": 0.8,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.15"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC7.2"
    },
    {
     "framework": "NIS2",
     "ref": "Art.21(2)(b)"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "10.5.1"
    }
   ],
   "id": "CTL-38",
   "last_tested": "2026-05-11",
   "owner": "Security Operations",
   "status": "implemented",
   "title": "Log retention for regulators"
  },
  {
   "domain": "Identify",
   "effectiveness": 0.8,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.29"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC4.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "ID.RA-01"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "11.4.1"
    }
   ],
   "id": "CTL-39",
   "last_tested": "2026-04-06",
   "owner": "Professional Services",
   "status": "implemented",
   "title": "Penetration testing programme"
  },
  {
   "domain": "Protect",
   "effectiveness": 0.75,
   "framework_refs": [
    {
     "framework": "ISO 27001:2022",
     "ref": "A.8.32"
    },
    {
     "framework": "SOC 2 Type II",
     "ref": "CC8.1"
    },
    {
     "framework": "NIST CSF 2.0",
     "ref": "PR.PS-01"
    },
    {
     "framework": "PCI DSS 4.0",
     "ref": "6.5.1"
    }
   ],
   "id": "CTL-40",
   "last_tested": "2026-06-14",
   "owner": "IT Operations",
   "status": "implemented",
   "title": "Change management"
  }
 ],
 "cyber_risks": [
  {
   "asset_ids": [
    "AWS-ECS-PORTAL-API",
    "AWS-ALB-PORTAL"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02",
    "CTL-17"
   ],
   "cvss": 9.8,
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "epss": 0.71,
   "exploitability": "known_exploited",
   "first_seen": "2026-09-08",
   "id": "CR-001",
   "mitre_techniques": [
    "T1190"
   ],
   "owner": "Portal Engineering",
   "remediation": {
    "action": "Upgrade API framework to fixed release and redeploy",
    "cost_usd": 40000,
    "effort": "medium",
    "eta_days": 10
   },
   "scenario_ids": [
    "RS-EXFIL",
    "RS-DOS"
   ],
   "severity": "critical",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Critical deserialization flaw in portal API framework",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-2026-0412"
  },
  {
   "asset_ids": [
    "SEC-WAF",
    "AWS-ALB-PORTAL"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-17"
   ],
   "dimensions": [
    "availability",
    "integrity"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-14",
   "id": "CR-002",
   "mitre_techniques": [
    "T1190"
   ],
   "owner": "Security Engineering",
   "remediation": {
    "action": "Switch managed rule sets to blocking after 7-day tuning",
    "cost_usd": 8000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-DOS",
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Portal WAF running in detection-only mode",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-S3-PORTAL-EXP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-05",
    "CTL-20"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-09-19",
   "id": "CR-003",
   "mitre_techniques": [
    "T1530"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Enable Block Public Access; rotate pre-signed URL keys; review access logs",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 1
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "critical",
   "source": "CSPM",
   "status": "open",
   "title": "Portal export bucket allows public object listing",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AWS-RDS-PORTAL"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-16",
    "CTL-05"
   ],
   "dimensions": [
    "confidentiality",
    "availability"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-02",
   "id": "CR-004",
   "mitre_techniques": [
    "T1133"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Restrict security group to bastion; enforce IAM auth",
    "cost_usd": 6000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-EXFIL",
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Portal database admin endpoint reachable from the internet",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AZ-APPGW-PORTAL-EU"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-18"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-05-11",
   "id": "CR-005",
   "mitre_techniques": [
    "T1557"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply TLS 1.2+ policy",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 2
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "EU portal gateway allows legacy TLS 1.0/1.1",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-EKS-MDR",
    "AWS-MSK-MDR"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-15"
   ],
   "dimensions": [
    "availability"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-06-03",
   "id": "CR-010",
   "mitre_techniques": [],
   "owner": "SOC Engineering",
   "remediation": {
    "action": "Re-deploy node groups and brokers across three AZs",
    "cost_usd": 120000,
    "effort": "high",
    "eta_days": 45
   },
   "scenario_ids": [
    "RS-OUTAGE",
    "RS-DOS"
   ],
   "severity": "high",
   "source": "Architecture review",
   "status": "open",
   "title": "MDR ingestion cluster deployed in a single availability zone",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-BOS-SOAR01",
    "SRV-BOS-DC01"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-SOC"
   ],
   "control_ids": [
    "CTL-07"
   ],
   "dimensions": [
    "confidentiality",
    "integrity",
    "availability"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-21",
   "id": "CR-011",
   "mitre_techniques": [
    "T1078.002"
   ],
   "owner": "SOC Engineering",
   "remediation": {
    "action": "Replace with scoped gMSA and just-in-time elevation",
    "cost_usd": 25000,
    "effort": "medium",
    "eta_days": 21
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-ATO"
   ],
   "severity": "critical",
   "source": "Identity posture scan",
   "status": "open",
   "title": "SOAR service account holds domain-admin privileges",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-BOS-JMP01",
    "SRV-DUB-JMP01",
    "SRV-SIN-JMP01"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-SOC"
   ],
   "control_ids": [
    "CTL-10"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-26",
   "id": "CR-012",
   "mitre_techniques": [
    "T1562.001"
   ],
   "owner": "Security Operations",
   "remediation": {
    "action": "Re-enable tamper protection via policy; alert on change",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 2
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "EDR console",
   "status": "open",
   "title": "EDR tamper protection disabled on SOC jump hosts",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-COLLAB",
    "SAAS-IDP"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-SALES",
    "PPL-EXEC"
   ],
   "control_ids": [
    "CTL-06",
    "CTL-30"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-09-24",
   "id": "CR-013",
   "mitre_techniques": [
    "T1528"
   ],
   "owner": "Security Operations",
   "remediation": {
    "action": "Revoke grant, restrict user consent to verified publishers, review mailbox access logs",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 1
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-EXFIL",
    "RS-PHISH"
   ],
   "severity": "high",
   "source": "SOC alert (CASB)",
   "status": "open",
   "title": "Unverified OAuth application granted mailbox read consent",
   "type": "ioa"
  },
  {
   "asset_ids": [
    "SRV-SIN-JMP01"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-SOC"
   ],
   "control_ids": [
    "CTL-12",
    "CTL-16"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-09-27",
   "id": "CR-014",
   "indicator": "198.51.100.23",
   "mitre_techniques": [
    "T1071.001"
   ],
   "owner": "Security Operations",
   "remediation": {
    "action": "Isolate host, run IRTriage full collection, re-image after review",
    "cost_usd": 15000,
    "effort": "medium",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "SOC alert (network)",
   "status": "open",
   "title": "SOC jump host contacted infrastructure on a threat-intel blocklist",
   "type": "ioc"
  },
  {
   "asset_ids": [
    "NET-DUB-VPN01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02",
    "CTL-37"
   ],
   "cvss": 9.6,
   "dimensions": [
    "confidentiality",
    "integrity",
    "availability"
   ],
   "epss": 0.84,
   "exploitability": "known_exploited",
   "first_seen": "2026-09-12",
   "id": "CR-015",
   "mitre_techniques": [
    "T1133",
    "T1190"
   ],
   "owner": "Network Engineering",
   "remediation": {
    "action": "Apply hotfix in emergency change window; rotate VPN certificates",
    "cost_usd": 10000,
    "effort": "low",
    "eta_days": 2
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-ATO",
    "RS-DOS"
   ],
   "severity": "critical",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Remote-access VPN appliance missing vendor hotfix",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-2026-0388"
  },
  {
   "asset_ids": [
    "AI-TRIAGE"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-SOC"
   ],
   "control_ids": [
    "CTL-30"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-14",
   "id": "CR-016",
   "mitre_techniques": [
    "AML.T0051"
   ],
   "owner": "AI Platform",
   "remediation": {
    "action": "Add input isolation and output policy checks; keep analyst-in-the-loop for actions",
    "cost_usd": 30000,
    "effort": "medium",
    "eta_days": 30
   },
   "scenario_ids": [
    "RS-AI"
   ],
   "severity": "high",
   "source": "AI red-team review",
   "status": "open",
   "title": "Alert-triage model processes customer email without prompt-injection filtering",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-CODE",
    "CICD-RUNNER-01",
    "CICD-RUNNER-02"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-ENG",
    "PRC-SIGN"
   ],
   "control_ids": [
    "CTL-21",
    "CTL-24"
   ],
   "dimensions": [
    "integrity",
    "delivery",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-30",
   "id": "CR-020",
   "mitre_techniques": [
    "T1552.001"
   ],
   "owner": "Platform Engineering",
   "remediation": {
    "action": "Move to short-lived OIDC credentials with least-privilege scopes",
    "cost_usd": 20000,
    "effort": "medium",
    "eta_days": 14
   },
   "scenario_ids": [
    "RS-SUPPLY"
   ],
   "severity": "critical",
   "source": "Code-hosting audit",
   "status": "open",
   "title": "CI token with organisation-admin scope used by release workflows",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "CICD-RUNNER-03",
    "CICD-RUNNER-04",
    "CICD-RUNNER-05",
    "CICD-RUNNER-06"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-24"
   ],
   "dimensions": [
    "integrity",
    "delivery"
   ],
   "exploitability": "poc",
   "first_seen": "2026-06-17",
   "id": "CR-021",
   "mitre_techniques": [
    "T1195.002"
   ],
   "owner": "Platform Engineering",
   "remediation": {
    "action": "Separate runner groups; use ephemeral runners for public repos",
    "cost_usd": 18000,
    "effort": "medium",
    "eta_days": 14
   },
   "scenario_ids": [
    "RS-SUPPLY"
   ],
   "severity": "high",
   "source": "Code-hosting audit",
   "status": "open",
   "title": "Self-hosted runners shared between public and private repositories",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "CICD-ARGO",
    "CICD-ARTIFACTS"
   ],
   "closed_on": null,
   "component_ids": [
    "PRC-SIGN",
    "PRC-CAB"
   ],
   "control_ids": [
    "CTL-23"
   ],
   "dimensions": [
    "integrity",
    "compliance",
    "delivery"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-05-06",
   "id": "CR-022",
   "mitre_techniques": [
    "T1195.002"
   ],
   "owner": "Platform Engineering",
   "remediation": {
    "action": "Enforce signature verification admission policy",
    "cost_usd": 22000,
    "effort": "medium",
    "eta_days": 21
   },
   "scenario_ids": [
    "RS-SUPPLY"
   ],
   "severity": "high",
   "source": "Architecture review",
   "status": "open",
   "title": "Deploy pipeline accepts unsigned artifacts",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-CODE",
    "CICD-VAULT"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-21"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-09-03",
   "id": "CR-023",
   "mitre_techniques": [
    "T1552.001"
   ],
   "owner": "Platform Engineering",
   "remediation": {
    "action": "Rotate the 14 exposed secrets; enable push protection",
    "cost_usd": 6000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-SUPPLY",
    "RS-ATO"
   ],
   "severity": "high",
   "source": "Secret scanning",
   "status": "open",
   "title": "Credentials present in repository history",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "SRV-TLV-BLD01",
    "SRV-TLV-BLD02",
    "AWS-EKS-TIP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02",
    "CTL-22"
   ],
   "cvss": 8.8,
   "dimensions": [
    "integrity",
    "availability"
   ],
   "epss": 0.22,
   "exploitability": "poc",
   "first_seen": "2026-08-21",
   "id": "CR-024",
   "mitre_techniques": [
    "T1195.001"
   ],
   "owner": "Engineering",
   "remediation": {
    "action": "Bump dependency and rebuild affected images",
    "cost_usd": 7000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-SUPPLY",
    "RS-THIRD"
   ],
   "severity": "high",
   "source": "SCA scan",
   "status": "open",
   "title": "Critical vulnerability in build-time dependency of TIP release",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-2026-0397"
  },
  {
   "asset_ids": [
    "SAAS-IDP",
    "SEC-PAM"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-IDADM",
    "PRC-ACR"
   ],
   "control_ids": [
    "CTL-06",
    "CTL-07"
   ],
   "dimensions": [
    "confidentiality",
    "integrity",
    "compliance"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-06-25",
   "id": "CR-030",
   "mitre_techniques": [
    "T1078"
   ],
   "owner": "Identity Team",
   "remediation": {
    "action": "Enforce phishing-resistant MFA conditional access for admin roles",
    "cost_usd": 9000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "critical",
   "source": "Identity posture scan",
   "status": "open",
   "title": "MFA not enforced for 11 privileged accounts",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-IDP",
    "SAAS-HRIS",
    "SRV-BOS-HR01"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-HR",
    "PRC-DEPROV"
   ],
   "control_ids": [
    "CTL-08"
   ],
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-09",
   "id": "CR-031",
   "mitre_techniques": [
    "T1078"
   ],
   "owner": "People & HR",
   "remediation": {
    "action": "Automate HRIS-to-IdP deprovisioning; disable stale accounts",
    "cost_usd": 15000,
    "effort": "medium",
    "eta_days": 14
   },
   "scenario_ids": [
    "RS-INSIDER",
    "RS-ATO"
   ],
   "severity": "high",
   "source": "Access review",
   "status": "open",
   "title": "23 leaver accounts still enabled beyond 24 h",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-IDP",
    "AZ-SQL-FIN"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-FIN"
   ],
   "control_ids": [
    "CTL-06",
    "CTL-12"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-09-22",
   "id": "CR-032",
   "mitre_techniques": [
    "T1078.004"
   ],
   "owner": "Security Operations",
   "remediation": {
    "action": "Reset credentials and sessions; confirm with user; review finance DB audit",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 1
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-FRAUD"
   ],
   "severity": "medium",
   "source": "SOC alert (identity)",
   "status": "open",
   "title": "Impossible-travel sign-in for a finance administrator",
   "type": "ioa"
  },
  {
   "asset_ids": [
    "SRV-BOS-DC01",
    "SRV-BOS-DC02",
    "SRV-DUB-DC01",
    "SRV-SIN-DC01",
    "SRV-TLV-DC01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.1,
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "epss": 0.35,
   "exploitability": "poc",
   "first_seen": "2026-08-12",
   "id": "CR-033",
   "mitre_techniques": [
    "T1210"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Patch DCs in rolling maintenance",
    "cost_usd": 6000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Domain controllers missing cumulative security update",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-2026-0351"
  },
  {
   "asset_ids": [
    "AZ-APP-BILLING",
    "SAAS-PAY"
   ],
   "closed_on": null,
   "component_ids": [
    "PRC-RECON"
   ],
   "control_ids": [
    "CTL-28"
   ],
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-04-15",
   "id": "CR-040",
   "mitre_techniques": [
    "T1185"
   ],
   "owner": "Finance Systems",
   "remediation": {
    "action": "Script inventory, SRI/CSP and change-detection per PCI 6.4.3 / 11.6.1",
    "cost_usd": 35000,
    "effort": "medium",
    "eta_days": 30
   },
   "scenario_ids": [
    "RS-FRAUD",
    "RS-THIRD"
   ],
   "severity": "high",
   "source": "PCI readiness assessment",
   "status": "open",
   "title": "Payment page loads third-party scripts without integrity controls",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-DUB-SQL01",
    "SEC-BACKUP",
    "SRV-BOS-BKP01"
   ],
   "closed_on": null,
   "component_ids": [
    "PRC-RESTORE"
   ],
   "control_ids": [
    "CTL-14"
   ],
   "dimensions": [
    "availability",
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-03-03",
   "id": "CR-041",
   "mitre_techniques": [
    "T1490"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Enable object-lock vault copies; quarterly restore test",
    "cost_usd": 28000,
    "effort": "medium",
    "eta_days": 30
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "BCP review",
   "status": "open",
   "title": "Finance database backups are not immutable",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-BOS-LEGACY01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 7.5,
   "dimensions": [
    "availability",
    "integrity"
   ],
   "epss": 0.08,
   "exploitability": "theoretical",
   "first_seen": "2025-10-10",
   "id": "CR-042",
   "mitre_techniques": [
    "T1210"
   ],
   "owner": "Finance Systems",
   "remediation": {
    "action": "Migrate to supported platform (approved FY27 project)",
    "cost_usd": 140000,
    "effort": "high",
    "eta_days": 120
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "Asset inventory",
   "status": "accepted",
   "title": "Legacy ERP server on end-of-support operating system",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-EOS-2012R2"
  },
  {
   "asset_ids": [
    "AZ-SYN-BI",
    "SAAS-BI"
   ],
   "closed_on": null,
   "component_ids": [
    "PRC-ACR"
   ],
   "control_ids": [
    "CTL-20",
    "CTL-07"
   ],
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "exploitability": "poc",
   "first_seen": "2026-06-09",
   "id": "CR-050",
   "mitre_techniques": [
    "T1078.004"
   ],
   "owner": "Data Platform",
   "remediation": {
    "action": "Row-level security and scoped service principals",
    "cost_usd": 16000,
    "effort": "medium",
    "eta_days": 21
   },
   "scenario_ids": [
    "RS-INSIDER",
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "Data access review",
   "status": "open",
   "title": "BI service principal can read all HR datasets",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AZ-STG-BI"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-05",
    "CTL-16"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-01",
   "id": "CR-051",
   "mitre_techniques": [
    "T1530"
   ],
   "owner": "Data Platform",
   "remediation": {
    "action": "Private endpoints only",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Data-lake storage account allows public network access",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AI-ASSIST"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-EXEC",
    "DATA-HR",
    "DATA-CONTRACT"
   ],
   "control_ids": [
    "CTL-30",
    "CTL-20"
   ],
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-05",
   "id": "CR-052",
   "mitre_techniques": [
    "AML.T0057"
   ],
   "owner": "AI Platform",
   "remediation": {
    "action": "Permission-aware retrieval; remove HR corpus pending DPIA",
    "cost_usd": 24000,
    "effort": "medium",
    "eta_days": 21
   },
   "scenario_ids": [
    "RS-AI",
    "RS-INSIDER"
   ],
   "severity": "high",
   "source": "AI governance review",
   "status": "open",
   "title": "LLM assistant retrieval index includes HR records and customer contracts without access trimming",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AI-SALES",
    "SAAS-CRM"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-21",
    "CTL-30"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-09-10",
   "id": "CR-053",
   "mitre_techniques": [
    "T1552.001"
   ],
   "owner": "AI Platform",
   "remediation": {
    "action": "Proxy calls through backend with per-user tokens; rotate key",
    "cost_usd": 8000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-AI",
    "RS-THIRD"
   ],
   "severity": "medium",
   "source": "Secret scanning",
   "status": "open",
   "title": "Sales copilot extension embeds a long-lived model API key",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "EP-SIN-0071",
    "EP-SIN-0072",
    "EP-SIN-0076",
    "EP-SIN-0078",
    "EP-SIN-0079",
    "EP-SIN-0082",
    "EP-SIN-0085",
    "EP-SIN-0090",
    "EP-SIN-0353",
    "EP-SIN-0354",
    "EP-SIN-0366",
    "EP-SIN-0458",
    "EP-SIN-0497",
    "EP-SIN-0498"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-10"
   ],
   "dimensions": [
    "integrity",
    "compliance"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-18",
   "id": "CR-060",
   "mitre_techniques": [
    "T1562.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Deploy agent via MDM; block network access for unmanaged devices",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "IRTriage inventory vs EDR console",
   "status": "open",
   "title": "EDR agent missing on APAC endpoints",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "EP-TLV-0093",
    "EP-TLV-0094",
    "EP-TLV-0095",
    "EP-TLV-0096",
    "EP-TLV-0097",
    "EP-TLV-0098",
    "EP-TLV-0099",
    "EP-TLV-0100",
    "EP-TLV-0101",
    "EP-TLV-0102",
    "EP-TLV-0103",
    "EP-TLV-0104",
    "EP-TLV-0105",
    "EP-TLV-0106",
    "EP-TLV-0107",
    "EP-TLV-0108",
    "EP-TLV-0109",
    "EP-TLV-0110",
    "EP-TLV-0111",
    "EP-TLV-0112",
    "EP-TLV-0113",
    "EP-TLV-0114",
    "EP-TLV-0115",
    "EP-TLV-0116",
    "EP-TLV-0117",
    "EP-TLV-0118",
    "EP-TLV-0119",
    "EP-TLV-0120",
    "EP-TLV-0121",
    "EP-TLV-0122",
    "EP-TLV-0123",
    "EP-TLV-0124",
    "EP-TLV-0125",
    "EP-TLV-0126",
    "EP-TLV-0127",
    "EP-TLV-0128",
    "EP-TLV-0129",
    "EP-TLV-0130",
    "EP-TLV-0131",
    "EP-TLV-0132",
    "EP-TLV-0133",
    "EP-TLV-0134",
    "EP-TLV-0135",
    "EP-TLV-0136",
    "EP-TLV-0137",
    "EP-TLV-0138",
    "EP-TLV-0139",
    "EP-TLV-0140",
    "EP-TLV-0141",
    "EP-TLV-0142",
    "EP-TLV-0143",
    "EP-TLV-0144",
    "EP-TLV-0145",
    "EP-TLV-0146",
    "EP-TLV-0147",
    "EP-TLV-0148",
    "EP-TLV-0149",
    "EP-TLV-0150",
    "EP-TLV-0151",
    "EP-TLV-0152",
    "EP-TLV-0153",
    "EP-TLV-0154",
    "EP-TLV-0155",
    "EP-TLV-0156"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-07",
    "CTL-04"
   ],
   "dimensions": [
    "integrity"
   ],
   "exploitability": "poc",
   "first_seen": "2025-11-20",
   "id": "CR-061",
   "mitre_techniques": [
    "T1078.003"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Just-in-time elevation tool",
    "cost_usd": 20000,
    "effort": "medium",
    "eta_days": 45
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-SUPPLY"
   ],
   "severity": "medium",
   "source": "Endpoint posture",
   "status": "in_progress",
   "title": "Local administrator rights on developer laptops",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "IOT-BOS-BADGE01",
    "IOT-BOS-BADGE02",
    "IOT-BOS-BADGE03",
    "IOT-BOS-BADGE04",
    "IOT-BOS-BADGE05",
    "IOT-BOS-BADGE06",
    "IOT-BOS-BADGE07",
    "IOT-BOS-BADGE08"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-29",
    "CTL-35"
   ],
   "cvss": 7.2,
   "dimensions": [
    "availability",
    "compliance"
   ],
   "epss": 0.05,
   "exploitability": "theoretical",
   "first_seen": "2026-02-14",
   "id": "CR-062",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Replace controllers (capex approved)",
    "cost_usd": 60000,
    "effort": "high",
    "eta_days": 90
   },
   "scenario_ids": [
    "RS-INSIDER"
   ],
   "severity": "medium",
   "source": "Network discovery",
   "status": "open",
   "title": "HQ badge-reader controllers on end-of-life firmware",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-IOT-0022"
  },
  {
   "asset_ids": [
    "IOT-BOS-CONF01",
    "IOT-BOS-CONF02",
    "IOT-DUB-CONF01",
    "IOT-SIN-CONF01",
    "IOT-TLV-CONF01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-29",
    "CTL-04"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-05-27",
   "id": "CR-063",
   "mitre_techniques": [
    "T1078.001"
   ],
   "owner": "Facilities",
   "remediation": {
    "action": "Rotate credentials; move to IoT VLAN",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Network discovery",
   "status": "open",
   "title": "Conference-room systems use vendor default credentials",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "NET-SIN-FWMGMT",
    "NET-SIN-FW01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-16",
    "CTL-37"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-09-15",
   "id": "CR-064",
   "mitre_techniques": [
    "T1133"
   ],
   "owner": "Network Engineering",
   "remediation": {
    "action": "Restrict management plane to admin VPN",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 1
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-DOS"
   ],
   "severity": "high",
   "source": "Attack-surface scan",
   "status": "open",
   "title": "APAC firewall management interface exposed to the internet",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "EP-REM-0279",
    "EP-REM-0280"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04",
    "CTL-10"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-09-18",
   "id": "CR-065",
   "mitre_techniques": [
    "T1219"
   ],
   "owner": "Security Operations",
   "remediation": {
    "action": "Remove tool, collect triage, confirm no customer data accessed",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 2
   },
   "scenario_ids": [
    "RS-EXFIL",
    "RS-INSIDER"
   ],
   "severity": "medium",
   "source": "IRTriage triage (Professional Services laptops)",
   "status": "open",
   "title": "Unapproved remote-access tool found on two consultant laptops",
   "type": "incident_finding"
  },
  {
   "asset_ids": [
    "GCP-GCS-TIP-FEEDS"
   ],
   "closed_on": null,
   "component_ids": [
    "PRC-FEEDVAL"
   ],
   "control_ids": [
    "CTL-25",
    "CTL-05"
   ],
   "dimensions": [
    "integrity",
    "availability"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-29",
   "id": "CR-066",
   "mitre_techniques": [
    "T1565.001"
   ],
   "owner": "Threat Research",
   "remediation": {
    "action": "Remove binding; require signed feed manifests",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 2
   },
   "scenario_ids": [
    "RS-THIRD",
    "RS-SUPPLY"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "TIP feed bucket grants write access to a decommissioned partner account",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ALB-PORTAL",
    "AWS-APIGW-TIP",
    "WEB-CDN"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-17",
    "CTL-15"
   ],
   "dimensions": [
    "availability"
   ],
   "exploitability": "poc",
   "first_seen": "2026-06-20",
   "id": "CR-070",
   "mitre_techniques": [
    "T1498"
   ],
   "owner": "Security Engineering",
   "remediation": {
    "action": "Enrol all edges in managed DDoS protection with always-on detection and a response runbook",
    "cost_usd": 90000,
    "effort": "medium",
    "eta_days": 30
   },
   "scenario_ids": [
    "RS-DOS"
   ],
   "severity": "high",
   "source": "Architecture review",
   "status": "open",
   "title": "No volumetric DDoS protection on customer-facing edges (portal, TIP API, website)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "WEB-ORIGIN"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-16",
    "CTL-17"
   ],
   "dimensions": [
    "availability"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-11",
   "id": "CR-071",
   "mitre_techniques": [
    "T1499"
   ],
   "owner": "Marketing Technology",
   "remediation": {
    "action": "Accept origin traffic from the CDN only; add origin authentication header",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-DOS"
   ],
   "severity": "medium",
   "source": "Attack-surface scan",
   "status": "open",
   "title": "Corporate website origin reachable directly, bypassing the CDN",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AWS-APIGW-TIP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-17"
   ],
   "dimensions": [
    "availability"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-02",
   "id": "CR-072",
   "mitre_techniques": [
    "T1499"
   ],
   "owner": "Platform Engineering",
   "remediation": {
    "action": "Usage plans with per-key throttling and burst limits",
    "cost_usd": 9000,
    "effort": "low",
    "eta_days": 10
   },
   "scenario_ids": [
    "RS-DOS"
   ],
   "severity": "high",
   "source": "API gateway review",
   "status": "open",
   "title": "No per-client rate limiting on the TIP public API",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ALB-PORTAL",
    "SEC-WAF"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-12",
    "CTL-17"
   ],
   "dimensions": [
    "availability"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-09-06",
   "id": "CR-073",
   "mitre_techniques": [
    "T1499"
   ],
   "owner": "Security Operations",
   "remediation": {
    "action": "Tune WAF rate rules, enable bot management, confirm no account-guessing component",
    "cost_usd": 6000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-DOS"
   ],
   "severity": "medium",
   "source": "SOC alert (edge)",
   "status": "open",
   "title": "Recurring request-rate anomalies against the customer portal login (3 episodes in September)",
   "type": "ioa"
  },
  {
   "asset_ids": [
    "SAAS-IDP"
   ],
   "closed_on": null,
   "component_ids": [
    "PPL-FIN",
    "PPL-EXEC",
    "PPL-SALES"
   ],
   "control_ids": [
    "CTL-06",
    "CTL-26"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-09-16",
   "id": "CR-074",
   "mitre_techniques": [
    "T1078"
   ],
   "owner": "Security Operations",
   "remediation": {
    "action": "Force password resets, confirm MFA enrolment, watch sign-ins for 30 days",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 2
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-PHISH"
   ],
   "severity": "high",
   "source": "Threat-intel monitoring",
   "status": "open",
   "title": "Staff credentials present in third-party breach data (12 accounts, 2 in finance)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "EP-BOS-0325",
    "EP-BOS-0021",
    "EP-BOS-0392",
    "EP-BOS-0480",
    "EP-BOS-0237",
    "EP-BOS-0475",
    "EP-BOS-0432",
    "EP-BOS-0393",
    "EP-BOS-0463",
    "EP-BOS-0007",
    "EP-BOS-0026",
    "EP-BOS-0428",
    "EP-BOS-0390",
    "EP-BOS-0427",
    "EP-BOS-0479",
    "EP-BOS-0243",
    "EP-BOS-0435",
    "EP-BOS-0039",
    "EP-BOS-0477",
    "EP-BOS-0476"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.1,
   "dimensions": [
    "integrity",
    "availability",
    "compliance"
   ],
   "epss": 0.18,
   "exploitability": "poc",
   "first_seen": "2025-11-15",
   "id": "CR-100",
   "mitre_techniques": [
    "T1203"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Force-install via MDM with deadline",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Patch management",
   "status": "open",
   "title": "Critical OS updates > 30 days overdue on 20 endpoints (BOS)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-OSCU-BOS"
  },
  {
   "asset_ids": [
    "EP-BOS-0332",
    "EP-BOS-0237",
    "EP-BOS-0171",
    "EP-BOS-0003",
    "EP-BOS-0430",
    "EP-BOS-0419",
    "EP-BOS-0328",
    "EP-BOS-0463",
    "EP-BOS-0414",
    "EP-BOS-0011",
    "EP-BOS-0314",
    "EP-BOS-0021"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.8,
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "epss": 0.62,
   "exploitability": "known_exploited",
   "first_seen": "2026-09-14",
   "id": "CR-101",
   "mitre_techniques": [
    "T1189"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Auto-update browsers; restart enforcement",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Browser with known-exploited flaw on 12 endpoints (BOS)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-BRW-BOS"
  },
  {
   "asset_ids": [
    "EP-DUB-0069",
    "EP-DUB-0048",
    "EP-DUB-0190",
    "EP-DUB-0272",
    "EP-DUB-0065",
    "EP-DUB-0451",
    "EP-DUB-0489",
    "EP-DUB-0259",
    "EP-DUB-0339",
    "EP-DUB-0257",
    "EP-DUB-0229"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.1,
   "dimensions": [
    "integrity",
    "availability",
    "compliance"
   ],
   "epss": 0.18,
   "exploitability": "poc",
   "first_seen": "2026-05-26",
   "id": "CR-102",
   "mitre_techniques": [
    "T1203"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Force-install via MDM with deadline",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Patch management",
   "status": "open",
   "title": "Critical OS updates > 30 days overdue on 11 endpoints (DUB)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-OSCU-DUB"
  },
  {
   "asset_ids": [
    "EP-DUB-0275",
    "EP-DUB-0408",
    "EP-DUB-0447",
    "EP-DUB-0343",
    "EP-DUB-0043",
    "EP-DUB-0193",
    "EP-DUB-0063"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.8,
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "epss": 0.62,
   "exploitability": "known_exploited",
   "first_seen": "2026-09-11",
   "id": "CR-103",
   "mitre_techniques": [
    "T1189"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Auto-update browsers; restart enforcement",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Browser with known-exploited flaw on 7 endpoints (DUB)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-BRW-DUB"
  },
  {
   "asset_ids": [
    "EP-SIN-0458",
    "EP-SIN-0368",
    "EP-SIN-0078",
    "EP-SIN-0457",
    "EP-SIN-0493",
    "EP-SIN-0071",
    "EP-SIN-0495",
    "EP-SIN-0358",
    "EP-SIN-0359",
    "EP-SIN-0347",
    "EP-SIN-0082",
    "EP-SIN-0086",
    "EP-SIN-0497"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.1,
   "dimensions": [
    "integrity",
    "availability",
    "compliance"
   ],
   "epss": 0.18,
   "exploitability": "poc",
   "first_seen": "2026-04-13",
   "id": "CR-104",
   "mitre_techniques": [
    "T1203"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Force-install via MDM with deadline",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "Patch management",
   "status": "open",
   "title": "Critical OS updates > 30 days overdue on 13 endpoints (SIN)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-OSCU-SIN"
  },
  {
   "asset_ids": [
    "EP-SIN-0077",
    "EP-SIN-0079",
    "EP-SIN-0454",
    "EP-SIN-0071"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.8,
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "epss": 0.62,
   "exploitability": "known_exploited",
   "first_seen": "2026-09-03",
   "id": "CR-105",
   "mitre_techniques": [
    "T1189"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Auto-update browsers; restart enforcement",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Browser with known-exploited flaw on 4 endpoints (SIN)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-BRW-SIN"
  },
  {
   "asset_ids": [
    "EP-TLV-0219",
    "EP-TLV-0136",
    "EP-TLV-0103",
    "EP-TLV-0093",
    "EP-TLV-0106",
    "EP-TLV-0160",
    "EP-TLV-0101",
    "EP-TLV-0125",
    "EP-TLV-0132"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.1,
   "dimensions": [
    "integrity",
    "availability",
    "compliance"
   ],
   "epss": 0.18,
   "exploitability": "poc",
   "first_seen": "2026-01-24",
   "id": "CR-106",
   "mitre_techniques": [
    "T1203"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Force-install via MDM with deadline",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Patch management",
   "status": "open",
   "title": "Critical OS updates > 30 days overdue on 9 endpoints (TLV)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-OSCU-TLV"
  },
  {
   "asset_ids": [
    "EP-TLV-0221",
    "EP-TLV-0130",
    "EP-TLV-0110",
    "EP-TLV-0096",
    "EP-TLV-0460"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.8,
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "epss": 0.62,
   "exploitability": "known_exploited",
   "first_seen": "2026-09-16",
   "id": "CR-107",
   "mitre_techniques": [
    "T1189"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Auto-update browsers; restart enforcement",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Browser with known-exploited flaw on 5 endpoints (TLV)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-BRW-TLV"
  },
  {
   "asset_ids": [
    "EP-REM-0383",
    "EP-REM-0281",
    "EP-REM-0292",
    "EP-REM-0208"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.1,
   "dimensions": [
    "integrity",
    "availability",
    "compliance"
   ],
   "epss": 0.18,
   "exploitability": "poc",
   "first_seen": "2025-11-04",
   "id": "CR-108",
   "mitre_techniques": [
    "T1203"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Force-install via MDM with deadline",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Patch management",
   "status": "open",
   "title": "Critical OS updates > 30 days overdue on 4 endpoints (REM)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-OSCU-REM"
  },
  {
   "asset_ids": [
    "EP-REM-0376",
    "EP-REM-0279",
    "EP-REM-0203"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-03"
   ],
   "cvss": 8.8,
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "epss": 0.62,
   "exploitability": "known_exploited",
   "first_seen": "2026-09-24",
   "id": "CR-109",
   "mitre_techniques": [
    "T1189"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Auto-update browsers; restart enforcement",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Browser with known-exploited flaw on 3 endpoints (REM)",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-BRW-REM"
  },
  {
   "asset_ids": [
    "SRV-BOS-FS01",
    "SRV-SIN-UTL13"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "cvss": 7.3,
   "dimensions": [
    "integrity"
   ],
   "epss": 0.28,
   "exploitability": "theoretical",
   "first_seen": "2026-01-16",
   "id": "CR-110",
   "mitre_techniques": [
    "T1210"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 2000,
    "effort": "medium",
    "eta_days": 21
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "OpenSSH version with known vulnerability on 2 servers",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-001"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL21"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-01-17",
   "id": "CR-111",
   "mitre_techniques": [
    "T1557.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 8000,
    "effort": "low",
    "eta_days": 16
   },
   "scenario_ids": [
    "RS-ATO"
   ],
   "severity": "medium",
   "source": "Configuration audit",
   "status": "open",
   "title": "SMB signing not required on 1 server",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-DUB-UTL02",
    "SRV-BOS-UTL05",
    "SRV-TLV-BLD01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "cvss": 5.1,
   "dimensions": [
    "integrity"
   ],
   "epss": 0.12,
   "exploitability": "poc",
   "first_seen": "2026-02-19",
   "id": "CR-112",
   "mitre_techniques": [
    "T1210"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 13
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Configuration audit",
   "status": "open",
   "title": "OpenSSH version with known vulnerability on 3 servers",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-003"
  },
  {
   "asset_ids": [
    "SRV-DUB-UTL02",
    "SRV-BOS-DC01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04",
    "CTL-16"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2025-12-17",
   "id": "CR-113",
   "mitre_techniques": [
    "T1562.004"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 7000,
    "effort": "medium",
    "eta_days": 18
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "low",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Host firewall disabled on 2 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-SIN-UTL13",
    "SRV-BOS-UTL05",
    "SRV-SIN-UTL08"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-03-10",
   "id": "CR-114",
   "mitre_techniques": [
    "T1557.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 8000,
    "effort": "medium",
    "eta_days": 28
   },
   "scenario_ids": [
    "RS-ATO"
   ],
   "severity": "low",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "SMB signing not required on 3 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-DUB-PS01",
    "SRV-DUB-UTL17",
    "SRV-DUB-SQL01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-02-11",
   "id": "CR-115",
   "mitre_techniques": [
    "T1557.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 6000,
    "effort": "medium",
    "eta_days": 12
   },
   "scenario_ids": [
    "RS-ATO"
   ],
   "severity": "medium",
   "source": "Configuration audit",
   "status": "open",
   "title": "SMB signing not required on 3 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL11",
    "SRV-TLV-UTL14",
    "SRV-TLV-UTL09",
    "SRV-BOS-UTL05"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "cvss": 5.1,
   "dimensions": [
    "integrity"
   ],
   "epss": 0.04,
   "exploitability": "theoretical",
   "first_seen": "2026-08-17",
   "id": "CR-116",
   "mitre_techniques": [
    "T1210"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 3000,
    "effort": "medium",
    "eta_days": 28
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "Configuration audit",
   "status": "open",
   "title": "OpenSSH version with known vulnerability on 4 servers",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-007"
  },
  {
   "asset_ids": [
    "SRV-TLV-UTL19",
    "SRV-DUB-UTL07",
    "SRV-BOS-BKP01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "cvss": 5.6,
   "dimensions": [
    "integrity",
    "availability"
   ],
   "epss": 0.11,
   "exploitability": "poc",
   "first_seen": "2026-03-05",
   "id": "CR-117",
   "mitre_techniques": [
    "T1068"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 10
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "Configuration audit",
   "status": "open",
   "title": "Outdated management agent with known flaw on 3 servers",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-008"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL01",
    "SRV-TLV-BLD03",
    "SRV-TLV-UTL14"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04",
    "CTL-16"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-10-28",
   "id": "CR-118",
   "mitre_techniques": [
    "T1562.004"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 19
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "low",
   "source": "Configuration audit",
   "status": "open",
   "title": "Host firewall disabled on 3 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-TLV-BLD04",
    "SRV-SIN-UTL03"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04",
    "CTL-16"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2025-11-25",
   "id": "CR-119",
   "mitre_techniques": [
    "T1562.004"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 15
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "low",
   "source": "Configuration audit",
   "status": "open",
   "title": "Host firewall disabled on 2 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-SIN-FS01",
    "SRV-BOS-SOAR01",
    "SRV-TLV-UTL14",
    "SRV-BOS-UTL16"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-18"
   ],
   "cvss": 6.9,
   "dimensions": [
    "confidentiality"
   ],
   "epss": 0.02,
   "exploitability": "poc",
   "first_seen": "2026-02-06",
   "id": "CR-120",
   "mitre_techniques": [
    "T1557"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 30
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "Configuration audit",
   "status": "open",
   "title": "Weak TLS cipher suites enabled on 4 servers",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-011"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL16",
    "SRV-BOS-UTL01",
    "SRV-BOS-DC02"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-02-21",
   "id": "CR-121",
   "mitre_techniques": [
    "T1557.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 24
   },
   "scenario_ids": [
    "RS-ATO"
   ],
   "severity": "low",
   "source": "IRTriage collection",
   "status": "open",
   "title": "SMB signing not required on 3 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-TLV-BLD02"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-07"
   ],
   "dimensions": [
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-07-18",
   "id": "CR-122",
   "mitre_techniques": [
    "T1078.003"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 15
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-ATO"
   ],
   "severity": "medium",
   "source": "Configuration audit",
   "status": "open",
   "title": "Local admin password not rotated (no LAPS) on 1 server",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-TLV-BLD02",
    "SRV-SIN-DC01",
    "SRV-SIN-UTL08"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-07-27",
   "id": "CR-123",
   "mitre_techniques": [
    "T1557.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-ATO"
   ],
   "severity": "low",
   "source": "IRTriage collection",
   "status": "open",
   "title": "SMB signing not required on 3 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-DUB-PS01",
    "SRV-DUB-JMP01",
    "SRV-BOS-UTL15",
    "SRV-BOS-UTL10"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-07"
   ],
   "dimensions": [
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-07-13",
   "id": "CR-124",
   "mitre_techniques": [
    "T1078.003"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 7000,
    "effort": "low",
    "eta_days": 29
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-ATO"
   ],
   "severity": "medium",
   "source": "Configuration audit",
   "status": "open",
   "title": "Local admin password not rotated (no LAPS) on 4 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-BOS-FS01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-18"
   ],
   "cvss": 7.4,
   "dimensions": [
    "confidentiality"
   ],
   "epss": 0.08,
   "exploitability": "poc",
   "first_seen": "2026-03-09",
   "id": "CR-125",
   "mitre_techniques": [
    "T1557"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 1000,
    "effort": "medium",
    "eta_days": 16
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Weak TLS cipher suites enabled on 1 server",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-016"
  },
  {
   "asset_ids": [
    "SRV-DUB-UTL07",
    "SRV-BOS-FS01",
    "SRV-TLV-UTL14",
    "SRV-BOS-UTL11"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "cvss": 4.7,
   "dimensions": [
    "integrity",
    "availability"
   ],
   "epss": 0.29,
   "exploitability": "poc",
   "first_seen": "2025-11-23",
   "id": "CR-126",
   "mitre_techniques": [
    "T1068"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 6
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "low",
   "source": "Configuration audit",
   "status": "open",
   "title": "Outdated management agent with known flaw on 4 servers",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-017"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-21",
   "id": "CR-127",
   "mitre_techniques": [
    "T1557.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 3000,
    "effort": "medium",
    "eta_days": 21
   },
   "scenario_ids": [
    "RS-ATO"
   ],
   "severity": "medium",
   "source": "IRTriage collection",
   "status": "open",
   "title": "SMB signing not required on 1 server",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-TLV-DC01",
    "SRV-BOS-UTL11"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-18"
   ],
   "cvss": 6.5,
   "dimensions": [
    "confidentiality"
   ],
   "epss": 0.17,
   "exploitability": "poc",
   "first_seen": "2026-06-19",
   "id": "CR-128",
   "mitre_techniques": [
    "T1557"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 7000,
    "effort": "low",
    "eta_days": 3
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "Weak TLS cipher suites enabled on 2 servers",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-019"
  },
  {
   "asset_ids": [
    "SRV-SIN-FS01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04",
    "CTL-16"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-02-27",
   "id": "CR-129",
   "mitre_techniques": [
    "T1562.004"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 3000,
    "effort": "medium",
    "eta_days": 16
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "Configuration audit",
   "status": "open",
   "title": "Host firewall disabled on 1 server",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL05",
    "SRV-BOS-JMP01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "cvss": 6.8,
   "dimensions": [
    "integrity"
   ],
   "epss": 0.19,
   "exploitability": "theoretical",
   "first_seen": "2025-11-15",
   "id": "CR-130",
   "mitre_techniques": [
    "T1210"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 29
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "Vulnerability scanner",
   "status": "open",
   "title": "OpenSSH version with known vulnerability on 2 servers",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-021"
  },
  {
   "asset_ids": [
    "SRV-SIN-UTL03",
    "SRV-SIN-FS01",
    "SRV-BOS-UTL20",
    "SRV-TLV-BLD01"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-07-11",
   "id": "CR-131",
   "mitre_techniques": [
    "T1557.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 2000,
    "effort": "medium",
    "eta_days": 22
   },
   "scenario_ids": [
    "RS-ATO"
   ],
   "severity": "medium",
   "source": "IRTriage collection",
   "status": "open",
   "title": "SMB signing not required on 4 servers",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-TLV-BLD03"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "cvss": 5.1,
   "dimensions": [
    "integrity",
    "availability"
   ],
   "epss": 0.06,
   "exploitability": "poc",
   "first_seen": "2025-11-14",
   "id": "CR-132",
   "mitre_techniques": [
    "T1068"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 9
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "IRTriage collection",
   "status": "open",
   "title": "Outdated management agent with known flaw on 1 server",
   "type": "vulnerability",
   "vuln_id": "ACME-VULN-SRV-023"
  },
  {
   "asset_ids": [
    "SRV-TLV-BLD03"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-03-17",
   "id": "CR-133",
   "mitre_techniques": [
    "T1557.001"
   ],
   "owner": "IT Operations",
   "remediation": {
    "action": "Apply hardening baseline / update",
    "cost_usd": 3000,
    "effort": "medium",
    "eta_days": 12
   },
   "scenario_ids": [
    "RS-ATO"
   ],
   "severity": "medium",
   "source": "IRTriage collection",
   "status": "open",
   "title": "SMB signing not required on 1 server",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-GCS-TIP-FEEDS"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-19"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-06-15",
   "id": "CR-134",
   "mitre_techniques": [
    "T1530"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 2
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Unencrypted snapshot retained — gcp: gs://acme-tip-feeds",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-RDS-PORTAL"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity"
   ],
   "exploitability": "poc",
   "first_seen": "2025-11-16",
   "id": "CR-135",
   "mitre_techniques": [
    "T1611"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 14
   },
   "scenario_ids": [
    "RS-SUPPLY"
   ],
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Container images run as root — aws: portal-db (RDS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-SUB-BI"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-11",
    "CTL-05"
   ],
   "dimensions": [
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-06-04",
   "id": "CR-136",
   "mitre_techniques": [],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 9
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Access logging disabled — azure: analytics (subscription)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ECS-PORTAL-API"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-07",
    "CTL-05"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-27",
   "id": "CR-137",
   "mitre_techniques": [
    "T1098"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 4
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Over-permissive IAM role (wildcard actions) — aws: portal-api (ECS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-PRJ-TIP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-19"
   ],
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-11-23",
   "id": "CR-138",
   "mitre_techniques": [],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 17
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Encryption key rotation overdue — gcp: tip-analytics (project)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ACCT-TIP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-19"
   ],
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-08-25",
   "id": "CR-139",
   "mitre_techniques": [],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 18
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Encryption key rotation overdue — aws: tip-prod (account)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-SQL-FIN"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-07",
    "CTL-05"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-11-10",
   "id": "CR-140",
   "mitre_techniques": [
    "T1098"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 13
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Over-permissive IAM role (wildcard actions) — azure: fin-billing (Azure SQL)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-EKS-MDR"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-11"
   ],
   "dimensions": [
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-05-02",
   "id": "CR-141",
   "mitre_techniques": [
    "T1562.008"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 20
   },
   "scenario_ids": [
    "RS-INSIDER"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — aws: mdr-ingest (EKS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-APP-BILLING"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-11"
   ],
   "dimensions": [
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-06-11",
   "id": "CR-142",
   "mitre_techniques": [
    "T1562.008"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 3000,
    "effort": "low",
    "eta_days": 13
   },
   "scenario_ids": [
    "RS-INSIDER"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — azure: pay.acme.example (App Service)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-S3-MDR-TEL"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-16"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-04-05",
   "id": "CR-143",
   "mitre_techniques": [
    "T1133"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 4
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Management port open to 0.0.0.0/0 in non-production security group — aws: s3://acme-mdr-telemetry",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AWS-S3-LOGS"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-11",
    "CTL-05"
   ],
   "dimensions": [
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-02-16",
   "id": "CR-144",
   "mitre_techniques": [],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 6
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Access logging disabled — aws: s3://acme-central-logs",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ACCT-MDR"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-07",
    "CTL-05"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-08-02",
   "id": "CR-145",
   "mitre_techniques": [
    "T1098"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 4
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Over-permissive IAM role (wildcard actions) — aws: mdr-prod (account)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ECS-PORTAL-API"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-04"
   ],
   "dimensions": [
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-05-09",
   "id": "CR-146",
   "mitre_techniques": [
    "T1611"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-SUPPLY"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Container images run as root — aws: portal-api (ECS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-RDS-TIP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-19"
   ],
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "exploitability": "poc",
   "first_seen": "2026-01-10",
   "id": "CR-147",
   "mitre_techniques": [],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 14
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Encryption key rotation overdue — aws: tip-db (RDS PostgreSQL)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-AKS-PS"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-14"
   ],
   "dimensions": [
    "availability"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-08-26",
   "id": "CR-148",
   "mitre_techniques": [
    "T1485"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 21
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-OUTAGE"
   ],
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Deletion protection disabled — azure: ps-tooling (AKS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "WEB-ORIGIN"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-19"
   ],
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-11-11",
   "id": "CR-149",
   "mitre_techniques": [],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 9
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Encryption key rotation overdue — aws: www-origin (marketing CMS origin)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ACCT-MDR"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-16"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-11",
   "id": "CR-150",
   "mitre_techniques": [
    "T1133"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Management port open to 0.0.0.0/0 in non-production security group — aws: mdr-prod (account)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AZ-SUB-CORP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-14"
   ],
   "dimensions": [
    "availability"
   ],
   "exploitability": "poc",
   "first_seen": "2025-11-03",
   "id": "CR-151",
   "mitre_techniques": [
    "T1485"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 15
   },
   "scenario_ids": [
    "RS-RANSOM",
    "RS-OUTAGE"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Deletion protection disabled — azure: corp (subscription)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-RDS-TIP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-16"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-07-25",
   "id": "CR-152",
   "mitre_techniques": [
    "T1133"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 12
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Management port open to 0.0.0.0/0 in non-production security group — aws: tip-db (RDS PostgreSQL)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AWS-ACCT-SHARED"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-07",
    "CTL-05"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-23",
   "id": "CR-153",
   "mitre_techniques": [
    "T1098"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 14
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Over-permissive IAM role (wildcard actions) — aws: shared-services (account)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-BQ-TIP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-11"
   ],
   "dimensions": [
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-11-23",
   "id": "CR-154",
   "mitre_techniques": [
    "T1562.008"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 7
   },
   "scenario_ids": [
    "RS-INSIDER"
   ],
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — gcp: tip_intel (BigQuery)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-KV-CORP"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-11"
   ],
   "dimensions": [
    "compliance"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-05-16",
   "id": "CR-155",
   "mitre_techniques": [
    "T1562.008"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 15
   },
   "scenario_ids": [
    "RS-INSIDER"
   ],
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — azure: kv-corp (Key Vault)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-GKE-TIP-ML"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-11"
   ],
   "dimensions": [
    "compliance"
   ],
   "exploitability": "poc",
   "first_seen": "2026-07-28",
   "id": "CR-156",
   "mitre_techniques": [
    "T1562.008"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 8
   },
   "scenario_ids": [
    "RS-INSIDER"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — gcp: tip-ml (GKE)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-GCS-TIP-FEEDS"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-19"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-12-16",
   "id": "CR-157",
   "mitre_techniques": [
    "T1530"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 4000,
    "effort": "low",
    "eta_days": 10
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Unencrypted snapshot retained — gcp: gs://acme-tip-feeds",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-AKS-PS"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-16"
   ],
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-03-11",
   "id": "CR-158",
   "mitre_techniques": [
    "T1133"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 2000,
    "effort": "low",
    "eta_days": 2
   },
   "scenario_ids": [
    "RS-ATO",
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Management port open to 0.0.0.0/0 in non-production security group — azure: ps-tooling (AKS)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AZ-SYN-BI"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-19"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-05-01",
   "id": "CR-159",
   "mitre_techniques": [
    "T1530"
   ],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Apply CSPM recommended fix via IaC",
    "cost_usd": 5000,
    "effort": "low",
    "eta_days": 9
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Unencrypted snapshot retained — azure: acme-dw (Synapse)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-COLLAB"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-20"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-03-24",
   "id": "CR-160",
   "mitre_techniques": [
    "T1567"
   ],
   "owner": "IT Applications",
   "remediation": {
    "action": "Tighten tenant policy",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "SaaS posture (CASB)",
   "status": "open",
   "title": "Anonymous link sharing enabled for 312 documents",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-CRM"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-21"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-02-07",
   "id": "CR-161",
   "mitre_techniques": [
    "T1550.001"
   ],
   "owner": "IT Applications",
   "remediation": {
    "action": "Tighten tenant policy",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-THIRD",
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "SaaS posture (CASB)",
   "status": "open",
   "title": "Stale integration tokens with full CRM API access",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "SAAS-CHAT"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-20"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-21",
   "id": "CR-162",
   "mitre_techniques": [],
   "owner": "IT Applications",
   "remediation": {
    "action": "Tighten tenant policy",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "SaaS posture (CASB)",
   "status": "open",
   "title": "External guests in 18 internal channels",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-ITSM"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-07"
   ],
   "dimensions": [
    "integrity"
   ],
   "exploitability": "poc",
   "first_seen": "2025-12-23",
   "id": "CR-163",
   "mitre_techniques": [
    "T1078"
   ],
   "owner": "IT Applications",
   "remediation": {
    "action": "Tighten tenant policy",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-INSIDER"
   ],
   "severity": "medium",
   "source": "SaaS posture (CASB)",
   "status": "open",
   "title": "ITSM admin role assigned to 9 non-IT users",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-TRACK"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-20"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-08-05",
   "id": "CR-164",
   "mitre_techniques": [],
   "owner": "IT Applications",
   "remediation": {
    "action": "Tighten tenant policy",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "SaaS posture (CASB)",
   "status": "open",
   "title": "Public issue board exposes internal project names",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "SAAS-BI"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-20"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2026-04-26",
   "id": "CR-165",
   "mitre_techniques": [
    "T1530"
   ],
   "owner": "IT Applications",
   "remediation": {
    "action": "Tighten tenant policy",
    "cost_usd": 1000,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "SaaS posture (CASB)",
   "status": "open",
   "title": "Dashboards published to web without authentication",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "IOT-BOS-PRN01",
    "IOT-BOS-PRN02",
    "IOT-BOS-PRN03"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-29",
    "CTL-04"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-04-05",
   "id": "CR-166",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Disable SMBv1, set admin password, move to IoT VLAN",
    "cost_usd": 500,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "Network discovery",
   "status": "open",
   "title": "Printers expose legacy SMBv1 and unauthenticated web admin (BOS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "IOT-DUB-PRN01",
    "IOT-DUB-PRN02",
    "IOT-DUB-PRN03"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-29",
    "CTL-04"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-11-01",
   "id": "CR-167",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Disable SMBv1, set admin password, move to IoT VLAN",
    "cost_usd": 500,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "Network discovery",
   "status": "open",
   "title": "Printers expose legacy SMBv1 and unauthenticated web admin (DUB)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "IOT-SIN-PRN01",
    "IOT-SIN-PRN02",
    "IOT-SIN-PRN03"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-29",
    "CTL-04"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-12-13",
   "id": "CR-168",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Disable SMBv1, set admin password, move to IoT VLAN",
    "cost_usd": 500,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "Network discovery",
   "status": "open",
   "title": "Printers expose legacy SMBv1 and unauthenticated web admin (SIN)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "IOT-TLV-PRN01",
    "IOT-TLV-PRN02",
    "IOT-TLV-PRN03"
   ],
   "closed_on": null,
   "component_ids": [],
   "control_ids": [
    "CTL-29",
    "CTL-04"
   ],
   "dimensions": [
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-06-11",
   "id": "CR-169",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Disable SMBv1, set admin password, move to IoT VLAN",
    "cost_usd": 500,
    "effort": "low",
    "eta_days": 5
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "low",
   "source": "Network discovery",
   "status": "open",
   "title": "Printers expose legacy SMBv1 and unauthenticated web admin (TLV)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SEC-MAILGW"
   ],
   "closed_on": "2026-01-08",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2025-10-16",
   "id": "CR-170",
   "mitre_techniques": [],
   "owner": "Security Engineering",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Public exposure on Email security gateway (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "SRV-DUB-UTL02"
   ],
   "closed_on": "2025-12-18",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-11-03",
   "id": "CR-171",
   "mitre_techniques": [],
   "owner": "IT Infrastructure",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on util02.dub.acme.example (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "IOT-DUB-BADGE04"
   ],
   "closed_on": "2025-12-23",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2025-11-12",
   "id": "CR-172",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Weak configuration on badge reader EU-4 (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "NET-DUB-FW01"
   ],
   "closed_on": "2026-02-11",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-01-06",
   "id": "CR-173",
   "mitre_techniques": [],
   "owner": "Network Engineering",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Excessive permissions on fw01.dub (next-gen firewall) (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "NET-BOS-FW01"
   ],
   "closed_on": "2026-03-27",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-01-24",
   "id": "CR-174",
   "mitre_techniques": [],
   "owner": "Network Engineering",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on fw01.bos (next-gen firewall) (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-BQ-TIP"
   ],
   "closed_on": "2026-04-26",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-02-18",
   "id": "CR-175",
   "mitre_techniques": [],
   "owner": "Cloud Platform",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "critical",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Excessive permissions on gcp: tip_intel (BigQuery) (remediated)",
   "type": "vulnerability"
  },
  {
   "asset_ids": [
    "IOT-DUB-BADGE02"
   ],
   "closed_on": "2025-12-13",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2025-11-25",
   "id": "CR-176",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Public exposure on badge reader EU-2 (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "CICD-RUNNER-04"
   ],
   "closed_on": "2026-02-19",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2025-12-03",
   "id": "CR-177",
   "mitre_techniques": [],
   "owner": "Platform Engineering",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Public exposure on self-hosted runner 4 (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "IOT-SIN-PRN03"
   ],
   "closed_on": "2026-01-19",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2025-10-06",
   "id": "CR-178",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "critical",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on printer SIN-3 (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "NET-SIN-CORE01"
   ],
   "closed_on": "2026-05-17",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-02-22",
   "id": "CR-179",
   "mitre_techniques": [],
   "owner": "Network Engineering",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Weak configuration on core01.sin (core switch) (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL15"
   ],
   "closed_on": "2025-12-22",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2025-11-14",
   "id": "CR-180",
   "mitre_techniques": [],
   "owner": "IT Infrastructure",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-EXFIL"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on util15.bos.acme.example (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "IOT-DUB-CONF01"
   ],
   "closed_on": "2026-05-18",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2026-02-17",
   "id": "CR-181",
   "mitre_techniques": [],
   "owner": "Facilities",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Excessive permissions on conference room system DUB-1 (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "NET-DUB-WLC01"
   ],
   "closed_on": "2025-12-11",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2025-11-22",
   "id": "CR-182",
   "mitre_techniques": [],
   "owner": "Network Engineering",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on wlc01.dub (wireless controller) (remediated)",
   "type": "vulnerability"
  },
  {
   "asset_ids": [
    "SRV-BOS-DC01"
   ],
   "closed_on": "2026-07-09",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "theoretical",
   "first_seen": "2026-04-25",
   "id": "CR-183",
   "mitre_techniques": [],
   "owner": "IT Infrastructure",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Excessive permissions on dc01.acme.example (remediated)",
   "type": "vulnerability"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL16"
   ],
   "closed_on": "2026-02-20",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "known_exploited",
   "first_seen": "2025-11-20",
   "id": "CR-184",
   "mitre_techniques": [],
   "owner": "IT Infrastructure",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Excessive permissions on util16.bos.acme.example (remediated)",
   "type": "vulnerability"
  },
  {
   "asset_ids": [
    "SAAS-IDP"
   ],
   "closed_on": "2026-01-23",
   "component_ids": [],
   "control_ids": [
    "CTL-02"
   ],
   "dimensions": [
    "availability",
    "integrity",
    "confidentiality"
   ],
   "exploitability": "poc",
   "first_seen": "2025-10-13",
   "id": "CR-185",
   "mitre_techniques": [],
   "owner": "IT Applications",
   "remediation": {
    "action": "Remediated",
    "cost_usd": 0,
    "effort": "low",
    "eta_days": 0
   },
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "severity": "critical",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on Workforce identity provider (SSO) (remediated)",
   "type": "vulnerability"
  }
 ],
 "documents": [
  {
   "category": "BIA",
   "extraction": {
    "confidence": "high",
    "extracted": [
     "10 business services",
     "RTO/RPO/MTPD per service",
     "downtime cost per hour",
     "service dependencies"
    ],
    "method": "AI extraction (mock)"
   },
   "format": "docx",
   "id": "DOC-01",
   "ingested_on": "2026-09-29",
   "pages": 46,
   "source": "SharePoint — Risk Office",
   "title": "Business Impact Analysis 2026"
  },
  {
   "category": "SLA contract",
   "extraction": {
    "confidence": "high",
    "extracted": [
     "MTTD/MTTR SLAs",
     "availability 99.9%",
     "service-credit schedule"
    ],
    "method": "AI extraction (mock)"
   },
   "format": "pdf",
   "id": "DOC-02",
   "ingested_on": "2026-09-29",
   "pages": 38,
   "source": "Contract repository",
   "title": "MDR Master Services Agreement v4 (template)"
  },
  {
   "category": "SLA contract",
   "extraction": {
    "confidence": "high",
    "extracted": [
     "availability 99.95%",
     "tiered credits up to 25%"
    ],
    "method": "AI extraction (mock)"
   },
   "format": "pdf",
   "id": "DOC-03",
   "ingested_on": "2026-09-29",
   "pages": 9,
   "source": "Contract repository",
   "title": "Customer Portal SLA"
  },
  {
   "category": "SLA contract",
   "extraction": {
    "confidence": "moderate",
    "extracted": [
     "API availability 99.95%",
     "feed freshness 30 min"
    ],
    "method": "AI extraction (mock)"
   },
   "format": "pdf",
   "id": "DOC-04",
   "ingested_on": "2026-09-29",
   "pages": 14,
   "source": "Contract repository",
   "title": "TIP Subscription Terms v2"
  },
  {
   "category": "GRC policy",
   "extraction": {
    "confidence": "high",
    "extracted": [
     "15 policies",
     "policy owners",
     "review dates"
    ],
    "method": "Structured import"
   },
   "format": "pdf",
   "id": "DOC-05",
   "ingested_on": "2026-09-28",
   "pages": 22,
   "source": "ServiceNow GRC",
   "title": "Information Security Policy"
  },
  {
   "category": "GRC",
   "extraction": {
    "confidence": "high",
    "extracted": [
     "93 Annex A controls",
     "applicability",
     "implementation status"
    ],
    "method": "Structured import"
   },
   "format": "xlsx",
   "id": "DOC-06",
   "ingested_on": "2026-09-28",
   "pages": null,
   "source": "ServiceNow GRC",
   "title": "ISO 27001 Statement of Applicability"
  },
  {
   "category": "Audit report",
   "extraction": {
    "confidence": "moderate",
    "extracted": [
     "3 exceptions noted",
     "CC6.1 / CC6.2 / CC8.1"
    ],
    "method": "AI extraction (mock)"
   },
   "format": "pdf",
   "id": "DOC-07",
   "ingested_on": "2026-09-27",
   "pages": 112,
   "source": "Auditor portal",
   "title": "SOC 2 Type II report (FY2026)"
  },
  {
   "category": "Governance",
   "extraction": {
    "confidence": "high",
    "extracted": [
     "annual value-at-risk tolerance $6M",
     "service likelihood ceiling 35%",
     "compliance floor 80%"
    ],
    "method": "AI extraction (mock)"
   },
   "format": "docx",
   "id": "DOC-08",
   "ingested_on": "2026-09-29",
   "pages": 4,
   "source": "Board portal",
   "title": "Board Risk Appetite Statement"
  },
  {
   "category": "Strategy",
   "extraction": {
    "confidence": "moderate",
    "extracted": [
     "6 corporate goals",
     "goal owners",
     "linked KPIs"
    ],
    "method": "AI extraction (mock)"
   },
   "format": "pptx",
   "id": "DOC-09",
   "ingested_on": "2026-09-30",
   "pages": 12,
   "source": "Business owner upload",
   "title": "FY2027 Corporate Goals"
  },
  {
   "category": "Architecture",
   "extraction": {
    "confidence": "moderate",
    "extracted": [
     "AWS/Azure/GCP accounts",
     "service-to-resource mapping"
    ],
    "method": "AI extraction (mock)"
   },
   "format": "pdf",
   "id": "DOC-10",
   "ingested_on": "2026-09-26",
   "pages": 31,
   "source": "Confluence export",
   "title": "Cloud architecture overview"
  }
 ],
 "evidence": [
  {
   "asset_id": "AWS-ECS-PORTAL-API",
   "collected_at": "2026-09-08T16:57:26Z",
   "finding_ids": [
    "CR-001"
   ],
   "hunt_id": null,
   "id": "EV-0001",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 2,
    "assets": [
     "aws: portal-api (ECS)",
     "aws: portal.acme.example (ALB)"
    ],
    "cvss": 9.8,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.71,
    "first_detected": "2026-09-08",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-2026-0412",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "878e2f7866f6e4784d5009a259ef54dcb6eee346cd18f3f3a71cc823a9386d6f",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-2026-0412 on aws: portal-api (ECS)"
  },
  {
   "asset_id": "AWS-ECS-PORTAL-API",
   "collected_at": "2026-09-16T06:52:24Z",
   "finding_ids": [
    "CR-001"
   ],
   "hunt_id": null,
   "id": "EV-0002",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-2026-0412",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 2
   },
   "sha256": "40a0728742d375389686ba51f1c448c0955e6a9262b4a1cec6cf3961156d8744",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-2026-0412 still present"
  },
  {
   "asset_id": "AWS-ECS-PORTAL-API",
   "collected_at": "2026-09-12T01:44:19Z",
   "finding_ids": [
    "CR-001"
   ],
   "hunt_id": null,
   "id": "EV-0003",
   "kind": "ticket",
   "raw": {
    "action": "Upgrade API framework to fixed release and redeploy",
    "due": "2026-09-18",
    "key": "SEC-2003",
    "owner_team": "Portal Engineering",
    "status": "To do"
   },
   "sha256": "96ae95a278c2aaea8d8164a953b8ae52eabb05ed0eaaff35821dfb847daceda9",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SEC-WAF",
   "collected_at": "2026-07-14T18:57:47Z",
   "finding_ids": [
    "CR-002"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0004",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 2,
    "check": "Portal WAF running in detection-only mode",
    "control": "CTL-17",
    "evaluated_at": "2026-07-14",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "Web application firewall (portal)",
    "resource_id": "SEC-WAF"
   },
   "sha256": "deb49e8fb5ea4173a63edfaf29b508844222250611a02fc71c7228c905688336",
   "source": "CSPM",
   "summary": "Configuration check failed on Web application firewall (portal)"
  },
  {
   "asset_id": "SEC-WAF",
   "collected_at": "2026-07-18T12:14:54Z",
   "finding_ids": [
    "CR-002"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0005",
   "kind": "ticket",
   "raw": {
    "action": "Switch managed rule sets to blocking after 7-day tuning",
    "due": "2026-07-21",
    "key": "SEC-2005",
    "owner_team": "Security Engineering",
    "status": "To do"
   },
   "sha256": "d2f84b8d417bc488ccd08c8e50e25a3d8e3f511c3dcc58b620b533e0c68caae5",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-S3-PORTAL-EXP",
   "collected_at": "2026-09-19T15:59:37Z",
   "finding_ids": [
    "CR-003"
   ],
   "hunt_id": "HUNT-08",
   "id": "EV-0006",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Portal export bucket allows public object listing",
    "observed_at": "2026-09-19",
    "reachable_from": "broad internal / third party",
    "resource": "aws: s3://acme-portal-exports",
    "resource_id": "AWS-S3-PORTAL-EXP"
   },
   "sha256": "5f7818ada422e1c1254ed34f598b6a709040d805957cd6d852c26cfe85c3f875",
   "source": "CSPM",
   "summary": "Exposure observed on aws: s3://acme-portal-exports"
  },
  {
   "asset_id": "AWS-RDS-PORTAL",
   "collected_at": "2026-08-02T06:32:13Z",
   "finding_ids": [
    "CR-004"
   ],
   "hunt_id": "HUNT-08",
   "id": "EV-0007",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Portal database admin endpoint reachable from the internet",
    "observed_at": "2026-08-02",
    "reachable_from": "broad internal / third party",
    "resource": "aws: portal-db (RDS)",
    "resource_id": "AWS-RDS-PORTAL"
   },
   "sha256": "a46b19a75a1a0dec0776093fc767c594d38cc539203ca09f2ea20e32cfa66e4a",
   "source": "CSPM",
   "summary": "Exposure observed on aws: portal-db (RDS)"
  },
  {
   "asset_id": "AWS-RDS-PORTAL",
   "collected_at": "2026-08-06T13:52:40Z",
   "finding_ids": [
    "CR-004"
   ],
   "hunt_id": "HUNT-08",
   "id": "EV-0008",
   "kind": "ticket",
   "raw": {
    "action": "Restrict security group to bastion; enforce IAM auth",
    "due": "2026-08-05",
    "key": "SEC-2008",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "2d2518d6cdd920613ad0a011a5d469a7e07efbf239075290ee5004a187d2f04b",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AZ-APPGW-PORTAL-EU",
   "collected_at": "2026-05-11T03:20:16Z",
   "finding_ids": [
    "CR-005"
   ],
   "hunt_id": null,
   "id": "EV-0009",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "EU portal gateway allows legacy TLS 1.0/1.1",
    "control": "CTL-18",
    "evaluated_at": "2026-05-11",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: eu.portal.acme.example (App Gateway + WAF)",
    "resource_id": "AZ-APPGW-PORTAL-EU"
   },
   "sha256": "6a347fa71cb0efa85c297e542ef6436c970a09bf58516f070a4d2ead5f400321",
   "source": "Vulnerability scanner",
   "summary": "Configuration check failed on azure: eu.portal.acme.example (App Gateway + WAF)"
  },
  {
   "asset_id": "AWS-EKS-MDR",
   "collected_at": "2026-06-03T04:41:53Z",
   "finding_ids": [
    "CR-010"
   ],
   "hunt_id": null,
   "id": "EV-0010",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 2,
    "check": "MDR ingestion cluster deployed in a single availability zone",
    "control": "CTL-15",
    "evaluated_at": "2026-06-03",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: mdr-ingest (EKS)",
    "resource_id": "AWS-EKS-MDR"
   },
   "sha256": "2238c384f3b4268472bda8ed979b72884c6c099db25ccebf1f97ce98a168400b",
   "source": "Architecture review",
   "summary": "Configuration check failed on aws: mdr-ingest (EKS)"
  },
  {
   "asset_id": "AWS-EKS-MDR",
   "collected_at": "2026-06-05T02:02:55Z",
   "finding_ids": [
    "CR-010"
   ],
   "hunt_id": null,
   "id": "EV-0011",
   "kind": "ticket",
   "raw": {
    "action": "Re-deploy node groups and brokers across three AZs",
    "due": "2026-07-18",
    "key": "SEC-2011",
    "owner_team": "SOC Engineering",
    "status": "To do"
   },
   "sha256": "1b14ea67852d2d8752eba237a3af8d7ff4870d6ebf550c0d09829a4a2d03a165",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-BOS-SOAR01",
   "collected_at": "2026-07-21T21:54:43Z",
   "finding_ids": [
    "CR-011"
   ],
   "hunt_id": null,
   "id": "EV-0012",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 2,
    "check": "SOAR service account holds domain-admin privileges",
    "control": "CTL-07",
    "evaluated_at": "2026-07-21",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "soar01.acme.example",
    "resource_id": "SRV-BOS-SOAR01"
   },
   "sha256": "edc37daeeea5a646f9b30e68bd1f744288756dd56562c519f174b22f3a3c4733",
   "source": "Identity posture scan",
   "summary": "Configuration check failed on soar01.acme.example"
  },
  {
   "asset_id": "SRV-BOS-SOAR01",
   "collected_at": "2026-07-25T10:56:50Z",
   "finding_ids": [
    "CR-011"
   ],
   "hunt_id": null,
   "id": "EV-0013",
   "kind": "ticket",
   "raw": {
    "action": "Replace with scoped gMSA and just-in-time elevation",
    "due": "2026-08-11",
    "key": "SEC-2013",
    "owner_team": "SOC Engineering",
    "status": "To do"
   },
   "sha256": "c0a010b958229266c38e257e5674dd4ea65df960bec4e77b47411866583c1b8d",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-BOS-JMP01",
   "collected_at": "2026-08-26T05:25:41Z",
   "finding_ids": [
    "CR-012"
   ],
   "hunt_id": "HUNT-09",
   "id": "EV-0014",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "EDR tamper protection disabled on SOC jump hosts",
    "control": "CTL-10",
    "evaluated_at": "2026-08-26",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "soc-jump01.acme.example",
    "resource_id": "SRV-BOS-JMP01"
   },
   "sha256": "18c7ec1adf199fcefc3e3570f89d4a81f96379ca481877d7e0d9ab5a99d737b8",
   "source": "EDR console",
   "summary": "Configuration check failed on soc-jump01.acme.example"
  },
  {
   "asset_id": "SRV-BOS-JMP01",
   "collected_at": "2026-08-28T04:20:57Z",
   "finding_ids": [
    "CR-012"
   ],
   "hunt_id": "HUNT-09",
   "id": "EV-0015",
   "kind": "ticket",
   "raw": {
    "action": "Re-enable tamper protection via policy; alert on change",
    "due": "2026-08-28",
    "key": "SEC-2015",
    "owner_team": "Security Operations",
    "status": "To do"
   },
   "sha256": "878636cf7c10e01a35171506a66aeb1a497673988da0a212bc8805b9fcec5608",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SAAS-COLLAB",
   "collected_at": "2026-09-24T02:01:01Z",
   "finding_ids": [
    "CR-013"
   ],
   "hunt_id": "HUNT-05",
   "id": "EV-0016",
   "kind": "alert",
   "raw": {
    "alert_id": "ALR-013-9720",
    "disposition": "true positive — under remediation",
    "entities": [
     "Email & collaboration suite",
     "Workforce identity provider (SSO)"
    ],
    "first_seen": "2026-09-24",
    "occurrences": 9,
    "rule": "Unverified OAuth application granted mailbox read consent",
    "severity": "high",
    "techniques": [
     "T1528"
    ]
   },
   "sha256": "58f03034e2dbc8ad0aa543dd484b53706b5f2654f41dbcc40e32cc2e55a8c8b8",
   "source": "SOC alert (CASB)",
   "summary": "SOC alert raised: Unverified OAuth application granted mailbox read consent"
  },
  {
   "asset_id": "SAAS-COLLAB",
   "collected_at": "2026-09-25T20:26:18Z",
   "finding_ids": [
    "CR-013"
   ],
   "hunt_id": "HUNT-05",
   "id": "EV-0017",
   "kind": "ticket",
   "raw": {
    "action": "Revoke grant, restrict user consent to verified publishers, review mailbox access logs",
    "due": "2026-09-25",
    "key": "SEC-2017",
    "owner_team": "Security Operations",
    "status": "To do"
   },
   "sha256": "d0a2681a50840d9e93fd50e361c48cf488c2ed88cc64f43e576cc370fc498e25",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-SIN-JMP01",
   "collected_at": "2026-09-27T08:08:14Z",
   "finding_ids": [
    "CR-014"
   ],
   "hunt_id": "HUNT-04",
   "id": "EV-0018",
   "kind": "alert",
   "raw": {
    "alert_id": "ALR-014-4715",
    "disposition": "true positive — under remediation",
    "entities": [
     "soc-jump-sin01.acme.example"
    ],
    "first_seen": "2026-09-27",
    "occurrences": 13,
    "rule": "SOC jump host contacted infrastructure on a threat-intel blocklist",
    "severity": "high",
    "techniques": [
     "T1071.001"
    ]
   },
   "sha256": "93f3314af02410c359db341cda187dcd6d006d4ff75f6f19de596aaefe0549cc",
   "source": "SOC alert (network)",
   "summary": "SOC alert raised: SOC jump host contacted infrastructure on a threat-intel blocklist"
  },
  {
   "asset_id": "NET-DUB-VPN01",
   "collected_at": "2026-09-12T19:03:37Z",
   "finding_ids": [
    "CR-015"
   ],
   "hunt_id": null,
   "id": "EV-0019",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "vpn-eu.acme.example (remote-access VPN, EU)"
    ],
    "cvss": 9.6,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.84,
    "first_detected": "2026-09-12",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-2026-0388",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "ac229cd890f1300e69431a95ef0dfee38c5ba1f027ae63d21256f1d926f8bf3b",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-2026-0388 on vpn-eu.acme.example (remote-access VPN, EU)"
  },
  {
   "asset_id": "NET-DUB-VPN01",
   "collected_at": "2026-09-25T20:50:15Z",
   "finding_ids": [
    "CR-015"
   ],
   "hunt_id": null,
   "id": "EV-0020",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-2026-0388",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 1
   },
   "sha256": "39ff11a2b21ed7c3e9e0e58841925e775b27e96f7aacc7970b4b8896b209f45c",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-2026-0388 still present"
  },
  {
   "asset_id": "AI-TRIAGE",
   "collected_at": "2026-08-14T02:43:28Z",
   "finding_ids": [
    "CR-016"
   ],
   "hunt_id": "HUNT-12",
   "id": "EV-0021",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Alert-triage model processes customer email without prompt-injection filtering",
    "control": "CTL-30",
    "evaluated_at": "2026-08-14",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "MDR alert-triage model",
    "resource_id": "AI-TRIAGE"
   },
   "sha256": "7265dcd4be2a0a2704ba156ad0cded91b378d68416767184170b03ca3e32d187",
   "source": "AI red-team review",
   "summary": "Configuration check failed on MDR alert-triage model"
  },
  {
   "asset_id": "SAAS-CODE",
   "collected_at": "2026-07-30T23:19:49Z",
   "finding_ids": [
    "CR-020"
   ],
   "hunt_id": "HUNT-07",
   "id": "EV-0022",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "CI token with organisation-admin scope used by release workflows",
    "control": "CTL-21",
    "evaluated_at": "2026-07-30",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "Source-code hosting (enterprise)",
    "resource_id": "SAAS-CODE"
   },
   "sha256": "74845f8423512152c6b76968810ef299688dbfc5f79e7921a6d8f40ab0045420",
   "source": "Code-hosting audit",
   "summary": "Configuration check failed on Source-code hosting (enterprise)"
  },
  {
   "asset_id": "SAAS-CODE",
   "collected_at": "2026-08-03T14:33:48Z",
   "finding_ids": [
    "CR-020"
   ],
   "hunt_id": "HUNT-07",
   "id": "EV-0023",
   "kind": "ticket",
   "raw": {
    "action": "Move to short-lived OIDC credentials with least-privilege scopes",
    "due": "2026-08-13",
    "key": "SEC-2023",
    "owner_team": "Platform Engineering",
    "status": "To do"
   },
   "sha256": "61d2c4b2d05d211f51daf6d6c7f28de34d1f45a0e14bc58b62f1b9a528be27b3",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "CICD-RUNNER-03",
   "collected_at": "2026-06-17T11:29:31Z",
   "finding_ids": [
    "CR-021"
   ],
   "hunt_id": "HUNT-10",
   "id": "EV-0024",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 4,
    "check": "Self-hosted runners shared between public and private repositories",
    "control": "CTL-24",
    "evaluated_at": "2026-06-17",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "self-hosted runner 3",
    "resource_id": "CICD-RUNNER-03"
   },
   "sha256": "e7436aca658098560c9bb36722b9503e931f5d8551aa5585ad47497afc3a4b87",
   "source": "Code-hosting audit",
   "summary": "Configuration check failed on 4 assets"
  },
  {
   "asset_id": "CICD-ARGO",
   "collected_at": "2026-05-06T06:18:09Z",
   "finding_ids": [
    "CR-022"
   ],
   "hunt_id": "HUNT-10",
   "id": "EV-0025",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 2,
    "check": "Deploy pipeline accepts unsigned artifacts",
    "control": "CTL-23",
    "evaluated_at": "2026-05-06",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "GitOps deployer (Argo CD)",
    "resource_id": "CICD-ARGO"
   },
   "sha256": "f3c7c34bb88bc38fd2b7b0c5a9296bc19a347a7dcdd4c9e9966722dd023f4d76",
   "source": "Architecture review",
   "summary": "Configuration check failed on GitOps deployer (Argo CD)"
  },
  {
   "asset_id": "CICD-ARGO",
   "collected_at": "2026-05-08T22:05:03Z",
   "finding_ids": [
    "CR-022"
   ],
   "hunt_id": "HUNT-10",
   "id": "EV-0026",
   "kind": "ticket",
   "raw": {
    "action": "Enforce signature verification admission policy",
    "due": "2026-05-27",
    "key": "SEC-2026",
    "owner_team": "Platform Engineering",
    "status": "To do"
   },
   "sha256": "b9bf5e32b7be63421063401336d523ee5081f7894b2f2f3189edde5df14849c0",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SAAS-CODE",
   "collected_at": "2026-09-03T14:56:43Z",
   "finding_ids": [
    "CR-023"
   ],
   "hunt_id": "HUNT-07",
   "id": "EV-0027",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Credentials present in repository history",
    "observed_at": "2026-09-03",
    "reachable_from": "broad internal / third party",
    "resource": "Source-code hosting (enterprise)",
    "resource_id": "SAAS-CODE"
   },
   "sha256": "d6751de59130187c6f2921ba5be6cdb4bab3a20100904e0a2dc457bf2f331850",
   "source": "Secret scanning",
   "summary": "Exposure observed on Source-code hosting (enterprise)"
  },
  {
   "asset_id": "SAAS-CODE",
   "collected_at": "2026-09-04T13:06:08Z",
   "finding_ids": [
    "CR-023"
   ],
   "hunt_id": "HUNT-07",
   "id": "EV-0028",
   "kind": "ticket",
   "raw": {
    "action": "Rotate the 14 exposed secrets; enable push protection",
    "due": "2026-09-06",
    "key": "SEC-2028",
    "owner_team": "Platform Engineering",
    "status": "To do"
   },
   "sha256": "a84f37e0ac65127ed7eb1ebd3810f7cdc3e7e8b5731fa98ee5e6489ce7892034",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-TLV-BLD01",
   "collected_at": "2026-08-21T22:07:27Z",
   "finding_ids": [
    "CR-024"
   ],
   "hunt_id": null,
   "id": "EV-0029",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 3,
    "assets": [
     "build01.rnd.acme.example",
     "build02.rnd.acme.example",
     "aws: tip-api (EKS)"
    ],
    "cvss": 8.8,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.22,
    "first_detected": "2026-08-21",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-2026-0397",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "3102c14b32ef35f2be081647f406cd7bc9341bb0f80d37a60c1c691f4a227bbd",
   "source": "SCA scan",
   "summary": "Scanner detected ACME-VULN-2026-0397 on build01.rnd.acme.example"
  },
  {
   "asset_id": "SRV-TLV-BLD01",
   "collected_at": "2026-09-10T22:11:52Z",
   "finding_ids": [
    "CR-024"
   ],
   "hunt_id": null,
   "id": "EV-0030",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-2026-0397",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 3
   },
   "sha256": "657fdc345a652c84c3701f8eaa88367cbf2e6f8f546c5f9ae0b6bbdc7ac01905",
   "source": "SCA scan",
   "summary": "Re-scan: ACME-VULN-2026-0397 still present"
  },
  {
   "asset_id": "SAAS-IDP",
   "collected_at": "2026-06-25T04:31:59Z",
   "finding_ids": [
    "CR-030"
   ],
   "hunt_id": null,
   "id": "EV-0031",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 2,
    "check": "MFA not enforced for 11 privileged accounts",
    "control": "CTL-06",
    "evaluated_at": "2026-06-25",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "Workforce identity provider (SSO)",
    "resource_id": "SAAS-IDP"
   },
   "sha256": "d4608503de16a008230f2f384170ab78fb13753fa6a348757ae92580ad646c71",
   "source": "Identity posture scan",
   "summary": "Configuration check failed on Workforce identity provider (SSO)"
  },
  {
   "asset_id": "SAAS-IDP",
   "collected_at": "2026-07-09T18:22:53Z",
   "finding_ids": [
    "CR-031"
   ],
   "hunt_id": null,
   "id": "EV-0032",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "23 leaver accounts still enabled beyond 24 h",
    "control": "CTL-08",
    "evaluated_at": "2026-07-09",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "Workforce identity provider (SSO)",
    "resource_id": "SAAS-IDP"
   },
   "sha256": "9422c6a183f5856cb46d008bb51406106f98069aa246c620ceebf50f4246d520",
   "source": "Access review",
   "summary": "Configuration check failed on Workforce identity provider (SSO)"
  },
  {
   "asset_id": "SAAS-IDP",
   "collected_at": "2026-09-22T04:43:27Z",
   "finding_ids": [
    "CR-032"
   ],
   "hunt_id": "HUNT-03",
   "id": "EV-0033",
   "kind": "alert",
   "raw": {
    "alert_id": "ALR-032-3783",
    "disposition": "true positive — under remediation",
    "entities": [
     "Workforce identity provider (SSO)",
     "azure: fin-billing (Azure SQL)"
    ],
    "first_seen": "2026-09-22",
    "occurrences": 11,
    "rule": "Impossible-travel sign-in for a finance administrator",
    "severity": "medium",
    "techniques": [
     "T1078.004"
    ]
   },
   "sha256": "334ff259b7becd4e38573b5d88bc49402f671d779ce85b3822744bc912391c2f",
   "source": "SOC alert (identity)",
   "summary": "SOC alert raised: Impossible-travel sign-in for a finance administrator"
  },
  {
   "asset_id": "SAAS-IDP",
   "collected_at": "2026-09-24T00:08:34Z",
   "finding_ids": [
    "CR-032"
   ],
   "hunt_id": "HUNT-03",
   "id": "EV-0034",
   "kind": "ticket",
   "raw": {
    "action": "Reset credentials and sessions; confirm with user; review finance DB audit",
    "due": "2026-09-23",
    "key": "SEC-2034",
    "owner_team": "Security Operations",
    "status": "To do"
   },
   "sha256": "412498c216dc0ae104e5b9aaacd93daf8f0a9df627a60723711c371b42d626a2",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-BOS-DC01",
   "collected_at": "2026-08-12T20:57:52Z",
   "finding_ids": [
    "CR-033"
   ],
   "hunt_id": null,
   "id": "EV-0035",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 5,
    "assets": [
     "dc01.acme.example",
     "dc02.acme.example",
     "dc-dub01.acme.example",
     "dc-sin01.acme.example",
     "dc-tlv01.acme.example"
    ],
    "cvss": 8.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.35,
    "first_detected": "2026-08-12",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-2026-0351",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "9de14f04fcc7776007fbee359111f72bf8f4d602aa3599566b6525d3b330cb48",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-2026-0351 on 5 assets"
  },
  {
   "asset_id": "SRV-BOS-DC01",
   "collected_at": "2026-09-01T07:46:10Z",
   "finding_ids": [
    "CR-033"
   ],
   "hunt_id": null,
   "id": "EV-0036",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-2026-0351",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 5
   },
   "sha256": "583c409d622b1b9db686ca7705d28dd07bacf8e252763217d9d9ba4946415241",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-2026-0351 still present"
  },
  {
   "asset_id": "AZ-APP-BILLING",
   "collected_at": "2026-04-15T01:49:55Z",
   "finding_ids": [
    "CR-040"
   ],
   "hunt_id": null,
   "id": "EV-0037",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 2,
    "check": "Payment page loads third-party scripts without integrity controls",
    "control": "CTL-28",
    "evaluated_at": "2026-04-15",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: pay.acme.example (App Service)",
    "resource_id": "AZ-APP-BILLING"
   },
   "sha256": "99b404669d6989604213a2a3f827f20e26b145c4b6ea3e36805253528a30ca6f",
   "source": "PCI readiness assessment",
   "summary": "Configuration check failed on azure: pay.acme.example (App Service)"
  },
  {
   "asset_id": "AZ-APP-BILLING",
   "collected_at": "2026-04-16T05:22:54Z",
   "finding_ids": [
    "CR-040"
   ],
   "hunt_id": null,
   "id": "EV-0038",
   "kind": "ticket",
   "raw": {
    "action": "Script inventory, SRI/CSP and change-detection per PCI 6.4.3 / 11.6.1",
    "due": "2026-05-15",
    "key": "SEC-2038",
    "owner_team": "Finance Systems",
    "status": "To do"
   },
   "sha256": "0200516f41e32b634cee47c9b525f3e752fbc6103cf968dc3b306c467f1b858c",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-DUB-SQL01",
   "collected_at": "2026-03-03T15:07:49Z",
   "finding_ids": [
    "CR-041"
   ],
   "hunt_id": null,
   "id": "EV-0039",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "Finance database backups are not immutable",
    "control": "CTL-14",
    "evaluated_at": "2026-03-03",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "finsql-dub01.acme.example",
    "resource_id": "SRV-DUB-SQL01"
   },
   "sha256": "051307cd2dd6a552d2b1da3996ecc8f159fec716b9aba51f0f8efc3ca65b34d2",
   "source": "BCP review",
   "summary": "Configuration check failed on finsql-dub01.acme.example"
  },
  {
   "asset_id": "SRV-BOS-LEGACY01",
   "collected_at": "2025-10-10T05:40:21Z",
   "finding_ids": [
    "CR-042"
   ],
   "hunt_id": null,
   "id": "EV-0040",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "legacy-erp01.acme.example"
    ],
    "cvss": 7.5,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.08,
    "first_detected": "2025-10-10",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-EOS-2012R2",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "a96d3a9309453568209016b3802aac531548d71a75754a61c9c36a79b958f829",
   "source": "Asset inventory",
   "summary": "Scanner detected ACME-VULN-EOS-2012R2 on legacy-erp01.acme.example"
  },
  {
   "asset_id": "SRV-BOS-LEGACY01",
   "collected_at": "2025-10-29T14:46:13Z",
   "finding_ids": [
    "CR-042"
   ],
   "hunt_id": null,
   "id": "EV-0041",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-EOS-2012R2",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 1
   },
   "sha256": "84766217446145f1f44c579a1b8af427cedd2678d26333281ee30203d161a342",
   "source": "Asset inventory",
   "summary": "Re-scan: ACME-VULN-EOS-2012R2 still present"
  },
  {
   "asset_id": "SRV-BOS-LEGACY01",
   "collected_at": "2025-10-14T01:58:20Z",
   "finding_ids": [
    "CR-042"
   ],
   "hunt_id": null,
   "id": "EV-0042",
   "kind": "ticket",
   "raw": {
    "action": "Migrate to supported platform (approved FY27 project)",
    "due": "2026-02-07",
    "key": "SEC-2042",
    "owner_team": "Finance Systems",
    "status": "Risk accepted"
   },
   "sha256": "e6c6dd5897b26a14f0590738391aafe143d67ee1a9abaeb5f68ff68a676d03ff",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AZ-SYN-BI",
   "collected_at": "2026-06-09T19:51:54Z",
   "finding_ids": [
    "CR-050"
   ],
   "hunt_id": null,
   "id": "EV-0043",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "BI service principal can read all HR datasets",
    "observed_at": "2026-06-09",
    "reachable_from": "broad internal / third party",
    "resource": "azure: acme-dw (Synapse)",
    "resource_id": "AZ-SYN-BI"
   },
   "sha256": "51e08d1185e650e5487b13b9bece373b8dbb74b93383375cf0c0e18f9bb1b1ba",
   "source": "Data access review",
   "summary": "Exposure observed on azure: acme-dw (Synapse)"
  },
  {
   "asset_id": "AZ-SYN-BI",
   "collected_at": "2026-06-12T11:15:21Z",
   "finding_ids": [
    "CR-050"
   ],
   "hunt_id": null,
   "id": "EV-0044",
   "kind": "ticket",
   "raw": {
    "action": "Row-level security and scoped service principals",
    "due": "2026-06-30",
    "key": "SEC-2044",
    "owner_team": "Data Platform",
    "status": "To do"
   },
   "sha256": "6daf552ca10958f8e850dce04f6be3d801e91823fe95f0737df54d8212ed3530",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AZ-STG-BI",
   "collected_at": "2026-07-01T13:55:00Z",
   "finding_ids": [
    "CR-051"
   ],
   "hunt_id": "HUNT-08",
   "id": "EV-0045",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Data-lake storage account allows public network access",
    "control": "CTL-05",
    "evaluated_at": "2026-07-01",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: acmebilake (Storage)",
    "resource_id": "AZ-STG-BI"
   },
   "sha256": "2a14c9fe7a51ca99f5023a0a696db269ff1d7833e57587236d16da077d5b06a0",
   "source": "CSPM",
   "summary": "Configuration check failed on azure: acmebilake (Storage)"
  },
  {
   "asset_id": "AI-ASSIST",
   "collected_at": "2026-08-05T15:29:48Z",
   "finding_ids": [
    "CR-052"
   ],
   "hunt_id": "HUNT-12",
   "id": "EV-0046",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "LLM assistant retrieval index includes HR records and customer contracts without access trimming",
    "observed_at": "2026-08-05",
    "reachable_from": "broad internal / third party",
    "resource": "Internal LLM assistant (\"Ask ACME\")",
    "resource_id": "AI-ASSIST"
   },
   "sha256": "6ede43c3a9e1028902023a8d96ab66de6c4f31ba81965e19eb06cf34db2c42b2",
   "source": "AI governance review",
   "summary": "Exposure observed on Internal LLM assistant (\"Ask ACME\")"
  },
  {
   "asset_id": "AI-SALES",
   "collected_at": "2026-09-10T23:29:09Z",
   "finding_ids": [
    "CR-053"
   ],
   "hunt_id": "HUNT-07",
   "id": "EV-0047",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Sales copilot extension embeds a long-lived model API key",
    "observed_at": "2026-09-10",
    "reachable_from": "broad internal / third party",
    "resource": "Sales copilot (browser extension)",
    "resource_id": "AI-SALES"
   },
   "sha256": "5dafc0ef2763f907ac6e6ff9da4b9e75cf10eda1ad8303461ce8cafa5d08ab2d",
   "source": "Secret scanning",
   "summary": "Exposure observed on Sales copilot (browser extension)"
  },
  {
   "asset_id": "AI-SALES",
   "collected_at": "2026-09-14T19:57:24Z",
   "finding_ids": [
    "CR-053"
   ],
   "hunt_id": "HUNT-07",
   "id": "EV-0048",
   "kind": "ticket",
   "raw": {
    "action": "Proxy calls through backend with per-user tokens; rotate key",
    "due": "2026-09-17",
    "key": "SEC-2048",
    "owner_team": "AI Platform",
    "status": "To do"
   },
   "sha256": "5e0b918d9241894f639a1260d5728a4f5c2da06b6cfcb4fa28b302fb68e7262b",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-SIN-0071",
   "collected_at": "2026-08-18T07:30:09Z",
   "finding_ids": [
    "CR-060"
   ],
   "hunt_id": "HUNT-09",
   "id": "EV-0049",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 14,
    "check": "EDR agent missing on APAC endpoints",
    "control": "CTL-10",
    "evaluated_at": "2026-08-18",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "sin-lt-0071.acme.example",
    "resource_id": "EP-SIN-0071"
   },
   "sha256": "89315e2733ecdd6d8b0c551ef5ebc66382e337fd9e584e964050e7efb3edc448",
   "source": "IRTriage inventory vs EDR console",
   "summary": "Configuration check failed on 14 assets"
  },
  {
   "asset_id": "EP-SIN-0071",
   "collected_at": "2026-08-21T11:45:57Z",
   "finding_ids": [
    "CR-060"
   ],
   "hunt_id": "HUNT-09",
   "id": "EV-0050",
   "kind": "ticket",
   "raw": {
    "action": "Deploy agent via MDM; block network access for unmanaged devices",
    "due": "2026-08-25",
    "key": "SEC-2050",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "e35e27afa0c93b4b2f9fdfcba426fe5575c583146f58d2ff607ce5f6c1606e4f",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-TLV-0093",
   "collected_at": "2025-11-20T10:58:14Z",
   "finding_ids": [
    "CR-061"
   ],
   "hunt_id": null,
   "id": "EV-0051",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 64,
    "check": "Local administrator rights on developer laptops",
    "control": "CTL-07",
    "evaluated_at": "2025-11-20",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "tlv-lt-0093.acme.example",
    "resource_id": "EP-TLV-0093"
   },
   "sha256": "b238b518da29317b31eb9568596773725dd527401e1d06b568e329c795c96f75",
   "source": "Endpoint posture",
   "summary": "Configuration check failed on 64 assets"
  },
  {
   "asset_id": "EP-TLV-0093",
   "collected_at": "2025-11-21T08:04:22Z",
   "finding_ids": [
    "CR-061"
   ],
   "hunt_id": null,
   "id": "EV-0052",
   "kind": "ticket",
   "raw": {
    "action": "Just-in-time elevation tool",
    "due": "2026-01-04",
    "key": "SEC-2052",
    "owner_team": "IT Operations",
    "status": "In progress"
   },
   "sha256": "c712e61d129ba9f5f9d6dd339cbd6e77173f85db39fc239ccf92c712d68acd21",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "IOT-BOS-BADGE01",
   "collected_at": "2026-02-14T20:27:45Z",
   "finding_ids": [
    "CR-062"
   ],
   "hunt_id": null,
   "id": "EV-0053",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 8,
    "assets": [
     "badge reader HQ-1",
     "badge reader HQ-2",
     "badge reader HQ-3",
     "badge reader HQ-4",
     "badge reader HQ-5"
    ],
    "cvss": 7.2,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.05,
    "first_detected": "2026-02-14",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-IOT-0022",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "8cb4bd8a24e8188a19cca8494b931c15465a88d1017f3721129f640c9532baea",
   "source": "Network discovery",
   "summary": "Scanner detected ACME-VULN-IOT-0022 on 8 assets"
  },
  {
   "asset_id": "IOT-BOS-BADGE01",
   "collected_at": "2026-03-06T22:44:09Z",
   "finding_ids": [
    "CR-062"
   ],
   "hunt_id": null,
   "id": "EV-0054",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-IOT-0022",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 8
   },
   "sha256": "7750c4b3534ecf7c1447b714dc59996c2661d03863014345e8605fb0087c1534",
   "source": "Network discovery",
   "summary": "Re-scan: ACME-VULN-IOT-0022 still present"
  },
  {
   "asset_id": "IOT-BOS-CONF01",
   "collected_at": "2026-05-27T00:02:24Z",
   "finding_ids": [
    "CR-063"
   ],
   "hunt_id": null,
   "id": "EV-0055",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 5,
    "check": "Conference-room systems use vendor default credentials",
    "control": "CTL-29",
    "evaluated_at": "2026-05-27",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "conference room system BOS-1",
    "resource_id": "IOT-BOS-CONF01"
   },
   "sha256": "73e23d70aa199e584196489182ebe31f618cd6d8f1ba71ad4ecf1640c7e0bc4a",
   "source": "Network discovery",
   "summary": "Configuration check failed on 5 assets"
  },
  {
   "asset_id": "NET-SIN-FWMGMT",
   "collected_at": "2026-09-15T23:25:29Z",
   "finding_ids": [
    "CR-064"
   ],
   "hunt_id": "HUNT-08",
   "id": "EV-0056",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "APAC firewall management interface exposed to the internet",
    "observed_at": "2026-09-15",
    "reachable_from": "internet",
    "resource": "fw-mgmt.sin (firewall management interface)",
    "resource_id": "NET-SIN-FWMGMT"
   },
   "sha256": "aeedb128293e678787759a67d77bead2417b76c54b25e083edefd06f77be8379",
   "source": "Attack-surface scan",
   "summary": "Exposure observed on fw-mgmt.sin (firewall management interface)"
  },
  {
   "asset_id": "EP-REM-0279",
   "collected_at": "2026-09-18T04:45:53Z",
   "finding_ids": [
    "CR-065"
   ],
   "hunt_id": "HUNT-06",
   "id": "EV-0057",
   "kind": "alert",
   "raw": {
    "alert_id": "ALR-065-4615",
    "disposition": "true positive — under remediation",
    "entities": [
     "rem-lt-0279.acme.example",
     "rem-lt-0280.acme.example"
    ],
    "first_seen": "2026-09-18",
    "occurrences": 4,
    "rule": "Unapproved remote-access tool found on two consultant laptops",
    "severity": "medium",
    "techniques": [
     "T1219"
    ]
   },
   "sha256": "4f20953e5a47e267b96a9c96c001aab85dd0ddcbd2c5aa07ebe3ed5aa2c8e90a",
   "source": "IRTriage triage (Professional Services laptops)",
   "summary": "SOC alert raised: Unapproved remote-access tool found on two consultant laptops"
  },
  {
   "asset_id": "EP-REM-0279",
   "collected_at": "2026-09-19T14:45:27Z",
   "finding_ids": [
    "CR-065"
   ],
   "hunt_id": "HUNT-06",
   "id": "EV-0058",
   "kind": "ticket",
   "raw": {
    "action": "Remove tool, collect triage, confirm no customer data accessed",
    "due": "2026-09-20",
    "key": "SEC-2058",
    "owner_team": "Security Operations",
    "status": "To do"
   },
   "sha256": "fdb073ad8102d81a828f8d71df335fa0f58eebee0345d3343a83aff9e0175247",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "GCP-GCS-TIP-FEEDS",
   "collected_at": "2026-08-29T11:13:54Z",
   "finding_ids": [
    "CR-066"
   ],
   "hunt_id": null,
   "id": "EV-0059",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "TIP feed bucket grants write access to a decommissioned partner account",
    "control": "CTL-25",
    "evaluated_at": "2026-08-29",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "gcp: gs://acme-tip-feeds",
    "resource_id": "GCP-GCS-TIP-FEEDS"
   },
   "sha256": "2f2f2965bd8c0df37e31bb01efbf206ca377c5487848d523020b0f3dc0b8668f",
   "source": "CSPM",
   "summary": "Configuration check failed on gcp: gs://acme-tip-feeds"
  },
  {
   "asset_id": "AWS-ALB-PORTAL",
   "collected_at": "2026-06-20T20:40:28Z",
   "finding_ids": [
    "CR-070"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0060",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "No volumetric DDoS protection on customer-facing edges (portal, TIP API, website)",
    "control": "CTL-17",
    "evaluated_at": "2026-06-20",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: portal.acme.example (ALB)",
    "resource_id": "AWS-ALB-PORTAL"
   },
   "sha256": "f5c800601a75f81fa72e236cc052c822de226ca1ac9d117365188bfb901ce51c",
   "source": "Architecture review",
   "summary": "Configuration check failed on aws: portal.acme.example (ALB)"
  },
  {
   "asset_id": "AWS-ALB-PORTAL",
   "collected_at": "2026-06-24T15:55:38Z",
   "finding_ids": [
    "CR-070"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0061",
   "kind": "ticket",
   "raw": {
    "action": "Enrol all edges in managed DDoS protection with always-on detection and a response runbook",
    "due": "2026-07-20",
    "key": "SEC-2061",
    "owner_team": "Security Engineering",
    "status": "To do"
   },
   "sha256": "4d946d56394f14bee98a8e9b47c365c034b62cd8c6cd4604431208e648d0f6c7",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "WEB-ORIGIN",
   "collected_at": "2026-08-11T01:02:32Z",
   "finding_ids": [
    "CR-071"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0062",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Corporate website origin reachable directly, bypassing the CDN",
    "observed_at": "2026-08-11",
    "reachable_from": "internet",
    "resource": "aws: www-origin (marketing CMS origin)",
    "resource_id": "WEB-ORIGIN"
   },
   "sha256": "dcf40bbd2d66146695e304c24fa9d9f41666a27af08c8e6b53f90e23a4d1f025",
   "source": "Attack-surface scan",
   "summary": "Exposure observed on aws: www-origin (marketing CMS origin)"
  },
  {
   "asset_id": "WEB-ORIGIN",
   "collected_at": "2026-08-13T14:01:19Z",
   "finding_ids": [
    "CR-071"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0063",
   "kind": "ticket",
   "raw": {
    "action": "Accept origin traffic from the CDN only; add origin authentication header",
    "due": "2026-08-16",
    "key": "SEC-2063",
    "owner_team": "Marketing Technology",
    "status": "To do"
   },
   "sha256": "385a8c69988ee756e9f1ca325f9847d8e972dcace7dbd8161c42d32d8d530cd9",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-APIGW-TIP",
   "collected_at": "2026-07-02T02:25:07Z",
   "finding_ids": [
    "CR-072"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0064",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "No per-client rate limiting on the TIP public API",
    "control": "CTL-17",
    "evaluated_at": "2026-07-02",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: api.tip.acme.example (API Gateway)",
    "resource_id": "AWS-APIGW-TIP"
   },
   "sha256": "cbac5a39e38130d040fff022661fc8031aee88d5ec6df6fd607766015d2d11a2",
   "source": "API gateway review",
   "summary": "Configuration check failed on aws: api.tip.acme.example (API Gateway)"
  },
  {
   "asset_id": "AWS-APIGW-TIP",
   "collected_at": "2026-07-05T08:20:46Z",
   "finding_ids": [
    "CR-072"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0065",
   "kind": "ticket",
   "raw": {
    "action": "Usage plans with per-key throttling and burst limits",
    "due": "2026-07-12",
    "key": "SEC-2065",
    "owner_team": "Platform Engineering",
    "status": "To do"
   },
   "sha256": "4483bf54a644046cc188085d4fb1d4eb02955ee1a0d442b664d9989d2792c59e",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-ALB-PORTAL",
   "collected_at": "2026-09-06T20:41:09Z",
   "finding_ids": [
    "CR-073"
   ],
   "hunt_id": "HUNT-01",
   "id": "EV-0066",
   "kind": "alert",
   "raw": {
    "alert_id": "ALR-073-3386",
    "disposition": "true positive — under remediation",
    "entities": [
     "aws: portal.acme.example (ALB)",
     "Web application firewall (portal)"
    ],
    "first_seen": "2026-09-06",
    "occurrences": 7,
    "rule": "Recurring request-rate anomalies against the customer portal login (3 episodes in September)",
    "severity": "medium",
    "techniques": [
     "T1499"
    ]
   },
   "sha256": "6c3535f195cc81688e10baaa58024eddf1c6d2b3011138aea1f6de8d0568cdbe",
   "source": "SOC alert (edge)",
   "summary": "SOC alert raised: Recurring request-rate anomalies against the customer portal login (3 episodes in September)"
  },
  {
   "asset_id": "SAAS-IDP",
   "collected_at": "2026-09-16T18:59:07Z",
   "finding_ids": [
    "CR-074"
   ],
   "hunt_id": null,
   "id": "EV-0067",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Staff credentials present in third-party breach data (12 accounts, 2 in finance)",
    "observed_at": "2026-09-16",
    "reachable_from": "broad internal / third party",
    "resource": "Workforce identity provider (SSO)",
    "resource_id": "SAAS-IDP"
   },
   "sha256": "b5d5dba9ee9b3f6997beff47e8752446fcb2e939e2ebd07ee54cd47da35e5852",
   "source": "Threat-intel monitoring",
   "summary": "Exposure observed on Workforce identity provider (SSO)"
  },
  {
   "asset_id": "SAAS-IDP",
   "collected_at": "2026-09-20T05:49:30Z",
   "finding_ids": [
    "CR-074"
   ],
   "hunt_id": null,
   "id": "EV-0068",
   "kind": "ticket",
   "raw": {
    "action": "Force password resets, confirm MFA enrolment, watch sign-ins for 30 days",
    "due": "2026-09-18",
    "key": "SEC-2068",
    "owner_team": "Security Operations",
    "status": "To do"
   },
   "sha256": "ef9418ef48a12864a04253f950b661d35b8470aeee2e4b62bd23ccb5a9f7a04f",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-BOS-0325",
   "collected_at": "2025-11-15T07:31:53Z",
   "finding_ids": [
    "CR-100"
   ],
   "hunt_id": null,
   "id": "EV-0069",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 20,
    "assets": [
     "bos-lt-0325.acme.example",
     "bos-lt-0021.acme.example",
     "bos-lt-0392.acme.example",
     "bos-lt-0480.acme.example",
     "bos-lt-0237.acme.example"
    ],
    "cvss": 8.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.18,
    "first_detected": "2025-11-15",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-OSCU-BOS",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "d36cc3869c9acaa750d388076b5337ddc572c74757d4be1a11f678975e626b3e",
   "source": "Patch management",
   "summary": "Scanner detected ACME-VULN-OSCU-BOS on 20 assets"
  },
  {
   "asset_id": "EP-BOS-0325",
   "collected_at": "2025-12-05T08:47:47Z",
   "finding_ids": [
    "CR-100"
   ],
   "hunt_id": null,
   "id": "EV-0070",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-OSCU-BOS",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 20
   },
   "sha256": "4b4ff2c4ae23b8298f9eedd3ff9edfed40551816f5add96c22b1410570d0b1fb",
   "source": "Patch management",
   "summary": "Re-scan: ACME-VULN-OSCU-BOS still present"
  },
  {
   "asset_id": "EP-BOS-0332",
   "collected_at": "2026-09-14T04:21:08Z",
   "finding_ids": [
    "CR-101"
   ],
   "hunt_id": null,
   "id": "EV-0071",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 12,
    "assets": [
     "bos-lt-0332.acme.example",
     "bos-lt-0237.acme.example",
     "bos-lt-0171.acme.example",
     "bos-lt-0003.acme.example",
     "bos-lt-0430.acme.example"
    ],
    "cvss": 8.8,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.62,
    "first_detected": "2026-09-14",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-BRW-BOS",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "575a27d6af98a7a2a2978d22400109eec793439eb3e70b69e8a2070481a179a5",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-BRW-BOS on 12 assets"
  },
  {
   "asset_id": "EP-BOS-0332",
   "collected_at": "2026-09-30T04:56:49Z",
   "finding_ids": [
    "CR-101"
   ],
   "hunt_id": null,
   "id": "EV-0072",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-BRW-BOS",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 12
   },
   "sha256": "9658ac5dab70eb9284ec2709393e46b105f1c564a5c0c37a31e367dba4adbebe",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-BRW-BOS still present"
  },
  {
   "asset_id": "EP-BOS-0332",
   "collected_at": "2026-09-15T14:26:57Z",
   "finding_ids": [
    "CR-101"
   ],
   "hunt_id": null,
   "id": "EV-0073",
   "kind": "ticket",
   "raw": {
    "action": "Auto-update browsers; restart enforcement",
    "due": "2026-09-17",
    "key": "SEC-2073",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "b5765b058b9155ee0ec1492e3f05fcbac9e4a071339e3361e2d0aa73ff0cb64e",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-DUB-0069",
   "collected_at": "2026-05-26T14:54:57Z",
   "finding_ids": [
    "CR-102"
   ],
   "hunt_id": null,
   "id": "EV-0074",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 11,
    "assets": [
     "dub-lt-0069.acme.example",
     "dub-lt-0048.acme.example",
     "dub-lt-0190.acme.example",
     "dub-lt-0272.acme.example",
     "dub-lt-0065.acme.example"
    ],
    "cvss": 8.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.18,
    "first_detected": "2026-05-26",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-OSCU-DUB",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "0a8dbcc0e1750c752d0080d501ec2589716c5450a175b86172a3220f45268513",
   "source": "Patch management",
   "summary": "Scanner detected ACME-VULN-OSCU-DUB on 11 assets"
  },
  {
   "asset_id": "EP-DUB-0069",
   "collected_at": "2026-06-05T17:34:52Z",
   "finding_ids": [
    "CR-102"
   ],
   "hunt_id": null,
   "id": "EV-0075",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-OSCU-DUB",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 11
   },
   "sha256": "39b7f88ee26dc17a9dd7256738e6c35733f8ee58c6d82b35df232f05531ec3c5",
   "source": "Patch management",
   "summary": "Re-scan: ACME-VULN-OSCU-DUB still present"
  },
  {
   "asset_id": "EP-DUB-0069",
   "collected_at": "2026-05-30T22:19:10Z",
   "finding_ids": [
    "CR-102"
   ],
   "hunt_id": null,
   "id": "EV-0076",
   "kind": "ticket",
   "raw": {
    "action": "Force-install via MDM with deadline",
    "due": "2026-06-02",
    "key": "SEC-2076",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "b436db6baddb72bd1b42a3c3dc5e12717b7c5bd9243aec29e3471444addc3342",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-DUB-0275",
   "collected_at": "2026-09-11T17:32:09Z",
   "finding_ids": [
    "CR-103"
   ],
   "hunt_id": null,
   "id": "EV-0077",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 7,
    "assets": [
     "dub-lt-0275.acme.example",
     "dub-lt-0408.acme.example",
     "dub-lt-0447.acme.example",
     "dub-lt-0343.acme.example",
     "dub-lt-0043.acme.example"
    ],
    "cvss": 8.8,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.62,
    "first_detected": "2026-09-11",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-BRW-DUB",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "0d07b7066b38d4401e8de54d92ca1d0b25055c6bc270485ae3dcdaa0bd778263",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-BRW-DUB on 7 assets"
  },
  {
   "asset_id": "EP-DUB-0275",
   "collected_at": "2026-09-21T17:51:17Z",
   "finding_ids": [
    "CR-103"
   ],
   "hunt_id": null,
   "id": "EV-0078",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-BRW-DUB",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 7
   },
   "sha256": "56b06c4ae909e287470e5de6cce7b959fdfce2a6c26b375d57f1f7028ae2e0ea",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-BRW-DUB still present"
  },
  {
   "asset_id": "EP-SIN-0458",
   "collected_at": "2026-04-13T10:55:49Z",
   "finding_ids": [
    "CR-104"
   ],
   "hunt_id": null,
   "id": "EV-0079",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 13,
    "assets": [
     "sin-lt-0458.acme.example",
     "sin-lt-0368.acme.example",
     "sin-lt-0078.acme.example",
     "sin-lt-0457.acme.example",
     "sin-lt-0493.acme.example"
    ],
    "cvss": 8.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.18,
    "first_detected": "2026-04-13",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-OSCU-SIN",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "572aeac2c5aae225b12691706d886d69a594af8956461b4c3950b33f23ac6249",
   "source": "Patch management",
   "summary": "Scanner detected ACME-VULN-OSCU-SIN on 13 assets"
  },
  {
   "asset_id": "EP-SIN-0458",
   "collected_at": "2026-05-01T17:23:31Z",
   "finding_ids": [
    "CR-104"
   ],
   "hunt_id": null,
   "id": "EV-0080",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-OSCU-SIN",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 13
   },
   "sha256": "ff649ac4e4cb0bd0c0627fb2fb770747923698ff4ec5d23b72859c39e4fd3288",
   "source": "Patch management",
   "summary": "Re-scan: ACME-VULN-OSCU-SIN still present"
  },
  {
   "asset_id": "EP-SIN-0077",
   "collected_at": "2026-09-03T16:45:18Z",
   "finding_ids": [
    "CR-105"
   ],
   "hunt_id": null,
   "id": "EV-0081",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 4,
    "assets": [
     "sin-lt-0077.acme.example",
     "sin-lt-0079.acme.example",
     "sin-lt-0454.acme.example",
     "sin-lt-0071.acme.example"
    ],
    "cvss": 8.8,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.62,
    "first_detected": "2026-09-03",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-BRW-SIN",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "78cc611a2ac05c19bfa1bf225e606e9235ee1508eed633ca4fb9966dab92f220",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-BRW-SIN on 4 assets"
  },
  {
   "asset_id": "EP-SIN-0077",
   "collected_at": "2026-09-22T18:33:55Z",
   "finding_ids": [
    "CR-105"
   ],
   "hunt_id": null,
   "id": "EV-0082",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-BRW-SIN",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 4
   },
   "sha256": "39b3a1489df9b8d7c4ce37553ac17013740dd6b2dd2750423143fc4317e34d0f",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-BRW-SIN still present"
  },
  {
   "asset_id": "EP-SIN-0077",
   "collected_at": "2026-09-06T12:57:48Z",
   "finding_ids": [
    "CR-105"
   ],
   "hunt_id": null,
   "id": "EV-0083",
   "kind": "ticket",
   "raw": {
    "action": "Auto-update browsers; restart enforcement",
    "due": "2026-09-06",
    "key": "SEC-2083",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "3273441a1a3d454fc7b17c697af644d77899c188f76566a14a5aaa8bb0e9283d",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-TLV-0219",
   "collected_at": "2026-01-24T23:46:29Z",
   "finding_ids": [
    "CR-106"
   ],
   "hunt_id": null,
   "id": "EV-0084",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 9,
    "assets": [
     "tlv-lt-0219.acme.example",
     "tlv-lt-0136.acme.example",
     "tlv-lt-0103.acme.example",
     "tlv-lt-0093.acme.example",
     "tlv-lt-0106.acme.example"
    ],
    "cvss": 8.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.18,
    "first_detected": "2026-01-24",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-OSCU-TLV",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "a5a7ab6b1270a361619942592497d42b82fbb41badf0799fe717e41e232727ae",
   "source": "Patch management",
   "summary": "Scanner detected ACME-VULN-OSCU-TLV on 9 assets"
  },
  {
   "asset_id": "EP-TLV-0219",
   "collected_at": "2026-02-13T08:09:31Z",
   "finding_ids": [
    "CR-106"
   ],
   "hunt_id": null,
   "id": "EV-0085",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-OSCU-TLV",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 9
   },
   "sha256": "d06a36395ace0a81b6ae9d157a495df3ab52a10a1edc0092142b4e281d8b9804",
   "source": "Patch management",
   "summary": "Re-scan: ACME-VULN-OSCU-TLV still present"
  },
  {
   "asset_id": "EP-TLV-0219",
   "collected_at": "2026-01-26T19:38:08Z",
   "finding_ids": [
    "CR-106"
   ],
   "hunt_id": null,
   "id": "EV-0086",
   "kind": "ticket",
   "raw": {
    "action": "Force-install via MDM with deadline",
    "due": "2026-01-31",
    "key": "SEC-2086",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "e4a2ac2b72afc7c0db3ffa60befe8c7202fac79d2f1ad1d0b6c962395101b309",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-TLV-0221",
   "collected_at": "2026-09-16T03:18:47Z",
   "finding_ids": [
    "CR-107"
   ],
   "hunt_id": null,
   "id": "EV-0087",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 5,
    "assets": [
     "tlv-lt-0221.acme.example",
     "tlv-lt-0130.acme.example",
     "tlv-lt-0110.acme.example",
     "tlv-lt-0096.acme.example",
     "tlv-lt-0460.acme.example"
    ],
    "cvss": 8.8,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.62,
    "first_detected": "2026-09-16",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-BRW-TLV",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "ddd783ed35bf57cde821f1e5a929c9e02a4811c8e85ec8a4d37d545c325a7edf",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-BRW-TLV on 5 assets"
  },
  {
   "asset_id": "EP-TLV-0221",
   "collected_at": "2026-09-30T10:28:58Z",
   "finding_ids": [
    "CR-107"
   ],
   "hunt_id": null,
   "id": "EV-0088",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-BRW-TLV",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 5
   },
   "sha256": "ee9d3806e68b74161ed7fb4b664dea3cd2cd24eaa3892807fe4362ebfdcb750b",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-BRW-TLV still present"
  },
  {
   "asset_id": "EP-TLV-0221",
   "collected_at": "2026-09-17T23:13:15Z",
   "finding_ids": [
    "CR-107"
   ],
   "hunt_id": null,
   "id": "EV-0089",
   "kind": "ticket",
   "raw": {
    "action": "Auto-update browsers; restart enforcement",
    "due": "2026-09-19",
    "key": "SEC-2089",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "046dc7a0fb9d92fe571c8ccb424ff0f119aa8d88cc14f7089776141f64d7178f",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-REM-0383",
   "collected_at": "2025-11-04T04:17:31Z",
   "finding_ids": [
    "CR-108"
   ],
   "hunt_id": null,
   "id": "EV-0090",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 4,
    "assets": [
     "rem-lt-0383.acme.example",
     "rem-lt-0281.acme.example",
     "rem-lt-0292.acme.example",
     "rem-lt-0208.acme.example"
    ],
    "cvss": 8.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.18,
    "first_detected": "2025-11-04",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-OSCU-REM",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "adc1e6e9ae4411fe18297965babf3d904c7d8a971330c72934029f6faaea8452",
   "source": "Patch management",
   "summary": "Scanner detected ACME-VULN-OSCU-REM on 4 assets"
  },
  {
   "asset_id": "EP-REM-0383",
   "collected_at": "2025-11-24T03:04:31Z",
   "finding_ids": [
    "CR-108"
   ],
   "hunt_id": null,
   "id": "EV-0091",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-OSCU-REM",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 4
   },
   "sha256": "2baffd3414b61bca597df9bade565b7883545afc2d65ea0a2df756c7b08dc8cb",
   "source": "Patch management",
   "summary": "Re-scan: ACME-VULN-OSCU-REM still present"
  },
  {
   "asset_id": "EP-REM-0383",
   "collected_at": "2025-11-07T04:22:34Z",
   "finding_ids": [
    "CR-108"
   ],
   "hunt_id": null,
   "id": "EV-0092",
   "kind": "ticket",
   "raw": {
    "action": "Force-install via MDM with deadline",
    "due": "2025-11-11",
    "key": "SEC-2092",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "0bbd14ed633a7a08986af2fe9719e4ee7c3746c9c2ffad5abbc6da6d276b38eb",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "EP-REM-0376",
   "collected_at": "2026-09-24T12:08:13Z",
   "finding_ids": [
    "CR-109"
   ],
   "hunt_id": null,
   "id": "EV-0093",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 3,
    "assets": [
     "rem-lt-0376.acme.example",
     "rem-lt-0279.acme.example",
     "rem-lt-0203.acme.example"
    ],
    "cvss": 8.8,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.62,
    "first_detected": "2026-09-24",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-BRW-REM",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "04bc86e1ae49ef0576ddbc93423495b64120b12482866863431339ed25043722",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-BRW-REM on rem-lt-0376.acme.example"
  },
  {
   "asset_id": "EP-REM-0376",
   "collected_at": "2026-09-30T13:41:00Z",
   "finding_ids": [
    "CR-109"
   ],
   "hunt_id": null,
   "id": "EV-0094",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-BRW-REM",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 3
   },
   "sha256": "15e353488c329a5a774e9d55d902b4f1b5f77c93f12c3612c06df4fd0e9e2fe8",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-BRW-REM still present"
  },
  {
   "asset_id": "EP-REM-0376",
   "collected_at": "2026-09-25T19:39:02Z",
   "finding_ids": [
    "CR-109"
   ],
   "hunt_id": null,
   "id": "EV-0095",
   "kind": "ticket",
   "raw": {
    "action": "Auto-update browsers; restart enforcement",
    "due": "2026-09-27",
    "key": "SEC-2095",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "87f2237f9830f3f2ee24fbc9b2530a7257f97b6eb1a220926bba8a36f2f3fd81",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-BOS-FS01",
   "collected_at": "2026-01-16T20:35:17Z",
   "finding_ids": [
    "CR-110"
   ],
   "hunt_id": null,
   "id": "EV-0096",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 2,
    "assets": [
     "fs01.acme.example",
     "util13.sin.acme.example"
    ],
    "cvss": 7.3,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.28,
    "first_detected": "2026-01-16",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-001",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "c7164cca05a4dfc39ee61c463295f61ae67f4b9eadc5777b4a3c72e10048acb0",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-SRV-001 on fs01.acme.example"
  },
  {
   "asset_id": "SRV-BOS-FS01",
   "collected_at": "2026-01-23T01:14:43Z",
   "finding_ids": [
    "CR-110"
   ],
   "hunt_id": null,
   "id": "EV-0097",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-001",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 2
   },
   "sha256": "84bb0c2b34339ede45ed19a4b9b825e1b1734220458c0cce9675f9830fc336d8",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-SRV-001 still present"
  },
  {
   "asset_id": "SRV-BOS-UTL21",
   "collected_at": "2026-01-17T12:13:47Z",
   "finding_ids": [
    "CR-111"
   ],
   "hunt_id": null,
   "id": "EV-0098",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "SMB signing not required on 1 server",
    "control": "CTL-04",
    "evaluated_at": "2026-01-17",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "util21.bos.acme.example",
    "resource_id": "SRV-BOS-UTL21"
   },
   "sha256": "71e21052b576eb061c6e3cb43cf5cffd1a2f5a7cc5edddc33b57f3b8fe2cb5b1",
   "source": "Configuration audit",
   "summary": "Configuration check failed on util21.bos.acme.example"
  },
  {
   "asset_id": "SRV-BOS-UTL21",
   "collected_at": "2026-01-18T10:45:21Z",
   "finding_ids": [
    "CR-111"
   ],
   "hunt_id": null,
   "id": "EV-0099",
   "kind": "ticket",
   "raw": {
    "action": "Apply hardening baseline / update",
    "due": "2026-02-02",
    "key": "SEC-2099",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "fbd82e7cf4d046754f59a04445f2b3a801d46342579695485f87418be26422cb",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-DUB-UTL02",
   "collected_at": "2026-02-19T16:21:00Z",
   "finding_ids": [
    "CR-112"
   ],
   "hunt_id": null,
   "id": "EV-0100",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 3,
    "assets": [
     "util02.dub.acme.example",
     "util05.bos.acme.example",
     "build01.rnd.acme.example"
    ],
    "cvss": 5.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.12,
    "first_detected": "2026-02-19",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-003",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "2c235d25610a8d1dc5f20045287a6a0905e89f2ad7259daf524e729f44515852",
   "source": "Configuration audit",
   "summary": "Scanner detected ACME-VULN-SRV-003 on util02.dub.acme.example"
  },
  {
   "asset_id": "SRV-DUB-UTL02",
   "collected_at": "2026-03-11T18:26:48Z",
   "finding_ids": [
    "CR-112"
   ],
   "hunt_id": null,
   "id": "EV-0101",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-003",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 3
   },
   "sha256": "cd80dfba324c1938448d3aaa9145b1302c18c03f7012b5177e76f5c9cbb9e390",
   "source": "Configuration audit",
   "summary": "Re-scan: ACME-VULN-SRV-003 still present"
  },
  {
   "asset_id": "SRV-DUB-UTL02",
   "collected_at": "2026-02-20T15:36:10Z",
   "finding_ids": [
    "CR-112"
   ],
   "hunt_id": null,
   "id": "EV-0102",
   "kind": "ticket",
   "raw": {
    "action": "Apply hardening baseline / update",
    "due": "2026-03-04",
    "key": "SEC-2102",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "8340a975e684c7d59da79a9f9e96538c38e7009f3c2baa23c94c2d1be93442fd",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-DUB-UTL02",
   "collected_at": "2025-12-17T18:23:43Z",
   "finding_ids": [
    "CR-113"
   ],
   "hunt_id": null,
   "id": "EV-0103",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 2,
    "check": "Host firewall disabled on 2 servers",
    "control": "CTL-04",
    "evaluated_at": "2025-12-17",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "util02.dub.acme.example",
    "resource_id": "SRV-DUB-UTL02"
   },
   "sha256": "0f4cee2b27b0ad69f751b4d520a8b5d0558029366e1460ad1b98cfc90e903583",
   "source": "Vulnerability scanner",
   "summary": "Configuration check failed on util02.dub.acme.example"
  },
  {
   "asset_id": "SRV-SIN-UTL13",
   "collected_at": "2026-03-10T09:29:08Z",
   "finding_ids": [
    "CR-114"
   ],
   "hunt_id": null,
   "id": "EV-0104",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "SMB signing not required on 3 servers",
    "control": "CTL-04",
    "evaluated_at": "2026-03-10",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "util13.sin.acme.example",
    "resource_id": "SRV-SIN-UTL13"
   },
   "sha256": "0eb9bcfc7655c7169dddb38155f9403c116a6628d03cd4ef5d2c038e26170dc0",
   "source": "Vulnerability scanner",
   "summary": "Configuration check failed on util13.sin.acme.example"
  },
  {
   "asset_id": "SRV-DUB-PS01",
   "collected_at": "2026-02-11T05:40:12Z",
   "finding_ids": [
    "CR-115"
   ],
   "hunt_id": null,
   "id": "EV-0105",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "SMB signing not required on 3 servers",
    "control": "CTL-04",
    "evaluated_at": "2026-02-11",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "ps-tools-dub01.acme.example",
    "resource_id": "SRV-DUB-PS01"
   },
   "sha256": "7397cd1f9c33c3d6e36556a521a812655379a4364d98d6b94b58a01085355b01",
   "source": "Configuration audit",
   "summary": "Configuration check failed on ps-tools-dub01.acme.example"
  },
  {
   "asset_id": "SRV-BOS-UTL11",
   "collected_at": "2026-08-17T09:26:35Z",
   "finding_ids": [
    "CR-116"
   ],
   "hunt_id": null,
   "id": "EV-0106",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 4,
    "assets": [
     "util11.bos.acme.example",
     "util14.tlv.acme.example",
     "util09.tlv.acme.example",
     "util05.bos.acme.example"
    ],
    "cvss": 5.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.04,
    "first_detected": "2026-08-17",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-007",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "520759b2b01a5ebd01c2a1d648a92d4719bbc8fc3fa27a2ac8fa4daaa03ed9c5",
   "source": "Configuration audit",
   "summary": "Scanner detected ACME-VULN-SRV-007 on 4 assets"
  },
  {
   "asset_id": "SRV-BOS-UTL11",
   "collected_at": "2026-09-04T18:41:41Z",
   "finding_ids": [
    "CR-116"
   ],
   "hunt_id": null,
   "id": "EV-0107",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-007",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 4
   },
   "sha256": "817ebed56aa3447f1686c433122c3f527bdc35b83bb1372e96cdc704a5108e81",
   "source": "Configuration audit",
   "summary": "Re-scan: ACME-VULN-SRV-007 still present"
  },
  {
   "asset_id": "SRV-BOS-UTL11",
   "collected_at": "2026-08-19T19:09:57Z",
   "finding_ids": [
    "CR-116"
   ],
   "hunt_id": null,
   "id": "EV-0108",
   "kind": "ticket",
   "raw": {
    "action": "Apply hardening baseline / update",
    "due": "2026-09-14",
    "key": "SEC-2108",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "f47d181ce53eee1b11e34e879adfbab60945d03948e1560fefd6c05d584c7a5e",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-TLV-UTL19",
   "collected_at": "2026-03-05T21:59:45Z",
   "finding_ids": [
    "CR-117"
   ],
   "hunt_id": null,
   "id": "EV-0109",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 3,
    "assets": [
     "util19.tlv.acme.example",
     "util07.dub.acme.example",
     "backup01.acme.example"
    ],
    "cvss": 5.6,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.11,
    "first_detected": "2026-03-05",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-008",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "dcab7e74025e8cab5730c0ce3f132734d727294cad3b39da85260dc204d3a50d",
   "source": "Configuration audit",
   "summary": "Scanner detected ACME-VULN-SRV-008 on util19.tlv.acme.example"
  },
  {
   "asset_id": "SRV-TLV-UTL19",
   "collected_at": "2026-03-13T19:31:26Z",
   "finding_ids": [
    "CR-117"
   ],
   "hunt_id": null,
   "id": "EV-0110",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-008",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 3
   },
   "sha256": "c7935c5647c4ca3c9b23aded4cd9fd623ccb1c95ad21d285ed16f950007662d6",
   "source": "Configuration audit",
   "summary": "Re-scan: ACME-VULN-SRV-008 still present"
  },
  {
   "asset_id": "SRV-TLV-UTL19",
   "collected_at": "2026-03-06T14:30:42Z",
   "finding_ids": [
    "CR-117"
   ],
   "hunt_id": null,
   "id": "EV-0111",
   "kind": "ticket",
   "raw": {
    "action": "Apply hardening baseline / update",
    "due": "2026-03-15",
    "key": "SEC-2111",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "574d93bce71fc77043673c0c7957b890e2771cd0563eb6b4a135da9747b67bf1",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-BOS-UTL01",
   "collected_at": "2025-10-28T01:50:24Z",
   "finding_ids": [
    "CR-118"
   ],
   "hunt_id": null,
   "id": "EV-0112",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "Host firewall disabled on 3 servers",
    "control": "CTL-04",
    "evaluated_at": "2025-10-28",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "util01.bos.acme.example",
    "resource_id": "SRV-BOS-UTL01"
   },
   "sha256": "e32e59d1112b52c9e9a10eca36e424a66834f31669ce67899442389ee5b84206",
   "source": "Configuration audit",
   "summary": "Configuration check failed on util01.bos.acme.example"
  },
  {
   "asset_id": "SRV-TLV-BLD04",
   "collected_at": "2025-11-25T23:59:28Z",
   "finding_ids": [
    "CR-119"
   ],
   "hunt_id": null,
   "id": "EV-0113",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 2,
    "check": "Host firewall disabled on 2 servers",
    "control": "CTL-04",
    "evaluated_at": "2025-11-25",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "build04.rnd.acme.example",
    "resource_id": "SRV-TLV-BLD04"
   },
   "sha256": "3c16fa65aae5862f21172f4ef8af6c8a824143aa8884cd4f113dcc1f0bfe548b",
   "source": "Configuration audit",
   "summary": "Configuration check failed on build04.rnd.acme.example"
  },
  {
   "asset_id": "SRV-SIN-FS01",
   "collected_at": "2026-02-06T01:34:24Z",
   "finding_ids": [
    "CR-120"
   ],
   "hunt_id": null,
   "id": "EV-0114",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 4,
    "assets": [
     "fs-sin01.acme.example",
     "soar01.acme.example",
     "util14.tlv.acme.example",
     "util16.bos.acme.example"
    ],
    "cvss": 6.9,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.02,
    "first_detected": "2026-02-06",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-011",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "de9b2613d0cd8710b957c62af5972539147e780ab33a762d74c1ea13a94775c1",
   "source": "Configuration audit",
   "summary": "Scanner detected ACME-VULN-SRV-011 on 4 assets"
  },
  {
   "asset_id": "SRV-SIN-FS01",
   "collected_at": "2026-02-16T07:39:27Z",
   "finding_ids": [
    "CR-120"
   ],
   "hunt_id": null,
   "id": "EV-0115",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-011",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 4
   },
   "sha256": "927a65064af9ee486c6f460db32400c8b9a2e1e2a0a8e48efbef5c273923563c",
   "source": "Configuration audit",
   "summary": "Re-scan: ACME-VULN-SRV-011 still present"
  },
  {
   "asset_id": "SRV-SIN-FS01",
   "collected_at": "2026-02-10T01:39:16Z",
   "finding_ids": [
    "CR-120"
   ],
   "hunt_id": null,
   "id": "EV-0116",
   "kind": "ticket",
   "raw": {
    "action": "Apply hardening baseline / update",
    "due": "2026-03-08",
    "key": "SEC-2116",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "8f1d0f8b27b9cf44a968629fbfefb00cfceb68e0f124494a556fe7000d4ddc27",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-BOS-UTL16",
   "collected_at": "2026-02-21T15:49:52Z",
   "finding_ids": [
    "CR-121"
   ],
   "hunt_id": null,
   "id": "EV-0117",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "SMB signing not required on 3 servers",
    "control": "CTL-04",
    "evaluated_at": "2026-02-21",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "util16.bos.acme.example",
    "resource_id": "SRV-BOS-UTL16"
   },
   "sha256": "3ebed175b0b8b0968e127b89c0538a49ad3759188b444901ea0cff3043d92989",
   "source": "IRTriage collection",
   "summary": "Configuration check failed on util16.bos.acme.example"
  },
  {
   "asset_id": "SRV-TLV-BLD02",
   "collected_at": "2026-07-18T05:10:30Z",
   "finding_ids": [
    "CR-122"
   ],
   "hunt_id": null,
   "id": "EV-0118",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Local admin password not rotated (no LAPS) on 1 server",
    "control": "CTL-07",
    "evaluated_at": "2026-07-18",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "build02.rnd.acme.example",
    "resource_id": "SRV-TLV-BLD02"
   },
   "sha256": "6b0741dd192a9fb299f863183fa21b329f396eaca293a7440d8c55607e5a28a9",
   "source": "Configuration audit",
   "summary": "Configuration check failed on build02.rnd.acme.example"
  },
  {
   "asset_id": "SRV-TLV-BLD02",
   "collected_at": "2026-07-27T14:42:25Z",
   "finding_ids": [
    "CR-123"
   ],
   "hunt_id": null,
   "id": "EV-0119",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "SMB signing not required on 3 servers",
    "control": "CTL-04",
    "evaluated_at": "2026-07-27",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "build02.rnd.acme.example",
    "resource_id": "SRV-TLV-BLD02"
   },
   "sha256": "b87af5ba1caf8737ed9d80b7289e7746f6a570792fbd02bf3ac244256cdb03a2",
   "source": "IRTriage collection",
   "summary": "Configuration check failed on build02.rnd.acme.example"
  },
  {
   "asset_id": "SRV-DUB-PS01",
   "collected_at": "2026-07-13T17:37:40Z",
   "finding_ids": [
    "CR-124"
   ],
   "hunt_id": null,
   "id": "EV-0120",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 4,
    "check": "Local admin password not rotated (no LAPS) on 4 servers",
    "control": "CTL-07",
    "evaluated_at": "2026-07-13",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "ps-tools-dub01.acme.example",
    "resource_id": "SRV-DUB-PS01"
   },
   "sha256": "e5287bb3af70fb8b48a0b2497d78fd3100edafcbfeee3f12a6e0163b237c3ba1",
   "source": "Configuration audit",
   "summary": "Configuration check failed on 4 assets"
  },
  {
   "asset_id": "SRV-BOS-FS01",
   "collected_at": "2026-03-09T06:59:26Z",
   "finding_ids": [
    "CR-125"
   ],
   "hunt_id": null,
   "id": "EV-0121",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "fs01.acme.example"
    ],
    "cvss": 7.4,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.08,
    "first_detected": "2026-03-09",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-016",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "0ffdeabb87217d9e96b7c5308a49889245bc43f1eb21b22fd5d1d9d709ce16db",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-SRV-016 on fs01.acme.example"
  },
  {
   "asset_id": "SRV-BOS-FS01",
   "collected_at": "2026-03-29T01:33:54Z",
   "finding_ids": [
    "CR-125"
   ],
   "hunt_id": null,
   "id": "EV-0122",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-016",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 1
   },
   "sha256": "2f8448d5f1c69336b34e950d7adf02ab0d4bb508200de16e86055e555b01a41a",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-SRV-016 still present"
  },
  {
   "asset_id": "SRV-DUB-UTL07",
   "collected_at": "2025-11-23T17:51:09Z",
   "finding_ids": [
    "CR-126"
   ],
   "hunt_id": null,
   "id": "EV-0123",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 4,
    "assets": [
     "util07.dub.acme.example",
     "fs01.acme.example",
     "util14.tlv.acme.example",
     "util11.bos.acme.example"
    ],
    "cvss": 4.7,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.29,
    "first_detected": "2025-11-23",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-017",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "80dcde713735edb2728cb7d14e3de319bc3930c09e4387d42514652ac717f583",
   "source": "Configuration audit",
   "summary": "Scanner detected ACME-VULN-SRV-017 on 4 assets"
  },
  {
   "asset_id": "SRV-DUB-UTL07",
   "collected_at": "2025-12-06T22:30:36Z",
   "finding_ids": [
    "CR-126"
   ],
   "hunt_id": null,
   "id": "EV-0124",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-017",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 4
   },
   "sha256": "cbf5a625a46f63596ada87789d2969ea989128ebf6024d538a4b4611c998739c",
   "source": "Configuration audit",
   "summary": "Re-scan: ACME-VULN-SRV-017 still present"
  },
  {
   "asset_id": "SRV-BOS-UTL01",
   "collected_at": "2026-07-21T18:09:59Z",
   "finding_ids": [
    "CR-127"
   ],
   "hunt_id": null,
   "id": "EV-0125",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "SMB signing not required on 1 server",
    "control": "CTL-04",
    "evaluated_at": "2026-07-21",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "util01.bos.acme.example",
    "resource_id": "SRV-BOS-UTL01"
   },
   "sha256": "72db213ca591e145ba91885d56696b79d01068bede5c6fa2fe38dfc0ca9f06fd",
   "source": "IRTriage collection",
   "summary": "Configuration check failed on util01.bos.acme.example"
  },
  {
   "asset_id": "SRV-TLV-DC01",
   "collected_at": "2026-06-19T16:58:12Z",
   "finding_ids": [
    "CR-128"
   ],
   "hunt_id": null,
   "id": "EV-0126",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 2,
    "assets": [
     "dc-tlv01.acme.example",
     "util11.bos.acme.example"
    ],
    "cvss": 6.5,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.17,
    "first_detected": "2026-06-19",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-019",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "537168eca954453db9f92a9104fa31a2a2b0015b1e95327bb96b482ea60f1541",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-SRV-019 on dc-tlv01.acme.example"
  },
  {
   "asset_id": "SRV-TLV-DC01",
   "collected_at": "2026-06-28T06:10:47Z",
   "finding_ids": [
    "CR-128"
   ],
   "hunt_id": null,
   "id": "EV-0127",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-019",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 2
   },
   "sha256": "24650236b99a4e64c7dfd9c72ec629a57ec8235c68a781e4f764bf9c2cd7f8b2",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-SRV-019 still present"
  },
  {
   "asset_id": "SRV-SIN-FS01",
   "collected_at": "2026-02-27T18:27:35Z",
   "finding_ids": [
    "CR-129"
   ],
   "hunt_id": null,
   "id": "EV-0128",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Host firewall disabled on 1 server",
    "control": "CTL-04",
    "evaluated_at": "2026-02-27",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "fs-sin01.acme.example",
    "resource_id": "SRV-SIN-FS01"
   },
   "sha256": "e0c60ef023b40fe4b5d0a6cf193e9efeaf31951ba98deebbbbd3fff7ba9dbac1",
   "source": "Configuration audit",
   "summary": "Configuration check failed on fs-sin01.acme.example"
  },
  {
   "asset_id": "SRV-SIN-FS01",
   "collected_at": "2026-03-03T03:29:54Z",
   "finding_ids": [
    "CR-129"
   ],
   "hunt_id": null,
   "id": "EV-0129",
   "kind": "ticket",
   "raw": {
    "action": "Apply hardening baseline / update",
    "due": "2026-03-15",
    "key": "SEC-2129",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "4d5329234e3b68d7eb4c64c7685c35b4eedc4b054dce2a1aa20ed0dec2bc6b23",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-BOS-UTL05",
   "collected_at": "2025-11-15T01:18:52Z",
   "finding_ids": [
    "CR-130"
   ],
   "hunt_id": null,
   "id": "EV-0130",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 2,
    "assets": [
     "util05.bos.acme.example",
     "soc-jump01.acme.example"
    ],
    "cvss": 6.8,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.19,
    "first_detected": "2025-11-15",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-021",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "f46ee59b841d04ea49b55e66ede3b2fb49b1b8f0cd9c1173a252f3388eb9ef09",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected ACME-VULN-SRV-021 on util05.bos.acme.example"
  },
  {
   "asset_id": "SRV-BOS-UTL05",
   "collected_at": "2025-11-23T15:53:35Z",
   "finding_ids": [
    "CR-130"
   ],
   "hunt_id": null,
   "id": "EV-0131",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-021",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 2
   },
   "sha256": "1f7f9041536d935eba9ac0f23949f1729631a03a7267fbb4757877cbe3b850bb",
   "source": "Vulnerability scanner",
   "summary": "Re-scan: ACME-VULN-SRV-021 still present"
  },
  {
   "asset_id": "SRV-SIN-UTL03",
   "collected_at": "2026-07-11T05:42:26Z",
   "finding_ids": [
    "CR-131"
   ],
   "hunt_id": null,
   "id": "EV-0132",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 4,
    "check": "SMB signing not required on 4 servers",
    "control": "CTL-04",
    "evaluated_at": "2026-07-11",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "util03.sin.acme.example",
    "resource_id": "SRV-SIN-UTL03"
   },
   "sha256": "e788066055cb6f7456a547f4e3db6e2cbf867626d2717cd9b7a01680cee4c41f",
   "source": "IRTriage collection",
   "summary": "Configuration check failed on 4 assets"
  },
  {
   "asset_id": "SRV-SIN-UTL03",
   "collected_at": "2026-07-13T17:08:29Z",
   "finding_ids": [
    "CR-131"
   ],
   "hunt_id": null,
   "id": "EV-0133",
   "kind": "ticket",
   "raw": {
    "action": "Apply hardening baseline / update",
    "due": "2026-08-02",
    "key": "SEC-2133",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "af7d8ad7cb860676406fd8c144ce4666d03fe68df5bb5dfe9ddc3566577283b8",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SRV-TLV-BLD03",
   "collected_at": "2025-11-14T02:23:38Z",
   "finding_ids": [
    "CR-132"
   ],
   "hunt_id": null,
   "id": "EV-0134",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "build03.rnd.acme.example"
    ],
    "cvss": 5.1,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": 0.06,
    "first_detected": "2025-11-14",
    "last_detected": "2026-09-30",
    "plugin_id": "ACME-VULN-SRV-023",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "c1fadfe6d960585c8f3be773b6889137a3daf65efe1913d62ed4b5abca2c4be7",
   "source": "IRTriage collection",
   "summary": "Scanner detected ACME-VULN-SRV-023 on build03.rnd.acme.example"
  },
  {
   "asset_id": "SRV-TLV-BLD03",
   "collected_at": "2025-11-30T23:55:52Z",
   "finding_ids": [
    "CR-132"
   ],
   "hunt_id": null,
   "id": "EV-0135",
   "kind": "scanner_result",
   "raw": {
    "plugin_id": "ACME-VULN-SRV-023",
    "rescan": true,
    "scanner": "ACME vulnerability scanner (mock)",
    "still_vulnerable": 1
   },
   "sha256": "77adc6e33f030d158f913bc1ff87e2d5dd48710db1686e2c48814d6c5522ec03",
   "source": "IRTriage collection",
   "summary": "Re-scan: ACME-VULN-SRV-023 still present"
  },
  {
   "asset_id": "SRV-TLV-BLD03",
   "collected_at": "2026-03-17T10:04:50Z",
   "finding_ids": [
    "CR-133"
   ],
   "hunt_id": null,
   "id": "EV-0136",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "SMB signing not required on 1 server",
    "control": "CTL-04",
    "evaluated_at": "2026-03-17",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "build03.rnd.acme.example",
    "resource_id": "SRV-TLV-BLD03"
   },
   "sha256": "7e43334f00c15f225d1c060881166ecd751043268a0501bdff21b5fbef0a84a0",
   "source": "IRTriage collection",
   "summary": "Configuration check failed on build03.rnd.acme.example"
  },
  {
   "asset_id": "SRV-TLV-BLD03",
   "collected_at": "2026-03-20T21:54:23Z",
   "finding_ids": [
    "CR-133"
   ],
   "hunt_id": null,
   "id": "EV-0137",
   "kind": "ticket",
   "raw": {
    "action": "Apply hardening baseline / update",
    "due": "2026-03-29",
    "key": "SEC-2137",
    "owner_team": "IT Operations",
    "status": "To do"
   },
   "sha256": "b3b4d53d6ac3efd24b039712dee56aec95badf3ae3f3b2c9c2c396746cf9a99d",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "GCP-GCS-TIP-FEEDS",
   "collected_at": "2026-06-15T02:29:39Z",
   "finding_ids": [
    "CR-134"
   ],
   "hunt_id": null,
   "id": "EV-0138",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Unencrypted snapshot retained — gcp: gs://acme-tip-feeds",
    "control": "CTL-19",
    "evaluated_at": "2026-06-15",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "gcp: gs://acme-tip-feeds",
    "resource_id": "GCP-GCS-TIP-FEEDS"
   },
   "sha256": "e81dbddb1f31bd69a9afe9112b57c46158dca7f95b3ad4bfcc8ccc5723a91689",
   "source": "CSPM",
   "summary": "Configuration check failed on gcp: gs://acme-tip-feeds"
  },
  {
   "asset_id": "AWS-RDS-PORTAL",
   "collected_at": "2025-11-16T05:44:09Z",
   "finding_ids": [
    "CR-135"
   ],
   "hunt_id": null,
   "id": "EV-0139",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Container images run as root — aws: portal-db (RDS)",
    "control": "CTL-04",
    "evaluated_at": "2025-11-16",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: portal-db (RDS)",
    "resource_id": "AWS-RDS-PORTAL"
   },
   "sha256": "7de69433aed23d7e5ce90100af4d35db85bef667a6ea8eaddcffddf2d1118c35",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: portal-db (RDS)"
  },
  {
   "asset_id": "AZ-SUB-BI",
   "collected_at": "2026-06-04T13:34:10Z",
   "finding_ids": [
    "CR-136"
   ],
   "hunt_id": null,
   "id": "EV-0140",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Access logging disabled — azure: analytics (subscription)",
    "control": "CTL-11",
    "evaluated_at": "2026-06-04",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: analytics (subscription)",
    "resource_id": "AZ-SUB-BI"
   },
   "sha256": "ada52cfd9a911f340717679a5cbc436931487b09bda726c45dc313b585ec54c0",
   "source": "CSPM",
   "summary": "Configuration check failed on azure: analytics (subscription)"
  },
  {
   "asset_id": "AWS-ECS-PORTAL-API",
   "collected_at": "2026-07-27T17:09:33Z",
   "finding_ids": [
    "CR-137"
   ],
   "hunt_id": null,
   "id": "EV-0141",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Over-permissive IAM role (wildcard actions) — aws: portal-api (ECS)",
    "control": "CTL-07",
    "evaluated_at": "2026-07-27",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: portal-api (ECS)",
    "resource_id": "AWS-ECS-PORTAL-API"
   },
   "sha256": "28889faf202b10f425953284fc0b8a90a4828252e95009cbda4bad1c0078a10a",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: portal-api (ECS)"
  },
  {
   "asset_id": "AWS-ECS-PORTAL-API",
   "collected_at": "2026-07-30T20:06:11Z",
   "finding_ids": [
    "CR-137"
   ],
   "hunt_id": null,
   "id": "EV-0142",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-07-31",
    "key": "SEC-2142",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "2870254827d518fe7136ed0cdb30c31693f14e6febf63dfbeb927db3d4fcbd1d",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "GCP-PRJ-TIP",
   "collected_at": "2025-11-23T16:42:09Z",
   "finding_ids": [
    "CR-138"
   ],
   "hunt_id": null,
   "id": "EV-0143",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Encryption key rotation overdue — gcp: tip-analytics (project)",
    "control": "CTL-19",
    "evaluated_at": "2025-11-23",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "gcp: tip-analytics (project)",
    "resource_id": "GCP-PRJ-TIP"
   },
   "sha256": "d72ce5d7393bc4f6f2b7074b571c679a9600da64be7e60da37ffcdd13b196262",
   "source": "CSPM",
   "summary": "Configuration check failed on gcp: tip-analytics (project)"
  },
  {
   "asset_id": "GCP-PRJ-TIP",
   "collected_at": "2025-11-25T06:06:21Z",
   "finding_ids": [
    "CR-138"
   ],
   "hunt_id": null,
   "id": "EV-0144",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2025-12-10",
    "key": "SEC-2144",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "af295a92b47137998992ea2137eacb4158a7a49bd59ab3ed5b4f83de71a8fca6",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-ACCT-TIP",
   "collected_at": "2026-08-25T05:03:43Z",
   "finding_ids": [
    "CR-139"
   ],
   "hunt_id": null,
   "id": "EV-0145",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Encryption key rotation overdue — aws: tip-prod (account)",
    "control": "CTL-19",
    "evaluated_at": "2026-08-25",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: tip-prod (account)",
    "resource_id": "AWS-ACCT-TIP"
   },
   "sha256": "ed81dfc3ad639f81dc53b1eb481fc01ab598541ebd71f63bb7e9c3ec02385745",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: tip-prod (account)"
  },
  {
   "asset_id": "AZ-SQL-FIN",
   "collected_at": "2025-11-10T15:07:40Z",
   "finding_ids": [
    "CR-140"
   ],
   "hunt_id": null,
   "id": "EV-0146",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Over-permissive IAM role (wildcard actions) — azure: fin-billing (Azure SQL)",
    "control": "CTL-07",
    "evaluated_at": "2025-11-10",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: fin-billing (Azure SQL)",
    "resource_id": "AZ-SQL-FIN"
   },
   "sha256": "1af37f4327b07beebb1b3014b6d06208f3d2f1ae6d043f72e2f3754e6ebc9a58",
   "source": "CSPM",
   "summary": "Configuration check failed on azure: fin-billing (Azure SQL)"
  },
  {
   "asset_id": "AZ-SQL-FIN",
   "collected_at": "2025-11-13T12:09:50Z",
   "finding_ids": [
    "CR-140"
   ],
   "hunt_id": null,
   "id": "EV-0147",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2025-11-23",
    "key": "SEC-2147",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "521ee66770632c60fcdc0f4bd541148e6d87af1569e0c89ff74111ac0ce51e49",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-EKS-MDR",
   "collected_at": "2026-05-02T19:16:32Z",
   "finding_ids": [
    "CR-141"
   ],
   "hunt_id": null,
   "id": "EV-0148",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Kubernetes audit logs not exported to SIEM — aws: mdr-ingest (EKS)",
    "control": "CTL-11",
    "evaluated_at": "2026-05-02",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: mdr-ingest (EKS)",
    "resource_id": "AWS-EKS-MDR"
   },
   "sha256": "12150b5515087c557e93ce5d758ca6f3d296c343fccb23960b5b28a3ee5a2cb6",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: mdr-ingest (EKS)"
  },
  {
   "asset_id": "AWS-EKS-MDR",
   "collected_at": "2026-05-03T17:47:05Z",
   "finding_ids": [
    "CR-141"
   ],
   "hunt_id": null,
   "id": "EV-0149",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-05-22",
    "key": "SEC-2149",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "a0bd178369a1b1281bc4facdcbe6228603c8a0a70eceed57cf76db4b86cbb9aa",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AZ-APP-BILLING",
   "collected_at": "2026-06-11T14:31:46Z",
   "finding_ids": [
    "CR-142"
   ],
   "hunt_id": null,
   "id": "EV-0150",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Kubernetes audit logs not exported to SIEM — azure: pay.acme.example (App Service)",
    "control": "CTL-11",
    "evaluated_at": "2026-06-11",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: pay.acme.example (App Service)",
    "resource_id": "AZ-APP-BILLING"
   },
   "sha256": "0f197e92bd9315d2858fcde5385793a7305b894dae4ed41568dcd950894818f2",
   "source": "CSPM",
   "summary": "Configuration check failed on azure: pay.acme.example (App Service)"
  },
  {
   "asset_id": "AZ-APP-BILLING",
   "collected_at": "2026-06-14T00:25:22Z",
   "finding_ids": [
    "CR-142"
   ],
   "hunt_id": null,
   "id": "EV-0151",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-06-24",
    "key": "SEC-2151",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "5f061bdb4a39384bb131a90e8e5ccda6a070af017b70da300335da21145a8439",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-S3-MDR-TEL",
   "collected_at": "2026-04-05T03:35:37Z",
   "finding_ids": [
    "CR-143"
   ],
   "hunt_id": null,
   "id": "EV-0152",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Management port open to 0.0.0.0/0 in non-production security group — aws: s3://acme-mdr-telemetry",
    "observed_at": "2026-04-05",
    "reachable_from": "broad internal / third party",
    "resource": "aws: s3://acme-mdr-telemetry",
    "resource_id": "AWS-S3-MDR-TEL"
   },
   "sha256": "23ead2ff47d86ab783cb701b236b0e39f4076f9b23ada24495b14bd4b7e39c47",
   "source": "CSPM",
   "summary": "Exposure observed on aws: s3://acme-mdr-telemetry"
  },
  {
   "asset_id": "AWS-S3-MDR-TEL",
   "collected_at": "2026-04-09T21:59:35Z",
   "finding_ids": [
    "CR-143"
   ],
   "hunt_id": null,
   "id": "EV-0153",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-04-09",
    "key": "SEC-2153",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "2023b26eaf15fa0876ae234129ca5eebcdff73ce5d08a832f2f9bd351db58741",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-S3-LOGS",
   "collected_at": "2026-02-16T17:29:03Z",
   "finding_ids": [
    "CR-144"
   ],
   "hunt_id": null,
   "id": "EV-0154",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Access logging disabled — aws: s3://acme-central-logs",
    "control": "CTL-11",
    "evaluated_at": "2026-02-16",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: s3://acme-central-logs",
    "resource_id": "AWS-S3-LOGS"
   },
   "sha256": "5bac4b2defeb53bde03623f5f7cc3679143b0ffa53682d2278ff6f7edb2b8c03",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: s3://acme-central-logs"
  },
  {
   "asset_id": "AWS-S3-LOGS",
   "collected_at": "2026-02-18T05:10:55Z",
   "finding_ids": [
    "CR-144"
   ],
   "hunt_id": null,
   "id": "EV-0155",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-02-22",
    "key": "SEC-2155",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "2e93fd862e3924d5ac786f81b2b58d2a007d5a6b9dbff119350af2ac98d6dbba",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-ACCT-MDR",
   "collected_at": "2026-08-02T19:51:49Z",
   "finding_ids": [
    "CR-145"
   ],
   "hunt_id": null,
   "id": "EV-0156",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Over-permissive IAM role (wildcard actions) — aws: mdr-prod (account)",
    "control": "CTL-07",
    "evaluated_at": "2026-08-02",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: mdr-prod (account)",
    "resource_id": "AWS-ACCT-MDR"
   },
   "sha256": "7c5e8ab28df5c73773c8ae83f1501c49663ba2370888cde7344b6ccf3d49bd88",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: mdr-prod (account)"
  },
  {
   "asset_id": "AWS-ECS-PORTAL-API",
   "collected_at": "2026-05-09T07:34:58Z",
   "finding_ids": [
    "CR-146"
   ],
   "hunt_id": null,
   "id": "EV-0157",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Container images run as root — aws: portal-api (ECS)",
    "control": "CTL-04",
    "evaluated_at": "2026-05-09",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: portal-api (ECS)",
    "resource_id": "AWS-ECS-PORTAL-API"
   },
   "sha256": "73a07088ace6023231a5ef633f4c1e2e6abf8c352150db8c0a980ef95fa506d3",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: portal-api (ECS)"
  },
  {
   "asset_id": "AWS-ECS-PORTAL-API",
   "collected_at": "2026-05-12T14:33:59Z",
   "finding_ids": [
    "CR-146"
   ],
   "hunt_id": null,
   "id": "EV-0158",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-05-16",
    "key": "SEC-2158",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "2a3dba33802dd7c9c2410a587f4c4ca174c2af2d08f2c3b912eaf5a9f597e5c8",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-RDS-TIP",
   "collected_at": "2026-01-10T14:25:08Z",
   "finding_ids": [
    "CR-147"
   ],
   "hunt_id": null,
   "id": "EV-0159",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Encryption key rotation overdue — aws: tip-db (RDS PostgreSQL)",
    "control": "CTL-19",
    "evaluated_at": "2026-01-10",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: tip-db (RDS PostgreSQL)",
    "resource_id": "AWS-RDS-TIP"
   },
   "sha256": "7bb5953df9ab29ab1106626c91434b7653a4b44f73e3ca9dafe57326870bf57c",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: tip-db (RDS PostgreSQL)"
  },
  {
   "asset_id": "AZ-AKS-PS",
   "collected_at": "2026-08-26T19:48:10Z",
   "finding_ids": [
    "CR-148"
   ],
   "hunt_id": null,
   "id": "EV-0160",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Deletion protection disabled — azure: ps-tooling (AKS)",
    "control": "CTL-14",
    "evaluated_at": "2026-08-26",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: ps-tooling (AKS)",
    "resource_id": "AZ-AKS-PS"
   },
   "sha256": "e9f9a4b8dadcf553b0afbfc587c81a5498c0b9dff757c0f757114f5d442722ba",
   "source": "CSPM",
   "summary": "Configuration check failed on azure: ps-tooling (AKS)"
  },
  {
   "asset_id": "WEB-ORIGIN",
   "collected_at": "2025-11-11T20:44:38Z",
   "finding_ids": [
    "CR-149"
   ],
   "hunt_id": null,
   "id": "EV-0161",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Encryption key rotation overdue — aws: www-origin (marketing CMS origin)",
    "control": "CTL-19",
    "evaluated_at": "2025-11-11",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: www-origin (marketing CMS origin)",
    "resource_id": "WEB-ORIGIN"
   },
   "sha256": "0b3dc09fc347115730777dfad084297a738bfdaa0bdbba14f2b708ca1dfa2e67",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: www-origin (marketing CMS origin)"
  },
  {
   "asset_id": "AWS-ACCT-MDR",
   "collected_at": "2026-08-11T22:07:49Z",
   "finding_ids": [
    "CR-150"
   ],
   "hunt_id": null,
   "id": "EV-0162",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Management port open to 0.0.0.0/0 in non-production security group — aws: mdr-prod (account)",
    "observed_at": "2026-08-11",
    "reachable_from": "broad internal / third party",
    "resource": "aws: mdr-prod (account)",
    "resource_id": "AWS-ACCT-MDR"
   },
   "sha256": "54f4b50a8d9485345edcbd1b55bf10bde766b617bb679b30a65e2b686442f172",
   "source": "CSPM",
   "summary": "Exposure observed on aws: mdr-prod (account)"
  },
  {
   "asset_id": "AWS-ACCT-MDR",
   "collected_at": "2026-08-12T06:39:37Z",
   "finding_ids": [
    "CR-150"
   ],
   "hunt_id": null,
   "id": "EV-0163",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-08-16",
    "key": "SEC-2163",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "84fe184c158dbc8834026933cb51674a0530f114378c1694db0da6ab6587ad84",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AZ-SUB-CORP",
   "collected_at": "2025-11-03T03:16:27Z",
   "finding_ids": [
    "CR-151"
   ],
   "hunt_id": null,
   "id": "EV-0164",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Deletion protection disabled — azure: corp (subscription)",
    "control": "CTL-14",
    "evaluated_at": "2025-11-03",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: corp (subscription)",
    "resource_id": "AZ-SUB-CORP"
   },
   "sha256": "f586e1ea5a225d4360921b717bc510d27595de97b9d15021ec784774758fbe80",
   "source": "CSPM",
   "summary": "Configuration check failed on azure: corp (subscription)"
  },
  {
   "asset_id": "AZ-SUB-CORP",
   "collected_at": "2025-11-05T21:25:37Z",
   "finding_ids": [
    "CR-151"
   ],
   "hunt_id": null,
   "id": "EV-0165",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2025-11-18",
    "key": "SEC-2165",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "95e6900391d2e55f08a128d927d4ba7a0e0a844d2ed183a4fe95bbb21b4fb566",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-RDS-TIP",
   "collected_at": "2026-07-25T01:34:25Z",
   "finding_ids": [
    "CR-152"
   ],
   "hunt_id": null,
   "id": "EV-0166",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Management port open to 0.0.0.0/0 in non-production security group — aws: tip-db (RDS PostgreSQL)",
    "observed_at": "2026-07-25",
    "reachable_from": "broad internal / third party",
    "resource": "aws: tip-db (RDS PostgreSQL)",
    "resource_id": "AWS-RDS-TIP"
   },
   "sha256": "8fa173383151f7126a21b642d6622a613606e14efde844bbc81e8177c270c020",
   "source": "CSPM",
   "summary": "Exposure observed on aws: tip-db (RDS PostgreSQL)"
  },
  {
   "asset_id": "AWS-RDS-TIP",
   "collected_at": "2026-07-27T13:09:42Z",
   "finding_ids": [
    "CR-152"
   ],
   "hunt_id": null,
   "id": "EV-0167",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-08-06",
    "key": "SEC-2167",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "e7701b14c9a8d0a4a3af819fe56e9a74c12b2120387514dd67997e6842343734",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AWS-ACCT-SHARED",
   "collected_at": "2026-07-23T13:08:00Z",
   "finding_ids": [
    "CR-153"
   ],
   "hunt_id": null,
   "id": "EV-0168",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Over-permissive IAM role (wildcard actions) — aws: shared-services (account)",
    "control": "CTL-07",
    "evaluated_at": "2026-07-23",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "aws: shared-services (account)",
    "resource_id": "AWS-ACCT-SHARED"
   },
   "sha256": "39c8c08c5f73932e40140f641595ff46e366cf0245aaba98f211d5ab254f5362",
   "source": "CSPM",
   "summary": "Configuration check failed on aws: shared-services (account)"
  },
  {
   "asset_id": "GCP-BQ-TIP",
   "collected_at": "2025-11-23T18:25:46Z",
   "finding_ids": [
    "CR-154"
   ],
   "hunt_id": null,
   "id": "EV-0169",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Kubernetes audit logs not exported to SIEM — gcp: tip_intel (BigQuery)",
    "control": "CTL-11",
    "evaluated_at": "2025-11-23",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "gcp: tip_intel (BigQuery)",
    "resource_id": "GCP-BQ-TIP"
   },
   "sha256": "c16c33f9cc0d8d656da54541daf8018bfbe75f07fcef6a469567591643b7d5ce",
   "source": "CSPM",
   "summary": "Configuration check failed on gcp: tip_intel (BigQuery)"
  },
  {
   "asset_id": "AZ-KV-CORP",
   "collected_at": "2026-05-16T19:14:24Z",
   "finding_ids": [
    "CR-155"
   ],
   "hunt_id": null,
   "id": "EV-0170",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Kubernetes audit logs not exported to SIEM — azure: kv-corp (Key Vault)",
    "control": "CTL-11",
    "evaluated_at": "2026-05-16",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: kv-corp (Key Vault)",
    "resource_id": "AZ-KV-CORP"
   },
   "sha256": "aad8b3b2406f6617b6769b9cb6ce4f3573ac27d924eb77f34f22e5d5684d4d91",
   "source": "CSPM",
   "summary": "Configuration check failed on azure: kv-corp (Key Vault)"
  },
  {
   "asset_id": "GCP-GKE-TIP-ML",
   "collected_at": "2026-07-28T01:21:35Z",
   "finding_ids": [
    "CR-156"
   ],
   "hunt_id": null,
   "id": "EV-0171",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Kubernetes audit logs not exported to SIEM — gcp: tip-ml (GKE)",
    "control": "CTL-11",
    "evaluated_at": "2026-07-28",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "gcp: tip-ml (GKE)",
    "resource_id": "GCP-GKE-TIP-ML"
   },
   "sha256": "2cd0d6b77777c9a07dbe1e8ca01668a19aadc9b986675f4fb696577338d97ab5",
   "source": "CSPM",
   "summary": "Configuration check failed on gcp: tip-ml (GKE)"
  },
  {
   "asset_id": "GCP-GCS-TIP-FEEDS",
   "collected_at": "2025-12-16T16:37:05Z",
   "finding_ids": [
    "CR-157"
   ],
   "hunt_id": null,
   "id": "EV-0172",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Unencrypted snapshot retained — gcp: gs://acme-tip-feeds",
    "control": "CTL-19",
    "evaluated_at": "2025-12-16",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "gcp: gs://acme-tip-feeds",
    "resource_id": "GCP-GCS-TIP-FEEDS"
   },
   "sha256": "ab61d3e3f18391b99b5e29675db9ef976e29b8c6cf2fafb722ca29d74d32eb8b",
   "source": "CSPM",
   "summary": "Configuration check failed on gcp: gs://acme-tip-feeds"
  },
  {
   "asset_id": "GCP-GCS-TIP-FEEDS",
   "collected_at": "2025-12-19T15:33:32Z",
   "finding_ids": [
    "CR-157"
   ],
   "hunt_id": null,
   "id": "EV-0173",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2025-12-26",
    "key": "SEC-2173",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "b334e56defc676f100517038a91eb46cbcebb62b373dcc6547f2e3508648956b",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AZ-AKS-PS",
   "collected_at": "2026-03-11T15:19:50Z",
   "finding_ids": [
    "CR-158"
   ],
   "hunt_id": null,
   "id": "EV-0174",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Management port open to 0.0.0.0/0 in non-production security group — azure: ps-tooling (AKS)",
    "observed_at": "2026-03-11",
    "reachable_from": "broad internal / third party",
    "resource": "azure: ps-tooling (AKS)",
    "resource_id": "AZ-AKS-PS"
   },
   "sha256": "7cd54e2b96feddb0a61921a48aa607aae590914e1a553be2deedb4c6bfad2dac",
   "source": "CSPM",
   "summary": "Exposure observed on azure: ps-tooling (AKS)"
  },
  {
   "asset_id": "AZ-AKS-PS",
   "collected_at": "2026-03-14T13:17:57Z",
   "finding_ids": [
    "CR-158"
   ],
   "hunt_id": null,
   "id": "EV-0175",
   "kind": "ticket",
   "raw": {
    "action": "Apply CSPM recommended fix via IaC",
    "due": "2026-03-13",
    "key": "SEC-2175",
    "owner_team": "Cloud Platform",
    "status": "To do"
   },
   "sha256": "c2405dc4ba35892308b1a1b0987ec4d8e685187dc8bccd328557797f366d1103",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "AZ-SYN-BI",
   "collected_at": "2026-05-01T08:48:46Z",
   "finding_ids": [
    "CR-159"
   ],
   "hunt_id": null,
   "id": "EV-0176",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Unencrypted snapshot retained — azure: acme-dw (Synapse)",
    "control": "CTL-19",
    "evaluated_at": "2026-05-01",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "azure: acme-dw (Synapse)",
    "resource_id": "AZ-SYN-BI"
   },
   "sha256": "5c04da578267871e0ccb59cf6796fe0c3f5156c7d99ba704634ae4e06a218d99",
   "source": "CSPM",
   "summary": "Configuration check failed on azure: acme-dw (Synapse)"
  },
  {
   "asset_id": "SAAS-COLLAB",
   "collected_at": "2026-03-24T06:56:59Z",
   "finding_ids": [
    "CR-160"
   ],
   "hunt_id": null,
   "id": "EV-0177",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Anonymous link sharing enabled for 312 documents",
    "control": "CTL-20",
    "evaluated_at": "2026-03-24",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "Email & collaboration suite",
    "resource_id": "SAAS-COLLAB"
   },
   "sha256": "4508b86fb1bf744f37da81d6b0d9ae8a145d5fb10fb97daa222d1a4af14e6b82",
   "source": "SaaS posture (CASB)",
   "summary": "Configuration check failed on Email & collaboration suite"
  },
  {
   "asset_id": "SAAS-COLLAB",
   "collected_at": "2026-03-26T11:39:16Z",
   "finding_ids": [
    "CR-160"
   ],
   "hunt_id": null,
   "id": "EV-0178",
   "kind": "ticket",
   "raw": {
    "action": "Tighten tenant policy",
    "due": "2026-03-29",
    "key": "SEC-2178",
    "owner_team": "IT Applications",
    "status": "To do"
   },
   "sha256": "86c788b4979cecbf5362dc2d19e9cdc5d3188ae15a8d29ac26278afa83eb7927",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SAAS-CRM",
   "collected_at": "2026-02-07T13:04:06Z",
   "finding_ids": [
    "CR-161"
   ],
   "hunt_id": null,
   "id": "EV-0179",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Stale integration tokens with full CRM API access",
    "observed_at": "2026-02-07",
    "reachable_from": "broad internal / third party",
    "resource": "CRM platform",
    "resource_id": "SAAS-CRM"
   },
   "sha256": "8a71014b9bdc88fd02101a81c7d1ab45fbf2fb2635bbebfb50a6b85096fa5715",
   "source": "SaaS posture (CASB)",
   "summary": "Exposure observed on CRM platform"
  },
  {
   "asset_id": "SAAS-CRM",
   "collected_at": "2026-02-09T15:22:16Z",
   "finding_ids": [
    "CR-161"
   ],
   "hunt_id": null,
   "id": "EV-0180",
   "kind": "ticket",
   "raw": {
    "action": "Tighten tenant policy",
    "due": "2026-02-12",
    "key": "SEC-2180",
    "owner_team": "IT Applications",
    "status": "To do"
   },
   "sha256": "3c5cbe833a8e7e6d5ff25eced28d78eac4947712f13bb01fcc4a02773bfcf51f",
   "source": "Jira (remediation)",
   "summary": "Remediation ticket opened"
  },
  {
   "asset_id": "SAAS-CHAT",
   "collected_at": "2026-08-21T00:16:39Z",
   "finding_ids": [
    "CR-162"
   ],
   "hunt_id": null,
   "id": "EV-0181",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "External guests in 18 internal channels",
    "control": "CTL-20",
    "evaluated_at": "2026-08-21",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "Team chat",
    "resource_id": "SAAS-CHAT"
   },
   "sha256": "bee4a62ef4ff5facd0618a983c3e58bfa773a2fba1a0f58e580e9389ee2145ff",
   "source": "SaaS posture (CASB)",
   "summary": "Configuration check failed on Team chat"
  },
  {
   "asset_id": "SAAS-ITSM",
   "collected_at": "2025-12-23T02:20:38Z",
   "finding_ids": [
    "CR-163"
   ],
   "hunt_id": null,
   "id": "EV-0182",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "ITSM admin role assigned to 9 non-IT users",
    "control": "CTL-07",
    "evaluated_at": "2025-12-23",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "ITSM & GRC (ServiceNow)",
    "resource_id": "SAAS-ITSM"
   },
   "sha256": "119e553c680764dee5a57a29c26b4486a6db50d32cc83af9cbc9f87780740996",
   "source": "SaaS posture (CASB)",
   "summary": "Configuration check failed on ITSM & GRC (ServiceNow)"
  },
  {
   "asset_id": "SAAS-TRACK",
   "collected_at": "2026-08-05T00:37:16Z",
   "finding_ids": [
    "CR-164"
   ],
   "hunt_id": null,
   "id": "EV-0183",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Public issue board exposes internal project names",
    "observed_at": "2026-08-05",
    "reachable_from": "broad internal / third party",
    "resource": "Issue tracking (Jira)",
    "resource_id": "SAAS-TRACK"
   },
   "sha256": "0de3d8217ae3dce790b5847a0866ca6ce9681ad01bc60bd44ab68994c21d0d45",
   "source": "SaaS posture (CASB)",
   "summary": "Exposure observed on Issue tracking (Jira)"
  },
  {
   "asset_id": "SAAS-BI",
   "collected_at": "2026-04-26T00:17:31Z",
   "finding_ids": [
    "CR-165"
   ],
   "hunt_id": null,
   "id": "EV-0184",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Dashboards published to web without authentication",
    "control": "CTL-20",
    "evaluated_at": "2026-04-26",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "BI & dashboards (Power BI)",
    "resource_id": "SAAS-BI"
   },
   "sha256": "4bb042cc9c938bae3a29940de50e0ee600012eff682c6c2f2b44e879b14612ad",
   "source": "SaaS posture (CASB)",
   "summary": "Configuration check failed on BI & dashboards (Power BI)"
  },
  {
   "asset_id": "IOT-BOS-PRN01",
   "collected_at": "2026-04-05T05:33:41Z",
   "finding_ids": [
    "CR-166"
   ],
   "hunt_id": null,
   "id": "EV-0185",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "Printers expose legacy SMBv1 and unauthenticated web admin (BOS)",
    "control": "CTL-29",
    "evaluated_at": "2026-04-05",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "printer BOS-1",
    "resource_id": "IOT-BOS-PRN01"
   },
   "sha256": "575f5c02cacbebe73f52744bbcc37d3d9a30c9bb7d49384c20b76533df9c4075",
   "source": "Network discovery",
   "summary": "Configuration check failed on printer BOS-1"
  },
  {
   "asset_id": "IOT-DUB-PRN01",
   "collected_at": "2025-11-01T14:12:02Z",
   "finding_ids": [
    "CR-167"
   ],
   "hunt_id": null,
   "id": "EV-0186",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "Printers expose legacy SMBv1 and unauthenticated web admin (DUB)",
    "control": "CTL-29",
    "evaluated_at": "2025-11-01",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "printer DUB-1",
    "resource_id": "IOT-DUB-PRN01"
   },
   "sha256": "6504f01a534e5d350944168687ad6e2732808aa7ee8a44c42cedd2e6ade0eb35",
   "source": "Network discovery",
   "summary": "Configuration check failed on printer DUB-1"
  },
  {
   "asset_id": "IOT-SIN-PRN01",
   "collected_at": "2025-12-13T12:06:37Z",
   "finding_ids": [
    "CR-168"
   ],
   "hunt_id": null,
   "id": "EV-0187",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "Printers expose legacy SMBv1 and unauthenticated web admin (SIN)",
    "control": "CTL-29",
    "evaluated_at": "2025-12-13",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "printer SIN-1",
    "resource_id": "IOT-SIN-PRN01"
   },
   "sha256": "11484c3193362174920df91afca45e220d0d72f9b30478a612f9a97c6079a424",
   "source": "Network discovery",
   "summary": "Configuration check failed on printer SIN-1"
  },
  {
   "asset_id": "IOT-TLV-PRN01",
   "collected_at": "2026-06-11T05:57:14Z",
   "finding_ids": [
    "CR-169"
   ],
   "hunt_id": null,
   "id": "EV-0188",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 3,
    "check": "Printers expose legacy SMBv1 and unauthenticated web admin (TLV)",
    "control": "CTL-29",
    "evaluated_at": "2026-06-11",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "printer TLV-1",
    "resource_id": "IOT-TLV-PRN01"
   },
   "sha256": "5870388455b6f5bd23bfdcf6c8dea886a3666ecb9f58d742b16787ff6337eafd",
   "source": "Network discovery",
   "summary": "Configuration check failed on printer TLV-1"
  },
  {
   "asset_id": "SEC-MAILGW",
   "collected_at": "2025-10-16T22:27:07Z",
   "finding_ids": [
    "CR-170"
   ],
   "hunt_id": null,
   "id": "EV-0189",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Public exposure on Email security gateway (remediated)",
    "observed_at": "2025-10-16",
    "reachable_from": "broad internal / third party",
    "resource": "Email security gateway",
    "resource_id": "SEC-MAILGW"
   },
   "sha256": "1d52630d05ad0552975de85453477df9cae71dc2cb22bdaee86cc6ad94b65502",
   "source": "Vulnerability scanner",
   "summary": "Exposure observed on Email security gateway"
  },
  {
   "asset_id": "SEC-MAILGW",
   "collected_at": "2026-01-08T11:05:11Z",
   "finding_ids": [
    "CR-170"
   ],
   "hunt_id": null,
   "id": "EV-0190",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-01-08",
    "key": "SEC-2190",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "4f11d0eab9ed2bb16685b2620563130e9dfc98bb376599be790e3302303d4851",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "SRV-DUB-UTL02",
   "collected_at": "2025-11-03T10:37:19Z",
   "finding_ids": [
    "CR-171"
   ],
   "hunt_id": null,
   "id": "EV-0191",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Unpatched service on util02.dub.acme.example (remediated)",
    "observed_at": "2025-11-03",
    "reachable_from": "broad internal / third party",
    "resource": "util02.dub.acme.example",
    "resource_id": "SRV-DUB-UTL02"
   },
   "sha256": "867884daaf3591379ac7fc398c068cd36c70ab1bee3421ee58d26103747f5ae9",
   "source": "Vulnerability scanner",
   "summary": "Exposure observed on util02.dub.acme.example"
  },
  {
   "asset_id": "SRV-DUB-UTL02",
   "collected_at": "2025-12-18T11:35:51Z",
   "finding_ids": [
    "CR-171"
   ],
   "hunt_id": null,
   "id": "EV-0192",
   "kind": "ticket",
   "raw": {
    "closed_on": "2025-12-18",
    "key": "SEC-2192",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "711d935fcd586a02b3a06473e311f7025520f59b87939e101cd44e0c8cd4a792",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "IOT-DUB-BADGE04",
   "collected_at": "2025-11-12T15:19:34Z",
   "finding_ids": [
    "CR-172"
   ],
   "hunt_id": null,
   "id": "EV-0193",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Weak configuration on badge reader EU-4 (remediated)",
    "control": "CTL-02",
    "evaluated_at": "2025-11-12",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "badge reader EU-4",
    "resource_id": "IOT-DUB-BADGE04"
   },
   "sha256": "6bfe05141e2dbc3294971fc8d4be940e6d6bdaf471e8c50f6640ba72043f90ba",
   "source": "Vulnerability scanner",
   "summary": "Configuration check failed on badge reader EU-4"
  },
  {
   "asset_id": "IOT-DUB-BADGE04",
   "collected_at": "2025-12-23T02:36:44Z",
   "finding_ids": [
    "CR-172"
   ],
   "hunt_id": null,
   "id": "EV-0194",
   "kind": "ticket",
   "raw": {
    "closed_on": "2025-12-23",
    "key": "SEC-2194",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "05d19f4ddcc6124a2217715982e75888911d16b662414753348070aa44b04ee4",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "NET-DUB-FW01",
   "collected_at": "2026-01-06T09:53:29Z",
   "finding_ids": [
    "CR-173"
   ],
   "hunt_id": null,
   "id": "EV-0195",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Excessive permissions on fw01.dub (next-gen firewall) (remediated)",
    "control": "CTL-02",
    "evaluated_at": "2026-01-06",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "fw01.dub (next-gen firewall)",
    "resource_id": "NET-DUB-FW01"
   },
   "sha256": "093e291d9f094f4a4025fc135ca979d5de054254a21a9dfbfa0151ec91f1f3b9",
   "source": "Vulnerability scanner",
   "summary": "Configuration check failed on fw01.dub (next-gen firewall)"
  },
  {
   "asset_id": "NET-DUB-FW01",
   "collected_at": "2026-02-11T21:39:32Z",
   "finding_ids": [
    "CR-173"
   ],
   "hunt_id": null,
   "id": "EV-0196",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-02-11",
    "key": "SEC-2196",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "25aa84afce44aaa30fd0c2f81c5629a3598f47331f93f27f6036d8dbb13fa85b",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "NET-BOS-FW01",
   "collected_at": "2026-01-24T02:34:36Z",
   "finding_ids": [
    "CR-174"
   ],
   "hunt_id": null,
   "id": "EV-0197",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Unpatched service on fw01.bos (next-gen firewall) (remediated)",
    "control": "CTL-02",
    "evaluated_at": "2026-01-24",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "fw01.bos (next-gen firewall)",
    "resource_id": "NET-BOS-FW01"
   },
   "sha256": "df452103292ad6e0ab7167e59115aca8ce7aaae893aacbef5561ded2e3b25de2",
   "source": "Vulnerability scanner",
   "summary": "Configuration check failed on fw01.bos (next-gen firewall)"
  },
  {
   "asset_id": "NET-BOS-FW01",
   "collected_at": "2026-03-27T15:49:25Z",
   "finding_ids": [
    "CR-174"
   ],
   "hunt_id": null,
   "id": "EV-0198",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-03-27",
    "key": "SEC-2198",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "ad2b413384e4efd3c9fa80b143367efb446d14a59c47de2814aecb16e519efb4",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "GCP-BQ-TIP",
   "collected_at": "2026-02-18T08:50:50Z",
   "finding_ids": [
    "CR-175"
   ],
   "hunt_id": null,
   "id": "EV-0199",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "gcp: tip_intel (BigQuery)"
    ],
    "cvss": null,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": null,
    "first_detected": "2026-02-18",
    "last_detected": "2026-04-26",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "8a52858612dba7f1dfa7819192231ee7776d72e4bac3c86ddf863e0a05cca9c2",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected undefined on gcp: tip_intel (BigQuery)"
  },
  {
   "asset_id": "GCP-BQ-TIP",
   "collected_at": "2026-04-26T23:45:05Z",
   "finding_ids": [
    "CR-175"
   ],
   "hunt_id": null,
   "id": "EV-0200",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-04-26",
    "key": "SEC-2200",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "1cdee0fc64214b17be9afd35b2a2f897034bb7d2070d9ec59d23ef1361a5ac19",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "IOT-DUB-BADGE02",
   "collected_at": "2025-11-25T10:06:30Z",
   "finding_ids": [
    "CR-176"
   ],
   "hunt_id": null,
   "id": "EV-0201",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Public exposure on badge reader EU-2 (remediated)",
    "observed_at": "2025-11-25",
    "reachable_from": "broad internal / third party",
    "resource": "badge reader EU-2",
    "resource_id": "IOT-DUB-BADGE02"
   },
   "sha256": "1790d939f7e4c9d95dc5becf4ef93fa8a6f30363e19ce59587898b414d7f9609",
   "source": "Vulnerability scanner",
   "summary": "Exposure observed on badge reader EU-2"
  },
  {
   "asset_id": "IOT-DUB-BADGE02",
   "collected_at": "2025-12-13T11:46:36Z",
   "finding_ids": [
    "CR-176"
   ],
   "hunt_id": null,
   "id": "EV-0202",
   "kind": "ticket",
   "raw": {
    "closed_on": "2025-12-13",
    "key": "SEC-2202",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "ff180d771df7168311fc2461ff5dc458c56768393822bffeeb59ae3156f06a14",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "CICD-RUNNER-04",
   "collected_at": "2025-12-03T23:45:32Z",
   "finding_ids": [
    "CR-177"
   ],
   "hunt_id": null,
   "id": "EV-0203",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Public exposure on self-hosted runner 4 (remediated)",
    "observed_at": "2025-12-03",
    "reachable_from": "broad internal / third party",
    "resource": "self-hosted runner 4",
    "resource_id": "CICD-RUNNER-04"
   },
   "sha256": "9784480e69612e7dfba30dc01119cad027ac0b909d70534a4f65fae5530cb622",
   "source": "Vulnerability scanner",
   "summary": "Exposure observed on self-hosted runner 4"
  },
  {
   "asset_id": "CICD-RUNNER-04",
   "collected_at": "2026-02-19T05:52:22Z",
   "finding_ids": [
    "CR-177"
   ],
   "hunt_id": null,
   "id": "EV-0204",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-02-19",
    "key": "SEC-2204",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "03236abd68d8fb063f4db5f7cdc7df9f4e6a87efdb3e157c09fbbf6c682f390b",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "IOT-SIN-PRN03",
   "collected_at": "2025-10-06T21:46:15Z",
   "finding_ids": [
    "CR-178"
   ],
   "hunt_id": null,
   "id": "EV-0205",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Unpatched service on printer SIN-3 (remediated)",
    "observed_at": "2025-10-06",
    "reachable_from": "broad internal / third party",
    "resource": "printer SIN-3",
    "resource_id": "IOT-SIN-PRN03"
   },
   "sha256": "446dacc70f9ce0c0226d70aeff2ab1842d4030c1a8bb34c5ec74ad42db5d903d",
   "source": "Vulnerability scanner",
   "summary": "Exposure observed on printer SIN-3"
  },
  {
   "asset_id": "IOT-SIN-PRN03",
   "collected_at": "2026-01-19T06:40:03Z",
   "finding_ids": [
    "CR-178"
   ],
   "hunt_id": null,
   "id": "EV-0206",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-01-19",
    "key": "SEC-2206",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "d80f150e3e9ad6beb3b8d03e0e12de79994e71240ebd81fc0cc9fb3b61378c79",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "NET-SIN-CORE01",
   "collected_at": "2026-02-22T22:40:54Z",
   "finding_ids": [
    "CR-179"
   ],
   "hunt_id": null,
   "id": "EV-0207",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Weak configuration on core01.sin (core switch) (remediated)",
    "control": "CTL-02",
    "evaluated_at": "2026-02-22",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "core01.sin (core switch)",
    "resource_id": "NET-SIN-CORE01"
   },
   "sha256": "ab48c4376fdc80b754c59f87a41a7bc395c8e00ce628539f083a8b404d4f4852",
   "source": "Vulnerability scanner",
   "summary": "Configuration check failed on core01.sin (core switch)"
  },
  {
   "asset_id": "NET-SIN-CORE01",
   "collected_at": "2026-05-17T04:30:55Z",
   "finding_ids": [
    "CR-179"
   ],
   "hunt_id": null,
   "id": "EV-0208",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-05-17",
    "key": "SEC-2208",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "ea5f7a7bc2ef86d07bd03cc969a0b8fc5a69ac42d45287a423f6ad8f70c6d4fe",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "SRV-BOS-UTL15",
   "collected_at": "2025-11-14T18:51:21Z",
   "finding_ids": [
    "CR-180"
   ],
   "hunt_id": null,
   "id": "EV-0209",
   "kind": "exposure_record",
   "raw": {
    "confirmed": true,
    "exposure": "Unpatched service on util15.bos.acme.example (remediated)",
    "observed_at": "2025-11-14",
    "reachable_from": "broad internal / third party",
    "resource": "util15.bos.acme.example",
    "resource_id": "SRV-BOS-UTL15"
   },
   "sha256": "2843bd7168294adfc08143c2c4418ccc327ab07b1a9464f5090e784faa4fe8d2",
   "source": "Vulnerability scanner",
   "summary": "Exposure observed on util15.bos.acme.example"
  },
  {
   "asset_id": "SRV-BOS-UTL15",
   "collected_at": "2025-12-22T18:03:28Z",
   "finding_ids": [
    "CR-180"
   ],
   "hunt_id": null,
   "id": "EV-0210",
   "kind": "ticket",
   "raw": {
    "closed_on": "2025-12-22",
    "key": "SEC-2210",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "2f93ca620b2f26df55eea37769067cfcaffa69b3cfc9d29e091e32f7363a6df6",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "IOT-DUB-CONF01",
   "collected_at": "2026-02-17T11:49:55Z",
   "finding_ids": [
    "CR-181"
   ],
   "hunt_id": null,
   "id": "EV-0211",
   "kind": "config_snapshot",
   "raw": {
    "affected_total": 1,
    "check": "Excessive permissions on conference room system DUB-1 (remediated)",
    "control": "CTL-02",
    "evaluated_at": "2026-02-17",
    "expected": "Compliant with ACME baseline",
    "observed": "Non-compliant",
    "resource": "conference room system DUB-1",
    "resource_id": "IOT-DUB-CONF01"
   },
   "sha256": "c8ffe98cb24be3e11957f58f68c03fd0afe946df35d0c605bcc7213ed11546c8",
   "source": "Vulnerability scanner",
   "summary": "Configuration check failed on conference room system DUB-1"
  },
  {
   "asset_id": "IOT-DUB-CONF01",
   "collected_at": "2026-05-18T18:18:46Z",
   "finding_ids": [
    "CR-181"
   ],
   "hunt_id": null,
   "id": "EV-0212",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-05-18",
    "key": "SEC-2212",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "53be44f71c5c017a8734932a1c921222b91060fba9ea0af409547ff87479ac2d",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "NET-DUB-WLC01",
   "collected_at": "2025-11-22T23:37:46Z",
   "finding_ids": [
    "CR-182"
   ],
   "hunt_id": null,
   "id": "EV-0213",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "wlc01.dub (wireless controller)"
    ],
    "cvss": null,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": null,
    "first_detected": "2025-11-22",
    "last_detected": "2025-12-11",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "39f9e52cc1d13992b03902243956a9aaa83c21498431fbbd1baa573b2ea0b7c3",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected undefined on wlc01.dub (wireless controller)"
  },
  {
   "asset_id": "NET-DUB-WLC01",
   "collected_at": "2025-12-11T00:37:23Z",
   "finding_ids": [
    "CR-182"
   ],
   "hunt_id": null,
   "id": "EV-0214",
   "kind": "ticket",
   "raw": {
    "closed_on": "2025-12-11",
    "key": "SEC-2214",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "dd125a8b4775d8dc1a13434de2399cc325cba4f849afd745b7e0f7a184c5880e",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "SRV-BOS-DC01",
   "collected_at": "2026-04-25T17:08:39Z",
   "finding_ids": [
    "CR-183"
   ],
   "hunt_id": null,
   "id": "EV-0215",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "dc01.acme.example"
    ],
    "cvss": null,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": null,
    "first_detected": "2026-04-25",
    "last_detected": "2026-07-09",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "f38f37f979ff6c6d52c2a55a75f71e95fe7d99027a65745e778ea773b8867f59",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected undefined on dc01.acme.example"
  },
  {
   "asset_id": "SRV-BOS-DC01",
   "collected_at": "2026-07-09T08:25:11Z",
   "finding_ids": [
    "CR-183"
   ],
   "hunt_id": null,
   "id": "EV-0216",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-07-09",
    "key": "SEC-2216",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "698cc3587684e15a6e50e4fa992f1928bcdd4e3581f024924d95efdb4f15c320",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "SRV-BOS-UTL16",
   "collected_at": "2025-11-20T18:44:31Z",
   "finding_ids": [
    "CR-184"
   ],
   "hunt_id": null,
   "id": "EV-0217",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "util16.bos.acme.example"
    ],
    "cvss": null,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": null,
    "first_detected": "2025-11-20",
    "last_detected": "2026-02-20",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "e467458fb29056f94d2f4377db98738eb96bce69ab5dbcc19a208ada2154d2c5",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected undefined on util16.bos.acme.example"
  },
  {
   "asset_id": "SRV-BOS-UTL16",
   "collected_at": "2026-02-20T03:26:29Z",
   "finding_ids": [
    "CR-184"
   ],
   "hunt_id": null,
   "id": "EV-0218",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-02-20",
    "key": "SEC-2218",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "c948972cc5cf89ff1a77c95d81401e58f42776a48f6b3086ce00abb5f36ded89",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "SAAS-IDP",
   "collected_at": "2025-10-13T21:32:36Z",
   "finding_ids": [
    "CR-185"
   ],
   "hunt_id": null,
   "id": "EV-0219",
   "kind": "scanner_result",
   "raw": {
    "affected_total": 1,
    "assets": [
     "Workforce identity provider (SSO)"
    ],
    "cvss": null,
    "detection": "Installed version is below the vendor-fixed version",
    "epss": null,
    "first_detected": "2025-10-13",
    "last_detected": "2026-01-23",
    "scanner": "ACME vulnerability scanner (mock)"
   },
   "sha256": "f84514b633313e0b4b006ad8a3f7b066ef3e865d7255b658d9dddbca73e10c2b",
   "source": "Vulnerability scanner",
   "summary": "Scanner detected undefined on Workforce identity provider (SSO)"
  },
  {
   "asset_id": "SAAS-IDP",
   "collected_at": "2026-01-23T13:40:17Z",
   "finding_ids": [
    "CR-185"
   ],
   "hunt_id": null,
   "id": "EV-0220",
   "kind": "ticket",
   "raw": {
    "closed_on": "2026-01-23",
    "key": "SEC-2220",
    "status": "Done",
    "verified_by": "Re-scan"
   },
   "sha256": "1e56f0d61c0d8d303f34b3a8bc12d07846e28abb92a77fb555f50c49ec40a7dd",
   "source": "Jira (remediation)",
   "summary": "Remediation verified and closed"
  },
  {
   "asset_id": "AWS-ALB-PORTAL",
   "collected_at": "2026-09-06T23:40:13Z",
   "finding_ids": [
    "CR-073"
   ],
   "hunt_id": "HUNT-01",
   "id": "EV-0221",
   "kind": "metric_series",
   "raw": {
    "baseline_p50": 1200,
    "duration_min": 49,
    "error_rate_5xx_peak_pct": 2.1,
    "metric": "portal_login_requests_per_min",
    "peak": 49200,
    "peak_multiple": 41,
    "top_source_networks": [
     "198.51.100.0/24",
     "203.0.113.0/24"
    ],
    "waf_action": "count (detection-only)"
   },
   "sha256": "7876192802fb24319b12cf7e8495b962e3557ea5d8848ddb0e3fc8e3fe3ba9f4",
   "source": "CDN / ALB metrics",
   "summary": "Portal login request rate peaked at 41x baseline"
  },
  {
   "asset_id": "AWS-ALB-PORTAL",
   "collected_at": "2026-09-17T12:27:58Z",
   "finding_ids": [
    "CR-073"
   ],
   "hunt_id": "HUNT-01",
   "id": "EV-0222",
   "kind": "metric_series",
   "raw": {
    "baseline_p50": 1200,
    "duration_min": 21,
    "error_rate_5xx_peak_pct": 3.2,
    "metric": "portal_login_requests_per_min",
    "peak": 75600,
    "peak_multiple": 63,
    "top_source_networks": [
     "198.51.100.0/24",
     "203.0.113.0/24"
    ],
    "waf_action": "count (detection-only)"
   },
   "sha256": "33c2d455c2062da48a759430548c0ca4a6de1db6e771db757093c343483d9cda",
   "source": "CDN / ALB metrics",
   "summary": "Portal login request rate peaked at 63x baseline"
  },
  {
   "asset_id": "AWS-ALB-PORTAL",
   "collected_at": "2026-09-26T12:03:02Z",
   "finding_ids": [
    "CR-073"
   ],
   "hunt_id": "HUNT-01",
   "id": "EV-0223",
   "kind": "metric_series",
   "raw": {
    "baseline_p50": 1200,
    "duration_min": 44,
    "error_rate_5xx_peak_pct": 4.4,
    "metric": "portal_login_requests_per_min",
    "peak": 105600,
    "peak_multiple": 88,
    "top_source_networks": [
     "198.51.100.0/24",
     "203.0.113.0/24"
    ],
    "waf_action": "count (detection-only)"
   },
   "sha256": "4f516257edd4f257dba0c0d274488f9aec415c352dbfeca4c3980767f0b56b1a",
   "source": "CDN / ALB metrics",
   "summary": "Portal login request rate peaked at 88x baseline"
  },
  {
   "asset_id": "AWS-ALB-PORTAL",
   "collected_at": "2026-06-20T14:46:10Z",
   "finding_ids": [
    "CR-070"
   ],
   "hunt_id": "HUNT-02",
   "id": "EV-0224",
   "kind": "architecture_note",
   "raw": {
    "ddos_protection": "standard (no advanced tier)",
    "edges": [
     "portal.acme.example",
     "api.tip.acme.example",
     "www.acme.example"
    ],
    "reviewed_by": "Security architecture board",
    "runbook": "none"
   },
   "sha256": "5dabfdd3504db4f1f95906bd179674792afecbed275fb6a6cd77cd4bfd5cb1ab",
   "source": "Architecture review",
   "summary": "Edges without DDoS protection plan"
  },
  {
   "asset_id": "SRV-SIN-JMP01",
   "collected_at": "2026-09-27T20:13:42Z",
   "finding_ids": [
    "CR-014"
   ],
   "hunt_id": "HUNT-04",
   "id": "EV-0225",
   "kind": "network_flow",
   "raw": {
    "bytes_out": 18233,
    "dst": "198.51.100.23",
    "dst_port": 443,
    "first": "2026-09-27T02:14:00Z",
    "flows": 14,
    "last": "2026-09-27T05:41:00Z",
    "src_host": "soc-jump-sin01.acme.example",
    "ti_feed": "ACME TIP blocklist"
   },
   "sha256": "5d7b9e6feba22e9951577ddc2f3828a6414602dceea608ce2067dca16ce82d52",
   "source": "Firewall logs",
   "summary": "Outbound flows from SOC jump host to a blocklisted address"
  },
  {
   "asset_id": "EP-REM-0279",
   "collected_at": "2026-09-18T19:11:05Z",
   "finding_ids": [
    "CR-065"
   ],
   "hunt_id": "HUNT-06",
   "id": "EV-0226",
   "kind": "triage_artifact",
   "raw": {
    "approved_list_match": false,
    "artifact": "Installed programs",
    "collection": "IRTriage.exe basic profile",
    "host": "rem-lt-0279.acme.example",
    "install_date": "2026-08-30",
    "program": "Unapproved remote-access tool"
   },
   "sha256": "60326ac5b9de379fb70eefce87f1e855b3f4b09f6cce5b52aa20ff2ff597f07d",
   "source": "IRTriage collection (basic profile)",
   "summary": "Installed-programs row on rem-lt-0279.acme.example"
  },
  {
   "asset_id": "EP-REM-0280",
   "collected_at": "2026-09-18T03:18:14Z",
   "finding_ids": [
    "CR-065"
   ],
   "hunt_id": "HUNT-06",
   "id": "EV-0227",
   "kind": "triage_artifact",
   "raw": {
    "approved_list_match": false,
    "artifact": "Installed programs",
    "collection": "IRTriage.exe basic profile",
    "host": "rem-lt-0280.acme.example",
    "install_date": "2026-08-30",
    "program": "Unapproved remote-access tool"
   },
   "sha256": "bcd8f908faeecb18bb2566f09ac11640d11efc2e2e7c0514ff192b142470afa4",
   "source": "IRTriage collection (basic profile)",
   "summary": "Installed-programs row on rem-lt-0280.acme.example"
  },
  {
   "asset_id": "AWS-S3-PORTAL-EXP",
   "collected_at": "2026-09-19T16:19:00Z",
   "finding_ids": [
    "CR-003"
   ],
   "hunt_id": "HUNT-08",
   "id": "EV-0228",
   "kind": "config_snapshot",
   "raw": {
    "block_public_acls": false,
    "block_public_policy": false,
    "bucket": "s3://acme-portal-exports",
    "encryption": "SSE-S3",
    "object_count": 18412,
    "policy_allows_list": true
   },
   "sha256": "7aea48b622f39f65feb8f7786b473d8b41480d8ec7e86bd41253f2683613fd24",
   "source": "AWS Security Hub",
   "summary": "Bucket public-access settings"
  },
  {
   "asset_id": null,
   "collected_at": "2026-07-07T06:00:00Z",
   "finding_ids": [],
   "hunt_id": "HUNT-11",
   "id": "EV-0229",
   "kind": "hunt_result",
   "raw": {
    "hosts_evaluated": 41,
    "hunt": "HUNT-11",
    "matches": 0,
    "window_end": "2026-07-07"
   },
   "sha256": "4a51f0baeb910db8e579ec31512fc2f38e50655e2e56dd227d0d3e28459b014e",
   "source": "EDR file telemetry",
   "summary": "Mass file changes on file servers: 0 matches"
  },
  {
   "asset_id": null,
   "collected_at": "2026-08-04T06:00:00Z",
   "finding_ids": [],
   "hunt_id": "HUNT-11",
   "id": "EV-0230",
   "kind": "hunt_result",
   "raw": {
    "hosts_evaluated": 41,
    "hunt": "HUNT-11",
    "matches": 0,
    "window_end": "2026-08-04"
   },
   "sha256": "46bb32cd1073a17ec4cd13458fa27fad6aff71b1a62abbaaf5e934264fee2d80",
   "source": "EDR file telemetry",
   "summary": "Mass file changes on file servers: 0 matches"
  },
  {
   "asset_id": null,
   "collected_at": "2026-09-01T06:00:00Z",
   "finding_ids": [],
   "hunt_id": "HUNT-11",
   "id": "EV-0231",
   "kind": "hunt_result",
   "raw": {
    "hosts_evaluated": 41,
    "hunt": "HUNT-11",
    "matches": 0,
    "window_end": "2026-09-01"
   },
   "sha256": "9ec209e6fcfaa48b17481f7bcf965bd6d0a6036f4d44655723b7b06546fc86f7",
   "source": "EDR file telemetry",
   "summary": "Mass file changes on file servers: 0 matches"
  },
  {
   "asset_id": null,
   "collected_at": "2026-09-29T06:00:00Z",
   "finding_ids": [],
   "hunt_id": "HUNT-11",
   "id": "EV-0232",
   "kind": "hunt_result",
   "raw": {
    "hosts_evaluated": 41,
    "hunt": "HUNT-11",
    "matches": 0,
    "window_end": "2026-09-29"
   },
   "sha256": "e1a226f28bda7f96b55be561bc68bfe0e22cce8806531e27265679c334c662c9",
   "source": "EDR file telemetry",
   "summary": "Mass file changes on file servers: 0 matches"
  }
 ],
 "generated_by": "scripts/gen-acme-dataset.mjs",
 "hunts": [
  {
   "cadence": "daily",
   "data_sources": [
    "CDN logs",
    "ALB access logs",
    "WAF logs"
   ],
   "finding_ids": [
    "CR-073"
   ],
   "hypothesis": "Edges are being flooded or probed at rates that threaten availability.",
   "id": "HUNT-01",
   "last_run": "2026-09-30",
   "logic": "Requests per source network above 6x the 14-day baseline for 5+ minutes, per edge.",
   "name": "Request-rate anomalies at internet edges",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 0
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 0
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 1
    },
    {
     "date": "2026-09-01",
     "hits": 1
    },
    {
     "date": "2026-09-08",
     "hits": 2
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 1
    },
    {
     "date": "2026-09-29",
     "hits": 1
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-DOS"
   ],
   "status": "active"
  },
  {
   "cadence": "weekly",
   "data_sources": [
    "Attack-surface scan",
    "AWS Security Hub"
   ],
   "finding_ids": [
    "CR-070",
    "CR-071",
    "CR-072",
    "CR-002"
   ],
   "hypothesis": "Some internet-facing endpoints are not covered by DDoS protection or rate limits.",
   "id": "HUNT-02",
   "last_run": "2026-09-30",
   "logic": "Attack-surface inventory joined with DDoS-protection and API usage-plan coverage.",
   "name": "Edges without volumetric protection",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 7
    },
    {
     "date": "2026-07-14",
     "hits": 3
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 1
    },
    {
     "date": "2026-08-04",
     "hits": 0
    },
    {
     "date": "2026-08-11",
     "hits": 5
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 1
    },
    {
     "date": "2026-09-08",
     "hits": 0
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 0
    },
    {
     "date": "2026-09-29",
     "hits": 0
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-DOS"
   ],
   "status": "active"
  },
  {
   "cadence": "hourly",
   "data_sources": [
    "IdP sign-in logs"
   ],
   "finding_ids": [
    "CR-032"
   ],
   "hypothesis": "A workforce account is being used by someone other than its owner.",
   "id": "HUNT-03",
   "last_run": "2026-09-30",
   "logic": "Consecutive sign-ins whose distance/time exceeds 900 km/h, or from anonymiser address ranges.",
   "name": "Sign-ins from impossible travel or anonymising networks",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 0
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 0
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 1
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 0
    },
    {
     "date": "2026-09-08",
     "hits": 1
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 2
    },
    {
     "date": "2026-09-29",
     "hits": 0
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-ATO",
    "RS-FRAUD"
   ],
   "status": "active"
  },
  {
   "cadence": "hourly",
   "data_sources": [
    "Firewall logs",
    "EDR network events",
    "ACME TIP"
   ],
   "finding_ids": [
    "CR-014"
   ],
   "hypothesis": "A privileged or SOC host is communicating with known-bad infrastructure.",
   "id": "HUNT-04",
   "last_run": "2026-09-30",
   "logic": "Outbound connections from tier-0/SOC hosts matched against the ACME TIP blocklist.",
   "name": "Privileged hosts contacting threat-intel-listed destinations",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 0
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 1
    },
    {
     "date": "2026-07-28",
     "hits": 1
    },
    {
     "date": "2026-08-04",
     "hits": 0
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 1
    },
    {
     "date": "2026-09-08",
     "hits": 0
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 0
    },
    {
     "date": "2026-09-29",
     "hits": 6
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-RANSOM",
    "RS-EXFIL"
   ],
   "status": "active"
  },
  {
   "cadence": "daily",
   "data_sources": [
    "IdP audit log",
    "CASB"
   ],
   "finding_ids": [
    "CR-013"
   ],
   "hypothesis": "Users are approving third-party apps that can read company mail or files.",
   "id": "HUNT-05",
   "last_run": "2026-09-30",
   "logic": "New OAuth grants with mail/file scopes to publishers outside the verified list.",
   "name": "Consent grants to unverified applications",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 1
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 1
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 0
    },
    {
     "date": "2026-09-08",
     "hits": 1
    },
    {
     "date": "2026-09-15",
     "hits": 1
    },
    {
     "date": "2026-09-22",
     "hits": 1
    },
    {
     "date": "2026-09-29",
     "hits": 6
    },
    {
     "date": "2026-09-30",
     "hits": 1
    }
   ],
   "scenario_ids": [
    "RS-ATO",
    "RS-PHISH"
   ],
   "status": "active"
  },
  {
   "cadence": "weekly",
   "data_sources": [
    "IRTriage collections",
    "EDR inventory"
   ],
   "finding_ids": [
    "CR-065"
   ],
   "hypothesis": "Remote-access tools outside the approved list are installed on endpoints that hold customer data.",
   "id": "HUNT-06",
   "last_run": "2026-09-30",
   "logic": "Installed-software inventory from IRTriage collections and EDR, compared with the approved list.",
   "name": "Unapproved remote-access software on endpoints",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 0
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 0
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 1
    },
    {
     "date": "2026-09-01",
     "hits": 0
    },
    {
     "date": "2026-09-08",
     "hits": 0
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 7
    },
    {
     "date": "2026-09-29",
     "hits": 1
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-EXFIL",
    "RS-INSIDER"
   ],
   "status": "active"
  },
  {
   "cadence": "daily",
   "data_sources": [
    "Secret scanning",
    "Code hosting audit log"
   ],
   "finding_ids": [
    "CR-023",
    "CR-053",
    "CR-020"
   ],
   "hypothesis": "Credentials are stored where people outside their owners can read them.",
   "id": "HUNT-07",
   "last_run": "2026-09-30",
   "logic": "Secret-scanning results across repositories, CI logs and browser-extension packages.",
   "name": "Secrets in code, CI logs and extensions",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 0
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 9
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 0
    },
    {
     "date": "2026-09-08",
     "hits": 5
    },
    {
     "date": "2026-09-15",
     "hits": 7
    },
    {
     "date": "2026-09-22",
     "hits": 0
    },
    {
     "date": "2026-09-29",
     "hits": 0
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-SUPPLY",
    "RS-ATO",
    "RS-AI"
   ],
   "status": "active"
  },
  {
   "cadence": "daily",
   "data_sources": [
    "AWS Security Hub",
    "Defender for Cloud",
    "Google SCC",
    "Attack-surface scan"
   ],
   "finding_ids": [
    "CR-003",
    "CR-004",
    "CR-051",
    "CR-064"
   ],
   "hypothesis": "Storage or management interfaces are reachable from the internet.",
   "id": "HUNT-08",
   "last_run": "2026-09-30",
   "logic": "CSPM and attack-surface findings for public buckets, databases and management ports.",
   "name": "Public exposure of storage and management planes",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 8
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 5
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 0
    },
    {
     "date": "2026-09-08",
     "hits": 0
    },
    {
     "date": "2026-09-15",
     "hits": 6
    },
    {
     "date": "2026-09-22",
     "hits": 9
    },
    {
     "date": "2026-09-29",
     "hits": 0
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-EXFIL",
    "RS-RANSOM",
    "RS-DOS"
   ],
   "status": "active"
  },
  {
   "cadence": "daily",
   "data_sources": [
    "IRTriage inventory",
    "EDR console"
   ],
   "finding_ids": [
    "CR-012",
    "CR-060"
   ],
   "hypothesis": "Endpoints or servers are running without working security tooling.",
   "id": "HUNT-09",
   "last_run": "2026-09-30",
   "logic": "Asset inventory (IRTriage) compared with EDR console enrolment and tamper-protection state.",
   "name": "Security-tool tampering and coverage gaps",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 1
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 0
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 4
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 9
    },
    {
     "date": "2026-09-08",
     "hits": 0
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 0
    },
    {
     "date": "2026-09-29",
     "hits": 1
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "status": "active"
  },
  {
   "cadence": "daily",
   "data_sources": [
    "GitOps deployer",
    "Code-signing service"
   ],
   "finding_ids": [
    "CR-022",
    "CR-021"
   ],
   "hypothesis": "Production is running builds that did not pass signing and attestation.",
   "id": "HUNT-10",
   "last_run": "2026-09-30",
   "logic": "Deployed image digests compared with the signing service’s attestation log.",
   "name": "Unsigned or unattested artifacts reaching production",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 0
    },
    {
     "date": "2026-07-14",
     "hits": 1
    },
    {
     "date": "2026-07-21",
     "hits": 1
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 0
    },
    {
     "date": "2026-08-11",
     "hits": 1
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 0
    },
    {
     "date": "2026-09-08",
     "hits": 1
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 0
    },
    {
     "date": "2026-09-29",
     "hits": 0
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-SUPPLY"
   ],
   "status": "active"
  },
  {
   "cadence": "hourly",
   "data_sources": [
    "EDR file telemetry",
    "File-server audit logs"
   ],
   "finding_ids": [],
   "hypothesis": "Ransomware-like encryption activity is starting on file servers.",
   "id": "HUNT-11",
   "last_run": "2026-09-30",
   "logic": "Files modified per host per 10 min above 20x baseline, with a high share of high-entropy writes.",
   "name": "Mass file changes on file servers",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 0
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 0
    },
    {
     "date": "2026-08-11",
     "hits": 0
    },
    {
     "date": "2026-08-18",
     "hits": 0
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 0
    },
    {
     "date": "2026-09-08",
     "hits": 0
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 0
    },
    {
     "date": "2026-09-29",
     "hits": 0
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-RANSOM"
   ],
   "status": "active"
  },
  {
   "cadence": "daily",
   "data_sources": [
    "AI gateway logs"
   ],
   "finding_ids": [
    "CR-016",
    "CR-052"
   ],
   "hypothesis": "Model inputs carry instructions that try to change the model’s behaviour, or outputs disclose restricted data.",
   "id": "HUNT-12",
   "last_run": "2026-09-30",
   "logic": "Classifier over sampled prompts/outputs for instruction-like content and restricted-data labels.",
   "name": "Policy-violating content in AI model inputs and outputs",
   "owner": "Security Operations",
   "runs": [
    {
     "date": "2026-07-07",
     "hits": 0
    },
    {
     "date": "2026-07-14",
     "hits": 0
    },
    {
     "date": "2026-07-21",
     "hits": 0
    },
    {
     "date": "2026-07-28",
     "hits": 0
    },
    {
     "date": "2026-08-04",
     "hits": 1
    },
    {
     "date": "2026-08-11",
     "hits": 4
    },
    {
     "date": "2026-08-18",
     "hits": 5
    },
    {
     "date": "2026-08-25",
     "hits": 0
    },
    {
     "date": "2026-09-01",
     "hits": 1
    },
    {
     "date": "2026-09-08",
     "hits": 0
    },
    {
     "date": "2026-09-15",
     "hits": 0
    },
    {
     "date": "2026-09-22",
     "hits": 0
    },
    {
     "date": "2026-09-29",
     "hits": 1
    },
    {
     "date": "2026-09-30",
     "hits": 0
    }
   ],
   "scenario_ids": [
    "RS-AI"
   ],
   "status": "active"
  }
 ],
 "id": "acme-corp-business-context-2026-09",
 "kpis": [
  {
   "current": 11.4,
   "decimals": 1,
   "degradation_at_full_risk": 9,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 12.9
    },
    {
     "month": "2025-11",
     "value": 13
    },
    {
     "month": "2025-12",
     "value": 12.9
    },
    {
     "month": "2026-01",
     "value": 12.9
    },
    {
     "month": "2026-02",
     "value": 12.7
    },
    {
     "month": "2026-03",
     "value": 12.6
    },
    {
     "month": "2026-04",
     "value": 12.1
    },
    {
     "month": "2026-05",
     "value": 12.2
    },
    {
     "month": "2026-06",
     "value": 11.9
    },
    {
     "month": "2026-07",
     "value": 12
    },
    {
     "month": "2026-08",
     "value": 11.4
    },
    {
     "month": "2026-09",
     "value": 11.4
    }
   ],
   "id": "MDR-MTTD",
   "kind": "sla",
   "name": "Mean time to detect (P1)",
   "sensitivity": {
    "availability": 1,
    "integrity": 0.6
   },
   "service_id": "SVC-MDR",
   "source": {
    "system": "Power BI — SOC Performance",
    "type": "bi"
   },
   "target": 15,
   "unit": "min",
   "warning": 12
  },
  {
   "current": 47,
   "decimals": 0,
   "degradation_at_full_risk": 35,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 54
    },
    {
     "month": "2025-11",
     "value": 54
    },
    {
     "month": "2025-12",
     "value": 54
    },
    {
     "month": "2026-01",
     "value": 53
    },
    {
     "month": "2026-02",
     "value": 51
    },
    {
     "month": "2026-03",
     "value": 52
    },
    {
     "month": "2026-04",
     "value": 50
    },
    {
     "month": "2026-05",
     "value": 51
    },
    {
     "month": "2026-06",
     "value": 50
    },
    {
     "month": "2026-07",
     "value": 48
    },
    {
     "month": "2026-08",
     "value": 48
    },
    {
     "month": "2026-09",
     "value": 47
    }
   ],
   "id": "MDR-MTTR",
   "kind": "sla",
   "name": "Mean time to respond (P1)",
   "sensitivity": {
    "availability": 1,
    "integrity": 0.5
   },
   "service_id": "SVC-MDR",
   "source": {
    "system": "Power BI — SOC Performance",
    "type": "bi"
   },
   "target": 60,
   "unit": "min",
   "warning": 50
  },
  {
   "current": 99.95,
   "decimals": 2,
   "degradation_at_full_risk": 0.35,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 99.98
    },
    {
     "month": "2025-11",
     "value": 99.92
    },
    {
     "month": "2025-12",
     "value": 99.86
    },
    {
     "month": "2026-01",
     "value": 99.87
    },
    {
     "month": "2026-02",
     "value": 99.9
    },
    {
     "month": "2026-03",
     "value": 99.93
    },
    {
     "month": "2026-04",
     "value": 100.01
    },
    {
     "month": "2026-05",
     "value": 99.95
    },
    {
     "month": "2026-06",
     "value": 99.89
    },
    {
     "month": "2026-07",
     "value": 99.93
    },
    {
     "month": "2026-08",
     "value": 99.98
    },
    {
     "month": "2026-09",
     "value": 99.95
    }
   ],
   "id": "MDR-AVAIL",
   "kind": "slo",
   "name": "SOC platform availability",
   "sensitivity": {
    "availability": 1
   },
   "service_id": "SVC-MDR",
   "source": {
    "system": "Power BI — SRE",
    "type": "bi"
   },
   "target": 99.9,
   "unit": "%",
   "warning": 99.93
  },
  {
   "current": 98.6,
   "decimals": 1,
   "degradation_at_full_risk": 2.5,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 98.1
    },
    {
     "month": "2025-11",
     "value": 98
    },
    {
     "month": "2025-12",
     "value": 98.1
    },
    {
     "month": "2026-01",
     "value": 98.3
    },
    {
     "month": "2026-02",
     "value": 98.3
    },
    {
     "month": "2026-03",
     "value": 98.4
    },
    {
     "month": "2026-04",
     "value": 98.2
    },
    {
     "month": "2026-05",
     "value": 98.3
    },
    {
     "month": "2026-06",
     "value": 98.3
    },
    {
     "month": "2026-07",
     "value": 98.6
    },
    {
     "month": "2026-08",
     "value": 98.7
    },
    {
     "month": "2026-09",
     "value": 98.6
    }
   ],
   "id": "MDR-ESC",
   "kind": "sla",
   "name": "P1 escalations within 15 min",
   "sensitivity": {
    "availability": 0.8,
    "integrity": 0.4
   },
   "service_id": "SVC-MDR",
   "source": {
    "system": "MDR MSA v4 §6.2",
    "type": "contract"
   },
   "target": 98,
   "unit": "%",
   "warning": 98.5
  },
  {
   "current": 113,
   "decimals": 0,
   "degradation_at_full_risk": 9,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 107
    },
    {
     "month": "2025-11",
     "value": 108
    },
    {
     "month": "2025-12",
     "value": 109
    },
    {
     "month": "2026-01",
     "value": 110
    },
    {
     "month": "2026-02",
     "value": 109
    },
    {
     "month": "2026-03",
     "value": 110
    },
    {
     "month": "2026-04",
     "value": 110
    },
    {
     "month": "2026-05",
     "value": 111
    },
    {
     "month": "2026-06",
     "value": 111
    },
    {
     "month": "2026-07",
     "value": 112
    },
    {
     "month": "2026-08",
     "value": 113
    },
    {
     "month": "2026-09",
     "value": 113
    }
   ],
   "id": "MDR-NRR",
   "kind": "kpi",
   "name": "MDR net revenue retention",
   "sensitivity": {
    "availability": 0.6,
    "confidentiality": 1
   },
   "service_id": "SVC-MDR",
   "source": {
    "system": "COO quarterly business review",
    "type": "business_owner"
   },
   "target": 110,
   "unit": "%",
   "warning": 112
  },
  {
   "current": 4.62,
   "decimals": 2,
   "degradation_at_full_risk": 0.225,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 4.49
    },
    {
     "month": "2025-11",
     "value": 4.49
    },
    {
     "month": "2025-12",
     "value": 4.53
    },
    {
     "month": "2026-01",
     "value": 4.54
    },
    {
     "month": "2026-02",
     "value": 4.55
    },
    {
     "month": "2026-03",
     "value": 4.56
    },
    {
     "month": "2026-04",
     "value": 4.53
    },
    {
     "month": "2026-05",
     "value": 4.58
    },
    {
     "month": "2026-06",
     "value": 4.6
    },
    {
     "month": "2026-07",
     "value": 4.62
    },
    {
     "month": "2026-08",
     "value": 4.62
    },
    {
     "month": "2026-09",
     "value": 4.62
    }
   ],
   "id": "MDR-CSAT",
   "kind": "kpi",
   "name": "Customer satisfaction",
   "sensitivity": {
    "availability": 0.6,
    "confidentiality": 0.8
   },
   "service_id": "SVC-MDR",
   "source": {
    "system": "Power BI — Customer Success",
    "type": "bi"
   },
   "target": 4.5,
   "unit": "/5",
   "warning": 4.55
  },
  {
   "current": 99.97,
   "decimals": 2,
   "degradation_at_full_risk": 0.28,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 99.99
    },
    {
     "month": "2025-11",
     "value": 99.98
    },
    {
     "month": "2025-12",
     "value": 100.02
    },
    {
     "month": "2026-01",
     "value": 99.88
    },
    {
     "month": "2026-02",
     "value": 99.96
    },
    {
     "month": "2026-03",
     "value": 100.03
    },
    {
     "month": "2026-04",
     "value": 100.01
    },
    {
     "month": "2026-05",
     "value": 99.98
    },
    {
     "month": "2026-06",
     "value": 99.99
    },
    {
     "month": "2026-07",
     "value": 99.93
    },
    {
     "month": "2026-08",
     "value": 100
    },
    {
     "month": "2026-09",
     "value": 99.97
    }
   ],
   "id": "TIP-AVAIL",
   "kind": "sla",
   "name": "API availability",
   "sensitivity": {
    "availability": 1
   },
   "service_id": "SVC-TIP",
   "source": {
    "system": "TIP Subscription Terms v2",
    "type": "contract"
   },
   "target": 99.95,
   "unit": "%",
   "warning": 99.96
  },
  {
   "current": 310,
   "decimals": 0,
   "degradation_at_full_risk": 110,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 368
    },
    {
     "month": "2025-11",
     "value": 364
    },
    {
     "month": "2025-12",
     "value": 343
    },
    {
     "month": "2026-01",
     "value": 355
    },
    {
     "month": "2026-02",
     "value": 344
    },
    {
     "month": "2026-03",
     "value": 339
    },
    {
     "month": "2026-04",
     "value": 324
    },
    {
     "month": "2026-05",
     "value": 332
    },
    {
     "month": "2026-06",
     "value": 317
    },
    {
     "month": "2026-07",
     "value": 327
    },
    {
     "month": "2026-08",
     "value": 318
    },
    {
     "month": "2026-09",
     "value": 310
    }
   ],
   "id": "TIP-LAT",
   "kind": "slo",
   "name": "API p95 latency",
   "sensitivity": {
    "availability": 0.8
   },
   "service_id": "SVC-TIP",
   "source": {
    "system": "Power BI — SRE",
    "type": "bi"
   },
   "target": 400,
   "unit": "ms",
   "warning": 350
  },
  {
   "current": 21,
   "decimals": 0,
   "degradation_at_full_risk": 11,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 27
    },
    {
     "month": "2025-11",
     "value": 26
    },
    {
     "month": "2025-12",
     "value": 25
    },
    {
     "month": "2026-01",
     "value": 25
    },
    {
     "month": "2026-02",
     "value": 25
    },
    {
     "month": "2026-03",
     "value": 23
    },
    {
     "month": "2026-04",
     "value": 24
    },
    {
     "month": "2026-05",
     "value": 23
    },
    {
     "month": "2026-06",
     "value": 22
    },
    {
     "month": "2026-07",
     "value": 23
    },
    {
     "month": "2026-08",
     "value": 21
    },
    {
     "month": "2026-09",
     "value": 21
    }
   ],
   "id": "TIP-FRESH",
   "kind": "sla",
   "name": "Intel feed freshness",
   "sensitivity": {
    "availability": 0.7,
    "integrity": 0.8
   },
   "service_id": "SVC-TIP",
   "source": {
    "system": "TIP Subscription Terms v2",
    "type": "contract"
   },
   "target": 30,
   "unit": "min",
   "warning": 25
  },
  {
   "current": 21.6,
   "decimals": 1,
   "degradation_at_full_risk": 1.3,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 18.5
    },
    {
     "month": "2025-11",
     "value": 18.9
    },
    {
     "month": "2025-12",
     "value": 19.7
    },
    {
     "month": "2026-01",
     "value": 19.7
    },
    {
     "month": "2026-02",
     "value": 20.2
    },
    {
     "month": "2026-03",
     "value": 20.4
    },
    {
     "month": "2026-04",
     "value": 20.7
    },
    {
     "month": "2026-05",
     "value": 20.7
    },
    {
     "month": "2026-06",
     "value": 20.5
    },
    {
     "month": "2026-07",
     "value": 21
    },
    {
     "month": "2026-08",
     "value": 20.9
    },
    {
     "month": "2026-09",
     "value": 21.6
    }
   ],
   "id": "TIP-ARR",
   "kind": "kpi",
   "name": "TIP annual recurring revenue",
   "sensitivity": {
    "confidentiality": 1,
    "integrity": 0.5
   },
   "service_id": "SVC-TIP",
   "source": {
    "system": "Power BI — Revenue",
    "type": "bi"
   },
   "target": 22,
   "unit": "$M",
   "warning": 21
  },
  {
   "current": 99.962,
   "decimals": 3,
   "degradation_at_full_risk": 0.32,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 99.898
    },
    {
     "month": "2025-11",
     "value": 99.908
    },
    {
     "month": "2025-12",
     "value": 99.94
    },
    {
     "month": "2026-01",
     "value": 100.006
    },
    {
     "month": "2026-02",
     "value": 100.03
    },
    {
     "month": "2026-03",
     "value": 99.931
    },
    {
     "month": "2026-04",
     "value": 99.99
    },
    {
     "month": "2026-05",
     "value": 99.988
    },
    {
     "month": "2026-06",
     "value": 100.002
    },
    {
     "month": "2026-07",
     "value": 99.968
    },
    {
     "month": "2026-08",
     "value": 99.903
    },
    {
     "month": "2026-09",
     "value": 99.962
    }
   ],
   "id": "POR-AVAIL",
   "kind": "sla",
   "name": "Portal availability (monthly)",
   "sensitivity": {
    "availability": 1
   },
   "service_id": "SVC-PORTAL",
   "source": {
    "system": "Customer Portal SLA",
    "type": "contract"
   },
   "target": 99.95,
   "unit": "%",
   "warning": 99.96
  },
  {
   "current": 0.31,
   "decimals": 2,
   "degradation_at_full_risk": 0.35,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 0.28
    },
    {
     "month": "2025-11",
     "value": 0.28
    },
    {
     "month": "2025-12",
     "value": 0.29
    },
    {
     "month": "2026-01",
     "value": 0.28
    },
    {
     "month": "2026-02",
     "value": 0.29
    },
    {
     "month": "2026-03",
     "value": 0.3
    },
    {
     "month": "2026-04",
     "value": 0.3
    },
    {
     "month": "2026-05",
     "value": 0.3
    },
    {
     "month": "2026-06",
     "value": 0.3
    },
    {
     "month": "2026-07",
     "value": 0.31
    },
    {
     "month": "2026-08",
     "value": 0.31
    },
    {
     "month": "2026-09",
     "value": 0.31
    }
   ],
   "id": "POR-ERR",
   "kind": "slo",
   "name": "API error rate (5xx)",
   "sensitivity": {
    "availability": 0.8,
    "integrity": 0.5
   },
   "service_id": "SVC-PORTAL",
   "source": {
    "system": "Power BI — SRE",
    "type": "bi"
   },
   "target": 0.5,
   "unit": "%",
   "warning": 0.4
  },
  {
   "current": 99.4,
   "decimals": 1,
   "degradation_at_full_risk": 2.8,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 99.5
    },
    {
     "month": "2025-11",
     "value": 99.6
    },
    {
     "month": "2025-12",
     "value": 99.4
    },
    {
     "month": "2026-01",
     "value": 99.4
    },
    {
     "month": "2026-02",
     "value": 99.5
    },
    {
     "month": "2026-03",
     "value": 99.5
    },
    {
     "month": "2026-04",
     "value": 99.4
    },
    {
     "month": "2026-05",
     "value": 99.4
    },
    {
     "month": "2026-06",
     "value": 99.5
    },
    {
     "month": "2026-07",
     "value": 99.4
    },
    {
     "month": "2026-08",
     "value": 99.4
    },
    {
     "month": "2026-09",
     "value": 99.4
    }
   ],
   "id": "POR-LOGIN",
   "kind": "slo",
   "name": "Customer login success",
   "sensitivity": {
    "availability": 0.9,
    "confidentiality": 0.4
   },
   "service_id": "SVC-PORTAL",
   "source": {
    "system": "Power BI — SRE",
    "type": "bi"
   },
   "target": 99,
   "unit": "%",
   "warning": 99.2
  },
  {
   "current": 0,
   "decimals": 0,
   "degradation_at_full_risk": 2,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 0
    },
    {
     "month": "2025-11",
     "value": 0
    },
    {
     "month": "2025-12",
     "value": 0
    },
    {
     "month": "2026-01",
     "value": 0
    },
    {
     "month": "2026-02",
     "value": 0
    },
    {
     "month": "2026-03",
     "value": 0
    },
    {
     "month": "2026-04",
     "value": 0
    },
    {
     "month": "2026-05",
     "value": 0
    },
    {
     "month": "2026-06",
     "value": 0
    },
    {
     "month": "2026-07",
     "value": 0
    },
    {
     "month": "2026-08",
     "value": 0
    },
    {
     "month": "2026-09",
     "value": 0
    }
   ],
   "id": "POR-DATA",
   "kind": "kpi",
   "name": "Customer-data exposure incidents",
   "sensitivity": {
    "confidentiality": 1
   },
   "service_id": "SVC-PORTAL",
   "source": {
    "system": "Privacy Office register",
    "type": "business_owner"
   },
   "target": 0,
   "unit": "count",
   "warning": 0
  },
  {
   "current": 46,
   "decimals": 0,
   "degradation_at_full_risk": 28,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 29
    },
    {
     "month": "2025-11",
     "value": 30
    },
    {
     "month": "2025-12",
     "value": 35
    },
    {
     "month": "2026-01",
     "value": 36
    },
    {
     "month": "2026-02",
     "value": 39
    },
    {
     "month": "2026-03",
     "value": 38
    },
    {
     "month": "2026-04",
     "value": 41
    },
    {
     "month": "2026-05",
     "value": 43
    },
    {
     "month": "2026-06",
     "value": 43
    },
    {
     "month": "2026-07",
     "value": 45
    },
    {
     "month": "2026-08",
     "value": 45
    },
    {
     "month": "2026-09",
     "value": 46
    }
   ],
   "id": "CI-DF",
   "kind": "kpi",
   "name": "Deployment frequency",
   "sensitivity": {
    "delivery": 1,
    "integrity": 0.5
   },
   "service_id": "SVC-CICD",
   "source": {
    "system": "Power BI — Engineering (DORA)",
    "type": "bi"
   },
   "target": 40,
   "unit": "/week",
   "warning": 42
  },
  {
   "current": 18,
   "decimals": 0,
   "degradation_at_full_risk": 26,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 27
    },
    {
     "month": "2025-11",
     "value": 29
    },
    {
     "month": "2025-12",
     "value": 27
    },
    {
     "month": "2026-01",
     "value": 25
    },
    {
     "month": "2026-02",
     "value": 23
    },
    {
     "month": "2026-03",
     "value": 23
    },
    {
     "month": "2026-04",
     "value": 23
    },
    {
     "month": "2026-05",
     "value": 20
    },
    {
     "month": "2026-06",
     "value": 19
    },
    {
     "month": "2026-07",
     "value": 19
    },
    {
     "month": "2026-08",
     "value": 18
    },
    {
     "month": "2026-09",
     "value": 18
    }
   ],
   "id": "CI-LT",
   "kind": "kpi",
   "name": "Lead time for changes",
   "sensitivity": {
    "delivery": 1
   },
   "service_id": "SVC-CICD",
   "source": {
    "system": "Power BI — Engineering (DORA)",
    "type": "bi"
   },
   "target": 24,
   "unit": "h",
   "warning": 20
  },
  {
   "current": 11,
   "decimals": 0,
   "degradation_at_full_risk": 9,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 14
    },
    {
     "month": "2025-11",
     "value": 14
    },
    {
     "month": "2025-12",
     "value": 13
    },
    {
     "month": "2026-01",
     "value": 13
    },
    {
     "month": "2026-02",
     "value": 13
    },
    {
     "month": "2026-03",
     "value": 12
    },
    {
     "month": "2026-04",
     "value": 12
    },
    {
     "month": "2026-05",
     "value": 12
    },
    {
     "month": "2026-06",
     "value": 12
    },
    {
     "month": "2026-07",
     "value": 12
    },
    {
     "month": "2026-08",
     "value": 12
    },
    {
     "month": "2026-09",
     "value": 11
    }
   ],
   "id": "CI-CFR",
   "kind": "kpi",
   "name": "Change failure rate",
   "sensitivity": {
    "delivery": 0.7,
    "integrity": 1
   },
   "service_id": "SVC-CICD",
   "source": {
    "system": "Power BI — Engineering (DORA)",
    "type": "bi"
   },
   "target": 15,
   "unit": "%",
   "warning": 13
  },
  {
   "current": 0.7,
   "decimals": 1,
   "degradation_at_full_risk": 1.25,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 1.2
    },
    {
     "month": "2025-11",
     "value": 1.2
    },
    {
     "month": "2025-12",
     "value": 1.1
    },
    {
     "month": "2026-01",
     "value": 1.1
    },
    {
     "month": "2026-02",
     "value": 1.1
    },
    {
     "month": "2026-03",
     "value": 1
    },
    {
     "month": "2026-04",
     "value": 0.9
    },
    {
     "month": "2026-05",
     "value": 0.8
    },
    {
     "month": "2026-06",
     "value": 0.9
    },
    {
     "month": "2026-07",
     "value": 0.8
    },
    {
     "month": "2026-08",
     "value": 0.8
    },
    {
     "month": "2026-09",
     "value": 0.7
    }
   ],
   "id": "CI-REC",
   "kind": "kpi",
   "name": "Failed deployment recovery time",
   "sensitivity": {
    "availability": 0.4,
    "delivery": 1
   },
   "service_id": "SVC-CICD",
   "source": {
    "system": "Power BI — Engineering (DORA)",
    "type": "bi"
   },
   "target": 1,
   "unit": "h",
   "warning": 0.8
  },
  {
   "current": 96,
   "decimals": 0,
   "degradation_at_full_risk": 12.5,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 88
    },
    {
     "month": "2025-11",
     "value": 88
    },
    {
     "month": "2025-12",
     "value": 89
    },
    {
     "month": "2026-01",
     "value": 91
    },
    {
     "month": "2026-02",
     "value": 90
    },
    {
     "month": "2026-03",
     "value": 92
    },
    {
     "month": "2026-04",
     "value": 92
    },
    {
     "month": "2026-05",
     "value": 94
    },
    {
     "month": "2026-06",
     "value": 93
    },
    {
     "month": "2026-07",
     "value": 95
    },
    {
     "month": "2026-08",
     "value": 94
    },
    {
     "month": "2026-09",
     "value": 96
    }
   ],
   "id": "CI-SBOM",
   "kind": "slo",
   "name": "Releases signed with SBOM",
   "sensitivity": {
    "compliance": 0.8,
    "integrity": 1
   },
   "service_id": "SVC-CICD",
   "source": {
    "system": "Power BI — Engineering",
    "type": "bi"
   },
   "target": 100,
   "unit": "%",
   "warning": 99
  },
  {
   "current": 78,
   "decimals": 0,
   "degradation_at_full_risk": 4.5,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 72
    },
    {
     "month": "2025-11",
     "value": 73
    },
    {
     "month": "2025-12",
     "value": 73
    },
    {
     "month": "2026-01",
     "value": 73
    },
    {
     "month": "2026-02",
     "value": 75
    },
    {
     "month": "2026-03",
     "value": 74
    },
    {
     "month": "2026-04",
     "value": 75
    },
    {
     "month": "2026-05",
     "value": 76
    },
    {
     "month": "2026-06",
     "value": 77
    },
    {
     "month": "2026-07",
     "value": 77
    },
    {
     "month": "2026-08",
     "value": 77
    },
    {
     "month": "2026-09",
     "value": 78
    }
   ],
   "id": "PS-UTIL",
   "kind": "kpi",
   "name": "Billable utilisation",
   "sensitivity": {
    "availability": 0.6,
    "confidentiality": 0.5
   },
   "service_id": "SVC-PS",
   "source": {
    "system": "Power BI — Services",
    "type": "bi"
   },
   "target": 75,
   "unit": "%",
   "warning": 76
  },
  {
   "current": 9.2,
   "decimals": 1,
   "degradation_at_full_risk": 0.9,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 7.2
    },
    {
     "month": "2025-11",
     "value": 7.3
    },
    {
     "month": "2025-12",
     "value": 7.5
    },
    {
     "month": "2026-01",
     "value": 7.7
    },
    {
     "month": "2026-02",
     "value": 8
    },
    {
     "month": "2026-03",
     "value": 8.2
    },
    {
     "month": "2026-04",
     "value": 8.2
    },
    {
     "month": "2026-05",
     "value": 8.1
    },
    {
     "month": "2026-06",
     "value": 8.5
    },
    {
     "month": "2026-07",
     "value": 9.1
    },
    {
     "month": "2026-08",
     "value": 9.4
    },
    {
     "month": "2026-09",
     "value": 9.2
    }
   ],
   "id": "PS-BACKLOG",
   "kind": "kpi",
   "name": "Contracted backlog",
   "sensitivity": {
    "confidentiality": 0.8
   },
   "service_id": "SVC-PS",
   "source": {
    "system": "Power BI — Services",
    "type": "bi"
   },
   "target": 8,
   "unit": "$M",
   "warning": 8.5
  },
  {
   "current": 97,
   "decimals": 0,
   "degradation_at_full_risk": 4,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 94
    },
    {
     "month": "2025-11",
     "value": 94
    },
    {
     "month": "2025-12",
     "value": 95
    },
    {
     "month": "2026-01",
     "value": 94
    },
    {
     "month": "2026-02",
     "value": 96
    },
    {
     "month": "2026-03",
     "value": 95
    },
    {
     "month": "2026-04",
     "value": 96
    },
    {
     "month": "2026-05",
     "value": 96
    },
    {
     "month": "2026-06",
     "value": 96
    },
    {
     "month": "2026-07",
     "value": 96
    },
    {
     "month": "2026-08",
     "value": 97
    },
    {
     "month": "2026-09",
     "value": 97
    }
   ],
   "id": "PS-RESP",
   "kind": "sla",
   "name": "IR retainer responder engaged within 2 h",
   "sensitivity": {
    "availability": 1
   },
   "service_id": "SVC-PS",
   "source": {
    "system": "IR Retainer Agreement",
    "type": "contract"
   },
   "target": 95,
   "unit": "%",
   "warning": 96
  },
  {
   "current": 3.4,
   "decimals": 1,
   "degradation_at_full_risk": 0.3,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 2.8
    },
    {
     "month": "2025-11",
     "value": 2.9
    },
    {
     "month": "2025-12",
     "value": 2.9
    },
    {
     "month": "2026-01",
     "value": 3
    },
    {
     "month": "2026-02",
     "value": 2.9
    },
    {
     "month": "2026-03",
     "value": 3.1
    },
    {
     "month": "2026-04",
     "value": 3.2
    },
    {
     "month": "2026-05",
     "value": 3.3
    },
    {
     "month": "2026-06",
     "value": 3.3
    },
    {
     "month": "2026-07",
     "value": 3.2
    },
    {
     "month": "2026-08",
     "value": 3.3
    },
    {
     "month": "2026-09",
     "value": 3.4
    }
   ],
   "id": "CRM-PIPE",
   "kind": "kpi",
   "name": "Pipeline coverage",
   "sensitivity": {
    "availability": 0.6,
    "confidentiality": 0.7
   },
   "service_id": "SVC-CRM",
   "source": {
    "system": "Power BI — Revenue",
    "type": "bi"
   },
   "target": 3,
   "unit": "x",
   "warning": 3.2
  },
  {
   "current": 29.5,
   "decimals": 1,
   "degradation_at_full_risk": 2.25,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 25.8
    },
    {
     "month": "2025-11",
     "value": 26
    },
    {
     "month": "2025-12",
     "value": 26.2
    },
    {
     "month": "2026-01",
     "value": 26.9
    },
    {
     "month": "2026-02",
     "value": 27
    },
    {
     "month": "2026-03",
     "value": 28.1
    },
    {
     "month": "2026-04",
     "value": 27.8
    },
    {
     "month": "2026-05",
     "value": 28.4
    },
    {
     "month": "2026-06",
     "value": 28.8
    },
    {
     "month": "2026-07",
     "value": 29
    },
    {
     "month": "2026-08",
     "value": 28.8
    },
    {
     "month": "2026-09",
     "value": 29.5
    }
   ],
   "id": "CRM-WIN",
   "kind": "kpi",
   "name": "Win rate",
   "sensitivity": {
    "confidentiality": 0.9
   },
   "service_id": "SVC-CRM",
   "source": {
    "system": "Power BI — Revenue",
    "type": "bi"
   },
   "target": 28,
   "unit": "%",
   "warning": 29
  },
  {
   "current": 6.9,
   "decimals": 1,
   "degradation_at_full_risk": 1.9,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 8.3
    },
    {
     "month": "2025-11",
     "value": 8.6
    },
    {
     "month": "2025-12",
     "value": 8.6
    },
    {
     "month": "2026-01",
     "value": 8.2
    },
    {
     "month": "2026-02",
     "value": 8.2
    },
    {
     "month": "2026-03",
     "value": 7.7
    },
    {
     "month": "2026-04",
     "value": 7.7
    },
    {
     "month": "2026-05",
     "value": 7.2
    },
    {
     "month": "2026-06",
     "value": 7.4
    },
    {
     "month": "2026-07",
     "value": 7.4
    },
    {
     "month": "2026-08",
     "value": 7.1
    },
    {
     "month": "2026-09",
     "value": 6.9
    }
   ],
   "id": "CRM-CHURN",
   "kind": "kpi",
   "name": "Gross logo churn (trailing 12m)",
   "sensitivity": {
    "availability": 0.5,
    "confidentiality": 1
   },
   "service_id": "SVC-CRM",
   "source": {
    "system": "Power BI — Revenue",
    "type": "bi"
   },
   "target": 8,
   "unit": "%",
   "warning": 7.5
  },
  {
   "current": 41,
   "decimals": 0,
   "degradation_at_full_risk": 5.5,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 48
    },
    {
     "month": "2025-11",
     "value": 46
    },
    {
     "month": "2025-12",
     "value": 46
    },
    {
     "month": "2026-01",
     "value": 45
    },
    {
     "month": "2026-02",
     "value": 46
    },
    {
     "month": "2026-03",
     "value": 45
    },
    {
     "month": "2026-04",
     "value": 44
    },
    {
     "month": "2026-05",
     "value": 43
    },
    {
     "month": "2026-06",
     "value": 43
    },
    {
     "month": "2026-07",
     "value": 43
    },
    {
     "month": "2026-08",
     "value": 41
    },
    {
     "month": "2026-09",
     "value": 41
    }
   ],
   "id": "FIN-DSO",
   "kind": "kpi",
   "name": "Days sales outstanding",
   "sensitivity": {
    "availability": 1,
    "integrity": 0.5
   },
   "service_id": "SVC-FIN",
   "source": {
    "system": "Power BI — Finance",
    "type": "bi"
   },
   "target": 45,
   "unit": "days",
   "warning": 42
  },
  {
   "current": 5,
   "decimals": 1,
   "degradation_at_full_risk": 1.75,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 6.9
    },
    {
     "month": "2025-11",
     "value": 6.9
    },
    {
     "month": "2025-12",
     "value": 6.9
    },
    {
     "month": "2026-01",
     "value": 6.7
    },
    {
     "month": "2026-02",
     "value": 6
    },
    {
     "month": "2026-03",
     "value": 6.1
    },
    {
     "month": "2026-04",
     "value": 5.9
    },
    {
     "month": "2026-05",
     "value": 5.4
    },
    {
     "month": "2026-06",
     "value": 5.9
    },
    {
     "month": "2026-07",
     "value": 5.6
    },
    {
     "month": "2026-08",
     "value": 5.2
    },
    {
     "month": "2026-09",
     "value": 5
    }
   ],
   "id": "FIN-CLOSE",
   "kind": "kpi",
   "name": "Month-end close cycle",
   "sensitivity": {
    "availability": 0.8,
    "integrity": 0.8
   },
   "service_id": "SVC-FIN",
   "source": {
    "system": "CFO close calendar",
    "type": "business_owner"
   },
   "target": 6,
   "unit": "days",
   "warning": 5.5
  },
  {
   "current": 100,
   "decimals": 0,
   "degradation_at_full_risk": 9,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 100
    },
    {
     "month": "2025-11",
     "value": 100
    },
    {
     "month": "2025-12",
     "value": 100
    },
    {
     "month": "2026-01",
     "value": 100
    },
    {
     "month": "2026-02",
     "value": 100
    },
    {
     "month": "2026-03",
     "value": 100
    },
    {
     "month": "2026-04",
     "value": 100
    },
    {
     "month": "2026-05",
     "value": 100
    },
    {
     "month": "2026-06",
     "value": 100
    },
    {
     "month": "2026-07",
     "value": 100
    },
    {
     "month": "2026-08",
     "value": 100
    },
    {
     "month": "2026-09",
     "value": 100
    }
   ],
   "id": "FIN-PCI",
   "kind": "kpi",
   "name": "PCI DSS requirements in place",
   "sensitivity": {
    "compliance": 1,
    "confidentiality": 0.6
   },
   "service_id": "SVC-FIN",
   "source": {
    "system": "QSA readiness tracker",
    "type": "business_owner"
   },
   "target": 100,
   "unit": "%",
   "warning": 100
  },
  {
   "current": 99.7,
   "decimals": 1,
   "degradation_at_full_risk": 0.7,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 99.5
    },
    {
     "month": "2025-11",
     "value": 99.5
    },
    {
     "month": "2025-12",
     "value": 99.6
    },
    {
     "month": "2026-01",
     "value": 99.4
    },
    {
     "month": "2026-02",
     "value": 99.4
    },
    {
     "month": "2026-03",
     "value": 99.5
    },
    {
     "month": "2026-04",
     "value": 99.7
    },
    {
     "month": "2026-05",
     "value": 99.6
    },
    {
     "month": "2026-06",
     "value": 99.7
    },
    {
     "month": "2026-07",
     "value": 99.7
    },
    {
     "month": "2026-08",
     "value": 99.6
    },
    {
     "month": "2026-09",
     "value": 99.7
    }
   ],
   "id": "FIN-BILL",
   "kind": "kpi",
   "name": "Billing accuracy",
   "sensitivity": {
    "integrity": 1
   },
   "service_id": "SVC-FIN",
   "source": {
    "system": "Power BI — Finance",
    "type": "bi"
   },
   "target": 99.5,
   "unit": "%",
   "warning": 99.6
  },
  {
   "current": 88,
   "decimals": 0,
   "degradation_at_full_risk": 6,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 93
    },
    {
     "month": "2025-11",
     "value": 93
    },
    {
     "month": "2025-12",
     "value": 93
    },
    {
     "month": "2026-01",
     "value": 92
    },
    {
     "month": "2026-02",
     "value": 91
    },
    {
     "month": "2026-03",
     "value": 91
    },
    {
     "month": "2026-04",
     "value": 90
    },
    {
     "month": "2026-05",
     "value": 90
    },
    {
     "month": "2026-06",
     "value": 90
    },
    {
     "month": "2026-07",
     "value": 89
    },
    {
     "month": "2026-08",
     "value": 89
    },
    {
     "month": "2026-09",
     "value": 88
    }
   ],
   "id": "IT-PATCH",
   "kind": "slo",
   "name": "Critical patches applied within 14 days",
   "sensitivity": {
    "availability": 0.5,
    "compliance": 1
   },
   "service_id": "SVC-IT",
   "source": {
    "system": "Power BI — IT Operations",
    "type": "bi"
   },
   "target": 95,
   "unit": "%",
   "warning": 96
  },
  {
   "current": 96.6,
   "decimals": 1,
   "degradation_at_full_risk": 2,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 98.5
    },
    {
     "month": "2025-11",
     "value": 98.2
    },
    {
     "month": "2025-12",
     "value": 98.1
    },
    {
     "month": "2026-01",
     "value": 97.9
    },
    {
     "month": "2026-02",
     "value": 98.4
    },
    {
     "month": "2026-03",
     "value": 98.1
    },
    {
     "month": "2026-04",
     "value": 97.5
    },
    {
     "month": "2026-05",
     "value": 97.2
    },
    {
     "month": "2026-06",
     "value": 97.2
    },
    {
     "month": "2026-07",
     "value": 97.2
    },
    {
     "month": "2026-08",
     "value": 96.6
    },
    {
     "month": "2026-09",
     "value": 96.6
    }
   ],
   "id": "IT-EDR",
   "kind": "slo",
   "name": "EDR coverage (managed endpoints)",
   "sensitivity": {
    "compliance": 1,
    "integrity": 0.7
   },
   "service_id": "SVC-IT",
   "source": {
    "system": "Power BI — Security Operations",
    "type": "bi"
   },
   "target": 99,
   "unit": "%",
   "warning": 99.3
  },
  {
   "current": 2.4,
   "decimals": 1,
   "degradation_at_full_risk": 1.25,
   "direction": "lower_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 3.8
    },
    {
     "month": "2025-11",
     "value": 3.9
    },
    {
     "month": "2025-12",
     "value": 3.6
    },
    {
     "month": "2026-01",
     "value": 3.6
    },
    {
     "month": "2026-02",
     "value": 3.4
    },
    {
     "month": "2026-03",
     "value": 3.1
    },
    {
     "month": "2026-04",
     "value": 2.9
    },
    {
     "month": "2026-05",
     "value": 3
    },
    {
     "month": "2026-06",
     "value": 2.7
    },
    {
     "month": "2026-07",
     "value": 2.4
    },
    {
     "month": "2026-08",
     "value": 2.7
    },
    {
     "month": "2026-09",
     "value": 2.4
    }
   ],
   "id": "IT-PHISH",
   "kind": "kpi",
   "name": "Phishing simulation click rate",
   "sensitivity": {
    "confidentiality": 0.7
   },
   "service_id": "SVC-IT",
   "source": {
    "system": "Power BI — Awareness",
    "type": "bi"
   },
   "target": 3,
   "unit": "%",
   "warning": 2.7
  },
  {
   "current": 92,
   "decimals": 0,
   "degradation_at_full_risk": 4.5,
   "direction": "higher_is_better",
   "history": [
    {
     "month": "2025-10",
     "value": 89
    },
    {
     "month": "2025-11",
     "value": 90
    },
    {
     "month": "2025-12",
     "value": 90
    },
    {
     "month": "2026-01",
     "value": 89
    },
    {
     "month": "2026-02",
     "value": 90
    },
    {
     "month": "2026-03",
     "value": 91
    },
    {
     "month": "2026-04",
     "value": 91
    },
    {
     "month": "2026-05",
     "value": 91
    },
    {
     "month": "2026-06",
     "value": 91
    },
    {
     "month": "2026-07",
     "value": 91
    },
    {
     "month": "2026-08",
     "value": 92
    },
    {
     "month": "2026-09",
     "value": 92
    }
   ],
   "id": "IT-DESK",
   "kind": "sla",
   "name": "Service desk resolution within SLA",
   "sensitivity": {
    "availability": 1
   },
   "service_id": "SVC-IT",
   "source": {
    "system": "Power BI — IT Operations",
    "type": "bi"
   },
   "target": 90,
   "unit": "%",
   "warning": 91
  },
  {
   "current": 14,
   "decimals": 0,
   "degradation_at_full_risk": 30,
   "direction": "lower_is_better",
   "generation": {
    "confidence": "moderate",
    "inputs": [
     "BIA 2026",
     "Information Security Policy",
     "Asset inventory"
    ],
    "rationale": "Board pack and pricing decisions read the warehouse daily; BIA RPO is 24 h.",
    "reason": "No KPI was supplied for this service by the business owner.",
    "status": "proposed — awaiting owner approval"
   },
   "history": [
    {
     "month": "2025-10",
     "value": 16
    },
    {
     "month": "2025-11",
     "value": 16
    },
    {
     "month": "2025-12",
     "value": 16
    },
    {
     "month": "2026-01",
     "value": 16
    },
    {
     "month": "2026-02",
     "value": 15
    },
    {
     "month": "2026-03",
     "value": 15
    },
    {
     "month": "2026-04",
     "value": 15
    },
    {
     "month": "2026-05",
     "value": 15
    },
    {
     "month": "2026-06",
     "value": 14
    },
    {
     "month": "2026-07",
     "value": 14
    },
    {
     "month": "2026-08",
     "value": 14
    },
    {
     "month": "2026-09",
     "value": 14
    }
   ],
   "id": "BI-FRESH",
   "kind": "slo",
   "name": "Executive dashboard data freshness",
   "sensitivity": {
    "availability": 1,
    "integrity": 0.6
   },
   "service_id": "SVC-BI",
   "source": {
    "system": "AI KPI generator (mock)",
    "type": "generated"
   },
   "target": 24,
   "unit": "h",
   "warning": 18
  },
  {
   "current": 99.7,
   "decimals": 1,
   "degradation_at_full_risk": 1.5,
   "direction": "higher_is_better",
   "generation": {
    "confidence": "moderate",
    "inputs": [
     "BIA 2026",
     "Information Security Policy",
     "Asset inventory"
    ],
    "rationale": "Finance policy FP-07 requires board figures to reconcile to the ledger.",
    "reason": "No KPI was supplied for this service by the business owner.",
    "status": "proposed — awaiting owner approval"
   },
   "history": [
    {
     "month": "2025-10",
     "value": 99.5
    },
    {
     "month": "2025-11",
     "value": 99.4
    },
    {
     "month": "2025-12",
     "value": 99.4
    },
    {
     "month": "2026-01",
     "value": 99.5
    },
    {
     "month": "2026-02",
     "value": 99.6
    },
    {
     "month": "2026-03",
     "value": 99.5
    },
    {
     "month": "2026-04",
     "value": 99.6
    },
    {
     "month": "2026-05",
     "value": 99.7
    },
    {
     "month": "2026-06",
     "value": 99.6
    },
    {
     "month": "2026-07",
     "value": 99.7
    },
    {
     "month": "2026-08",
     "value": 99.6
    },
    {
     "month": "2026-09",
     "value": 99.7
    }
   ],
   "id": "BI-ACC",
   "kind": "kpi",
   "name": "Report reconciliation accuracy",
   "sensitivity": {
    "integrity": 1
   },
   "service_id": "SVC-BI",
   "source": {
    "system": "AI KPI generator (mock)",
    "type": "generated"
   },
   "target": 99.5,
   "unit": "%",
   "warning": 99.6
  },
  {
   "current": 81,
   "decimals": 0,
   "degradation_at_full_risk": 15,
   "direction": "higher_is_better",
   "generation": {
    "confidence": "moderate",
    "inputs": [
     "BIA 2026",
     "Information Security Policy",
     "Asset inventory"
    ],
    "rationale": "BIA classifies the warehouse as employee-PII; GDPR Art. 5(1)(c) data minimisation.",
    "reason": "No KPI was supplied for this service by the business owner.",
    "status": "proposed — awaiting owner approval"
   },
   "history": [
    {
     "month": "2025-10",
     "value": 74
    },
    {
     "month": "2025-11",
     "value": 73
    },
    {
     "month": "2025-12",
     "value": 74
    },
    {
     "month": "2026-01",
     "value": 75
    },
    {
     "month": "2026-02",
     "value": 77
    },
    {
     "month": "2026-03",
     "value": 77
    },
    {
     "month": "2026-04",
     "value": 77
    },
    {
     "month": "2026-05",
     "value": 78
    },
    {
     "month": "2026-06",
     "value": 80
    },
    {
     "month": "2026-07",
     "value": 81
    },
    {
     "month": "2026-08",
     "value": 81
    },
    {
     "month": "2026-09",
     "value": 81
    }
   ],
   "id": "BI-PII",
   "kind": "slo",
   "name": "Warehouse datasets with HR/PII access trimmed",
   "sensitivity": {
    "compliance": 0.8,
    "confidentiality": 1
   },
   "service_id": "SVC-BI",
   "source": {
    "system": "AI KPI generator (mock)",
    "type": "generated"
   },
   "target": 100,
   "unit": "%",
   "warning": 98
  },
  {
   "current": 97.1,
   "decimals": 1,
   "degradation_at_full_risk": 6,
   "direction": "higher_is_better",
   "generation": {
    "confidence": "moderate",
    "inputs": [
     "BIA 2026",
     "Information Security Policy",
     "Asset inventory"
    ],
    "rationale": "Every tier-1 service depends on IAM; ISO A.8.5 and NIS2 Art. 21(2)(j) require MFA.",
    "reason": "No KPI was supplied for this service by the business owner.",
    "status": "proposed — awaiting owner approval"
   },
   "history": [
    {
     "month": "2025-10",
     "value": 90.7
    },
    {
     "month": "2025-11",
     "value": 92.1
    },
    {
     "month": "2025-12",
     "value": 91.4
    },
    {
     "month": "2026-01",
     "value": 92.8
    },
    {
     "month": "2026-02",
     "value": 92.8
    },
    {
     "month": "2026-03",
     "value": 93
    },
    {
     "month": "2026-04",
     "value": 94.3
    },
    {
     "month": "2026-05",
     "value": 95.6
    },
    {
     "month": "2026-06",
     "value": 95.9
    },
    {
     "month": "2026-07",
     "value": 95.2
    },
    {
     "month": "2026-08",
     "value": 95.7
    },
    {
     "month": "2026-09",
     "value": 97.1
    }
   ],
   "id": "IAM-MFA",
   "kind": "slo",
   "name": "Workforce accounts with phishing-resistant MFA",
   "sensitivity": {
    "compliance": 1,
    "confidentiality": 1
   },
   "service_id": "SVC-IAM",
   "source": {
    "system": "AI KPI generator (mock)",
    "type": "generated"
   },
   "target": 100,
   "unit": "%",
   "warning": 99
  },
  {
   "current": 93.5,
   "decimals": 1,
   "degradation_at_full_risk": 9,
   "direction": "higher_is_better",
   "generation": {
    "confidence": "moderate",
    "inputs": [
     "BIA 2026",
     "Information Security Policy",
     "Asset inventory"
    ],
    "rationale": "HR policy HR-12 and SOC 2 CC6.2; leavers retain customer-data access otherwise.",
    "reason": "No KPI was supplied for this service by the business owner.",
    "status": "proposed — awaiting owner approval"
   },
   "history": [
    {
     "month": "2025-10",
     "value": 94.9
    },
    {
     "month": "2025-11",
     "value": 94.8
    },
    {
     "month": "2025-12",
     "value": 94.9
    },
    {
     "month": "2026-01",
     "value": 94.3
    },
    {
     "month": "2026-02",
     "value": 94.6
    },
    {
     "month": "2026-03",
     "value": 94.3
    },
    {
     "month": "2026-04",
     "value": 94
    },
    {
     "month": "2026-05",
     "value": 93.9
    },
    {
     "month": "2026-06",
     "value": 93.8
    },
    {
     "month": "2026-07",
     "value": 93.6
    },
    {
     "month": "2026-08",
     "value": 93.8
    },
    {
     "month": "2026-09",
     "value": 93.5
    }
   ],
   "id": "IAM-JML",
   "kind": "sla",
   "name": "Leaver access removed within 24 h",
   "sensitivity": {
    "compliance": 0.8,
    "confidentiality": 1
   },
   "service_id": "SVC-IAM",
   "source": {
    "system": "AI KPI generator (mock)",
    "type": "generated"
   },
   "target": 98,
   "unit": "%",
   "warning": 98.5
  },
  {
   "current": 89,
   "decimals": 0,
   "degradation_at_full_risk": 20,
   "direction": "higher_is_better",
   "generation": {
    "confidence": "moderate",
    "inputs": [
     "BIA 2026",
     "Information Security Policy",
     "Asset inventory"
    ],
    "rationale": "ISO A.8.2 / PCI 7.2.4 quarterly review; MDR operators hold customer-environment access.",
    "reason": "No KPI was supplied for this service by the business owner.",
    "status": "proposed — awaiting owner approval"
   },
   "history": [
    {
     "month": "2025-10",
     "value": 102
    },
    {
     "month": "2025-11",
     "value": 99
    },
    {
     "month": "2025-12",
     "value": 99
    },
    {
     "month": "2026-01",
     "value": 99
    },
    {
     "month": "2026-02",
     "value": 95
    },
    {
     "month": "2026-03",
     "value": 96
    },
    {
     "month": "2026-04",
     "value": 95
    },
    {
     "month": "2026-05",
     "value": 95
    },
    {
     "month": "2026-06",
     "value": 90
    },
    {
     "month": "2026-07",
     "value": 90
    },
    {
     "month": "2026-08",
     "value": 89
    },
    {
     "month": "2026-09",
     "value": 89
    }
   ],
   "id": "IAM-PRIV",
   "kind": "kpi",
   "name": "Privileged access reviewed this quarter",
   "sensitivity": {
    "compliance": 1,
    "confidentiality": 0.8,
    "integrity": 1
   },
   "service_id": "SVC-IAM",
   "source": {
    "system": "AI KPI generator (mock)",
    "type": "generated"
   },
   "target": 100,
   "unit": "%",
   "warning": 95
  }
 ],
 "mitigations": [
  {
   "cost_usd": 90000,
   "description": "Always-on volumetric protection, CDN in front of the website origin, tested response runbook.",
   "eta_days": 30,
   "finding_ids": [
    "CR-070",
    "CR-071"
   ],
   "id": "MIT-01",
   "owner": "CTO",
   "scenario_factors": {
    "RS-DOS": 0.4
   },
   "status": "proposed",
   "title": "Managed DDoS protection for every customer-facing edge"
  },
  {
   "cost_usd": 23000,
   "description": "Switch portal WAF to blocking after tuning; per-client throttling on the TIP API; bot management.",
   "eta_days": 14,
   "finding_ids": [
    "CR-002",
    "CR-072",
    "CR-073"
   ],
   "id": "MIT-02",
   "owner": "CISO",
   "scenario_factors": {
    "RS-DOS": 0.8
   },
   "status": "proposed",
   "title": "WAF blocking mode and API rate limiting"
  },
  {
   "cost_usd": 50000,
   "description": "Emergency change to remove the two known-exploited critical vulnerabilities on internet edges.",
   "eta_days": 10,
   "finding_ids": [
    "CR-001",
    "CR-015"
   ],
   "id": "MIT-03",
   "owner": "CTO",
   "scenario_factors": {},
   "status": "proposed",
   "title": "Emergency patching: portal API framework and VPN hotfix"
  },
  {
   "cost_usd": 17000,
   "description": "Block public access on buckets and the data lake; private-only database and firewall management planes.",
   "eta_days": 5,
   "finding_ids": [
    "CR-003",
    "CR-004",
    "CR-051",
    "CR-064"
   ],
   "id": "MIT-04",
   "owner": "CTO",
   "scenario_factors": {},
   "status": "proposed",
   "title": "Close public cloud exposure"
  },
  {
   "cost_usd": 60000,
   "description": "FIDO2 for all staff, conditional access for admin roles, forced resets for breached credentials.",
   "eta_days": 30,
   "finding_ids": [
    "CR-030",
    "CR-074",
    "CR-032",
    "CR-013"
   ],
   "id": "MIT-05",
   "owner": "CISO",
   "scenario_factors": {
    "RS-ATO": 0.6,
    "RS-PHISH": 0.6
   },
   "status": "proposed",
   "title": "Phishing-resistant MFA for every account"
  },
  {
   "cost_usd": 31000,
   "description": "Automate leaver removal from the HRIS; scope BI service principals; quarterly certification.",
   "eta_days": 21,
   "finding_ids": [
    "CR-031",
    "CR-050"
   ],
   "id": "MIT-06",
   "owner": "CISO",
   "scenario_factors": {
    "RS-INSIDER": 0.8
   },
   "status": "proposed",
   "title": "HR-driven deprovisioning and access trimming"
  },
  {
   "cost_usd": 66000,
   "description": "Short-lived OIDC credentials, isolated runner groups, signature enforcement at deploy, secret rotation.",
   "eta_days": 21,
   "finding_ids": [
    "CR-020",
    "CR-021",
    "CR-022",
    "CR-023"
   ],
   "id": "MIT-07",
   "owner": "CTO",
   "scenario_factors": {
    "RS-SUPPLY": 0.7
   },
   "status": "proposed",
   "title": "CI/CD hardening"
  },
  {
   "cost_usd": 120000,
   "description": "Re-deploy the ingestion cluster and streaming brokers across three availability zones.",
   "eta_days": 45,
   "finding_ids": [
    "CR-010"
   ],
   "id": "MIT-08",
   "owner": "COO",
   "scenario_factors": {
    "RS-OUTAGE": 0.5
   },
   "status": "proposed",
   "title": "Multi-AZ MDR ingestion"
  },
  {
   "cost_usd": 28000,
   "description": "Object-locked vault copies for finance and identity systems; restore tested every quarter.",
   "eta_days": 30,
   "finding_ids": [
    "CR-041"
   ],
   "id": "MIT-09",
   "owner": "COO",
   "scenario_factors": {
    "RS-RANSOM": 0.6
   },
   "status": "proposed",
   "title": "Immutable backups and quarterly restore tests"
  },
  {
   "cost_usd": 35000,
   "description": "Script inventory, SRI and CSP, and change detection on the payment page.",
   "eta_days": 30,
   "finding_ids": [
    "CR-040"
   ],
   "id": "MIT-10",
   "owner": "CFO",
   "scenario_factors": {
    "RS-FRAUD": 0.5
   },
   "status": "proposed",
   "title": "Payment-page script integrity (PCI DSS 6.4.3 / 11.6.1)"
  },
  {
   "cost_usd": 62000,
   "description": "Input isolation for the triage model, permission-aware retrieval for the assistant, backend-proxied model keys.",
   "eta_days": 30,
   "finding_ids": [
    "CR-016",
    "CR-052",
    "CR-053"
   ],
   "id": "MIT-11",
   "owner": "CTO",
   "scenario_factors": {
    "RS-AI": 0.6
   },
   "status": "proposed",
   "title": "AI guardrails"
  },
  {
   "cost_usd": 43000,
   "description": "Scoped SOAR service identity, jump-host tamper protection, isolate and re-image the flagged host.",
   "eta_days": 21,
   "finding_ids": [
    "CR-011",
    "CR-012",
    "CR-014"
   ],
   "id": "MIT-12",
   "owner": "CISO",
   "scenario_factors": {},
   "status": "proposed",
   "title": "SOC privileged-access clean-up"
  },
  {
   "cost_usd": 40000,
   "description": "EDR on every APAC endpoint, forced OS and browser updates across all sites.",
   "eta_days": 14,
   "finding_ids": [
    "CR-060",
    "CR-100",
    "CR-101",
    "CR-102",
    "CR-103",
    "CR-104",
    "CR-105",
    "CR-106",
    "CR-107",
    "CR-108",
    "CR-109"
   ],
   "id": "MIT-13",
   "owner": "COO",
   "scenario_factors": {},
   "status": "proposed",
   "title": "Endpoint hygiene sprint"
  }
 ],
 "months": [
  "2025-10",
  "2025-11",
  "2025-12",
  "2026-01",
  "2026-02",
  "2026-03",
  "2026-04",
  "2026-05",
  "2026-06",
  "2026-07",
  "2026-08",
  "2026-09"
 ],
 "organization": {
  "annual_revenue_usd": 120000000,
  "cloud_providers": [
   "AWS",
   "Azure",
   "GCP"
  ],
  "customers": 340,
  "domain": "acme.example",
  "employees": 500,
  "executives": [
   {
    "name": "Jordan Reyes",
    "role": "CEO"
   },
   {
    "name": "Priya Natarajan",
    "role": "CFO"
   },
   {
    "name": "Marcus Feld",
    "role": "COO"
   },
   {
    "name": "Noa Ben-Ami",
    "role": "CTO"
   },
   {
    "name": "Elena Kowalski",
    "role": "CISO"
   },
   {
    "name": "Sam Okafor",
    "role": "CRO (Revenue)"
   },
   {
    "name": "Hannah Lindqvist",
    "role": "General Counsel"
   }
  ],
  "fiscal_year": "FY2027 (Oct 2026 – Sep 2027)",
  "frameworks": [
   "ISO 27001:2022",
   "SOC 2 Type II",
   "NIST CSF 2.0",
   "GDPR",
   "NIS2",
   "PCI DSS 4.0"
  ],
  "industry": "Cybersecurity — managed detection & response, threat-intelligence SaaS, professional services",
  "legal_name": "ACME Corporation (fictional)",
  "name": "ACME.Corp",
  "risk_appetite": {
   "annual_value_at_risk_usd": 6000000,
   "approved_by": "Board of Directors",
   "approved_on": "2026-06-18",
   "max_kpis_breached": 2,
   "max_service_likelihood": 0.35,
   "min_compliance_posture": 0.8,
   "statement": "ACME accepts LOW risk to customer-facing service availability and customer data confidentiality, and MODERATE risk to internal operations, in pursuit of growth."
  },
  "sites": [
   {
    "city": "Boston, US",
    "employees": 200,
    "id": "BOS",
    "name": "Headquarters",
    "region": "NA",
    "role": "HQ, SOC (NA), Sales, Finance"
   },
   {
    "city": "Dublin, IE",
    "employees": 110,
    "id": "DUB",
    "name": "EU Hub",
    "region": "EU",
    "role": "SOC (EU), EU data residency, Professional Services"
   },
   {
    "city": "Singapore, SG",
    "employees": 60,
    "id": "SIN",
    "name": "APAC Hub",
    "region": "APAC",
    "role": "SOC (APAC follow-the-sun), Sales"
   },
   {
    "city": "Tel Aviv, IL",
    "employees": 90,
    "id": "TLV",
    "name": "R&D Center",
    "region": "EMEA",
    "role": "Product engineering, Threat research, CI/CD"
   },
   {
    "city": "Distributed",
    "employees": 40,
    "id": "REM",
    "name": "Remote workforce",
    "region": "Global",
    "role": "Remote consultants and sales"
   }
  ]
 },
 "policies": [
  {
   "id": "POL-01",
   "last_review": "2026-02-10",
   "open_exceptions": 0,
   "owner": "CISO",
   "status": "approved",
   "title": "Information Security Policy"
  },
  {
   "id": "POL-02",
   "last_review": "2026-02-10",
   "open_exceptions": 1,
   "owner": "CISO",
   "status": "approved",
   "title": "Acceptable Use Policy"
  },
  {
   "id": "POL-03",
   "last_review": "2025-11-04",
   "open_exceptions": 4,
   "owner": "CISO",
   "status": "approved",
   "title": "Access Control Policy"
  },
  {
   "id": "POL-04",
   "last_review": "2026-05-22",
   "open_exceptions": 2,
   "owner": "CTO",
   "status": "approved",
   "title": "Cloud Security Standard"
  },
  {
   "id": "POL-05",
   "last_review": "2025-09-15",
   "open_exceptions": 1,
   "owner": "CTO",
   "status": "under_review",
   "title": "Secure Development Standard"
  },
  {
   "id": "POL-06",
   "last_review": "2026-01-30",
   "open_exceptions": 6,
   "owner": "CISO",
   "status": "approved",
   "title": "Vulnerability & Patch Management Standard"
  },
  {
   "id": "POL-07",
   "last_review": "2026-04-02",
   "open_exceptions": 0,
   "owner": "CISO",
   "status": "approved",
   "title": "Incident Response Policy"
  },
  {
   "id": "POL-08",
   "last_review": "2026-03-12",
   "open_exceptions": 0,
   "owner": "COO",
   "status": "approved",
   "title": "Business Continuity Policy"
  },
  {
   "id": "POL-09",
   "last_review": "2025-10-20",
   "open_exceptions": 3,
   "owner": "General Counsel",
   "status": "approved",
   "title": "Data Classification & Handling Policy"
  },
  {
   "id": "POL-10",
   "last_review": "2026-05-01",
   "open_exceptions": 0,
   "owner": "General Counsel",
   "status": "approved",
   "title": "Privacy Policy (GDPR)"
  },
  {
   "id": "POL-11",
   "last_review": "2026-01-18",
   "open_exceptions": 2,
   "owner": "CFO",
   "status": "approved",
   "title": "Third-Party Risk Policy"
  },
  {
   "id": "POL-12",
   "last_review": "2026-06-30",
   "open_exceptions": 1,
   "owner": "CFO",
   "status": "approved",
   "title": "Payment Card Security Policy (PCI)"
  },
  {
   "id": "POL-13",
   "last_review": "2026-08-28",
   "open_exceptions": 0,
   "owner": "CTO",
   "status": "draft",
   "title": "AI Acceptable Use & Governance Policy"
  },
  {
   "id": "POL-14",
   "last_review": "2024-08-01",
   "open_exceptions": 0,
   "owner": "COO",
   "status": "overdue_review",
   "title": "Physical Security Policy"
  },
  {
   "id": "POL-15",
   "last_review": "2026-06-18",
   "open_exceptions": 0,
   "owner": "CEO",
   "status": "approved",
   "title": "Risk Management Policy"
  }
 ],
 "risk_scenarios": [
  {
   "attack_tactics": [
    "Impact"
   ],
   "base_rate": 0.15,
   "component_ids": [
    "SYS-WEB",
    "SYS-PORTAL",
    "SYS-TIP",
    "SYS-VPN",
    "SYS-MDR"
   ],
   "description": "Volumetric or application-layer floods that make customer-facing services unavailable.",
   "dimensions": [
    "availability"
   ],
   "id": "RS-DOS",
   "impact_factor": 0.8,
   "name": "Denial of service"
  },
  {
   "attack_tactics": [
    "Impact",
    "Lateral Movement"
   ],
   "base_rate": 0.03,
   "component_ids": [
    "SYS-ERP",
    "SYS-SRV",
    "SYS-BACKUP",
    "SYS-ENDPOINT",
    "SYS-IDP"
   ],
   "description": "Encryption or destruction of systems and backups, halting operations until recovery.",
   "dimensions": [
    "availability",
    "integrity"
   ],
   "id": "RS-RANSOM",
   "impact_factor": 1,
   "name": "Ransomware & destructive attack"
  },
  {
   "attack_tactics": [
    "Initial Access",
    "Credential Access"
   ],
   "base_rate": 0.04,
   "component_ids": [
    "SYS-IDP",
    "SYS-VPN",
    "SYS-COLLAB"
   ],
   "description": "Use of stolen or weak credentials to act as a legitimate user or administrator.",
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "id": "RS-ATO",
   "impact_factor": 0.6,
   "name": "Account takeover"
  },
  {
   "attack_tactics": [
    "Exfiltration",
    "Collection"
   ],
   "base_rate": 0.03,
   "component_ids": [
    "DATA-PII",
    "DATA-TEL",
    "DATA-CONTRACT",
    "DATA-INTEL"
   ],
   "description": "Unauthorised access to, or publication of, customer or company data.",
   "dimensions": [
    "confidentiality"
   ],
   "id": "RS-EXFIL",
   "impact_factor": 0.8,
   "name": "Data breach & exposure"
  },
  {
   "attack_tactics": [
    "Initial Access",
    "Persistence"
   ],
   "base_rate": 0.02,
   "component_ids": [
    "SYS-CICD",
    "DATA-CODE",
    "PRC-SIGN"
   ],
   "description": "Tampering with ACME’s build, dependencies or signing so customers receive altered software.",
   "dimensions": [
    "integrity"
   ],
   "id": "RS-SUPPLY",
   "impact_factor": 0.9,
   "name": "Software supply-chain compromise"
  },
  {
   "attack_tactics": [
    "Collection"
   ],
   "base_rate": 0.02,
   "component_ids": [
    "DATA-HR",
    "PRC-ACR",
    "PRC-DEPROV"
   ],
   "description": "Employees, leavers or service accounts using access beyond their role.",
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "id": "RS-INSIDER",
   "impact_factor": 0.5,
   "name": "Insider misuse & excessive access"
  },
  {
   "attack_tactics": [
    "Collection",
    "Impact"
   ],
   "base_rate": 0.02,
   "component_ids": [
    "SYS-PAY",
    "DATA-CARD"
   ],
   "description": "Manipulation of the payment page or billing flows to divert payments or capture card data.",
   "dimensions": [
    "confidentiality",
    "compliance"
   ],
   "id": "RS-FRAUD",
   "impact_factor": 0.7,
   "name": "Payment fraud & skimming"
  },
  {
   "attack_tactics": [
    "ML Attack Staging"
   ],
   "base_rate": 0.03,
   "component_ids": [
    "SYS-AI"
   ],
   "description": "Prompt injection, poisoned inputs or over-broad retrieval causing wrong actions or disclosure.",
   "dimensions": [
    "integrity",
    "confidentiality"
   ],
   "id": "RS-AI",
   "impact_factor": 0.4,
   "name": "AI manipulation & leakage"
  },
  {
   "attack_tactics": [],
   "base_rate": 0.06,
   "component_ids": [
    "SYS-MDR",
    "SYS-PORTAL",
    "SYS-TIP"
   ],
   "description": "A cloud zone, region or platform failure without adequate redundancy (cyber-adjacent).",
   "dimensions": [
    "availability"
   ],
   "id": "RS-OUTAGE",
   "impact_factor": 0.6,
   "name": "Resilience failure"
  },
  {
   "attack_tactics": [
    "Initial Access"
   ],
   "base_rate": 0.02,
   "component_ids": [
    "DATA-INTEL",
    "SYS-PAY"
   ],
   "description": "A supplier, partner or dependency is compromised and used against ACME.",
   "dimensions": [
    "confidentiality",
    "integrity"
   ],
   "id": "RS-THIRD",
   "impact_factor": 0.5,
   "name": "Third-party compromise"
  },
  {
   "attack_tactics": [
    "Initial Access"
   ],
   "base_rate": 0.06,
   "component_ids": [
    "PPL-FIN",
    "PPL-EXEC",
    "PPL-SALES",
    "PPL-HR"
   ],
   "description": "Staff deceived into disclosing credentials, approving consent or paying fraudulent invoices.",
   "dimensions": [
    "confidentiality"
   ],
   "id": "RS-PHISH",
   "impact_factor": 0.4,
   "name": "Phishing & social engineering"
  }
 ],
 "schema_version": "1.1.0",
 "slos": [
  {
   "basis_label": "FY27 ARR target",
   "basis_usd": 150000000,
   "decimals": 1,
   "description": "Board-approved growth plan: grow ARR 25% to $150M.",
   "direction": "higher_is_better",
   "forecast": 152.5,
   "history": [
    {
     "month": "2025-10",
     "value": 151.4
    },
    {
     "month": "2025-11",
     "value": 151.8
    },
    {
     "month": "2025-12",
     "value": 152
    },
    {
     "month": "2026-01",
     "value": 152.3
    },
    {
     "month": "2026-02",
     "value": 152
    },
    {
     "month": "2026-03",
     "value": 152
    },
    {
     "month": "2026-04",
     "value": 152.1
    },
    {
     "month": "2026-05",
     "value": 152.1
    },
    {
     "month": "2026-06",
     "value": 152.6
    },
    {
     "month": "2026-07",
     "value": 152.3
    },
    {
     "month": "2026-08",
     "value": 152.6
    },
    {
     "month": "2026-09",
     "value": 152.5
    }
   ],
   "id": "SLO-ARR",
   "kpi_ids": [
    "MDR-NRR",
    "TIP-ARR",
    "CRM-PIPE",
    "CRM-WIN"
   ],
   "metric_per_usd": 0.000001,
   "name": "Annual recurring revenue (FY27 exit)",
   "owner": "CEO",
   "source": {
    "system": "Power BI — Board pack",
    "type": "bi"
   },
   "target": 150,
   "unit": "$M",
   "warning": 152
  },
  {
   "basis_label": "FY27 new-business bookings",
   "basis_usd": 30000000,
   "decimals": 1,
   "description": "New logos and expansions closed in the fiscal year.",
   "direction": "higher_is_better",
   "forecast": 31.8,
   "history": [
    {
     "month": "2025-10",
     "value": 31.8
    },
    {
     "month": "2025-11",
     "value": 31.7
    },
    {
     "month": "2025-12",
     "value": 31.7
    },
    {
     "month": "2026-01",
     "value": 31.7
    },
    {
     "month": "2026-02",
     "value": 31.7
    },
    {
     "month": "2026-03",
     "value": 31.7
    },
    {
     "month": "2026-04",
     "value": 31.7
    },
    {
     "month": "2026-05",
     "value": 31.7
    },
    {
     "month": "2026-06",
     "value": 31.7
    },
    {
     "month": "2026-07",
     "value": 31.7
    },
    {
     "month": "2026-08",
     "value": 31.8
    },
    {
     "month": "2026-09",
     "value": 31.8
    }
   ],
   "id": "SLO-NEWARR",
   "kpi_ids": [
    "CRM-PIPE",
    "CRM-WIN",
    "CI-DF"
   ],
   "metric_per_usd": 0.000001,
   "name": "Net new ARR (FY27)",
   "owner": "CRO (Revenue)",
   "source": {
    "system": "Power BI — Board pack",
    "type": "bi"
   },
   "target": 30,
   "unit": "$M",
   "warning": 31
  },
  {
   "basis_label": "Renewal book (FY27)",
   "basis_usd": 96000000,
   "decimals": 1,
   "description": "Share of last year’s recurring revenue kept, before expansion.",
   "direction": "higher_is_better",
   "forecast": 96.1,
   "history": [
    {
     "month": "2025-10",
     "value": 96.5
    },
    {
     "month": "2025-11",
     "value": 96.3
    },
    {
     "month": "2025-12",
     "value": 96.2
    },
    {
     "month": "2026-01",
     "value": 96.3
    },
    {
     "month": "2026-02",
     "value": 96.5
    },
    {
     "month": "2026-03",
     "value": 96.5
    },
    {
     "month": "2026-04",
     "value": 96.5
    },
    {
     "month": "2026-05",
     "value": 96.2
    },
    {
     "month": "2026-06",
     "value": 96.1
    },
    {
     "month": "2026-07",
     "value": 95.9
    },
    {
     "month": "2026-08",
     "value": 96.2
    },
    {
     "month": "2026-09",
     "value": 96.1
    }
   ],
   "id": "SLO-GRR",
   "kpi_ids": [
    "CRM-CHURN",
    "MDR-CSAT",
    "POR-AVAIL"
   ],
   "metric_per_usd": 0.0000010416666666666667,
   "name": "Gross revenue retention",
   "owner": "CRO (Revenue)",
   "source": {
    "system": "Power BI — Board pack",
    "type": "bi"
   },
   "target": 95,
   "unit": "%",
   "warning": 95.5
  },
  {
   "basis_label": "Renewal book incl. expansion",
   "basis_usd": 96000000,
   "decimals": 1,
   "description": "Retention including upsell; drives the MDR expansion plan.",
   "direction": "higher_is_better",
   "forecast": 112.4,
   "history": [
    {
     "month": "2025-10",
     "value": 110.6
    },
    {
     "month": "2025-11",
     "value": 111.2
    },
    {
     "month": "2025-12",
     "value": 111.7
    },
    {
     "month": "2026-01",
     "value": 111.7
    },
    {
     "month": "2026-02",
     "value": 111.8
    },
    {
     "month": "2026-03",
     "value": 111.8
    },
    {
     "month": "2026-04",
     "value": 112.1
    },
    {
     "month": "2026-05",
     "value": 111.9
    },
    {
     "month": "2026-06",
     "value": 112.3
    },
    {
     "month": "2026-07",
     "value": 112.1
    },
    {
     "month": "2026-08",
     "value": 112.3
    },
    {
     "month": "2026-09",
     "value": 112.4
    }
   ],
   "id": "SLO-NRR",
   "kpi_ids": [
    "MDR-NRR",
    "PS-BACKLOG"
   ],
   "metric_per_usd": 0.0000010416666666666667,
   "name": "Net revenue retention",
   "owner": "CRO (Revenue)",
   "source": {
    "system": "Power BI — Board pack",
    "type": "bi"
   },
   "target": 110,
   "unit": "%",
   "warning": 111
  },
  {
   "basis_label": "FY27 revenue",
   "basis_usd": 120000000,
   "decimals": 1,
   "description": "Operating income over revenue; every unplanned dollar of incident cost lands here.",
   "direction": "higher_is_better",
   "forecast": 18.9,
   "history": [
    {
     "month": "2025-10",
     "value": 18.8
    },
    {
     "month": "2025-11",
     "value": 18.9
    },
    {
     "month": "2025-12",
     "value": 18.8
    },
    {
     "month": "2026-01",
     "value": 18.9
    },
    {
     "month": "2026-02",
     "value": 18.9
    },
    {
     "month": "2026-03",
     "value": 18.8
    },
    {
     "month": "2026-04",
     "value": 18.9
    },
    {
     "month": "2026-05",
     "value": 18.9
    },
    {
     "month": "2026-06",
     "value": 18.9
    },
    {
     "month": "2026-07",
     "value": 18.9
    },
    {
     "month": "2026-08",
     "value": 18.8
    },
    {
     "month": "2026-09",
     "value": 18.9
    }
   ],
   "id": "SLO-MARGIN",
   "kpi_ids": [
    "PS-UTIL",
    "FIN-DSO",
    "FIN-CLOSE"
   ],
   "metric_per_usd": 8.333333333333333e-7,
   "name": "Operating margin",
   "owner": "CFO",
   "source": {
    "system": "Power BI — Board pack",
    "type": "bi"
   },
   "target": 18,
   "unit": "%",
   "warning": 18.5
  },
  {
   "basis_label": "Contractual penalties and credits",
   "basis_usd": 2050000,
   "decimals": 2,
   "description": "Customer-months in which every contracted SLA was met.",
   "direction": "higher_is_better",
   "forecast": 99.8,
   "history": [
    {
     "month": "2025-10",
     "value": 99.92
    },
    {
     "month": "2025-11",
     "value": 100.1
    },
    {
     "month": "2025-12",
     "value": 100.23
    },
    {
     "month": "2026-01",
     "value": 100.38
    },
    {
     "month": "2026-02",
     "value": 100.23
    },
    {
     "month": "2026-03",
     "value": 100.22
    },
    {
     "month": "2026-04",
     "value": 100.27
    },
    {
     "month": "2026-05",
     "value": 100.33
    },
    {
     "month": "2026-06",
     "value": 99.93
    },
    {
     "month": "2026-07",
     "value": 100.03
    },
    {
     "month": "2026-08",
     "value": 99.69
    },
    {
     "month": "2026-09",
     "value": 99.8
    }
   ],
   "id": "SLO-SLA",
   "kpi_ids": [
    "MDR-MTTD",
    "MDR-MTTR",
    "MDR-ESC",
    "POR-AVAIL",
    "TIP-AVAIL",
    "TIP-FRESH",
    "PS-RESP"
   ],
   "metric_per_usd": 0.0000038048780487804877,
   "name": "Customer SLA attainment",
   "owner": "COO",
   "source": {
    "system": "Power BI — Board pack",
    "type": "bi"
   },
   "target": 99.5,
   "unit": "%",
   "warning": 99.7
  },
  {
   "basis_label": "Advocacy-driven expansion pipeline",
   "basis_usd": 18000000,
   "decimals": 0,
   "description": "Relationship NPS from the quarterly customer survey.",
   "direction": "higher_is_better",
   "forecast": 49,
   "history": [
    {
     "month": "2025-10",
     "value": 49
    },
    {
     "month": "2025-11",
     "value": 49
    },
    {
     "month": "2025-12",
     "value": 49
    },
    {
     "month": "2026-01",
     "value": 49
    },
    {
     "month": "2026-02",
     "value": 49
    },
    {
     "month": "2026-03",
     "value": 49
    },
    {
     "month": "2026-04",
     "value": 49
    },
    {
     "month": "2026-05",
     "value": 49
    },
    {
     "month": "2026-06",
     "value": 49
    },
    {
     "month": "2026-07",
     "value": 49
    },
    {
     "month": "2026-08",
     "value": 49
    },
    {
     "month": "2026-09",
     "value": 49
    }
   ],
   "id": "SLO-NPS",
   "kpi_ids": [
    "MDR-CSAT"
   ],
   "metric_per_usd": 0.000001388888888888889,
   "name": "Net promoter score",
   "owner": "COO",
   "source": {
    "system": "Power BI — Board pack",
    "type": "bi"
   },
   "target": 45,
   "unit": "pts",
   "warning": 47
  },
  {
   "basis_label": "Revenue from customers that contractually require certification",
   "basis_usd": 42000000,
   "decimals": 1,
   "description": "Certifications are a procurement prerequisite for 40% of ACME’s customers.",
   "direction": "lower_is_better",
   "forecast": 0,
   "history": [
    {
     "month": "2025-10",
     "value": 0
    },
    {
     "month": "2025-11",
     "value": 0
    },
    {
     "month": "2025-12",
     "value": 0
    },
    {
     "month": "2026-01",
     "value": 0
    },
    {
     "month": "2026-02",
     "value": 0
    },
    {
     "month": "2026-03",
     "value": 0
    },
    {
     "month": "2026-04",
     "value": 0
    },
    {
     "month": "2026-05",
     "value": 0
    },
    {
     "month": "2026-06",
     "value": 0
    },
    {
     "month": "2026-07",
     "value": 0
    },
    {
     "month": "2026-08",
     "value": 0
    },
    {
     "month": "2026-09",
     "value": 0
    }
   ],
   "id": "SLO-TRUST",
   "kpi_ids": [
    "FIN-PCI",
    "IT-PATCH",
    "IT-EDR",
    "IAM-MFA",
    "IAM-PRIV"
   ],
   "metric_per_usd": 3.3333333333333335e-7,
   "name": "Major audit non-conformities (ISO 27001, SOC 2, PCI DSS)",
   "owner": "CISO",
   "source": {
    "system": "Power BI — Board pack",
    "type": "bi"
   },
   "target": 1,
   "unit": "count",
   "warning": 0.5
  }
 ],
 "synthetic": true,
 "synthetic_notice": "SYNTHETIC DATA ONLY. ACME.Corp is fictional. Generated by scripts/gen-acme-dataset.mjs. Names use the RFC 2606 .example TLD, public addresses the RFC 5737 documentation ranges; vulnerability ids are fictional (ACME-VULN-*)."
};
