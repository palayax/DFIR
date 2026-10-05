// GENERATED FILE -- do not edit by hand.
// ACME.Corp business-risk mock dataset (661 assets, 121 cyber risks, 39 KPIs).
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
   "ip": "203.0.113.15",
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
   "ip": "203.0.113.16",
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
   "ip": "203.0.113.17",
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
   "description": "Pipeline, quoting and renewals across all regions.",
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
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "TIP feed bucket grants write access to a decommissioned partner account",
   "type": "misconfiguration"
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
   "severity": "medium",
   "source": "IRTriage collection",
   "status": "open",
   "title": "SMB signing not required on 1 server",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-BQ-TIP"
   ],
   "closed_on": null,
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
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Unencrypted snapshot retained — gcp: tip_intel (BigQuery)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ECS-PORTAL-API"
   ],
   "closed_on": null,
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
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Container images run as root — aws: portal-api (ECS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-SUB-CORP"
   ],
   "closed_on": null,
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
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Access logging disabled — azure: corp (subscription)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ECS-PORTAL-API"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Over-permissive IAM role (wildcard actions) — aws: portal-api (ECS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-KV-CORP"
   ],
   "closed_on": null,
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
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Encryption key rotation overdue — azure: kv-corp (Key Vault)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ACCT-TIP"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Encryption key rotation overdue — aws: tip-prod (account)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-STG-BI"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Over-permissive IAM role (wildcard actions) — azure: acmebilake (Storage)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-EKS-MDR"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — aws: mdr-ingest (EKS)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-SQL-FIN"
   ],
   "closed_on": null,
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
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — azure: fin-billing (Azure SQL)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-S3-MDR-TEL"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Management port open to 0.0.0.0/0 in non-production security group — aws: s3://acme-mdr-telemetry",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AWS-ACCT-SHARED"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Access logging disabled — aws: shared-services (account)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ACCT-MDR"
   ],
   "closed_on": null,
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
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Over-permissive IAM role (wildcard actions) — aws: mdr-prod (account)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ALB-PORTAL"
   ],
   "closed_on": null,
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
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Container images run as root — aws: portal.acme.example (ALB)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-RDS-TIP"
   ],
   "closed_on": null,
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
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Encryption key rotation overdue — aws: tip-db (RDS PostgreSQL)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-SQL-FIN"
   ],
   "closed_on": null,
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
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Deletion protection disabled — azure: fin-billing (Azure SQL)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-GCS-TIP-FEEDS"
   ],
   "closed_on": null,
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
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Encryption key rotation overdue — gcp: gs://acme-tip-feeds",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-ACCT-MDR"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Management port open to 0.0.0.0/0 in non-production security group — aws: mdr-prod (account)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AWS-ECR"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Deletion protection disabled — aws: container registry (ECR)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AWS-RDS-TIP"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Management port open to 0.0.0.0/0 in non-production security group — aws: tip-db (RDS PostgreSQL)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AWS-S3-PORTAL-EXP"
   ],
   "closed_on": null,
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
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Over-permissive IAM role (wildcard actions) — aws: s3://acme-portal-exports",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-APPGW-PORTAL-EU"
   ],
   "closed_on": null,
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
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — azure: eu.portal.acme.example (App Gateway + WAF)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-APP-BILLING"
   ],
   "closed_on": null,
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
   "severity": "low",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — azure: pay.acme.example (App Service)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-PRJ-TIP"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Kubernetes audit logs not exported to SIEM — gcp: tip-analytics (project)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-BQ-TIP"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Unencrypted snapshot retained — gcp: tip_intel (BigQuery)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "AZ-APP-BILLING"
   ],
   "closed_on": null,
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
   "severity": "high",
   "source": "CSPM",
   "status": "open",
   "title": "Management port open to 0.0.0.0/0 in non-production security group — azure: pay.acme.example (App Service)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "AZ-SUB-BI"
   ],
   "closed_on": null,
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
   "severity": "medium",
   "source": "CSPM",
   "status": "open",
   "title": "Unencrypted snapshot retained — azure: analytics (subscription)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SAAS-COLLAB"
   ],
   "closed_on": null,
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
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on util02.dub.acme.example (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "IOT-BOS-PRN01"
   ],
   "closed_on": "2025-12-23",
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
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Weak configuration on printer BOS-1 (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "NET-DUB-FW01"
   ],
   "closed_on": "2026-02-11",
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
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Excessive permissions on fw01.dub (next-gen firewall) (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "NET-BOS-CORE01"
   ],
   "closed_on": "2026-03-27",
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
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on core01.bos (core switch) (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "GCP-BQ-TIP"
   ],
   "closed_on": "2026-04-26",
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
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Public exposure on badge reader EU-2 (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "CICD-RUNNER-05"
   ],
   "closed_on": "2026-02-19",
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
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Public exposure on self-hosted runner 5 (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "IOT-SIN-PRN03"
   ],
   "closed_on": "2026-01-19",
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
   "severity": "critical",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on printer SIN-3 (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "NET-SIN-WLC01"
   ],
   "closed_on": "2026-05-17",
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
   "severity": "high",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Weak configuration on wlc01.sin (wireless controller) (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "SRV-BOS-UTL15"
   ],
   "closed_on": "2025-12-22",
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
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on util15.bos.acme.example (remediated)",
   "type": "exposure"
  },
  {
   "asset_ids": [
    "IOT-DUB-CONF02"
   ],
   "closed_on": "2026-05-18",
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
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Excessive permissions on conference room system DUB-2 (remediated)",
   "type": "misconfiguration"
  },
  {
   "asset_ids": [
    "NET-SIN-FW01"
   ],
   "closed_on": "2025-12-11",
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
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on fw01.sin (next-gen firewall) (remediated)",
   "type": "vulnerability"
  },
  {
   "asset_ids": [
    "SRV-BOS-DC01"
   ],
   "closed_on": "2026-07-09",
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
   "severity": "medium",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Excessive permissions on util16.bos.acme.example (remediated)",
   "type": "vulnerability"
  },
  {
   "asset_ids": [
    "SAAS-HRIS"
   ],
   "closed_on": "2026-01-23",
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
   "severity": "critical",
   "source": "Vulnerability scanner",
   "status": "mitigated",
   "title": "Unpatched service on HR information system (remediated)",
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
 "generated_by": "scripts/gen-acme-dataset.mjs",
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
 "schema_version": "1.0.0",
 "synthetic": true,
 "synthetic_notice": "SYNTHETIC DATA ONLY. ACME.Corp is fictional. Generated by scripts/gen-acme-dataset.mjs. Names use the RFC 2606 .example TLD, public addresses the RFC 5737 documentation ranges; vulnerability ids are fictional (ACME-VULN-*)."
};
