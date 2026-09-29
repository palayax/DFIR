// GENERATED FILE -- do not edit by hand.
// Pre-authored, schema-valid forensic report for the demo incident, so an
// evaluator can see a finished report in one click with no API key and no
// network. Derived entirely from web/demo/manifest.js + web/demo/host-*.js.
// Regenerate with:  node scripts/gen-demo-report.mjs
// (the evidence it analyses comes from scripts/gen-demo-dataset.mjs)
//
// SYNTHETIC DATA ONLY. Every host, account, address, domain and hash below is
// invented: RFC 5737 documentation IP ranges and the RFC 2606 reserved .example
// TLD. No language model produced any text here. See docs/DEMO.md.

export const report = {
  "schema_version": "1.0.0",
  "meta": {
    "report_id": "5d6ca4b6-7250-40a4-bb87-34c3526beb3e",
    "generated_utc": "2026-03-15T11:42:09.0000000Z",
    "engagement": {
      "case_id": "DEMO-2026-0317",
      "examiner": "A. Nordqvist (demonstration)",
      "organization": "Northwind Components (fictitious)",
      "classification": "TLP:CLEAR // SYNTHETIC DEMONSTRATION DATA",
      "description": "DEMONSTRATION REPORT over entirely synthetic evidence. The timeline it analyses was produced by scripts/gen-demo-dataset.mjs; the analysis was pre-authored by scripts/gen-demo-report.mjs and no language model, API key or network request was involved in producing it. Every host, account, address, domain and hash is invented. Not a record of any real incident."
    },
    "model": {
      "provider": "mock",
      "model_id": "irtriage-demo-preauthored",
      "prompt_version": "irtriage-report-v3",
      "temperature": 0,
      "passes": 0
    },
    "usage": {
      "input_tokens": 0,
      "output_tokens": 0,
      "cached_input_tokens": 0,
      "estimated_cost_usd": 0,
      "wall_clock_seconds": 0
    }
  },
  "scope": {
    "hosts": [
      {
        "host": "DC-CORP-01",
        "host_id": "4f1c0a9e-0003-4a00-9c31-b0de51000003",
        "row_count": 721,
        "os": "Windows Server 2022 Datacenter",
        "first_event_utc": "2026-03-07T00:05:00.0000000Z",
        "last_event_utc": "2026-03-14T22:41:50.7710000Z"
      },
      {
        "host": "SRV-CORP-FS02",
        "host_id": "4f1c0a9e-0002-4a00-9c31-b0de51000002",
        "row_count": 726,
        "os": "Windows Server 2022 Standard",
        "first_event_utc": "2026-03-07T00:05:00.0000000Z",
        "last_event_utc": "2026-03-14T23:26:36.7560000Z"
      },
      {
        "host": "WKS-CORP-01",
        "host_id": "4f1c0a9e-0001-4a00-9c31-b0de51000001",
        "row_count": 940,
        "os": "Windows 11 Pro 23H2",
        "first_event_utc": "2026-03-07T00:05:00.0000000Z",
        "last_event_utc": "2026-03-14T23:29:42.2860000Z"
      }
    ],
    "row_count": 2387,
    "rows_analysed": 2387,
    "reduction_ratio": 1,
    "time_range": {
      "start_utc": "2026-03-07T00:05:00.000Z",
      "end_utc": "2026-03-14T23:29:42.286Z"
    },
    "sources": {
      "filesystem": 236,
      "registry": 225,
      "process": 27,
      "execution": 241,
      "service": 223,
      "browser": 83,
      "network": 227,
      "scheduled_task": 152,
      "log": 223,
      "usb_device": 81,
      "eventlog": 302,
      "system_info": 221,
      "persistence": 2,
      "account": 144
    },
    "artifacts": {
      "Windows.NTFS.MFT": 164,
      "Windows.Registry.AppCompatCache": 85,
      "Windows.System.Pslist": 28,
      "Windows.Forensics.Prefetch": 226,
      "Windows.EventLogs.Evtx": 905,
      "Windows.Applications.Edge.History": 83,
      "Windows.Network.Netstat": 227,
      "Windows.System.TaskScheduler": 153,
      "Windows.Registry.USBSTOR": 81,
      "Windows.Sysinternals.Autoruns": 81,
      "Windows.Applications.Outlook.Items": 1,
      "Windows.Registry.NTUSER": 1,
      "Generic.Collectors.File": 71,
      "Windows.Registry.Shares": 70,
      "Windows.System.DiskInfo": 70,
      "Windows.NTFS.USNJrnl": 1,
      "Windows.Registry.NTDS": 70,
      "Windows.System.TrustRelationships": 70
    },
    "input_files": [
      {
        "name": "WKS-CORP-01-demo.jsonl",
        "sha256": "e106c82ac311017f55e1738595f650059f2d8ec3f77ed520e5ffe2eaaddc8b06",
        "rows": 940,
        "clock_skew_seconds": 0
      },
      {
        "name": "SRV-CORP-FS02-demo.jsonl",
        "sha256": "6c49efc2c9a93af421c07c7c405fb6560634cfe697b9c7415f9bb447263a13e7",
        "rows": 726,
        "clock_skew_seconds": 0
      },
      {
        "name": "DC-CORP-01-demo.jsonl",
        "sha256": "36e89dcc8d440fed48aa978b81582d44cec2c6a0bbb19ca59a216e82bfde3008",
        "rows": 721,
        "clock_skew_seconds": 0
      }
    ]
  },
  "dashboard": {
    "events_over_time": [
      {
        "bucket_utc": "2026-03-07T00:00:00.000Z",
        "count": 30,
        "by_severity": {
          "none": 30
        }
      },
      {
        "bucket_utc": "2026-03-07T01:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-07T02:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-07T03:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-07T04:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-07T05:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-07T06:00:00.000Z",
        "count": 8,
        "by_severity": {
          "none": 8
        }
      },
      {
        "bucket_utc": "2026-03-07T07:00:00.000Z",
        "count": 5,
        "by_severity": {
          "none": 5
        }
      },
      {
        "bucket_utc": "2026-03-07T08:00:00.000Z",
        "count": 15,
        "by_severity": {
          "none": 15
        }
      },
      {
        "bucket_utc": "2026-03-07T09:00:00.000Z",
        "count": 40,
        "by_severity": {
          "none": 40
        }
      },
      {
        "bucket_utc": "2026-03-07T10:00:00.000Z",
        "count": 39,
        "by_severity": {
          "none": 39
        }
      },
      {
        "bucket_utc": "2026-03-07T11:00:00.000Z",
        "count": 30,
        "by_severity": {
          "none": 30
        }
      },
      {
        "bucket_utc": "2026-03-07T12:00:00.000Z",
        "count": 17,
        "by_severity": {
          "none": 17
        }
      },
      {
        "bucket_utc": "2026-03-07T13:00:00.000Z",
        "count": 30,
        "by_severity": {
          "none": 30
        }
      },
      {
        "bucket_utc": "2026-03-07T14:00:00.000Z",
        "count": 26,
        "by_severity": {
          "none": 26
        }
      },
      {
        "bucket_utc": "2026-03-07T15:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-07T16:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-07T17:00:00.000Z",
        "count": 12,
        "by_severity": {
          "none": 12
        }
      },
      {
        "bucket_utc": "2026-03-07T18:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-07T19:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-07T20:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-07T21:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-07T22:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-07T23:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-08T00:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-08T01:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-08T02:00:00.000Z",
        "count": 6,
        "by_severity": {
          "none": 6
        }
      },
      {
        "bucket_utc": "2026-03-08T03:00:00.000Z",
        "count": 13,
        "by_severity": {
          "none": 13
        }
      },
      {
        "bucket_utc": "2026-03-08T04:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-08T05:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-08T06:00:00.000Z",
        "count": 6,
        "by_severity": {
          "none": 6
        }
      },
      {
        "bucket_utc": "2026-03-08T07:00:00.000Z",
        "count": 5,
        "by_severity": {
          "none": 5
        }
      },
      {
        "bucket_utc": "2026-03-08T08:00:00.000Z",
        "count": 15,
        "by_severity": {
          "none": 15
        }
      },
      {
        "bucket_utc": "2026-03-08T09:00:00.000Z",
        "count": 31,
        "by_severity": {
          "none": 30,
          "informational": 1
        }
      },
      {
        "bucket_utc": "2026-03-08T10:00:00.000Z",
        "count": 31,
        "by_severity": {
          "none": 31
        }
      },
      {
        "bucket_utc": "2026-03-08T11:00:00.000Z",
        "count": 28,
        "by_severity": {
          "none": 28
        }
      },
      {
        "bucket_utc": "2026-03-08T12:00:00.000Z",
        "count": 14,
        "by_severity": {
          "none": 14
        }
      },
      {
        "bucket_utc": "2026-03-08T13:00:00.000Z",
        "count": 31,
        "by_severity": {
          "none": 31
        }
      },
      {
        "bucket_utc": "2026-03-08T14:00:00.000Z",
        "count": 21,
        "by_severity": {
          "none": 21
        }
      },
      {
        "bucket_utc": "2026-03-08T15:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-08T16:00:00.000Z",
        "count": 29,
        "by_severity": {
          "none": 29
        }
      },
      {
        "bucket_utc": "2026-03-08T17:00:00.000Z",
        "count": 11,
        "by_severity": {
          "none": 11
        }
      },
      {
        "bucket_utc": "2026-03-08T18:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-08T19:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-08T20:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-08T21:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-08T22:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-08T23:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-09T00:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-09T01:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-09T02:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-09T03:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-09T04:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-09T05:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-09T06:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-09T07:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-09T08:00:00.000Z",
        "count": 19,
        "by_severity": {
          "none": 19
        }
      },
      {
        "bucket_utc": "2026-03-09T09:00:00.000Z",
        "count": 42,
        "by_severity": {
          "low": 1,
          "none": 30,
          "medium": 3,
          "high": 7,
          "informational": 1
        }
      },
      {
        "bucket_utc": "2026-03-09T10:00:00.000Z",
        "count": 35,
        "by_severity": {
          "none": 35
        }
      },
      {
        "bucket_utc": "2026-03-09T11:00:00.000Z",
        "count": 30,
        "by_severity": {
          "none": 30
        }
      },
      {
        "bucket_utc": "2026-03-09T12:00:00.000Z",
        "count": 17,
        "by_severity": {
          "none": 17
        }
      },
      {
        "bucket_utc": "2026-03-09T13:00:00.000Z",
        "count": 20,
        "by_severity": {
          "none": 20
        }
      },
      {
        "bucket_utc": "2026-03-09T14:00:00.000Z",
        "count": 26,
        "by_severity": {
          "none": 26
        }
      },
      {
        "bucket_utc": "2026-03-09T15:00:00.000Z",
        "count": 24,
        "by_severity": {
          "none": 24
        }
      },
      {
        "bucket_utc": "2026-03-09T16:00:00.000Z",
        "count": 33,
        "by_severity": {
          "none": 33
        }
      },
      {
        "bucket_utc": "2026-03-09T17:00:00.000Z",
        "count": 15,
        "by_severity": {
          "none": 15
        }
      },
      {
        "bucket_utc": "2026-03-09T18:00:00.000Z",
        "count": 8,
        "by_severity": {
          "none": 8
        }
      },
      {
        "bucket_utc": "2026-03-09T19:00:00.000Z",
        "count": 8,
        "by_severity": {
          "none": 8
        }
      },
      {
        "bucket_utc": "2026-03-09T20:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-09T21:00:00.000Z",
        "count": 5,
        "by_severity": {
          "none": 5
        }
      },
      {
        "bucket_utc": "2026-03-09T22:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-09T23:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-10T00:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-10T01:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-10T02:00:00.000Z",
        "count": 18,
        "by_severity": {
          "low": 1,
          "medium": 4,
          "none": 7,
          "critical": 2,
          "high": 4
        }
      },
      {
        "bucket_utc": "2026-03-10T03:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-10T04:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-10T05:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-10T06:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-10T07:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-10T08:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-10T09:00:00.000Z",
        "count": 23,
        "by_severity": {
          "none": 22,
          "low": 1
        }
      },
      {
        "bucket_utc": "2026-03-10T10:00:00.000Z",
        "count": 26,
        "by_severity": {
          "none": 26
        }
      },
      {
        "bucket_utc": "2026-03-10T11:00:00.000Z",
        "count": 20,
        "by_severity": {
          "none": 20
        }
      },
      {
        "bucket_utc": "2026-03-10T12:00:00.000Z",
        "count": 26,
        "by_severity": {
          "none": 26
        }
      },
      {
        "bucket_utc": "2026-03-10T13:00:00.000Z",
        "count": 26,
        "by_severity": {
          "none": 26
        }
      },
      {
        "bucket_utc": "2026-03-10T14:00:00.000Z",
        "count": 32,
        "by_severity": {
          "none": 32
        }
      },
      {
        "bucket_utc": "2026-03-10T15:00:00.000Z",
        "count": 29,
        "by_severity": {
          "none": 29
        }
      },
      {
        "bucket_utc": "2026-03-10T16:00:00.000Z",
        "count": 23,
        "by_severity": {
          "none": 23
        }
      },
      {
        "bucket_utc": "2026-03-10T17:00:00.000Z",
        "count": 13,
        "by_severity": {
          "none": 13
        }
      },
      {
        "bucket_utc": "2026-03-10T18:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-10T19:00:00.000Z",
        "count": 10,
        "by_severity": {
          "none": 10
        }
      },
      {
        "bucket_utc": "2026-03-10T20:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-10T21:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-10T22:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-10T23:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-11T00:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-11T01:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-11T02:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-11T03:00:00.000Z",
        "count": 10,
        "by_severity": {
          "none": 4,
          "high": 6
        }
      },
      {
        "bucket_utc": "2026-03-11T04:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-11T05:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-11T06:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-11T07:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-11T08:00:00.000Z",
        "count": 15,
        "by_severity": {
          "none": 15
        }
      },
      {
        "bucket_utc": "2026-03-11T09:00:00.000Z",
        "count": 17,
        "by_severity": {
          "none": 16,
          "low": 1
        }
      },
      {
        "bucket_utc": "2026-03-11T10:00:00.000Z",
        "count": 34,
        "by_severity": {
          "none": 34
        }
      },
      {
        "bucket_utc": "2026-03-11T11:00:00.000Z",
        "count": 30,
        "by_severity": {
          "none": 30
        }
      },
      {
        "bucket_utc": "2026-03-11T12:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-11T13:00:00.000Z",
        "count": 31,
        "by_severity": {
          "none": 31
        }
      },
      {
        "bucket_utc": "2026-03-11T14:00:00.000Z",
        "count": 34,
        "by_severity": {
          "none": 34
        }
      },
      {
        "bucket_utc": "2026-03-11T15:00:00.000Z",
        "count": 25,
        "by_severity": {
          "none": 25
        }
      },
      {
        "bucket_utc": "2026-03-11T16:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-11T17:00:00.000Z",
        "count": 16,
        "by_severity": {
          "none": 16
        }
      },
      {
        "bucket_utc": "2026-03-11T18:00:00.000Z",
        "count": 8,
        "by_severity": {
          "none": 8
        }
      },
      {
        "bucket_utc": "2026-03-11T19:00:00.000Z",
        "count": 8,
        "by_severity": {
          "none": 8
        }
      },
      {
        "bucket_utc": "2026-03-11T20:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-11T21:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-11T22:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-11T23:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-12T00:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-12T01:00:00.000Z",
        "count": 11,
        "by_severity": {
          "none": 4,
          "critical": 5,
          "high": 2
        }
      },
      {
        "bucket_utc": "2026-03-12T02:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-12T03:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-12T04:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-12T05:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-12T06:00:00.000Z",
        "count": 8,
        "by_severity": {
          "none": 8
        }
      },
      {
        "bucket_utc": "2026-03-12T07:00:00.000Z",
        "count": 5,
        "by_severity": {
          "none": 5
        }
      },
      {
        "bucket_utc": "2026-03-12T08:00:00.000Z",
        "count": 13,
        "by_severity": {
          "none": 13
        }
      },
      {
        "bucket_utc": "2026-03-12T09:00:00.000Z",
        "count": 35,
        "by_severity": {
          "none": 34,
          "low": 1
        }
      },
      {
        "bucket_utc": "2026-03-12T10:00:00.000Z",
        "count": 24,
        "by_severity": {
          "none": 24
        }
      },
      {
        "bucket_utc": "2026-03-12T11:00:00.000Z",
        "count": 28,
        "by_severity": {
          "none": 28
        }
      },
      {
        "bucket_utc": "2026-03-12T12:00:00.000Z",
        "count": 23,
        "by_severity": {
          "none": 23
        }
      },
      {
        "bucket_utc": "2026-03-12T13:00:00.000Z",
        "count": 27,
        "by_severity": {
          "none": 27
        }
      },
      {
        "bucket_utc": "2026-03-12T14:00:00.000Z",
        "count": 29,
        "by_severity": {
          "none": 29
        }
      },
      {
        "bucket_utc": "2026-03-12T15:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-12T16:00:00.000Z",
        "count": 17,
        "by_severity": {
          "none": 17
        }
      },
      {
        "bucket_utc": "2026-03-12T17:00:00.000Z",
        "count": 14,
        "by_severity": {
          "none": 14
        }
      },
      {
        "bucket_utc": "2026-03-12T18:00:00.000Z",
        "count": 5,
        "by_severity": {
          "none": 5
        }
      },
      {
        "bucket_utc": "2026-03-12T19:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-12T20:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-12T21:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-12T22:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-12T23:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-13T00:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-13T01:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-13T02:00:00.000Z",
        "count": 5,
        "by_severity": {
          "none": 5
        }
      },
      {
        "bucket_utc": "2026-03-13T03:00:00.000Z",
        "count": 9,
        "by_severity": {
          "none": 9
        }
      },
      {
        "bucket_utc": "2026-03-13T04:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-13T05:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-13T06:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-13T07:00:00.000Z",
        "count": 8,
        "by_severity": {
          "none": 8
        }
      },
      {
        "bucket_utc": "2026-03-13T08:00:00.000Z",
        "count": 19,
        "by_severity": {
          "none": 19
        }
      },
      {
        "bucket_utc": "2026-03-13T09:00:00.000Z",
        "count": 20,
        "by_severity": {
          "none": 20
        }
      },
      {
        "bucket_utc": "2026-03-13T10:00:00.000Z",
        "count": 29,
        "by_severity": {
          "none": 29
        }
      },
      {
        "bucket_utc": "2026-03-13T11:00:00.000Z",
        "count": 31,
        "by_severity": {
          "none": 31
        }
      },
      {
        "bucket_utc": "2026-03-13T12:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-13T13:00:00.000Z",
        "count": 23,
        "by_severity": {
          "none": 23
        }
      },
      {
        "bucket_utc": "2026-03-13T14:00:00.000Z",
        "count": 30,
        "by_severity": {
          "none": 30
        }
      },
      {
        "bucket_utc": "2026-03-13T15:00:00.000Z",
        "count": 27,
        "by_severity": {
          "none": 27
        }
      },
      {
        "bucket_utc": "2026-03-13T16:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-13T17:00:00.000Z",
        "count": 6,
        "by_severity": {
          "none": 6
        }
      },
      {
        "bucket_utc": "2026-03-13T18:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-13T19:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-13T20:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-13T21:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-13T22:00:00.000Z",
        "count": 6,
        "by_severity": {
          "none": 4,
          "high": 2
        }
      },
      {
        "bucket_utc": "2026-03-13T23:00:00.000Z",
        "count": 5,
        "by_severity": {
          "critical": 1,
          "high": 1,
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-14T00:00:00.000Z",
        "count": 7,
        "by_severity": {
          "medium": 1,
          "none": 2,
          "high": 2,
          "critical": 2
        }
      },
      {
        "bucket_utc": "2026-03-14T01:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-14T02:00:00.000Z",
        "count": 5,
        "by_severity": {
          "none": 5
        }
      },
      {
        "bucket_utc": "2026-03-14T03:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-14T04:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-14T05:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-14T06:00:00.000Z",
        "count": 4,
        "by_severity": {
          "none": 4
        }
      },
      {
        "bucket_utc": "2026-03-14T07:00:00.000Z",
        "count": 7,
        "by_severity": {
          "none": 7
        }
      },
      {
        "bucket_utc": "2026-03-14T08:00:00.000Z",
        "count": 14,
        "by_severity": {
          "none": 14
        }
      },
      {
        "bucket_utc": "2026-03-14T09:00:00.000Z",
        "count": 26,
        "by_severity": {
          "none": 26
        }
      },
      {
        "bucket_utc": "2026-03-14T10:00:00.000Z",
        "count": 39,
        "by_severity": {
          "none": 39
        }
      },
      {
        "bucket_utc": "2026-03-14T11:00:00.000Z",
        "count": 31,
        "by_severity": {
          "none": 31
        }
      },
      {
        "bucket_utc": "2026-03-14T12:00:00.000Z",
        "count": 27,
        "by_severity": {
          "none": 27
        }
      },
      {
        "bucket_utc": "2026-03-14T13:00:00.000Z",
        "count": 19,
        "by_severity": {
          "none": 19
        }
      },
      {
        "bucket_utc": "2026-03-14T14:00:00.000Z",
        "count": 22,
        "by_severity": {
          "none": 22
        }
      },
      {
        "bucket_utc": "2026-03-14T15:00:00.000Z",
        "count": 21,
        "by_severity": {
          "none": 21
        }
      },
      {
        "bucket_utc": "2026-03-14T16:00:00.000Z",
        "count": 29,
        "by_severity": {
          "none": 29
        }
      },
      {
        "bucket_utc": "2026-03-14T17:00:00.000Z",
        "count": 13,
        "by_severity": {
          "none": 13
        }
      },
      {
        "bucket_utc": "2026-03-14T18:00:00.000Z",
        "count": 3,
        "by_severity": {
          "none": 3
        }
      },
      {
        "bucket_utc": "2026-03-14T19:00:00.000Z",
        "count": 1,
        "by_severity": {
          "none": 1
        }
      },
      {
        "bucket_utc": "2026-03-14T20:00:00.000Z",
        "count": 5,
        "by_severity": {
          "none": 5
        }
      },
      {
        "bucket_utc": "2026-03-14T21:00:00.000Z",
        "count": 0,
        "by_severity": {}
      },
      {
        "bucket_utc": "2026-03-14T22:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      },
      {
        "bucket_utc": "2026-03-14T23:00:00.000Z",
        "count": 2,
        "by_severity": {
          "none": 2
        }
      }
    ],
    "bucket_size": "hour",
    "severity_distribution": {
      "none": 2338,
      "informational": 2,
      "low": 5,
      "medium": 8,
      "high": 24,
      "critical": 10
    },
    "source_distribution": {
      "filesystem": 236,
      "registry": 225,
      "process": 27,
      "execution": 241,
      "service": 223,
      "browser": 83,
      "network": 227,
      "scheduled_task": 152,
      "log": 223,
      "usb_device": 81,
      "eventlog": 302,
      "system_info": 221,
      "persistence": 2,
      "account": 144
    },
    "top_detection_rules": [
      {
        "rule_name": "IRTriage_Demo_Implant_Loader",
        "engine": "yara",
        "count": 2,
        "severity": "high"
      },
      {
        "rule_name": "Account Created In The Forest Root By A Child-Domain Principal",
        "engine": "sigma",
        "count": 1,
        "severity": "high"
      },
      {
        "rule_name": "Archive Created With Encrypted Headers By A Service Process",
        "engine": "sigma",
        "count": 1,
        "severity": "high"
      },
      {
        "rule_name": "Archive Utility Execution From Administrative Context",
        "engine": "sigma",
        "count": 1,
        "severity": "informational"
      },
      {
        "rule_name": "Bulk LDAP Directory Enumeration From A Workstation",
        "engine": "sigma",
        "count": 1,
        "severity": "medium"
      },
      {
        "rule_name": "Cred Access: DCSync Replication Right",
        "engine": "hayabusa",
        "count": 1,
        "severity": "critical"
      },
      {
        "rule_name": "Cred Dump: comsvcs MiniDump",
        "engine": "hayabusa",
        "count": 1,
        "severity": "critical"
      },
      {
        "rule_name": "Cross-Realm Ticket With Privileged ExtraSids",
        "engine": "sigma",
        "count": 1,
        "severity": "critical"
      },
      {
        "rule_name": "DCSync: Replication Rights Used By A Non-Domain-Controller Account",
        "engine": "sigma",
        "count": 1,
        "severity": "critical"
      },
      {
        "rule_name": "Domain Trust Discovery",
        "engine": "sigma",
        "count": 1,
        "severity": "medium"
      },
      {
        "rule_name": "Encoded PowerShell Command Line With Hidden Window",
        "engine": "sigma",
        "count": 1,
        "severity": "high"
      },
      {
        "rule_name": "Event Log Cleared Via wevtutil",
        "engine": "sigma",
        "count": 1,
        "severity": "high"
      },
      {
        "rule_name": "Execution From User AppData Roaming Directory",
        "engine": "sigma",
        "count": 1,
        "severity": "high"
      },
      {
        "rule_name": "Exfil: Large Egress From Server",
        "engine": "hayabusa",
        "count": 1,
        "severity": "critical"
      },
      {
        "rule_name": "External Mail With Financial Lure Subject And SPF Softfail",
        "engine": "sigma",
        "count": 1,
        "severity": "low"
      }
    ],
    "top_processes": [
      {
        "name": "services.exe",
        "count": 155,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "MSEDGE.EXE",
        "count": 94,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "MsMpEng.exe",
        "count": 85,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "dfsrs.exe",
        "count": 71,
        "hosts": [
          "SRV-CORP-FS02"
        ],
        "max_severity": "none"
      },
      {
        "name": "dns.exe",
        "count": 71,
        "hosts": [
          "DC-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "REPADMIN.EXE",
        "count": 70,
        "hosts": [
          "DC-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "ROBOCOPY.EXE",
        "count": 70,
        "hosts": [
          "SRV-CORP-FS02"
        ],
        "max_severity": "none"
      },
      {
        "name": "EXCEL.EXE",
        "count": 13,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "SNIPPINGTOOL.EXE",
        "count": 13,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "CALC.EXE",
        "count": 11,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "WINWORD.EXE",
        "count": 10,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "TEAMS.EXE",
        "count": 9,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "NOTEPAD.EXE",
        "count": 8,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "OUTLOOK.EXE",
        "count": 7,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "name": "cmd.exe",
        "count": 4,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "max_severity": "medium"
      }
    ],
    "top_paths": [
      {
        "path": "C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe",
        "count": 81,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Windows\\SYSVOL\\sysvol\\corp.example\\Policies\\{31B2F340-016D-11D2-945F-00C04FB984F9}\\GPT.INI",
        "count": 70,
        "hosts": [
          "DC-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\payroll-summary.xlsx",
        "count": 12,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\board-pack-march.pptx",
        "count": 10,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\contract-renewal.docx",
        "count": 10,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\Q1-forecast.xlsx",
        "count": 10,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\vat-return-2026.xlsx",
        "count": 10,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\expenses-feb.xlsx",
        "count": 9,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\audit-notes.docx",
        "count": 8,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\cashflow-model.xlsx",
        "count": 6,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "D:\\Finance\\Audit\\contract-renewal.docx",
        "count": 5,
        "hosts": [
          "SRV-CORP-FS02"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\Users\\alice\\Documents\\supplier-review.docx",
        "count": 4,
        "hosts": [
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      },
      {
        "path": "D:\\Finance\\2026Q1\\expenses-feb.xlsx",
        "count": 4,
        "hosts": [
          "SRV-CORP-FS02"
        ],
        "max_severity": "none"
      },
      {
        "path": "D:\\Finance\\Audit\\supplier-review.docx",
        "count": 4,
        "hosts": [
          "SRV-CORP-FS02"
        ],
        "max_severity": "none"
      },
      {
        "path": "C:\\$Extend\\$RmMetadata\\$TxfLog\\$TxfLog.blf",
        "count": 3,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "max_severity": "none"
      }
    ],
    "network_endpoints": [
      {
        "ip": "10.0.10.10",
        "port": 88,
        "count": 72,
        "direction": "inbound",
        "max_severity": "critical"
      },
      {
        "ip": "10.0.5.20",
        "port": 445,
        "count": 72,
        "direction": "outbound",
        "max_severity": "high"
      },
      {
        "ip": "10.0.10.14",
        "port": 10000,
        "count": 70,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.10",
        "port": 135,
        "count": 70,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "domain": "intranet.corp.example",
        "count": 64,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "domain": "sharepoint.corp.example",
        "count": 18,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.9",
        "domain": "dc-eu-01.eu.corp.example",
        "port": 8080,
        "count": 14,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.9",
        "domain": "sharepoint.corp.example",
        "port": 8080,
        "count": 13,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.9",
        "domain": "srv-corp-fs02.eu.corp.example",
        "port": 8080,
        "count": 12,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.9",
        "domain": "updates.corp.example",
        "port": 8080,
        "count": 11,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.9",
        "domain": "wsus.corp.example",
        "port": 8080,
        "count": 9,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.9",
        "domain": "intranet.corp.example",
        "port": 8080,
        "count": 8,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.9",
        "domain": "dc-corp-01.corp.example",
        "port": 8080,
        "count": 8,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "10.0.5.9",
        "domain": "mail.corp.example",
        "port": 8080,
        "count": 7,
        "direction": "outbound",
        "max_severity": "none"
      },
      {
        "ip": "198.51.100.24",
        "domain": "cdn-sync-updates.example",
        "port": 443,
        "count": 2,
        "direction": "outbound",
        "max_severity": "high"
      }
    ],
    "accounts_active": [
      {
        "account": "SYSTEM",
        "count": 1144,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "first_seen_utc": "2026-03-07T00:05:00.0000000Z",
        "last_seen_utc": "2026-03-14T23:29:42.2860000Z"
      },
      {
        "account": "EU\\alice",
        "count": 571,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "first_seen_utc": "2026-03-07T00:05:05.0000000Z",
        "last_seen_utc": "2026-03-14T20:50:20.0870000Z"
      },
      {
        "account": "EU\\svc-backup",
        "count": 200,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "first_seen_utc": "2026-03-07T00:30:32.9600000Z",
        "last_seen_utc": "2026-03-14T17:56:27.4540000Z"
      },
      {
        "account": "EU\\bob",
        "count": 176,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "first_seen_utc": "2026-03-07T00:05:04.0000000Z",
        "last_seen_utc": "2026-03-14T18:02:15.3200000Z"
      },
      {
        "account": "CORP\\Administrator",
        "count": 105,
        "hosts": [
          "DC-CORP-01"
        ],
        "first_seen_utc": "2026-03-07T00:05:05.0000000Z",
        "last_seen_utc": "2026-03-14T14:57:29.8830000Z"
      },
      {
        "account": "EU\\carol",
        "count": 91,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02"
        ],
        "first_seen_utc": "2026-03-07T02:29:51.8530000Z",
        "last_seen_utc": "2026-03-14T22:41:50.7710000Z"
      },
      {
        "account": "EU\\SRV-CORP-FS02$",
        "count": 70,
        "hosts": [
          "SRV-CORP-FS02"
        ],
        "first_seen_utc": "2026-03-07T02:46:15.0290000Z",
        "last_seen_utc": "2026-03-13T22:31:18.8460000Z"
      },
      {
        "account": "EU\\Administrator",
        "count": 25,
        "hosts": [
          "SRV-CORP-FS02"
        ],
        "first_seen_utc": "2026-03-07T09:48:01.1780000Z",
        "last_seen_utc": "2026-03-14T17:43:36.5420000Z"
      },
      {
        "account": "NETWORK SERVICE",
        "count": 3,
        "hosts": [
          "DC-CORP-01",
          "SRV-CORP-FS02",
          "WKS-CORP-01"
        ],
        "first_seen_utc": "2026-03-07T00:05:03.0000000Z",
        "last_seen_utc": "2026-03-07T00:05:03.0000000Z"
      },
      {
        "account": "CORP\\svc-support",
        "count": 2,
        "hosts": [
          "DC-CORP-01"
        ],
        "first_seen_utc": "2026-03-12T01:52:40.0000000Z",
        "last_seen_utc": "2026-03-14T00:31:12.0000000Z"
      }
    ],
    "hourly_heatmap": [
      {
        "day_of_week": 0,
        "hour": 0,
        "count": 3
      },
      {
        "day_of_week": 0,
        "hour": 1,
        "count": 2
      },
      {
        "day_of_week": 0,
        "hour": 2,
        "count": 6
      },
      {
        "day_of_week": 0,
        "hour": 3,
        "count": 13
      },
      {
        "day_of_week": 0,
        "hour": 5,
        "count": 1
      },
      {
        "day_of_week": 0,
        "hour": 6,
        "count": 6
      },
      {
        "day_of_week": 0,
        "hour": 7,
        "count": 5
      },
      {
        "day_of_week": 0,
        "hour": 8,
        "count": 15
      },
      {
        "day_of_week": 0,
        "hour": 9,
        "count": 31
      },
      {
        "day_of_week": 0,
        "hour": 10,
        "count": 31
      },
      {
        "day_of_week": 0,
        "hour": 11,
        "count": 28
      },
      {
        "day_of_week": 0,
        "hour": 12,
        "count": 14
      },
      {
        "day_of_week": 0,
        "hour": 13,
        "count": 31
      },
      {
        "day_of_week": 0,
        "hour": 14,
        "count": 21
      },
      {
        "day_of_week": 0,
        "hour": 15,
        "count": 22
      },
      {
        "day_of_week": 0,
        "hour": 16,
        "count": 29
      },
      {
        "day_of_week": 0,
        "hour": 17,
        "count": 11
      },
      {
        "day_of_week": 0,
        "hour": 18,
        "count": 7
      },
      {
        "day_of_week": 0,
        "hour": 19,
        "count": 7
      },
      {
        "day_of_week": 0,
        "hour": 21,
        "count": 1
      },
      {
        "day_of_week": 0,
        "hour": 22,
        "count": 3
      },
      {
        "day_of_week": 0,
        "hour": 23,
        "count": 3
      },
      {
        "day_of_week": 1,
        "hour": 1,
        "count": 1
      },
      {
        "day_of_week": 1,
        "hour": 2,
        "count": 3
      },
      {
        "day_of_week": 1,
        "hour": 3,
        "count": 4
      },
      {
        "day_of_week": 1,
        "hour": 4,
        "count": 1
      },
      {
        "day_of_week": 1,
        "hour": 5,
        "count": 3
      },
      {
        "day_of_week": 1,
        "hour": 6,
        "count": 2
      },
      {
        "day_of_week": 1,
        "hour": 7,
        "count": 4
      },
      {
        "day_of_week": 1,
        "hour": 8,
        "count": 19
      },
      {
        "day_of_week": 1,
        "hour": 9,
        "count": 42
      },
      {
        "day_of_week": 1,
        "hour": 10,
        "count": 35
      },
      {
        "day_of_week": 1,
        "hour": 11,
        "count": 30
      },
      {
        "day_of_week": 1,
        "hour": 12,
        "count": 17
      },
      {
        "day_of_week": 1,
        "hour": 13,
        "count": 20
      },
      {
        "day_of_week": 1,
        "hour": 14,
        "count": 26
      },
      {
        "day_of_week": 1,
        "hour": 15,
        "count": 24
      },
      {
        "day_of_week": 1,
        "hour": 16,
        "count": 33
      },
      {
        "day_of_week": 1,
        "hour": 17,
        "count": 15
      },
      {
        "day_of_week": 1,
        "hour": 18,
        "count": 8
      },
      {
        "day_of_week": 1,
        "hour": 19,
        "count": 8
      },
      {
        "day_of_week": 1,
        "hour": 20,
        "count": 2
      },
      {
        "day_of_week": 1,
        "hour": 21,
        "count": 5
      },
      {
        "day_of_week": 1,
        "hour": 22,
        "count": 3
      },
      {
        "day_of_week": 2,
        "hour": 0,
        "count": 2
      },
      {
        "day_of_week": 2,
        "hour": 2,
        "count": 18
      },
      {
        "day_of_week": 2,
        "hour": 3,
        "count": 7
      },
      {
        "day_of_week": 2,
        "hour": 4,
        "count": 2
      },
      {
        "day_of_week": 2,
        "hour": 5,
        "count": 3
      },
      {
        "day_of_week": 2,
        "hour": 6,
        "count": 3
      },
      {
        "day_of_week": 2,
        "hour": 7,
        "count": 7
      },
      {
        "day_of_week": 2,
        "hour": 8,
        "count": 22
      },
      {
        "day_of_week": 2,
        "hour": 9,
        "count": 23
      },
      {
        "day_of_week": 2,
        "hour": 10,
        "count": 26
      },
      {
        "day_of_week": 2,
        "hour": 11,
        "count": 20
      },
      {
        "day_of_week": 2,
        "hour": 12,
        "count": 26
      },
      {
        "day_of_week": 2,
        "hour": 13,
        "count": 26
      },
      {
        "day_of_week": 2,
        "hour": 14,
        "count": 32
      },
      {
        "day_of_week": 2,
        "hour": 15,
        "count": 29
      },
      {
        "day_of_week": 2,
        "hour": 16,
        "count": 23
      },
      {
        "day_of_week": 2,
        "hour": 17,
        "count": 13
      },
      {
        "day_of_week": 2,
        "hour": 18,
        "count": 4
      },
      {
        "day_of_week": 2,
        "hour": 19,
        "count": 10
      },
      {
        "day_of_week": 2,
        "hour": 20,
        "count": 1
      },
      {
        "day_of_week": 2,
        "hour": 21,
        "count": 4
      },
      {
        "day_of_week": 2,
        "hour": 23,
        "count": 1
      },
      {
        "day_of_week": 3,
        "hour": 0,
        "count": 2
      },
      {
        "day_of_week": 3,
        "hour": 1,
        "count": 3
      },
      {
        "day_of_week": 3,
        "hour": 2,
        "count": 3
      },
      {
        "day_of_week": 3,
        "hour": 3,
        "count": 10
      },
      {
        "day_of_week": 3,
        "hour": 5,
        "count": 1
      },
      {
        "day_of_week": 3,
        "hour": 6,
        "count": 3
      },
      {
        "day_of_week": 3,
        "hour": 7,
        "count": 3
      },
      {
        "day_of_week": 3,
        "hour": 8,
        "count": 15
      },
      {
        "day_of_week": 3,
        "hour": 9,
        "count": 17
      },
      {
        "day_of_week": 3,
        "hour": 10,
        "count": 34
      },
      {
        "day_of_week": 3,
        "hour": 11,
        "count": 30
      },
      {
        "day_of_week": 3,
        "hour": 12,
        "count": 22
      },
      {
        "day_of_week": 3,
        "hour": 13,
        "count": 31
      },
      {
        "day_of_week": 3,
        "hour": 14,
        "count": 34
      },
      {
        "day_of_week": 3,
        "hour": 15,
        "count": 25
      },
      {
        "day_of_week": 3,
        "hour": 16,
        "count": 22
      },
      {
        "day_of_week": 3,
        "hour": 17,
        "count": 16
      },
      {
        "day_of_week": 3,
        "hour": 18,
        "count": 8
      },
      {
        "day_of_week": 3,
        "hour": 19,
        "count": 8
      },
      {
        "day_of_week": 3,
        "hour": 20,
        "count": 1
      },
      {
        "day_of_week": 3,
        "hour": 21,
        "count": 2
      },
      {
        "day_of_week": 3,
        "hour": 22,
        "count": 2
      },
      {
        "day_of_week": 3,
        "hour": 23,
        "count": 1
      },
      {
        "day_of_week": 4,
        "hour": 0,
        "count": 4
      },
      {
        "day_of_week": 4,
        "hour": 1,
        "count": 11
      },
      {
        "day_of_week": 4,
        "hour": 2,
        "count": 4
      },
      {
        "day_of_week": 4,
        "hour": 3,
        "count": 4
      },
      {
        "day_of_week": 4,
        "hour": 4,
        "count": 4
      },
      {
        "day_of_week": 4,
        "hour": 5,
        "count": 1
      },
      {
        "day_of_week": 4,
        "hour": 6,
        "count": 8
      },
      {
        "day_of_week": 4,
        "hour": 7,
        "count": 5
      },
      {
        "day_of_week": 4,
        "hour": 8,
        "count": 13
      },
      {
        "day_of_week": 4,
        "hour": 9,
        "count": 35
      },
      {
        "day_of_week": 4,
        "hour": 10,
        "count": 24
      },
      {
        "day_of_week": 4,
        "hour": 11,
        "count": 28
      },
      {
        "day_of_week": 4,
        "hour": 12,
        "count": 23
      },
      {
        "day_of_week": 4,
        "hour": 13,
        "count": 27
      },
      {
        "day_of_week": 4,
        "hour": 14,
        "count": 29
      },
      {
        "day_of_week": 4,
        "hour": 15,
        "count": 22
      },
      {
        "day_of_week": 4,
        "hour": 16,
        "count": 17
      },
      {
        "day_of_week": 4,
        "hour": 17,
        "count": 14
      },
      {
        "day_of_week": 4,
        "hour": 18,
        "count": 5
      },
      {
        "day_of_week": 4,
        "hour": 19,
        "count": 7
      },
      {
        "day_of_week": 4,
        "hour": 20,
        "count": 3
      },
      {
        "day_of_week": 4,
        "hour": 21,
        "count": 2
      },
      {
        "day_of_week": 4,
        "hour": 22,
        "count": 1
      },
      {
        "day_of_week": 4,
        "hour": 23,
        "count": 3
      },
      {
        "day_of_week": 5,
        "hour": 0,
        "count": 1
      },
      {
        "day_of_week": 5,
        "hour": 1,
        "count": 1
      },
      {
        "day_of_week": 5,
        "hour": 2,
        "count": 5
      },
      {
        "day_of_week": 5,
        "hour": 3,
        "count": 9
      },
      {
        "day_of_week": 5,
        "hour": 4,
        "count": 2
      },
      {
        "day_of_week": 5,
        "hour": 5,
        "count": 2
      },
      {
        "day_of_week": 5,
        "hour": 6,
        "count": 4
      },
      {
        "day_of_week": 5,
        "hour": 7,
        "count": 8
      },
      {
        "day_of_week": 5,
        "hour": 8,
        "count": 19
      },
      {
        "day_of_week": 5,
        "hour": 9,
        "count": 20
      },
      {
        "day_of_week": 5,
        "hour": 10,
        "count": 29
      },
      {
        "day_of_week": 5,
        "hour": 11,
        "count": 31
      },
      {
        "day_of_week": 5,
        "hour": 12,
        "count": 22
      },
      {
        "day_of_week": 5,
        "hour": 13,
        "count": 23
      },
      {
        "day_of_week": 5,
        "hour": 14,
        "count": 30
      },
      {
        "day_of_week": 5,
        "hour": 15,
        "count": 27
      },
      {
        "day_of_week": 5,
        "hour": 16,
        "count": 22
      },
      {
        "day_of_week": 5,
        "hour": 17,
        "count": 6
      },
      {
        "day_of_week": 5,
        "hour": 18,
        "count": 7
      },
      {
        "day_of_week": 5,
        "hour": 19,
        "count": 7
      },
      {
        "day_of_week": 5,
        "hour": 20,
        "count": 2
      },
      {
        "day_of_week": 5,
        "hour": 21,
        "count": 2
      },
      {
        "day_of_week": 5,
        "hour": 22,
        "count": 6
      },
      {
        "day_of_week": 5,
        "hour": 23,
        "count": 5
      },
      {
        "day_of_week": 6,
        "hour": 0,
        "count": 37
      },
      {
        "day_of_week": 6,
        "hour": 1,
        "count": 5
      },
      {
        "day_of_week": 6,
        "hour": 2,
        "count": 8
      },
      {
        "day_of_week": 6,
        "hour": 3,
        "count": 10
      },
      {
        "day_of_week": 6,
        "hour": 4,
        "count": 3
      },
      {
        "day_of_week": 6,
        "hour": 5,
        "count": 4
      },
      {
        "day_of_week": 6,
        "hour": 6,
        "count": 12
      },
      {
        "day_of_week": 6,
        "hour": 7,
        "count": 12
      },
      {
        "day_of_week": 6,
        "hour": 8,
        "count": 29
      },
      {
        "day_of_week": 6,
        "hour": 9,
        "count": 66
      },
      {
        "day_of_week": 6,
        "hour": 10,
        "count": 78
      },
      {
        "day_of_week": 6,
        "hour": 11,
        "count": 61
      },
      {
        "day_of_week": 6,
        "hour": 12,
        "count": 44
      },
      {
        "day_of_week": 6,
        "hour": 13,
        "count": 49
      },
      {
        "day_of_week": 6,
        "hour": 14,
        "count": 48
      },
      {
        "day_of_week": 6,
        "hour": 15,
        "count": 43
      },
      {
        "day_of_week": 6,
        "hour": 16,
        "count": 51
      },
      {
        "day_of_week": 6,
        "hour": 17,
        "count": 25
      },
      {
        "day_of_week": 6,
        "hour": 18,
        "count": 6
      },
      {
        "day_of_week": 6,
        "hour": 19,
        "count": 3
      },
      {
        "day_of_week": 6,
        "hour": 20,
        "count": 5
      },
      {
        "day_of_week": 6,
        "hour": 21,
        "count": 1
      },
      {
        "day_of_week": 6,
        "hour": 22,
        "count": 3
      },
      {
        "day_of_week": 6,
        "hour": 23,
        "count": 4
      }
    ],
    "entity_graph": {
      "nodes": [
        {
          "id": "account:CORP\\Administrator",
          "label": "CORP\\Administrator",
          "kind": "account",
          "severity": "none",
          "event_count": 105
        },
        {
          "id": "account:CORP\\svc-support",
          "label": "CORP\\svc-support",
          "kind": "account",
          "severity": "critical",
          "event_count": 2
        },
        {
          "id": "account:EU\\Administrator",
          "label": "EU\\Administrator",
          "kind": "account",
          "severity": "none",
          "event_count": 25
        },
        {
          "id": "account:EU\\alice",
          "label": "EU\\alice",
          "kind": "account",
          "severity": "critical",
          "event_count": 571
        },
        {
          "id": "account:EU\\bob",
          "label": "EU\\bob",
          "kind": "account",
          "severity": "low",
          "event_count": 176
        },
        {
          "id": "account:EU\\carol",
          "label": "EU\\carol",
          "kind": "account",
          "severity": "low",
          "event_count": 91
        },
        {
          "id": "account:EU\\SRV-CORP-FS02$",
          "label": "EU\\SRV-CORP-FS02$",
          "kind": "account",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "account:EU\\svc-backup",
          "label": "EU\\svc-backup",
          "kind": "account",
          "severity": "critical",
          "event_count": 200
        },
        {
          "id": "account:NETWORK SERVICE",
          "label": "NETWORK SERVICE",
          "kind": "account",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "account:SYSTEM",
          "label": "SYSTEM",
          "kind": "account",
          "severity": "critical",
          "event_count": 1144
        },
        {
          "id": "domain:cdn-sync-updates.example",
          "label": "cdn-sync-updates.example",
          "kind": "domain",
          "severity": "high",
          "event_count": 2
        },
        {
          "id": "domain:dc-corp-01.corp.example",
          "label": "dc-corp-01.corp.example",
          "kind": "domain",
          "severity": "none",
          "event_count": 8
        },
        {
          "id": "domain:dc-eu-01.eu.corp.example",
          "label": "dc-eu-01.eu.corp.example",
          "kind": "domain",
          "severity": "none",
          "event_count": 14
        },
        {
          "id": "domain:files-transfer-node.example",
          "label": "files-transfer-node.example",
          "kind": "domain",
          "severity": "critical",
          "event_count": 1
        },
        {
          "id": "domain:intranet.corp.example",
          "label": "intranet.corp.example",
          "kind": "domain",
          "severity": "none",
          "event_count": 72
        },
        {
          "id": "domain:invoices.billing-portal.example",
          "label": "invoices.billing-portal.example",
          "kind": "domain",
          "severity": "medium",
          "event_count": 2
        },
        {
          "id": "domain:mail.corp.example",
          "label": "mail.corp.example",
          "kind": "domain",
          "severity": "none",
          "event_count": 7
        },
        {
          "id": "domain:sharepoint.corp.example",
          "label": "sharepoint.corp.example",
          "kind": "domain",
          "severity": "none",
          "event_count": 31
        },
        {
          "id": "domain:srv-corp-fs02.eu.corp.example",
          "label": "srv-corp-fs02.eu.corp.example",
          "kind": "domain",
          "severity": "none",
          "event_count": 12
        },
        {
          "id": "domain:sync-relay.example",
          "label": "sync-relay.example",
          "kind": "domain",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "domain:updates.corp.example",
          "label": "updates.corp.example",
          "kind": "domain",
          "severity": "none",
          "event_count": 11
        },
        {
          "id": "domain:wsus.corp.example",
          "label": "wsus.corp.example",
          "kind": "domain",
          "severity": "none",
          "event_count": 9
        },
        {
          "id": "file:C:\\$Extend\\$RmMetadata\\$TxfLog\\$TxfLog.blf",
          "label": "$TxfLog.blf",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "file:C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe",
          "label": "OneDrive.exe",
          "kind": "file",
          "severity": "none",
          "event_count": 81
        },
        {
          "id": "file:C:\\Tools\\Sysinternals\\procdump.exe",
          "label": "procdump.exe",
          "kind": "file",
          "severity": "low",
          "event_count": 1
        },
        {
          "id": "file:C:\\Users\\alice\\AppData\\Local\\Temp\\adq.exe",
          "label": "adq.exe",
          "kind": "file",
          "severity": "medium",
          "event_count": 1
        },
        {
          "id": "file:C:\\Users\\alice\\AppData\\Local\\Temp\\inv8841.js",
          "label": "inv8841.js",
          "kind": "file",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "file:C:\\Users\\alice\\AppData\\Local\\Temp\\svcq.exe",
          "label": "svcq.exe",
          "kind": "file",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "file:C:\\Users\\alice\\AppData\\Roaming\\Sync\\updatesvc.exe",
          "label": "updatesvc.exe",
          "kind": "file",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\audit-notes.docx",
          "label": "audit-notes.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 8
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\board-pack-march.pptx",
          "label": "board-pack-march.pptx",
          "kind": "file",
          "severity": "none",
          "event_count": 10
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\cashflow-model.xlsx",
          "label": "cashflow-model.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 6
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\contract-renewal.docx",
          "label": "contract-renewal.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 10
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\expenses-feb.xlsx",
          "label": "expenses-feb.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 9
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\headcount-plan.xlsx",
          "label": "headcount-plan.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\payroll-summary.xlsx",
          "label": "payroll-summary.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 12
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\Q1-forecast.xlsx",
          "label": "Q1-forecast.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 10
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\supplier-review.docx",
          "label": "supplier-review.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 4
        },
        {
          "id": "file:C:\\Users\\alice\\Documents\\vat-return-2026.xlsx",
          "label": "vat-return-2026.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 10
        },
        {
          "id": "file:C:\\Users\\alice\\Downloads\\Invoice_Q1_2026.xlsm",
          "label": "Invoice_Q1_2026.xlsm",
          "kind": "file",
          "severity": "medium",
          "event_count": 2
        },
        {
          "id": "file:C:\\Windows\\SYSVOL\\sysvol\\corp.example\\Policies\\{31B2F340-016D-11D2-945F-00C04FB984F9}\\GPT.INI",
          "label": "GPT.INI",
          "kind": "file",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "file:C:\\Windows\\Temp\\arch\\fin-2026Q1.7z",
          "label": "fin-2026Q1.7z",
          "kind": "file",
          "severity": "high",
          "event_count": 2
        },
        {
          "id": "file:C:\\Windows\\Temp\\kt.exe",
          "label": "kt.exe",
          "kind": "file",
          "severity": "critical",
          "event_count": 1
        },
        {
          "id": "file:C:\\Windows\\Temp\\ls.dmp",
          "label": "ls.dmp",
          "kind": "file",
          "severity": "critical",
          "event_count": 1
        },
        {
          "id": "file:C:\\Windows\\upd.exe",
          "label": "upd.exe",
          "kind": "file",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\board-pack-march.pptx",
          "label": "board-pack-march.pptx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\cashflow-model.xlsx",
          "label": "cashflow-model.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\contract-renewal.docx",
          "label": "contract-renewal.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\expenses-feb.xlsx",
          "label": "expenses-feb.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\headcount-plan.xlsx",
          "label": "headcount-plan.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\payroll-summary.xlsx",
          "label": "payroll-summary.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\Q1-forecast.xlsx",
          "label": "Q1-forecast.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\supplier-review.docx",
          "label": "supplier-review.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\2025Q4\\vat-return-2026.xlsx",
          "label": "vat-return-2026.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "file:D:\\Finance\\2026Q1\\audit-notes.docx",
          "label": "audit-notes.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\2026Q1\\board-pack-march.pptx",
          "label": "board-pack-march.pptx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\2026Q1\\contract-renewal.docx",
          "label": "contract-renewal.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\2026Q1\\expenses-feb.xlsx",
          "label": "expenses-feb.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 4
        },
        {
          "id": "file:D:\\Finance\\2026Q1\\headcount-plan.xlsx",
          "label": "headcount-plan.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "file:D:\\Finance\\2026Q1\\payroll-summary.xlsx",
          "label": "payroll-summary.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\2026Q1\\supplier-review.docx",
          "label": "supplier-review.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\2026Q1\\vat-return-2026.xlsx",
          "label": "vat-return-2026.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\Audit\\audit-notes.docx",
          "label": "audit-notes.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\Audit\\board-pack-march.pptx",
          "label": "board-pack-march.pptx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\Audit\\cashflow-model.xlsx",
          "label": "cashflow-model.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Finance\\Audit\\contract-renewal.docx",
          "label": "contract-renewal.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 5
        },
        {
          "id": "file:D:\\Finance\\Audit\\expenses-feb.xlsx",
          "label": "expenses-feb.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\Audit\\headcount-plan.xlsx",
          "label": "headcount-plan.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\Audit\\payroll-summary.xlsx",
          "label": "payroll-summary.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "file:D:\\Finance\\Audit\\Q1-forecast.xlsx",
          "label": "Q1-forecast.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Finance\\Audit\\supplier-review.docx",
          "label": "supplier-review.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 4
        },
        {
          "id": "file:D:\\Finance\\Audit\\vat-return-2026.xlsx",
          "label": "vat-return-2026.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Shared\\Templates\\audit-notes.docx",
          "label": "audit-notes.docx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Shared\\Templates\\board-pack-march.pptx",
          "label": "board-pack-march.pptx",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "file:D:\\Shared\\Templates\\cashflow-model.xlsx",
          "label": "cashflow-model.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 2
        },
        {
          "id": "file:D:\\Shared\\Templates\\expenses-feb.xlsx",
          "label": "expenses-feb.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "file:D:\\Shared\\Templates\\Q1-forecast.xlsx",
          "label": "Q1-forecast.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "file:D:\\Shared\\Templates\\vat-return-2026.xlsx",
          "label": "vat-return-2026.xlsx",
          "kind": "file",
          "severity": "none",
          "event_count": 3
        },
        {
          "id": "host:DC-CORP-01",
          "label": "DC-CORP-01",
          "kind": "host",
          "severity": "critical",
          "event_count": 721
        },
        {
          "id": "host:SRV-CORP-FS02",
          "label": "SRV-CORP-FS02",
          "kind": "host",
          "severity": "critical",
          "event_count": 726
        },
        {
          "id": "host:WKS-CORP-01",
          "label": "WKS-CORP-01",
          "kind": "host",
          "severity": "critical",
          "event_count": 940
        },
        {
          "id": "ip:10.0.10.10",
          "label": "10.0.10.10",
          "kind": "ip",
          "severity": "critical",
          "event_count": 75
        },
        {
          "id": "ip:10.0.10.14",
          "label": "10.0.10.14",
          "kind": "ip",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "ip:10.0.5.10",
          "label": "10.0.5.10",
          "kind": "ip",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "ip:10.0.5.20",
          "label": "10.0.5.20",
          "kind": "ip",
          "severity": "high",
          "event_count": 72
        },
        {
          "id": "ip:10.0.5.9",
          "label": "10.0.5.9",
          "kind": "ip",
          "severity": "none",
          "event_count": 82
        },
        {
          "id": "ip:198.51.100.24",
          "label": "198.51.100.24",
          "kind": "ip",
          "severity": "high",
          "event_count": 3
        },
        {
          "id": "ip:203.0.113.142",
          "label": "203.0.113.142",
          "kind": "ip",
          "severity": "critical",
          "event_count": 1
        },
        {
          "id": "ip:203.0.113.77",
          "label": "203.0.113.77",
          "kind": "ip",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "process:DC-CORP-01\u0000cmd.exe",
          "label": "cmd.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:DC-CORP-01\u0000dns.exe",
          "label": "dns.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 71
        },
        {
          "id": "process:DC-CORP-01\u0000explorer.exe",
          "label": "explorer.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:DC-CORP-01\u0000lsass.exe",
          "label": "lsass.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:DC-CORP-01\u0000MsMpEng.exe",
          "label": "MsMpEng.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:DC-CORP-01\u0000REPADMIN.EXE",
          "label": "REPADMIN.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "process:DC-CORP-01\u0000services.exe",
          "label": "services.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 71
        },
        {
          "id": "process:DC-CORP-01\u0000svchost.exe",
          "label": "svchost.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:DC-CORP-01\u0000taskhostw.exe",
          "label": "taskhostw.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:DC-CORP-01\u0000wininit.exe",
          "label": "wininit.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u00007z.exe",
          "label": "7z.exe",
          "kind": "process",
          "severity": "informational",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000a.exe",
          "label": "a.exe",
          "kind": "process",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000cmd.exe",
          "label": "cmd.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000dfsrs.exe",
          "label": "dfsrs.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 71
        },
        {
          "id": "process:SRV-CORP-FS02\u0000explorer.exe",
          "label": "explorer.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000kt.exe",
          "label": "kt.exe",
          "kind": "process",
          "severity": "critical",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000lsass.exe",
          "label": "lsass.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000MsMpEng.exe",
          "label": "MsMpEng.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000ROBOCOPY.EXE",
          "label": "ROBOCOPY.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "process:SRV-CORP-FS02\u0000services.exe",
          "label": "services.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000svchost.exe",
          "label": "svchost.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000taskhostw.exe",
          "label": "taskhostw.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000upd.exe",
          "label": "upd.exe",
          "kind": "process",
          "severity": "critical",
          "event_count": 3
        },
        {
          "id": "process:SRV-CORP-FS02\u0000vssadmin.exe",
          "label": "vssadmin.exe",
          "kind": "process",
          "severity": "critical",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000wevtutil.exe",
          "label": "wevtutil.exe",
          "kind": "process",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "process:SRV-CORP-FS02\u0000wininit.exe",
          "label": "wininit.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000adq.exe",
          "label": "adq.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000CALC.EXE",
          "label": "CALC.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 11
        },
        {
          "id": "process:WKS-CORP-01\u0000cmd.exe",
          "label": "cmd.exe",
          "kind": "process",
          "severity": "medium",
          "event_count": 2
        },
        {
          "id": "process:WKS-CORP-01\u0000EXCEL.EXE",
          "label": "EXCEL.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 13
        },
        {
          "id": "process:WKS-CORP-01\u0000explorer.exe",
          "label": "explorer.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000lsass.exe",
          "label": "lsass.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "label": "MSEDGE.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 94
        },
        {
          "id": "process:WKS-CORP-01\u0000MsMpEng.exe",
          "label": "MsMpEng.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 83
        },
        {
          "id": "process:WKS-CORP-01\u0000net.exe",
          "label": "net.exe",
          "kind": "process",
          "severity": "medium",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000nltest.exe",
          "label": "nltest.exe",
          "kind": "process",
          "severity": "medium",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000NOTEPAD.EXE",
          "label": "NOTEPAD.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 8
        },
        {
          "id": "process:WKS-CORP-01\u0000OUTLOOK.EXE",
          "label": "OUTLOOK.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 7
        },
        {
          "id": "process:WKS-CORP-01\u0000powershell.exe",
          "label": "powershell.exe",
          "kind": "process",
          "severity": "high",
          "event_count": 3
        },
        {
          "id": "process:WKS-CORP-01\u0000rundll32.exe",
          "label": "rundll32.exe",
          "kind": "process",
          "severity": "critical",
          "event_count": 3
        },
        {
          "id": "process:WKS-CORP-01\u0000services.exe",
          "label": "services.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 83
        },
        {
          "id": "process:WKS-CORP-01\u0000SNIPPINGTOOL.EXE",
          "label": "SNIPPINGTOOL.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 13
        },
        {
          "id": "process:WKS-CORP-01\u0000svchost.exe",
          "label": "svchost.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000taskhostw.exe",
          "label": "taskhostw.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000TEAMS.EXE",
          "label": "TEAMS.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 9
        },
        {
          "id": "process:WKS-CORP-01\u0000updatesvc.exe",
          "label": "updatesvc.exe",
          "kind": "process",
          "severity": "high",
          "event_count": 4
        },
        {
          "id": "process:WKS-CORP-01\u0000whoami.exe",
          "label": "whoami.exe",
          "kind": "process",
          "severity": "low",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000wininit.exe",
          "label": "wininit.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000winlogon.exe",
          "label": "winlogon.exe",
          "kind": "process",
          "severity": "none",
          "event_count": 1
        },
        {
          "id": "process:WKS-CORP-01\u0000WINWORD.EXE",
          "label": "WINWORD.EXE",
          "kind": "process",
          "severity": "none",
          "event_count": 10
        },
        {
          "id": "process:WKS-CORP-01\u0000wscript.exe",
          "label": "wscript.exe",
          "kind": "process",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache",
          "label": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache",
          "kind": "registry",
          "severity": "none",
          "event_count": 85
        },
        {
          "id": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\Disk&Ven_Corp&Prod_SecureKey&Rev_1.0",
          "label": "HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\Disk&Ven_Corp&Prod_SecureKey&Rev_1.0",
          "kind": "registry",
          "severity": "none",
          "event_count": 81
        },
        {
          "id": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Shares\\Finance",
          "label": "HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Shares\\Finance",
          "kind": "registry",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Services\\NTDS\\Parameters",
          "label": "HKLM\\SYSTEM\\CurrentControlSet\\Services\\NTDS\\Parameters",
          "kind": "registry",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "registry:HKU\\S-1-5-21-2109-1147-3301-1104\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
          "label": "HKU\\S-1-5-21-2109-1147-3301-1104\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
          "kind": "registry",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "service:DFSR",
          "label": "DFSR",
          "kind": "service",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "service:NTDS",
          "label": "NTDS",
          "kind": "service",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "service:SyncHostSvc",
          "label": "SyncHostSvc",
          "kind": "service",
          "severity": "high",
          "event_count": 1
        },
        {
          "id": "service:wuauserv",
          "label": "wuauserv",
          "kind": "service",
          "severity": "none",
          "event_count": 82
        },
        {
          "id": "task:\\Corp\\NightlyShareBackup",
          "label": "\\Corp\\NightlyShareBackup",
          "kind": "task",
          "severity": "none",
          "event_count": 70
        },
        {
          "id": "task:\\Microsoft\\Windows\\UpdateOrchestrator\\Schedule Scan",
          "label": "\\Microsoft\\Windows\\UpdateOrchestrator\\Schedule Scan",
          "kind": "task",
          "severity": "none",
          "event_count": 82
        }
      ],
      "edges": [
        {
          "source": "account:CORP\\Administrator",
          "target": "process:DC-CORP-01\u0000cmd.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:CORP\\Administrator",
          "target": "process:DC-CORP-01\u0000explorer.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:CORP\\Administrator",
          "target": "process:DC-CORP-01\u0000REPADMIN.EXE",
          "kind": "account_process",
          "weight": 70
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000adq.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000CALC.EXE",
          "kind": "account_process",
          "weight": 11
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000cmd.exe",
          "kind": "account_process",
          "weight": 2
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000EXCEL.EXE",
          "kind": "account_process",
          "weight": 13
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000explorer.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "kind": "account_process",
          "weight": 94
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000net.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000nltest.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000NOTEPAD.EXE",
          "kind": "account_process",
          "weight": 8
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000OUTLOOK.EXE",
          "kind": "account_process",
          "weight": 7
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000powershell.exe",
          "kind": "account_process",
          "weight": 2
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000rundll32.exe",
          "kind": "account_process",
          "weight": 3
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000SNIPPINGTOOL.EXE",
          "kind": "account_process",
          "weight": 13
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000taskhostw.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000TEAMS.EXE",
          "kind": "account_process",
          "weight": 9
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000updatesvc.exe",
          "kind": "account_process",
          "weight": 3
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000whoami.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000WINWORD.EXE",
          "kind": "account_process",
          "weight": 10
        },
        {
          "source": "account:EU\\alice",
          "target": "process:WKS-CORP-01\u0000wscript.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\bob",
          "target": "process:SRV-CORP-FS02\u00007z.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\bob",
          "target": "process:SRV-CORP-FS02\u0000cmd.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\bob",
          "target": "process:SRV-CORP-FS02\u0000explorer.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\bob",
          "target": "process:SRV-CORP-FS02\u0000ROBOCOPY.EXE",
          "kind": "account_process",
          "weight": 70
        },
        {
          "source": "account:EU\\bob",
          "target": "process:WKS-CORP-01\u0000powershell.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:EU\\svc-backup",
          "target": "process:WKS-CORP-01\u0000updatesvc.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:NETWORK SERVICE",
          "target": "process:DC-CORP-01\u0000svchost.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:NETWORK SERVICE",
          "target": "process:SRV-CORP-FS02\u0000svchost.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:NETWORK SERVICE",
          "target": "process:WKS-CORP-01\u0000svchost.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:DC-CORP-01\u0000dns.exe",
          "kind": "account_process",
          "weight": 71
        },
        {
          "source": "account:SYSTEM",
          "target": "process:DC-CORP-01\u0000lsass.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:DC-CORP-01\u0000MsMpEng.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:DC-CORP-01\u0000services.exe",
          "kind": "account_process",
          "weight": 71
        },
        {
          "source": "account:SYSTEM",
          "target": "process:DC-CORP-01\u0000taskhostw.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:DC-CORP-01\u0000wininit.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000a.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000dfsrs.exe",
          "kind": "account_process",
          "weight": 71
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000kt.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000lsass.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000MsMpEng.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000services.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000taskhostw.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000upd.exe",
          "kind": "account_process",
          "weight": 3
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000vssadmin.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000wevtutil.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:SRV-CORP-FS02\u0000wininit.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:WKS-CORP-01\u0000lsass.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:WKS-CORP-01\u0000MsMpEng.exe",
          "kind": "account_process",
          "weight": 83
        },
        {
          "source": "account:SYSTEM",
          "target": "process:WKS-CORP-01\u0000services.exe",
          "kind": "account_process",
          "weight": 83
        },
        {
          "source": "account:SYSTEM",
          "target": "process:WKS-CORP-01\u0000wininit.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "account:SYSTEM",
          "target": "process:WKS-CORP-01\u0000winlogon.exe",
          "kind": "account_process",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "account:CORP\\Administrator",
          "kind": "host_account",
          "weight": 105
        },
        {
          "source": "host:DC-CORP-01",
          "target": "account:CORP\\svc-support",
          "kind": "host_account",
          "weight": 2
        },
        {
          "source": "host:DC-CORP-01",
          "target": "account:EU\\alice",
          "kind": "host_account",
          "weight": 41
        },
        {
          "source": "host:DC-CORP-01",
          "target": "account:EU\\bob",
          "kind": "host_account",
          "weight": 49
        },
        {
          "source": "host:DC-CORP-01",
          "target": "account:EU\\carol",
          "kind": "host_account",
          "weight": 58
        },
        {
          "source": "host:DC-CORP-01",
          "target": "account:EU\\svc-backup",
          "kind": "host_account",
          "weight": 37
        },
        {
          "source": "host:DC-CORP-01",
          "target": "account:NETWORK SERVICE",
          "kind": "host_account",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "account:SYSTEM",
          "kind": "host_account",
          "weight": 428
        },
        {
          "source": "host:DC-CORP-01",
          "target": "file:C:\\$Extend\\$RmMetadata\\$TxfLog\\$TxfLog.blf",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "file:C:\\Windows\\SYSVOL\\sysvol\\corp.example\\Policies\\{31B2F340-016D-11D2-945F-00C04FB984F9}\\GPT.INI",
          "kind": "host_file",
          "weight": 70
        },
        {
          "source": "host:DC-CORP-01",
          "target": "ip:10.0.10.10",
          "kind": "host_ip",
          "weight": 75
        },
        {
          "source": "host:DC-CORP-01",
          "target": "ip:10.0.5.10",
          "kind": "host_ip",
          "weight": 70
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000cmd.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000dns.exe",
          "kind": "host_process",
          "weight": 71
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000explorer.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000lsass.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000MsMpEng.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000REPADMIN.EXE",
          "kind": "host_process",
          "weight": 70
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000services.exe",
          "kind": "host_process",
          "weight": 71
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000svchost.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000taskhostw.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "process:DC-CORP-01\u0000wininit.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache",
          "kind": "host_registry",
          "weight": 1
        },
        {
          "source": "host:DC-CORP-01",
          "target": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Services\\NTDS\\Parameters",
          "kind": "host_registry",
          "weight": 70
        },
        {
          "source": "host:DC-CORP-01",
          "target": "service:NTDS",
          "kind": "host_service",
          "weight": 70
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "account:EU\\Administrator",
          "kind": "host_account",
          "weight": 25
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "account:EU\\alice",
          "kind": "host_account",
          "weight": 32
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "account:EU\\bob",
          "kind": "host_account",
          "weight": 104
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "account:EU\\carol",
          "kind": "host_account",
          "weight": 33
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "account:EU\\SRV-CORP-FS02$",
          "kind": "host_account",
          "weight": 70
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "account:EU\\svc-backup",
          "kind": "host_account",
          "weight": 162
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "account:NETWORK SERVICE",
          "kind": "host_account",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "account:SYSTEM",
          "kind": "host_account",
          "weight": 299
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "domain:files-transfer-node.example",
          "kind": "host_domain",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "domain:sync-relay.example",
          "kind": "host_domain",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:C:\\$Extend\\$RmMetadata\\$TxfLog\\$TxfLog.blf",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:C:\\Windows\\Temp\\arch\\fin-2026Q1.7z",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:C:\\Windows\\Temp\\kt.exe",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:C:\\Windows\\upd.exe",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\board-pack-march.pptx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\cashflow-model.xlsx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\contract-renewal.docx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\expenses-feb.xlsx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\headcount-plan.xlsx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\payroll-summary.xlsx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\Q1-forecast.xlsx",
          "kind": "host_file",
          "weight": 3
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\supplier-review.docx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2025Q4\\vat-return-2026.xlsx",
          "kind": "host_file",
          "weight": 3
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2026Q1\\audit-notes.docx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2026Q1\\board-pack-march.pptx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2026Q1\\contract-renewal.docx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2026Q1\\expenses-feb.xlsx",
          "kind": "host_file",
          "weight": 4
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2026Q1\\headcount-plan.xlsx",
          "kind": "host_file",
          "weight": 3
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2026Q1\\payroll-summary.xlsx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2026Q1\\supplier-review.docx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\2026Q1\\vat-return-2026.xlsx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\audit-notes.docx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\board-pack-march.pptx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\cashflow-model.xlsx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\contract-renewal.docx",
          "kind": "host_file",
          "weight": 5
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\expenses-feb.xlsx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\headcount-plan.xlsx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\payroll-summary.xlsx",
          "kind": "host_file",
          "weight": 3
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\Q1-forecast.xlsx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\supplier-review.docx",
          "kind": "host_file",
          "weight": 4
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Finance\\Audit\\vat-return-2026.xlsx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Shared\\Templates\\audit-notes.docx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Shared\\Templates\\board-pack-march.pptx",
          "kind": "host_file",
          "weight": 3
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Shared\\Templates\\cashflow-model.xlsx",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Shared\\Templates\\expenses-feb.xlsx",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Shared\\Templates\\Q1-forecast.xlsx",
          "kind": "host_file",
          "weight": 3
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "file:D:\\Shared\\Templates\\vat-return-2026.xlsx",
          "kind": "host_file",
          "weight": 3
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "ip:10.0.10.14",
          "kind": "host_ip",
          "weight": 70
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "ip:10.0.5.20",
          "kind": "host_ip",
          "weight": 71
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "ip:203.0.113.142",
          "kind": "host_ip",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "ip:203.0.113.77",
          "kind": "host_ip",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u00007z.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000a.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000cmd.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000dfsrs.exe",
          "kind": "host_process",
          "weight": 71
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000explorer.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000kt.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000lsass.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000MsMpEng.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000ROBOCOPY.EXE",
          "kind": "host_process",
          "weight": 70
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000services.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000svchost.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000taskhostw.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000upd.exe",
          "kind": "host_process",
          "weight": 3
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000vssadmin.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000wevtutil.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "process:SRV-CORP-FS02\u0000wininit.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache",
          "kind": "host_registry",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Shares\\Finance",
          "kind": "host_registry",
          "weight": 70
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "service:DFSR",
          "kind": "host_service",
          "weight": 70
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "service:SyncHostSvc",
          "kind": "host_service",
          "weight": 1
        },
        {
          "source": "host:SRV-CORP-FS02",
          "target": "task:\\Corp\\NightlyShareBackup",
          "kind": "host_task",
          "weight": 70
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "account:EU\\alice",
          "kind": "host_account",
          "weight": 498
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "account:EU\\bob",
          "kind": "host_account",
          "weight": 23
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "account:EU\\svc-backup",
          "kind": "host_account",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "account:NETWORK SERVICE",
          "kind": "host_account",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "account:SYSTEM",
          "kind": "host_account",
          "weight": 417
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:cdn-sync-updates.example",
          "kind": "host_domain",
          "weight": 2
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:dc-corp-01.corp.example",
          "kind": "host_domain",
          "weight": 8
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:dc-eu-01.eu.corp.example",
          "kind": "host_domain",
          "weight": 14
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:intranet.corp.example",
          "kind": "host_domain",
          "weight": 72
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:invoices.billing-portal.example",
          "kind": "host_domain",
          "weight": 2
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:mail.corp.example",
          "kind": "host_domain",
          "weight": 7
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:sharepoint.corp.example",
          "kind": "host_domain",
          "weight": 31
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:srv-corp-fs02.eu.corp.example",
          "kind": "host_domain",
          "weight": 12
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:updates.corp.example",
          "kind": "host_domain",
          "weight": 11
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "domain:wsus.corp.example",
          "kind": "host_domain",
          "weight": 9
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\$Extend\\$RmMetadata\\$TxfLog\\$TxfLog.blf",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe",
          "kind": "host_file",
          "weight": 81
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Tools\\Sysinternals\\procdump.exe",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\AppData\\Local\\Temp\\adq.exe",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\AppData\\Local\\Temp\\inv8841.js",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\AppData\\Local\\Temp\\svcq.exe",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\AppData\\Roaming\\Sync\\updatesvc.exe",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\audit-notes.docx",
          "kind": "host_file",
          "weight": 8
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\board-pack-march.pptx",
          "kind": "host_file",
          "weight": 10
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\cashflow-model.xlsx",
          "kind": "host_file",
          "weight": 6
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\contract-renewal.docx",
          "kind": "host_file",
          "weight": 10
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\expenses-feb.xlsx",
          "kind": "host_file",
          "weight": 9
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\headcount-plan.xlsx",
          "kind": "host_file",
          "weight": 3
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\payroll-summary.xlsx",
          "kind": "host_file",
          "weight": 12
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\Q1-forecast.xlsx",
          "kind": "host_file",
          "weight": 10
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\supplier-review.docx",
          "kind": "host_file",
          "weight": 4
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Documents\\vat-return-2026.xlsx",
          "kind": "host_file",
          "weight": 10
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Users\\alice\\Downloads\\Invoice_Q1_2026.xlsm",
          "kind": "host_file",
          "weight": 2
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "file:C:\\Windows\\Temp\\ls.dmp",
          "kind": "host_file",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "ip:10.0.5.20",
          "kind": "host_ip",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "ip:10.0.5.9",
          "kind": "host_ip",
          "weight": 82
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "ip:198.51.100.24",
          "kind": "host_ip",
          "weight": 3
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000adq.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000CALC.EXE",
          "kind": "host_process",
          "weight": 11
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000cmd.exe",
          "kind": "host_process",
          "weight": 2
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000EXCEL.EXE",
          "kind": "host_process",
          "weight": 13
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000explorer.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000lsass.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "kind": "host_process",
          "weight": 94
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000MsMpEng.exe",
          "kind": "host_process",
          "weight": 83
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000net.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000nltest.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000NOTEPAD.EXE",
          "kind": "host_process",
          "weight": 8
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000OUTLOOK.EXE",
          "kind": "host_process",
          "weight": 7
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000powershell.exe",
          "kind": "host_process",
          "weight": 3
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000rundll32.exe",
          "kind": "host_process",
          "weight": 3
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000services.exe",
          "kind": "host_process",
          "weight": 83
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000SNIPPINGTOOL.EXE",
          "kind": "host_process",
          "weight": 13
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000svchost.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000taskhostw.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000TEAMS.EXE",
          "kind": "host_process",
          "weight": 9
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000updatesvc.exe",
          "kind": "host_process",
          "weight": 4
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000whoami.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000wininit.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000winlogon.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000WINWORD.EXE",
          "kind": "host_process",
          "weight": 10
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "process:WKS-CORP-01\u0000wscript.exe",
          "kind": "host_process",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache",
          "kind": "host_registry",
          "weight": 83
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "registry:HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\Disk&Ven_Corp&Prod_SecureKey&Rev_1.0",
          "kind": "host_registry",
          "weight": 81
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "registry:HKU\\S-1-5-21-2109-1147-3301-1104\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
          "kind": "host_registry",
          "weight": 1
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "service:wuauserv",
          "kind": "host_service",
          "weight": 82
        },
        {
          "source": "host:WKS-CORP-01",
          "target": "task:\\Microsoft\\Windows\\UpdateOrchestrator\\Schedule Scan",
          "kind": "host_task",
          "weight": 82
        },
        {
          "source": "process:DC-CORP-01\u0000services.exe",
          "target": "service:NTDS",
          "kind": "process_service",
          "weight": 70
        },
        {
          "source": "process:SRV-CORP-FS02\u0000dfsrs.exe",
          "target": "service:DFSR",
          "kind": "process_service",
          "weight": 70
        },
        {
          "source": "process:SRV-CORP-FS02\u0000upd.exe",
          "target": "domain:files-transfer-node.example",
          "kind": "process_domain",
          "weight": 1
        },
        {
          "source": "process:SRV-CORP-FS02\u0000upd.exe",
          "target": "domain:sync-relay.example",
          "kind": "process_domain",
          "weight": 1
        },
        {
          "source": "process:SRV-CORP-FS02\u0000upd.exe",
          "target": "ip:203.0.113.142",
          "kind": "process_ip",
          "weight": 1
        },
        {
          "source": "process:SRV-CORP-FS02\u0000upd.exe",
          "target": "ip:203.0.113.77",
          "kind": "process_ip",
          "weight": 1
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "domain:dc-corp-01.corp.example",
          "kind": "process_domain",
          "weight": 8
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "domain:dc-eu-01.eu.corp.example",
          "kind": "process_domain",
          "weight": 14
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "domain:intranet.corp.example",
          "kind": "process_domain",
          "weight": 8
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "domain:mail.corp.example",
          "kind": "process_domain",
          "weight": 7
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "domain:sharepoint.corp.example",
          "kind": "process_domain",
          "weight": 13
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "domain:srv-corp-fs02.eu.corp.example",
          "kind": "process_domain",
          "weight": 12
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "domain:updates.corp.example",
          "kind": "process_domain",
          "weight": 11
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "domain:wsus.corp.example",
          "kind": "process_domain",
          "weight": 9
        },
        {
          "source": "process:WKS-CORP-01\u0000MSEDGE.EXE",
          "target": "ip:10.0.5.9",
          "kind": "process_ip",
          "weight": 82
        },
        {
          "source": "process:WKS-CORP-01\u0000powershell.exe",
          "target": "domain:cdn-sync-updates.example",
          "kind": "process_domain",
          "weight": 1
        },
        {
          "source": "process:WKS-CORP-01\u0000powershell.exe",
          "target": "ip:198.51.100.24",
          "kind": "process_ip",
          "weight": 1
        },
        {
          "source": "process:WKS-CORP-01\u0000services.exe",
          "target": "service:wuauserv",
          "kind": "process_service",
          "weight": 82
        },
        {
          "source": "process:WKS-CORP-01\u0000updatesvc.exe",
          "target": "domain:cdn-sync-updates.example",
          "kind": "process_domain",
          "weight": 1
        },
        {
          "source": "process:WKS-CORP-01\u0000updatesvc.exe",
          "target": "ip:10.0.5.20",
          "kind": "process_ip",
          "weight": 1
        },
        {
          "source": "process:WKS-CORP-01\u0000updatesvc.exe",
          "target": "ip:198.51.100.24",
          "kind": "process_ip",
          "weight": 1
        }
      ]
    }
  },
  "verdict": {
    "assessment": "confirmed_compromised",
    "confidence": "high",
    "confidence_rationale": "High rather than moderate because the decisive steps are each corroborated by two independent hosts or two independent artefact classes: the pivot by the workstation's network artefacts and the file server's own logon record, the cross-domain escalation by process evidence on the file server and Kerberos plus directory records on the forest-root controller, and the exfiltration by a byte-exact match between the staged archive and the outbound transfer. All 2,387 rows were analysed with no sampling, so no conclusion rests on a subset. It would be lowered if the corroborating host records turned out to be within the window the attacker cleared; it cannot usefully be raised without DC-EU-01 and a memory image.",
    "rationale": "A macro-enabled phishing attachment led to a first-stage implant with two autostart mechanisms and two encrypted C2 channels, credential theft from LSASS and kerberoasting of a backup service account, lateral movement to a file server as that account, SID-history abuse of the intra-forest trust to reach the forest root, DCSync, creation of an attacker-controlled Enterprise Admin, and a 3.4 GB exfiltration of the finance share followed by deliberate destruction of audit logs and shadow copies on all three collected hosts.",
    "earliest_suspicious_activity_utc": "2026-03-07T01:54:47.6630000Z",
    "attack_stage": "exfiltration complete, followed by anti-forensics; forest-root privilege retained"
  },
  "executive_summary": {
    "text": "Northwind Components was compromised. Between 9 and 14 March 2026 an attacker moved from a single phishing email opened by one Finance user to complete control of the corp.example Active Directory forest, and removed 3.6 GB of Q1 2026 finance data from the estate. This is a confirmed compromise, not a suspicion: the decisive steps are each recorded independently on two different hosts, and the volume of data that left matches the archive that was built for it byte for byte.\n\nThe sequence was ordinary in technique and efficient in execution. A macro-enabled invoice was downloaded from a domain nobody in the estate had ever contacted and opened in Excel; within two minutes it had installed a small program that called out to the attacker every sixty seconds. Overnight the attacker looked around, discovered that the company runs two linked Windows domains rather than one, stole the credentials cached on that workstation, and used a backup service account to reach a file server. From there the link between the two domains was abused to obtain the highest level of privilege in the company, and the attacker created their own administrator account to keep it.\n\nWhat is known with confidence: how the attacker got in, every host they reached, the accounts they used, the administrator account they created, and that 3,612,479,488 bytes of finance data were transferred to an external address. What is not known: whether other employees received the same email, whether any other host was touched, and exactly which files were inside the archive. The attacker deleted three audit logs and all system restore points on their way out, which is itself evidence of intent — and bounds what this collection can show for one host and one time window. Those limits are listed explicitly in the Analytic gaps section rather than being smoothed over.\n\nThree hosts were collected and 2,387 timeline events analysed in full, with no sampling. 49 of those events carried a detection from the client's rule packs; 14 findings are raised here and 5 detections are explicitly dismissed as benign with reasoning, because a report that treats every alert as real is not usable for decision-making. The child-domain controller was deliberately not collected, which is normal for a triage but is the single biggest thing that would sharpen this picture.\n\nThe immediate priority is not host cleanup. Because an attacker-created account holds forest-wide privilege, rebuilding the two known-compromised machines would leave the intruder in place. Directory recovery, credential rotation including the Kerberos signing keys, and egress blocking come first; the two compromised hosts should be isolated but left running so memory can be captured. Regulatory assessment for the finance data should start now rather than at the end of the investigation.",
    "bullets": [
      "Confirmed compromise of the corp.example forest, from phishing to Enterprise Admins in under four days.",
      "3.6 GB of Q1 2026 finance data exfiltrated to an external host; the transferred byte count matches the staged archive exactly.",
      "An attacker-created account, CORP\\svc-support, holds forest-wide privilege and must be disabled before any host cleanup.",
      "The link between the two Windows domains is what turned a workstation compromise into a forest compromise.",
      "Credentials cached on the compromised workstation, and the directory itself, must be assumed known to the attacker.",
      "Three audit logs and all shadow copies were destroyed; filesystem and journal artefacts are what preserved the story.",
      "5 low-fidelity detections were reviewed and dismissed with reasoning, including a legitimate IT credential-dumping tool.",
      "The child-domain controller was not collected; acquiring it is the highest-value next step."
    ]
  },
  "findings": [
    {
      "id": "F-002",
      "title": "Office macro chain staged and executed a first-stage implant from %APPDATA%",
      "severity": "critical",
      "confidence": "high",
      "category": "execution",
      "narrative": "The workbook's macro produced a four-link execution chain that is fully present in the acquisition: EXCEL.EXE spawned wscript.exe against a dropped JScript file, wscript launched base64-encoded PowerShell with a hidden window and the execution policy bypassed, and PowerShell wrote and ran updatesvc.exe in %APPDATA%\\Sync. Every link is corroborated twice — by the process-creation events and independently by Prefetch and MFT records, which the attacker never cleared. Three separate engines (Sigma, YARA and Hayabusa) flagged different stages of the same chain, so the conclusion does not rest on a single rule.",
      "evidence": [
        {
          "row_hash": "de402144e2e4483f9c362c288c902d84ae7e326f3c0d69af6094e10f26907539",
          "timestamp_utc": "2026-03-09T09:14:02.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Office application spawned a script interpreter: EXCEL.EXE -> wscript.exe",
          "why_relevant": "EXCEL.EXE to wscript.exe — the transition from document to code."
        },
        {
          "row_hash": "a90de20f3af3b96b4a4c21e3253756271263130fec5733efa19839b4557ff9a0",
          "timestamp_utc": "2026-03-09T09:14:09.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "File created by EXCEL.EXE: inv8841.js (JScript dropper)",
          "why_relevant": "The dropper on disk, written by Excel itself and matched by YARA."
        },
        {
          "row_hash": "645f677d4b826a9d64672424995db4f1b32b53304fc81639e9fa0dde5eaea068",
          "timestamp_utc": "2026-03-09T09:14:31.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Encoded PowerShell launched by the script interpreter (hidden window, execution policy bypassed)",
          "why_relevant": "Hidden window, bypassed execution policy and base64 encoding: three evasion choices in one command line."
        },
        {
          "row_hash": "b4c5e6c4d0b80684dc62aa48bdfcfd77cb67402024d5816cc5cee3e55ff72f7c",
          "timestamp_utc": "2026-03-09T09:15:44.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Unsigned executable written to a user-writable directory: updatesvc.exe",
          "why_relevant": "The first-stage implant, unsigned, in a directory no installer writes to."
        },
        {
          "row_hash": "ef57d88d8e8a71f4409b87efdb9292eb9a6b70c058d319e68a8ad4a81f381fda",
          "timestamp_utc": "2026-03-09T09:16:03.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Implant executed from AppData: updatesvc.exe (parent powershell.exe)",
          "why_relevant": "Execution of the implant with powershell.exe as parent, closing the chain."
        },
        {
          "row_hash": "733742f9cdb0229651c72e17d4adb964dde5def02cf3ddd40ae89d67207331a4",
          "timestamp_utc": "2026-03-09T09:16:05.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Prefetch records first execution of UPDATESVC.EXE",
          "why_relevant": "Prefetch corroborates the first execution independently of the event log."
        }
      ],
      "mitre_techniques": [
        "T1027",
        "T1059.001",
        "T1059.007",
        "T1071.001",
        "T1105",
        "T1204.002",
        "T1566.001"
      ],
      "affected_hosts": [
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice"
      ],
      "first_seen_utc": "2026-03-09T09:14:02.0000000Z",
      "last_seen_utc": "2026-03-09T09:16:05.0000000Z",
      "recommendation": "Treat WKS-CORP-01 as fully compromised from 09:14 UTC on 9 March. Isolate it rather than reimage it until memory and the %APPDATA%\\Sync directory have been acquired, then rebuild; the implant hash is a fleet-wide hunt indicator.",
      "detection_rules": [
        {
          "engine": "hayabusa",
          "rule_id": "demo-haya-0001",
          "rule_name": "Proc Exec: Office Child Script Host",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0003",
          "rule_name": "Office Application Spawned Script Interpreter",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0004",
          "rule_name": "Encoded PowerShell Command Line With Hidden Window",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0006",
          "rule_name": "Execution From User AppData Roaming Directory",
          "severity": "high"
        },
        {
          "engine": "yara",
          "rule_id": "demo-yara-0001",
          "rule_name": "IRTriage_Demo_JScript_Dropper",
          "severity": "high"
        },
        {
          "engine": "yara",
          "rule_id": "demo-yara-0002",
          "rule_name": "IRTriage_Demo_Implant_Loader",
          "severity": "high"
        }
      ],
      "false_positive_considered": "Legitimate finance automation on this host does use Office macros, and wscript.exe is present in the IT baseline. The benign explanation is excluded by three properties no in-house macro exhibits together: an encoded and hidden PowerShell invocation, an unsigned executable written to a per-user roaming directory, and that binary immediately beaconing outbound (F-003)."
    },
    {
      "id": "F-006",
      "title": "LSASS process memory dumped with a signed Microsoft library",
      "severity": "critical",
      "confidence": "high",
      "category": "credential_access",
      "narrative": "At 02:31 UTC the implant invoked the comsvcs.dll MiniDump export through rundll32 against LSASS (pid 772), producing a 56 MB dump in C:\\Windows\\Temp. Three independent artefacts agree: the process-creation record carrying the full command line, the MFT entry for the dump file, and a Sysmon process-access event showing PROCESS_VM_READ granted on lsass.exe from rundll32.exe. YARA matched the dump itself on minidump and lsasrv strings, so the file's contents — not just its name — are confirmed. Every credential cached on this host at that moment must be treated as known to the attacker, including the service account that is used to pivot the following night (F-008).",
      "evidence": [
        {
          "row_hash": "cc51804132c712d5c73901b6c1918a1c29e743847cd01f52787785062621f4f3",
          "timestamp_utc": "2026-03-10T02:31:19.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "LSASS minidump via rundll32 comsvcs.dll MiniDump (pid 772 -> C:\\Windows\\Temp\\ls.dmp)",
          "why_relevant": "The dump command line, using a signed Microsoft DLL as the dumping mechanism."
        },
        {
          "row_hash": "c9fe88278696e76e149f8a8d1269ccdca3286ad8356eace642fd42c6b4ba78b7",
          "timestamp_utc": "2026-03-10T02:31:20.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Process access to lsass.exe granted PROCESS_VM_READ|PROCESS_QUERY_INFORMATION from rundll32.exe",
          "why_relevant": "Sysmon's independent record of the handle, so the finding does not rest on a command line alone."
        },
        {
          "row_hash": "f8d43e4300fee31c4e83ff9e05618c9af57cda010120134f46222a83461d8d0b",
          "timestamp_utc": "2026-03-10T02:31:24.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Process minidump written: ls.dmp (56 MB, LSASS signature present)",
          "why_relevant": "The 56 MB artefact on disk, matched by YARA on minidump and lsasrv strings."
        }
      ],
      "mitre_techniques": [
        "T1003.001"
      ],
      "affected_hosts": [
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice",
        "SYSTEM"
      ],
      "first_seen_utc": "2026-03-10T02:31:19.0000000Z",
      "last_seen_utc": "2026-03-10T02:31:24.0000000Z",
      "recommendation": "Force a password reset for every account with a session on WKS-CORP-01 before 10 March 02:31 UTC, reset the krbtgt password twice with the recommended interval once the attacker is evicted, and enable LSASS protection (RunAsPPL) and Credential Guard fleet-wide.",
      "detection_rules": [
        {
          "engine": "hayabusa",
          "rule_id": "demo-haya-0002",
          "rule_name": "Cred Dump: comsvcs MiniDump",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0014",
          "rule_name": "LSASS Memory Dump via comsvcs.dll MiniDump",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0015",
          "rule_name": "Suspicious Process Access To LSASS",
          "severity": "high"
        },
        {
          "engine": "yara",
          "rule_id": "demo-yara-0004",
          "rule_name": "IRTriage_Demo_LSASS_Minidump",
          "severity": "critical"
        }
      ],
      "false_positive_considered": "Support staff on this estate legitimately dump process memory for crash analysis, and the dataset contains a signed Sysinternals ProcDump on this very host (dismissed separately). That explanation cannot apply here: the dumper is rundll32 driven by an unsigned implant rather than a signed tool run from a console, the target is specifically LSASS, it happened at 02:31, and the dump was deleted 46 hours later during a log-clearing sweep (F-012)."
    },
    {
      "id": "F-009",
      "title": "Cross-domain escalation to the forest root via SID-history injection and DCSync",
      "severity": "critical",
      "confidence": "high",
      "category": "privilege_escalation",
      "narrative": "This is the finding that turns a two-host incident into a forest-wide one. From the file server the attacker staged kt.exe and ran it with a SID-history argument naming the forest-root Enterprise Admins RID; DC-CORP-01 then accepted a cross-realm ticket carrying that privileged ExtraSid, and directory replication rights (DS-Replication-Get-Changes-All) were exercised from 10.0.5.20 — a file server, which has no legitimate reason to replicate the directory. Two engines independently flagged the DCSync. The ticket being accepted rather than rejected is what makes this a confirmed escalation instead of an attempt, and the intra-forest trust that made it possible is the one the attacker enumerated in F-005.",
      "evidence": [
        {
          "row_hash": "877919bb4ec3ea76727b72083eeff3d9d55b40651bd65f9787cea58bca166919",
          "timestamp_utc": "2026-03-12T01:32:14.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Ticket-manipulation tool staged on the file server: kt.exe",
          "why_relevant": "Tooling for the trust-crossing step, staged 20 minutes before it was used."
        },
        {
          "row_hash": "872d570a51d5eb4881248863e0d28b2d130c9c3dffe52e0ba82380b526d62bf5",
          "timestamp_utc": "2026-03-12T01:36:02.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "kt.exe executed with a cross-realm SID-history argument referencing the forest-root Enterprise Admins SID",
          "why_relevant": "The argument names the forest-root Enterprise Admins RID — this is the escalation itself."
        },
        {
          "row_hash": "35f5e9f8c523eed19d7f4550ebe3e1793dcd8484c05995693d110df5699f70b8",
          "timestamp_utc": "2026-03-12T01:40:22.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "Cross-realm ticket presented to corp.example carrying ExtraSids for the root-domain Enterprise Admins group",
          "why_relevant": "The forest-root DC accepted the ticket, so the attack succeeded rather than merely being attempted."
        },
        {
          "row_hash": "8c2c8aca2f65face882bbb7f82f43e765aaef544054781e13691b7a35641e5ef",
          "timestamp_utc": "2026-03-12T01:43:51.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "Directory replication rights exercised by a non-DC principal from 10.0.5.20 (DS-Replication-Get-Changes-All)",
          "why_relevant": "DCSync from a file server address: the directory, including credential material, is assumed read."
        }
      ],
      "mitre_techniques": [
        "T1003.006",
        "T1134.005",
        "T1558.001"
      ],
      "affected_hosts": [
        "DC-CORP-01",
        "SRV-CORP-FS02"
      ],
      "affected_accounts": [
        "EU\\svc-backup",
        "SYSTEM"
      ],
      "first_seen_utc": "2026-03-12T01:32:14.0000000Z",
      "last_seen_utc": "2026-03-12T01:43:51.0000000Z",
      "recommendation": "Treat the entire corp.example forest as compromised: reset krbtgt in both domains twice, rotate all privileged credentials, and enable SID filtering on the intra-forest trust so a child-domain principal cannot present root-domain SIDs. Plan a staged AD recovery rather than a per-host cleanup.",
      "detection_rules": [
        {
          "engine": "hayabusa",
          "rule_id": "demo-haya-0003",
          "rule_name": "Cred Access: DCSync Replication Right",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0023",
          "rule_name": "SID History Injection Targeting A Parent Domain",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0024",
          "rule_name": "Cross-Realm Ticket With Privileged ExtraSids",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0025",
          "rule_name": "DCSync: Replication Rights Used By A Non-Domain-Controller Account",
          "severity": "critical"
        },
        {
          "engine": "yara",
          "rule_id": "demo-yara-0007",
          "rule_name": "IRTriage_Demo_Ticket_Forging_Tool",
          "severity": "critical"
        }
      ],
      "false_positive_considered": "Directory replication is normal between domain controllers, and this environment genuinely replicates between DC-CORP-01 and DC-EU-01. The dismissal fails on the principal and the source address: the replication right was exercised by a non-DC account from 10.0.5.20, which is the file server compromised in F-008, minutes after a ticket-manipulation tool ran on that same host."
    },
    {
      "id": "F-010",
      "title": "Attacker-created forest-root account CORP\\svc-support added to Enterprise Admins and used",
      "severity": "critical",
      "confidence": "high",
      "category": "persistence",
      "narrative": "Having crossed the trust, the attacker established persistence that does not depend on any stolen ticket lifetime: a new account, CORP\\svc-support, created directly in the forest-root domain and added to Enterprise Admins eight seconds later. Eight minutes after creation that account logged on interactively to DC-CORP-01 over RDP, and later it is the principal that clears the domain controller's audit log (F-012). An attacker-created Enterprise Admin is the highest-impact artefact in this report: it survives password resets of every pre-existing account and every host rebuild.",
      "evidence": [
        {
          "row_hash": "1d7b2d692a8e5f9f8ad706bb8fee5bb22f0dcd706e0c9daccffe84663f4f94fa",
          "timestamp_utc": "2026-03-12T01:44:03.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "User account created in the FOREST ROOT domain: CORP\\svc-support",
          "why_relevant": "A durable foothold in the root domain, independent of any stolen ticket lifetime."
        },
        {
          "row_hash": "c410debb43e0d8122afe85117b37b4cc64384b06713ed83a58ce4f0e32afb739",
          "timestamp_utc": "2026-03-12T01:44:11.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "CORP\\svc-support added to Enterprise Admins (forest-wide privilege)",
          "why_relevant": "Forest-wide privilege, granted eight seconds after the account existed."
        },
        {
          "row_hash": "d7c89fa9f7138736392a44c716208543588537f1541844e53589fed1560e53b5",
          "timestamp_utc": "2026-03-12T01:52:40.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "Interactive remote logon (type 10) to the forest-root DC by the newly created account",
          "why_relevant": "The account was used, not merely created — RDP to the domain controller eight minutes later."
        }
      ],
      "mitre_techniques": [
        "T1021.001",
        "T1078.002",
        "T1098",
        "T1136.002"
      ],
      "affected_hosts": [
        "DC-CORP-01"
      ],
      "affected_accounts": [
        "CORP\\svc-support",
        "EU\\svc-backup"
      ],
      "first_seen_utc": "2026-03-12T01:44:03.0000000Z",
      "last_seen_utc": "2026-03-12T01:52:40.0000000Z",
      "recommendation": "Disable — do not delete — CORP\\svc-support so its history is preserved, then audit every privileged group in both domains for members created or added in the last 30 days, and review AdminSDHolder and delegated permissions for further durable footholds.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0026",
          "rule_name": "Account Created In The Forest Root By A Child-Domain Principal",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0027",
          "rule_name": "Member Added To Enterprise Admins",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0028",
          "rule_name": "RDP Logon By An Account Created Minutes Earlier",
          "severity": "high"
        }
      ],
      "false_positive_considered": "Service accounts are created by administrators routinely, and the name follows the estate's own \"svc-\" convention, which is deliberate. It cannot be benign here because the creating principal reached the root domain through a forged cross-realm ticket (F-009), the Enterprise Admins addition follows creation by eight seconds with no change record, and no ticket or approval references it."
    },
    {
      "id": "F-011",
      "title": "Finance share archived and 3.4 GB exfiltrated to files-transfer-node.example",
      "severity": "critical",
      "confidence": "high",
      "category": "exfiltration",
      "narrative": "On the night of 13 March a renamed archive utility packaged D:\\Finance\\2026Q1 into an encrypted-header archive in C:\\Windows\\Temp — a path no backup job on this server uses. Over the following 47 minutes exactly 3,612,479,488 bytes left the host for files-transfer-node.example on TCP 8443, byte-for-byte the size of the archive, and the archive was then deleted. That byte-level agreement is what makes this a confirmed exfiltration rather than a suspected one: the volume transferred cannot be explained by anything else on the host at that hour. Two engines flagged the egress independently. The USN journal retained the deletion record, which is why the archive's size and name are still provable after the file itself was removed.",
      "evidence": [
        {
          "row_hash": "a1338591f744fca34d223ebede50a17358be8e631173c82fd0264a4db21fe425",
          "timestamp_utc": "2026-03-13T22:40:18.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Renamed archiver executed against the finance share with an encrypted-header password",
          "why_relevant": "Collection: a renamed archive utility with an encrypted-header password."
        },
        {
          "row_hash": "c90d32691767c1402e7bd3fe617c26a5cbd842fa1d0f64bbe0a10352f0033b5e",
          "timestamp_utc": "2026-03-13T22:58:02.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Staging archive written: fin-2026Q1.7z (3.4 GB) in C:\\Windows\\Temp",
          "why_relevant": "3.4 GB staged in a system temp directory that no backup job on this host uses."
        },
        {
          "row_hash": "3552e2b79a2625d6dea56c489ede0edf1c89356063dd9e80075654edd9845d6e",
          "timestamp_utc": "2026-03-13T23:05:44.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Sustained 3.4 GB outbound transfer to files-transfer-node.example over 47 minutes",
          "why_relevant": "The egress itself: the byte count matches the archive exactly, which is what makes this confirmed rather than suspected."
        },
        {
          "row_hash": "daace936b2606b7985f3fdd86570e713a52fbc0954afbd2b6b38b59fd5fd8211",
          "timestamp_utc": "2026-03-13T23:56:12.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Staging archive deleted after transfer completed (USN FILE_DELETE)",
          "why_relevant": "The USN journal retained the deletion, so the archive remains provable after removal."
        }
      ],
      "mitre_techniques": [
        "T1041",
        "T1070.004",
        "T1074.001",
        "T1560.001"
      ],
      "affected_hosts": [
        "SRV-CORP-FS02"
      ],
      "affected_accounts": [
        "SYSTEM"
      ],
      "first_seen_utc": "2026-03-13T22:40:18.0000000Z",
      "last_seen_utc": "2026-03-13T23:56:12.0000000Z",
      "recommendation": "Treat the Q1 2026 finance dataset as disclosed and start regulatory and contractual notification assessment now. Reconstruct the file list from the share's own inventory for that path, and preserve the USN journal before it wraps.",
      "detection_rules": [
        {
          "engine": "hayabusa",
          "rule_id": "demo-haya-0004",
          "rule_name": "Exfil: Large Egress From Server",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0029",
          "rule_name": "Archive Created With Encrypted Headers By A Service Process",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0030",
          "rule_name": "Large Archive Staged In A System Temp Directory",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0031",
          "rule_name": "Large Outbound Transfer To A Newly Observed External Host",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0032",
          "rule_name": "Staged Archive Deleted Immediately After A Large Egress",
          "severity": "high"
        }
      ],
      "false_positive_considered": "This server does run scheduled archive jobs — the dataset even contains a benign 7-Zip run by IT, which is dismissed separately. The benign reading is excluded by four properties together: the archiver was renamed, the staging path is C:\\Windows\\Temp rather than the backup volume, the destination is external rather than the backup server, and the archive was deleted immediately after the transfer instead of being retained."
    },
    {
      "id": "F-001",
      "title": "Macro-enabled finance lure delivered by mail and opened on WKS-CORP-01",
      "severity": "high",
      "confidence": "high",
      "category": "initial_access",
      "narrative": "The intrusion begins with a conventional, well-executed finance lure. An external message with the subject \"Outstanding invoice Q1 2026\" reached EU\\alice in Finance with an SPF softfail; eight minutes later Edge recorded a completed download of Invoice_Q1_2026.xlsm from invoices.billing-portal.example, a domain with no prior observation anywhere in this environment. The file landed in the user's Downloads folder carrying a Mark-of-the-Web zone-3 marker, and EXCEL.EXE opened it 71 seconds later. Nothing about the delivery is novel; what matters is that it succeeded end to end with no control interrupting it, and that the timing is tight enough to attribute the whole chain to one user action.",
      "evidence": [
        {
          "row_hash": "16948020a627b7b9c467b0f57a7f05a7179cdd6c00fc1925db2fc9150ef5eeb8",
          "timestamp_utc": "2026-03-09T09:04:12.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Inbound mail delivered with external link: \"Outstanding invoice Q1 2026\"",
          "why_relevant": "The delivery vector, with the SPF softfail that should have raised the message's risk score."
        },
        {
          "row_hash": "52de27b38dcdf875cb0e8c1b1a0274b0d619152a3cdaa087f3b8b0f196cd932e",
          "timestamp_utc": "2026-03-09T09:12:44.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Edge download completed: Invoice_Q1_2026.xlsm from an external host first seen today",
          "why_relevant": "Ties the workbook to a domain first observed in this environment on the day of the incident."
        },
        {
          "row_hash": "9cb2081b95af2908bafaf4d5de40d32f2cf60b4b79661adb7025d973958c3711",
          "timestamp_utc": "2026-03-09T09:12:47.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "File created: Invoice_Q1_2026.xlsm (Mark-of-the-Web zone 3)",
          "why_relevant": "Zone-3 provenance on disk: Office knew the file came from the internet and opened it anyway."
        },
        {
          "row_hash": "18228214edd3328111d38af0435710ea7f3362e56aab90dce2012ed820957ee6",
          "timestamp_utc": "2026-03-09T09:13:58.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Process created: EXCEL.EXE opened Invoice_Q1_2026.xlsm",
          "why_relevant": "User execution — the instant the attacker obtained code execution on the host."
        }
      ],
      "mitre_techniques": [
        "T1204.002",
        "T1566.002"
      ],
      "affected_hosts": [
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice"
      ],
      "first_seen_utc": "2026-03-09T09:04:12.0000000Z",
      "last_seen_utc": "2026-03-09T09:13:58.0000000Z",
      "recommendation": "Preserve and pull the original message from the mail platform, block the sender and the download domain, and hunt the attachment SHA-256 across every mailbox and endpoint — one recipient opening it means others received it.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0001",
          "rule_name": "External Mail With Financial Lure Subject And SPF Softfail",
          "severity": "low"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0002",
          "rule_name": "Macro-Enabled Office Download From Newly Observed Domain",
          "severity": "medium"
        }
      ],
      "false_positive_considered": "Finance genuinely receives supplier invoices as Office attachments, so the lure's subject and file type are not themselves suspicious. This is ruled out by what followed rather than by the mail: the workbook spawned a script interpreter within four seconds of opening (F-002), which no supplier invoice does. Had the process chain been absent this would have been left as a low-severity delivery observation."
    },
    {
      "id": "F-003",
      "title": "Two independent encrypted command-and-control channels, one per compromised host",
      "severity": "high",
      "confidence": "high",
      "category": "command_and_control",
      "narrative": "The attacker ran two separate C2 channels rather than one. PowerShell made first contact with cdn-sync-updates.example before the implant existed, the implant then settled into 60-second sessions with roughly three seconds of jitter — a beacon interval, not human browsing — and after the pivot the file server opened a second, distinct channel to sync-relay.example on TCP 8443. Both channels are TLS and both terminate on RFC 5737 documentation addresses. The redundancy is the operationally significant part: blocking one domain would not have removed the attacker's access.",
      "evidence": [
        {
          "row_hash": "6b1bfea712f8f2dec5d05b160d74da4465207655f7368ef072d12217692632d8",
          "timestamp_utc": "2026-03-09T09:15:12.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "powershell.exe opened an HTTPS session to cdn-sync-updates.example (first observation in this environment)",
          "why_relevant": "First contact with stage-one C2, made by PowerShell before the implant was on disk."
        },
        {
          "row_hash": "05ca445242f666728fdf7cfabf10846fd614b6de9144cb6baeceaa9c740b4ea6",
          "timestamp_utc": "2026-03-09T09:18:22.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Regular-interval outbound sessions from updatesvc.exe to 198.51.100.24 (60 s +/- 3 s jitter)",
          "why_relevant": "60 s ± 3 s jitter over a long period is a beacon signature, not user-driven traffic."
        },
        {
          "row_hash": "c87b4138df7c463f18066867592c00c92fc9e27b13cd7bb691316579210e6494",
          "timestamp_utc": "2026-03-11T03:14:51.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Second-stage C2 session from upd.exe to sync-relay.example",
          "why_relevant": "A second, independent channel from the file server — losing one would not have evicted the attacker."
        }
      ],
      "mitre_techniques": [
        "T1071.001",
        "T1105",
        "T1573.001"
      ],
      "affected_hosts": [
        "SRV-CORP-FS02",
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice",
        "SYSTEM"
      ],
      "first_seen_utc": "2026-03-09T09:15:12.0000000Z",
      "last_seen_utc": "2026-03-11T03:14:51.0000000Z",
      "recommendation": "Block and sinkhole all four attacker domains and the four external addresses at the egress point, then search proxy and firewall history for any other internal host that resolved or reached them.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0005",
          "rule_name": "PowerShell Network Connection To Newly Observed Domain",
          "severity": "medium"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0007",
          "rule_name": "Regular-Interval Beaconing From User-Writable Path",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0022",
          "rule_name": "Server Beaconing To An External Host On A Non-Standard TLS Port",
          "severity": "high"
        }
      ],
      "false_positive_considered": "Update services do beacon on fixed intervals from user-writable paths, which is precisely the impression the \"SyncUpdater\"/\"cdn-sync-updates\" naming is designed to create. It is excluded because the binary is unsigned, was written by an Office macro chain minutes earlier (F-002), and no software inventory entry or vendor account claims it."
    },
    {
      "id": "F-004",
      "title": "Two redundant autostart mechanisms installed for the same implant",
      "severity": "high",
      "confidence": "high",
      "category": "persistence",
      "narrative": "Six minutes after the implant first ran, the attacker installed two independent autostart mechanisms that both point at the same %APPDATA% binary: a per-user Run value named SyncUpdater, and a scheduled task placed under \\Microsoft\\Windows\\Sync\\ so that it reads as a Microsoft component in any task listing. Neither required administrative rights. Security event 4698 corroborates the task independently of the registry artefact, which matters because the Security channel on this host survived while the file server's did not (F-012).",
      "evidence": [
        {
          "row_hash": "07eca98642a761db9d28c792696f726e39ac67e5673f756e7675698aa536a24f",
          "timestamp_utc": "2026-03-09T09:22:10.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Run key added: SyncUpdater -> updatesvc.exe in AppData",
          "why_relevant": "Per-user autostart: survives logoff and reboot, and needs no administrative rights."
        },
        {
          "row_hash": "79c501471539152fe57ed5bbd0c54e9902c541547c25f838f87a8dc2136f3b38",
          "timestamp_utc": "2026-03-09T09:22:48.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Scheduled task created with an update-service-impersonating name: SyncUpdateTask",
          "why_relevant": "A second, redundant mechanism, deliberately named to read as a Microsoft update task."
        },
        {
          "row_hash": "736daa8e335b17bf6baccfb0cdfb5d2cedc97a0244992647fc63100d383a34b5",
          "timestamp_utc": "2026-03-09T09:23:02.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "A scheduled task was created: \\Microsoft\\Windows\\Sync\\SyncUpdateTask",
          "why_relevant": "Security event 4698 confirms the task from a different artefact than the registry."
        }
      ],
      "mitre_techniques": [
        "T1053.005",
        "T1547.001"
      ],
      "affected_hosts": [
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice"
      ],
      "first_seen_utc": "2026-03-09T09:22:10.0000000Z",
      "last_seen_utc": "2026-03-09T09:23:02.0000000Z",
      "recommendation": "Remove both mechanisms only after acquisition, and sweep the fleet for the Run value name, the task path and any other task authored by a non-administrative user under a \\Microsoft\\ path.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0008",
          "rule_name": "Run Key Pointing To User AppData Executable",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0009",
          "rule_name": "Scheduled Task Impersonating A Microsoft Update Task",
          "severity": "medium"
        }
      ],
      "false_positive_considered": "Legitimate software does install Run values and tasks under Microsoft-looking paths, and the naming here is chosen to exploit exactly that. The dismissal fails on ownership and provenance: the task author is a Finance user account, the target binary is unsigned and lives in a roaming profile, and the task was created 48 seconds after a credential-free macro chain wrote that binary."
    },
    {
      "id": "F-008",
      "title": "Lateral movement to SRV-CORP-FS02 as EU\\svc-backup, with SYSTEM-level service persistence",
      "severity": "high",
      "confidence": "high",
      "category": "lateral_movement",
      "narrative": "The pivot is visible from both ends, four seconds apart: the workstation implant opened an SMB session to 10.0.5.20 as EU\\svc-backup, and the file server logged the matching type-3 logon from 10.0.5.41 — the first network logon that account has ever made from a workstation. The implant was then copied in as C:\\Windows\\upd.exe with a SHA-256 identical to updatesvc.exe on WKS-CORP-01 (one implant, two hosts, proven by hash rather than by name), registered as the auto-start service SyncHostSvc running as LocalSystem, and observed running as SYSTEM under services.exe. The attacker has gone from a Finance user's token to SYSTEM on a file server in under six minutes.",
      "evidence": [
        {
          "row_hash": "0cc473c18c81651c1b3e4d8940aedca970f07cc26cda17499cdc9915e3fe7e92",
          "timestamp_utc": "2026-03-11T03:10:05.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "SMB session from updatesvc.exe to SRV-CORP-FS02 using the recovered service account",
          "why_relevant": "The outbound half of the pivot, initiated by the implant rather than by a user shell."
        },
        {
          "row_hash": "f91615ca69db13e1f017205ee86ad4f3f59fef17fe59b09d81341627848937b8",
          "timestamp_utc": "2026-03-11T03:10:09.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Network logon (type 3) for EU\\svc-backup from 10.0.5.41 - first ever logon from a workstation",
          "why_relevant": "The file server's own record four seconds later: a service account logging on from a workstation for the first time."
        },
        {
          "row_hash": "253e72b162e4ec8b48405524d58368ad6e8cfd9a921b931105261d920bfa8df6",
          "timestamp_utc": "2026-03-11T03:10:40.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Implant copied to the file server as C:\\Windows\\upd.exe (identical SHA-256 to updatesvc.exe on WKS-CORP-01)",
          "why_relevant": "Identical SHA-256 to the workstation implant — one toolkit across two hosts, proven by hash."
        },
        {
          "row_hash": "e218c6139f5b53d94e81d75b834c8af5dae1c25a48086bf9dd3ece1afaf7e468",
          "timestamp_utc": "2026-03-11T03:11:02.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Service installed remotely: SyncHostSvc -> C:\\Windows\\upd.exe (auto start, LocalSystem)",
          "why_relevant": "Persistence and privilege in one step: auto-start, LocalSystem."
        },
        {
          "row_hash": "422957041d957ec8d086c5fb5a41fb8c880770aac363fa6841d74f9ea8ff526b",
          "timestamp_utc": "2026-03-11T03:11:20.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Implant running as SYSTEM under services.exe: upd.exe",
          "why_relevant": "Confirms the service actually started, so the attacker held SYSTEM on a file server."
        }
      ],
      "mitre_techniques": [
        "T1021.002",
        "T1078.002",
        "T1105",
        "T1543.003",
        "T1569.002",
        "T1570"
      ],
      "affected_hosts": [
        "SRV-CORP-FS02",
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\svc-backup",
        "SYSTEM"
      ],
      "first_seen_utc": "2026-03-11T03:10:05.0000000Z",
      "last_seen_utc": "2026-03-11T03:11:20.0000000Z",
      "recommendation": "Isolate SRV-CORP-FS02, remove the SyncHostSvc service after acquisition, and audit every host that EU\\svc-backup authenticated to in the retained logon history — the same credential may have been used elsewhere without an implant being dropped.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0018",
          "rule_name": "SMB Session From A Beaconing Process Under A Service Account",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0019",
          "rule_name": "Service Account Network Logon From A Workstation",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0020",
          "rule_name": "Service Created Immediately After A Remote Logon",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0021",
          "rule_name": "Unsigned Service Binary Running As SYSTEM From C:\\Windows",
          "severity": "high"
        },
        {
          "engine": "yara",
          "rule_id": "demo-yara-0006",
          "rule_name": "IRTriage_Demo_Implant_Loader",
          "severity": "high"
        }
      ],
      "false_positive_considered": "Backup service accounts do authenticate to file servers over SMB constantly, which is what makes this account a good choice for the attacker. The distinguishing facts are the source and the sequel: the logon originates from a Finance workstation rather than the backup infrastructure, and it is immediately followed by a binary being written into C:\\Windows and registered as a LocalSystem service."
    },
    {
      "id": "F-012",
      "title": "Audit logs cleared on three hosts and all shadow copies destroyed",
      "severity": "high",
      "confidence": "high",
      "category": "anti_forensics",
      "narrative": "Sixteen minutes after the transfer finished, the attacker began destroying evidence: wevtutil cleared the Security channel on the file server (event 1102 is the last record before the gap), all volume shadow copies were deleted, the LSASS dump was removed from the workstation, and the forest-root domain controller's audit log was cleared by the account created in F-010. The clearing is itself strong evidence — it is deliberate, sequenced and spans every host the attacker touched. It also bounds this report: anything that happened on SRV-CORP-FS02 in the Security channel before 00:12 UTC on 14 March is unrecoverable from this acquisition. Filesystem, USN and registry artefacts survived on all three hosts, which is why the story above can still be reconstructed.",
      "evidence": [
        {
          "row_hash": "14b7d10d5fa24b80ce66ed13a3a91cefc80ac82392b7a7ceb31b7948fdb82b30",
          "timestamp_utc": "2026-03-14T00:12:41.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "Event log cleared from the command line: wevtutil.exe cl Security",
          "why_relevant": "The clearing command, still recoverable from execution evidence the attacker did not reach."
        },
        {
          "row_hash": "c0da06181fe22c3c0f25d0d65249f6e29e0afeda261b8641916a7b0e0205c8d2",
          "timestamp_utc": "2026-03-14T00:12:58.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "The audit log was cleared (the last record before the gap)",
          "why_relevant": "Event 1102 marks the boundary of what this acquisition can show on the file server."
        },
        {
          "row_hash": "f4d343d7b3b25932434f5b68deb3da5848fcde373ffcfb572136453b1bf50bc1",
          "timestamp_utc": "2026-03-14T00:18:20.0000000Z",
          "host": "SRV-CORP-FS02",
          "excerpt": "All volume shadow copies deleted: vssadmin.exe delete shadows /all /quiet",
          "why_relevant": "Removes both the rollback path and any shadow-resident copy of the staged archive."
        },
        {
          "row_hash": "18c30d7725aacd8b7f111e995952fbe33b4a4cee9d1fa406abae829abbfa2865",
          "timestamp_utc": "2026-03-14T00:25:05.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "LSASS dump deleted from the workstation: cmd.exe /c del /f /q C:\\Windows\\Temp\\ls.dmp",
          "why_relevant": "Targeted cleanup of the credential-theft artefact from F-006."
        },
        {
          "row_hash": "9451ddf86e7042affcdde03da6f8ce47825612383c6dbe7a46f3db21d8ebcdba",
          "timestamp_utc": "2026-03-14T00:31:12.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "The audit log was cleared on the forest-root domain controller",
          "why_relevant": "The forest-root audit trail, cleared by the account the attacker created in F-010."
        }
      ],
      "mitre_techniques": [
        "T1070.001",
        "T1070.004",
        "T1490"
      ],
      "affected_hosts": [
        "DC-CORP-01",
        "SRV-CORP-FS02",
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "CORP\\svc-support",
        "EU\\alice",
        "SYSTEM"
      ],
      "first_seen_utc": "2026-03-14T00:12:41.0000000Z",
      "last_seen_utc": "2026-03-14T00:31:12.0000000Z",
      "recommendation": "Forward Windows event logs off-host in real time so clearing an on-host channel no longer destroys evidence, alert on event 1102 and on vssadmin delete shadows, and remove shadow-copy deletion rights from service accounts.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0033",
          "rule_name": "Event Log Cleared Via wevtutil",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0034",
          "rule_name": "Security Audit Log Cleared",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0035",
          "rule_name": "Shadow Copy Deletion",
          "severity": "critical"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0036",
          "rule_name": "Indicator Removal: Credential Dump Deleted",
          "severity": "medium"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0037",
          "rule_name": "Security Audit Log Cleared On A Domain Controller",
          "severity": "critical"
        }
      ],
      "false_positive_considered": "Log clearing and shadow-copy pruning are legitimate maintenance actions, and this estate has scheduled maintenance windows. They are excluded by timing and actor: the actions run at 00:12–00:31, minutes after a 3.4 GB exfiltration, they are driven by the implant and by the attacker-created account, and they include deleting a credential dump — which no maintenance task has any reason to do."
    },
    {
      "id": "F-007",
      "title": "Service account EU\\svc-backup kerberoasted for offline cracking",
      "severity": "high",
      "confidence": "moderate",
      "category": "credential_access",
      "narrative": "Thirteen minutes after the LSASS dump, a Kerberos ticket-harvesting utility was staged on the workstation and two service tickets were requested for EU\\svc-backup SPNs — one for MSSQLSvc, one for cifs on the file server — both with RC4 encryption. RC4 is requested precisely because it yields an offline-crackable ticket where AES does not. Confidence is moderate rather than high because the acquisition can prove the tickets were requested but cannot prove the hash was cracked; what raises it above speculation is that the same account authenticates to the same file server the following night (F-008), and that the SPN chosen matches the pivot target exactly.",
      "evidence": [
        {
          "row_hash": "39730224a3ce10fdf8c0b1420a5050a14ed4d29b8855117adea564b83cf4e462",
          "timestamp_utc": "2026-03-10T02:44:08.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Kerberos ticket-harvesting tool staged: svcq.exe",
          "why_relevant": "Roasting tooling on disk, 13 minutes after the credential dump."
        },
        {
          "row_hash": "6803206e2de5995d2695cf6b294d74a137671028232e9b93e6feab7aaa412c8f",
          "timestamp_utc": "2026-03-10T02:48:12.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "Kerberos service ticket requested with RC4 encryption for SPN MSSQLSvc/srv-corp-fs02.eu.corp.example:1433",
          "why_relevant": "RC4 is requested to make the ticket crackable offline; AES would not be."
        },
        {
          "row_hash": "c84ab18c2dee3db4b3cc5c541a41de33627965a00c066e30cb637b03a34e0959",
          "timestamp_utc": "2026-03-10T02:52:31.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "Second RC4 service ticket requested for SPN cifs/srv-corp-fs02.eu.corp.example",
          "why_relevant": "A second SPN for the same account — the attacker specifically wanted file-server access."
        }
      ],
      "mitre_techniques": [
        "T1558.003"
      ],
      "affected_hosts": [
        "DC-CORP-01",
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice"
      ],
      "first_seen_utc": "2026-03-10T02:44:08.0000000Z",
      "last_seen_utc": "2026-03-10T02:52:31.0000000Z",
      "recommendation": "Reset EU\\svc-backup, give it a long random password managed as a gMSA, remove any unnecessary SPN, and disable RC4 for Kerberos across both domains.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0016",
          "rule_name": "Kerberoasting: RC4 Service Ticket Requested For A Service Account",
          "severity": "high"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0017",
          "rule_name": "Repeated RC4 Service Ticket Requests From One Source",
          "severity": "high"
        },
        {
          "engine": "yara",
          "rule_id": "demo-yara-0005",
          "rule_name": "IRTriage_Demo_Kerberos_Roasting_Tool",
          "severity": "high"
        }
      ],
      "false_positive_considered": "Service-ticket requests for a backup account are routine — that account requests tickets legitimately every night in this dataset. The benign reading is weakened, not eliminated, by three things: the requests come from a workstation rather than the backup server, they specify RC4 while the account's normal traffic does not, and a roasting tool appeared on that workstation minutes earlier. This is why the finding is moderate confidence and why F-008 is the finding that should drive containment."
    },
    {
      "id": "F-005",
      "title": "Off-hours host, group and forest-trust enumeration from the compromised workstation",
      "severity": "medium",
      "confidence": "high",
      "category": "discovery",
      "narrative": "The attacker returned at 02:05 UTC — outside any working pattern visible in the rest of this timeline — and spent nine minutes on reconnaissance: whoami /all to establish the token held, net group \"Domain Admins\" to find the privileged population, and nltest /domain_trusts to enumerate trusts. That last command is the pivot point of the whole incident: it is where the attacker learned that eu.corp.example is a child of corp.example, and every step in F-009 follows from it. A staged utility (adq.exe) then performed bulk LDAP reads, which the forest-root domain controller independently recorded as 4,118 directory object reads in 90 seconds sourced from 10.0.5.41.",
      "evidence": [
        {
          "row_hash": "479bbed29448e4cad9b76809435f4273a429be302be6ced81a3a5443cebdc72d",
          "timestamp_utc": "2026-03-10T02:05:11.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Off-hours discovery: whoami.exe /all executed by the implant",
          "why_relevant": "First action of the second session: establish which token the attacker holds."
        },
        {
          "row_hash": "863c9f2fe20723d6b5b6589f3efe3cfe5209436c8ce92c53d9b24263db6bf989",
          "timestamp_utc": "2026-03-10T02:06:40.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Domain group enumeration: net group \"Domain Admins\" /domain",
          "why_relevant": "Targeting the privileged group directly rather than enumerating broadly — an operator, not a worm."
        },
        {
          "row_hash": "2b44d68b26aa56a255023597983fa045b71ac5f8c31bc4d38b785a64fd330cee",
          "timestamp_utc": "2026-03-10T02:08:15.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Forest trust enumeration: nltest /domain_trusts /all_trusts (reveals corp.example <- eu.corp.example)",
          "why_relevant": "The moment the attacker learned the forest had a parent domain; F-009 depends entirely on this."
        },
        {
          "row_hash": "d515440f105918d1fabe0fdda7b165851e958f6795963fe48f1759af42df05c1",
          "timestamp_utc": "2026-03-10T02:12:33.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "AD enumeration utility staged in the user temp directory: adq.exe",
          "why_relevant": "Third-party tooling staged for bulk directory reads."
        },
        {
          "row_hash": "3f65fa34fb1b085a430c38428f2c55497b133331191384b025db5558667ee551",
          "timestamp_utc": "2026-03-10T02:13:02.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "ADQ.EXE executed, writing results to the user temp directory",
          "why_relevant": "Prefetch confirms the enumeration tool actually ran."
        },
        {
          "row_hash": "d3e786ac5e0c789406a11a448e6ecf18090e94083d75673944cf78f8541ba0bb",
          "timestamp_utc": "2026-03-10T02:14:10.0000000Z",
          "host": "DC-CORP-01",
          "excerpt": "Bulk directory-service access from WKS-CORP-01: 4,118 object reads in 90 seconds",
          "why_relevant": "The domain controller's own view of the same activity, which survives even if the workstation is wiped."
        }
      ],
      "mitre_techniques": [
        "T1018",
        "T1033",
        "T1069.002",
        "T1087.002",
        "T1482"
      ],
      "affected_hosts": [
        "DC-CORP-01",
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice"
      ],
      "first_seen_utc": "2026-03-10T02:05:11.0000000Z",
      "last_seen_utc": "2026-03-10T02:14:10.0000000Z",
      "recommendation": "Alert on nltest and bulk LDAP enumeration from workstation-class hosts — this phase is individually low-signal but it is the last cheap opportunity to interrupt the intrusion before credential theft.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0010",
          "rule_name": "System Owner Discovery By Non-Interactive Parent",
          "severity": "low"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0011",
          "rule_name": "Privileged Group Enumeration",
          "severity": "medium"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0012",
          "rule_name": "Domain Trust Discovery",
          "severity": "medium"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0013",
          "rule_name": "Bulk LDAP Directory Enumeration From A Workstation",
          "severity": "medium"
        },
        {
          "engine": "yara",
          "rule_id": "demo-yara-0003",
          "rule_name": "IRTriage_Demo_AD_Enumeration_Tool",
          "severity": "medium"
        }
      ],
      "false_positive_considered": "IT support on this host does run whoami and net group interactively, and EU\\bob's benign activity in this dataset includes similar commands. This set is distinguished by its parentage and hour: the commands are children of the implant rather than of a console, they run at 02:05 under a Finance user's token, and they are immediately followed by staged third-party tooling."
    },
    {
      "id": "F-013",
      "title": "Outbound access to newly observed external domains is permitted without inspection",
      "severity": "low",
      "confidence": "moderate",
      "category": "hygiene",
      "narrative": "This is a control weakness rather than attacker activity, and it is the cheapest thing in this report to fix. The web proxy at 10.0.5.9 permitted a macro-enabled workbook to be downloaded from a domain with no prior observation in this environment, and then permitted the beacon that followed from the same host. Neither request was blocked, throttled or held for inspection. On this timeline, category or first-observation policy at the proxy would have interrupted the intrusion twice before any credential was touched.",
      "evidence": [
        {
          "row_hash": "52de27b38dcdf875cb0e8c1b1a0274b0d619152a3cdaa087f3b8b0f196cd932e",
          "timestamp_utc": "2026-03-09T09:12:44.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Edge download completed: Invoice_Q1_2026.xlsm from an external host first seen today",
          "why_relevant": "The proxy permitted a macro-enabled download from a domain first observed that day."
        },
        {
          "row_hash": "6b1bfea712f8f2dec5d05b160d74da4465207655f7368ef072d12217692632d8",
          "timestamp_utc": "2026-03-09T09:15:12.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "powershell.exe opened an HTTPS session to cdn-sync-updates.example (first observation in this environment)",
          "why_relevant": "And permitted the beacon that followed from the same host minutes later."
        }
      ],
      "mitre_techniques": [
        "T1071.001",
        "T1105",
        "T1204.002",
        "T1566.002"
      ],
      "affected_hosts": [
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice"
      ],
      "first_seen_utc": "2026-03-09T09:12:44.0000000Z",
      "last_seen_utc": "2026-03-09T09:15:12.0000000Z",
      "recommendation": "Block executable and macro-enabled downloads from newly observed domains at the proxy, and alert on a first-observation domain being contacted repeatedly at a fixed interval by the same process.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0002",
          "rule_name": "Macro-Enabled Office Download From Newly Observed Domain",
          "severity": "medium"
        },
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0005",
          "rule_name": "PowerShell Network Connection To Newly Observed Domain",
          "severity": "medium"
        }
      ],
      "false_positive_considered": "A permissive egress policy is a deliberate operational choice in many estates and is not in itself a compromise indicator; raising it as high severity would be misleading. It is recorded as low severity because the evidence shows opportunity cost rather than attacker capability — the same two rows already support F-001 and F-003, which is where the compromise itself is asserted."
    },
    {
      "id": "F-014",
      "title": "Scope note: the child-domain controller DC-EU-01 was not collected",
      "severity": "informational",
      "confidence": "moderate",
      "category": "other",
      "narrative": "Recorded as a finding rather than only as a gap because it bounds every Kerberos conclusion in this report. Three hosts were acquired: the compromised workstation, the compromised file server and the forest-root domain controller. DC-EU-01 (10.0.5.10), the child-domain controller that mediated the authentication in F-007 and F-008, was not collected — a normal and defensible scoping decision for a triage, but one the reader has to know. The forest-root DC's own trust inventory and its replication sessions with DC-EU-01 are the only view of that host this acquisition contains, and they confirm the transitive parent/child trust the escalation in F-009 abused.",
      "evidence": [
        {
          "row_hash": "5925d36c7d4447814dd644ce22319200a911782f45ee02d8ecbfbf6191ab4179",
          "timestamp_utc": "2026-03-07T01:54:47.6630000Z",
          "host": "DC-CORP-01",
          "excerpt": "Inter-site AD replication session with DC-EU-01",
          "why_relevant": "The only view of DC-EU-01 in this acquisition: its replication sessions as seen from the forest root."
        },
        {
          "row_hash": "75433703a1b1ed2c7406c99559c9a4e7398cfcc54350131d55f6810938d83d5b",
          "timestamp_utc": "2026-03-08T00:20:32.6640000Z",
          "host": "DC-CORP-01",
          "excerpt": "Forest trust enumerated: eu.corp.example -> corp.example (parent/child, transitive)",
          "why_relevant": "The collected trust inventory independently confirms the transitive parent/child trust the escalation abused."
        },
        {
          "row_hash": "2b44d68b26aa56a255023597983fa045b71ac5f8c31bc4d38b785a64fd330cee",
          "timestamp_utc": "2026-03-10T02:08:15.0000000Z",
          "host": "WKS-CORP-01",
          "excerpt": "Forest trust enumeration: nltest /domain_trusts /all_trusts (reveals corp.example <- eu.corp.example)",
          "why_relevant": "The attacker read the same topology from the workstation, which is why the uncollected host matters."
        }
      ],
      "mitre_techniques": [
        "T1482"
      ],
      "affected_hosts": [
        "DC-CORP-01",
        "WKS-CORP-01"
      ],
      "affected_accounts": [
        "EU\\alice",
        "SYSTEM"
      ],
      "first_seen_utc": "2026-03-07T01:54:47.6630000Z",
      "last_seen_utc": "2026-03-10T02:08:15.0000000Z",
      "recommendation": "Collect DC-EU-01 with the same profile before closing the engagement; its Security and Kerberos channels are where any additional roasted account or unobserved logon would appear.",
      "detection_rules": [
        {
          "engine": "sigma",
          "rule_id": "demo-sigma-0012",
          "rule_name": "Domain Trust Discovery",
          "severity": "medium"
        }
      ],
      "false_positive_considered": "Not applicable in the usual sense — this finding asserts a limitation, not an activity. The thing to rule out is the opposite error: reading the absence of DC-EU-01 evidence as evidence that nothing happened there. Nothing in this acquisition supports that reading."
    }
  ],
  "attack_narrative": {
    "summary": "A single intrusion, reconstructed across three collected hosts and eight days. It runs from a finance lure opened on one workstation to Enterprise Admins in the forest-root domain and 3.4 GB of finance data leaving the estate, in nine phases over five calendar days. Two properties make the reconstruction hold together despite the attacker clearing three audit logs at the end: the implant is the same SHA-256 on both compromised hosts, and every cross-host step is recorded independently at both ends — the pivot by the workstation's network artefacts and the file server's logon record four seconds later, the cross-domain escalation by the file server's process evidence and the forest-root controller's Kerberos and directory records.",
    "phases": [
      {
        "order": 1,
        "name": "Finance-themed lure downloaded and opened on WKS-CORP-01",
        "start_utc": "2026-03-09T09:04:12.0000000Z",
        "end_utc": "2026-03-09T09:13:58.0000000Z",
        "description": "EU\\alice received external mail with an SPF softfail, downloaded Invoice_Q1_2026.xlsm from invoices.billing-portal.example (first observation of that domain in the environment) and opened it in Excel. The download carries Mark-of-the-Web zone 3 and an unsigned macro-enabled document hash.",
        "mitre_tactic": "Initial Access",
        "finding_ids": [
          "F-001",
          "F-013"
        ],
        "evidence": [
          {
            "row_hash": "16948020a627b7b9c467b0f57a7f05a7179cdd6c00fc1925db2fc9150ef5eeb8",
            "timestamp_utc": "2026-03-09T09:04:12.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Inbound mail delivered with external link: \"Outstanding invoice Q1 2026\""
          },
          {
            "row_hash": "52de27b38dcdf875cb0e8c1b1a0274b0d619152a3cdaa087f3b8b0f196cd932e",
            "timestamp_utc": "2026-03-09T09:12:44.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Edge download completed: Invoice_Q1_2026.xlsm from an external host first seen today"
          },
          {
            "row_hash": "9cb2081b95af2908bafaf4d5de40d32f2cf60b4b79661adb7025d973958c3711",
            "timestamp_utc": "2026-03-09T09:12:47.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "File created: Invoice_Q1_2026.xlsm (Mark-of-the-Web zone 3)"
          },
          {
            "row_hash": "18228214edd3328111d38af0435710ea7f3362e56aab90dce2012ed820957ee6",
            "timestamp_utc": "2026-03-09T09:13:58.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Process created: EXCEL.EXE opened Invoice_Q1_2026.xlsm"
          }
        ]
      },
      {
        "order": 2,
        "name": "Macro chain drops a loader that beacons to cdn-sync-updates.example",
        "start_utc": "2026-03-09T09:14:02.0000000Z",
        "end_utc": "2026-03-09T09:18:22.0000000Z",
        "description": "EXCEL.EXE spawned wscript.exe running a dropped JScript file, which launched hidden encoded PowerShell. PowerShell retrieved updatesvc.exe into %APPDATA%\\Sync and ran it; the implant then established 60-second-interval sessions to 198.51.100.24:443. The full parent chain EXCEL.EXE -> wscript.exe -> powershell.exe -> updatesvc.exe is present in the data.",
        "mitre_tactic": "Execution",
        "finding_ids": [
          "F-002",
          "F-003",
          "F-013"
        ],
        "evidence": [
          {
            "row_hash": "de402144e2e4483f9c362c288c902d84ae7e326f3c0d69af6094e10f26907539",
            "timestamp_utc": "2026-03-09T09:14:02.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Office application spawned a script interpreter: EXCEL.EXE -> wscript.exe"
          },
          {
            "row_hash": "a90de20f3af3b96b4a4c21e3253756271263130fec5733efa19839b4557ff9a0",
            "timestamp_utc": "2026-03-09T09:14:09.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "File created by EXCEL.EXE: inv8841.js (JScript dropper)"
          },
          {
            "row_hash": "645f677d4b826a9d64672424995db4f1b32b53304fc81639e9fa0dde5eaea068",
            "timestamp_utc": "2026-03-09T09:14:31.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Encoded PowerShell launched by the script interpreter (hidden window, execution policy bypassed)"
          },
          {
            "row_hash": "6b1bfea712f8f2dec5d05b160d74da4465207655f7368ef072d12217692632d8",
            "timestamp_utc": "2026-03-09T09:15:12.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "powershell.exe opened an HTTPS session to cdn-sync-updates.example (first observation in this environment)"
          },
          {
            "row_hash": "b4c5e6c4d0b80684dc62aa48bdfcfd77cb67402024d5816cc5cee3e55ff72f7c",
            "timestamp_utc": "2026-03-09T09:15:44.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Unsigned executable written to a user-writable directory: updatesvc.exe"
          },
          {
            "row_hash": "ef57d88d8e8a71f4409b87efdb9292eb9a6b70c058d319e68a8ad4a81f381fda",
            "timestamp_utc": "2026-03-09T09:16:03.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Implant executed from AppData: updatesvc.exe (parent powershell.exe)"
          },
          {
            "row_hash": "733742f9cdb0229651c72e17d4adb964dde5def02cf3ddd40ae89d67207331a4",
            "timestamp_utc": "2026-03-09T09:16:05.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Prefetch records first execution of UPDATESVC.EXE"
          },
          {
            "row_hash": "05ca445242f666728fdf7cfabf10846fd614b6de9144cb6baeceaa9c740b4ea6",
            "timestamp_utc": "2026-03-09T09:18:22.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Regular-interval outbound sessions from updatesvc.exe to 198.51.100.24 (60 s +/- 3 s jitter)"
          }
        ]
      },
      {
        "order": 3,
        "name": "Two redundant autostart mechanisms installed",
        "start_utc": "2026-03-09T09:22:10.0000000Z",
        "end_utc": "2026-03-09T09:23:02.0000000Z",
        "description": "A per-user Run value (SyncUpdater) and a scheduled task under a Microsoft-looking path (\\Microsoft\\Windows\\Sync\\SyncUpdateTask) both point at the same AppData binary. Security event 4698 independently corroborates the task registry artefact.",
        "mitre_tactic": "Persistence",
        "finding_ids": [
          "F-004"
        ],
        "evidence": [
          {
            "row_hash": "07eca98642a761db9d28c792696f726e39ac67e5673f756e7675698aa536a24f",
            "timestamp_utc": "2026-03-09T09:22:10.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Run key added: SyncUpdater -> updatesvc.exe in AppData"
          },
          {
            "row_hash": "79c501471539152fe57ed5bbd0c54e9902c541547c25f838f87a8dc2136f3b38",
            "timestamp_utc": "2026-03-09T09:22:48.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Scheduled task created with an update-service-impersonating name: SyncUpdateTask"
          },
          {
            "row_hash": "736daa8e335b17bf6baccfb0cdfb5d2cedc97a0244992647fc63100d383a34b5",
            "timestamp_utc": "2026-03-09T09:23:02.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "A scheduled task was created: \\Microsoft\\Windows\\Sync\\SyncUpdateTask"
          }
        ]
      },
      {
        "order": 4,
        "name": "Off-hours host, group and forest-trust enumeration",
        "start_utc": "2026-03-10T02:05:11.0000000Z",
        "end_utc": "2026-03-10T02:14:10.0000000Z",
        "description": "Between 02:05 and 02:15 the implant ran whoami /all, enumerated Domain Admins, and used nltest /domain_trusts to discover that eu.corp.example is a child of corp.example. A staged tool (adq.exe) then read 4,118 directory objects in 90 seconds, visible on DC-CORP-01 as bulk event-4662 activity sourced from 10.0.5.41.",
        "mitre_tactic": "Discovery",
        "finding_ids": [
          "F-005"
        ],
        "evidence": [
          {
            "row_hash": "479bbed29448e4cad9b76809435f4273a429be302be6ced81a3a5443cebdc72d",
            "timestamp_utc": "2026-03-10T02:05:11.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Off-hours discovery: whoami.exe /all executed by the implant"
          },
          {
            "row_hash": "863c9f2fe20723d6b5b6589f3efe3cfe5209436c8ce92c53d9b24263db6bf989",
            "timestamp_utc": "2026-03-10T02:06:40.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Domain group enumeration: net group \"Domain Admins\" /domain"
          },
          {
            "row_hash": "2b44d68b26aa56a255023597983fa045b71ac5f8c31bc4d38b785a64fd330cee",
            "timestamp_utc": "2026-03-10T02:08:15.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Forest trust enumeration: nltest /domain_trusts /all_trusts (reveals corp.example <- eu.corp.example)"
          },
          {
            "row_hash": "d515440f105918d1fabe0fdda7b165851e958f6795963fe48f1759af42df05c1",
            "timestamp_utc": "2026-03-10T02:12:33.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "AD enumeration utility staged in the user temp directory: adq.exe"
          },
          {
            "row_hash": "3f65fa34fb1b085a430c38428f2c55497b133331191384b025db5558667ee551",
            "timestamp_utc": "2026-03-10T02:13:02.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "ADQ.EXE executed, writing results to the user temp directory"
          },
          {
            "row_hash": "d3e786ac5e0c789406a11a448e6ecf18090e94083d75673944cf78f8541ba0bb",
            "timestamp_utc": "2026-03-10T02:14:10.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "Bulk directory-service access from WKS-CORP-01: 4,118 object reads in 90 seconds"
          }
        ]
      },
      {
        "order": 5,
        "name": "LSASS dumped and a service account kerberoasted",
        "start_utc": "2026-03-10T02:31:19.0000000Z",
        "end_utc": "2026-03-10T02:52:31.0000000Z",
        "description": "rundll32 invoked the comsvcs.dll MiniDump export against LSASS (pid 772), producing a 56 MB dump that YARA identifies from its minidump and lsasrv strings; Sysmon event 10 independently records the PROCESS_VM_READ handle. Twenty minutes later two RC4 service tickets were requested for EU\\svc-backup SPNs - the account that authenticates to the file server the following night.",
        "mitre_tactic": "Credential Access",
        "finding_ids": [
          "F-006",
          "F-007"
        ],
        "evidence": [
          {
            "row_hash": "cc51804132c712d5c73901b6c1918a1c29e743847cd01f52787785062621f4f3",
            "timestamp_utc": "2026-03-10T02:31:19.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "LSASS minidump via rundll32 comsvcs.dll MiniDump (pid 772 -> C:\\Windows\\Temp\\ls.dmp)"
          },
          {
            "row_hash": "f8d43e4300fee31c4e83ff9e05618c9af57cda010120134f46222a83461d8d0b",
            "timestamp_utc": "2026-03-10T02:31:24.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Process minidump written: ls.dmp (56 MB, LSASS signature present)"
          },
          {
            "row_hash": "c9fe88278696e76e149f8a8d1269ccdca3286ad8356eace642fd42c6b4ba78b7",
            "timestamp_utc": "2026-03-10T02:31:20.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Process access to lsass.exe granted PROCESS_VM_READ|PROCESS_QUERY_INFORMATION from rundll32.exe"
          },
          {
            "row_hash": "39730224a3ce10fdf8c0b1420a5050a14ed4d29b8855117adea564b83cf4e462",
            "timestamp_utc": "2026-03-10T02:44:08.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "Kerberos ticket-harvesting tool staged: svcq.exe"
          },
          {
            "row_hash": "6803206e2de5995d2695cf6b294d74a137671028232e9b93e6feab7aaa412c8f",
            "timestamp_utc": "2026-03-10T02:48:12.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "Kerberos service ticket requested with RC4 encryption for SPN MSSQLSvc/srv-corp-fs02.eu.corp.example:1433"
          },
          {
            "row_hash": "c84ab18c2dee3db4b3cc5c541a41de33627965a00c066e30cb637b03a34e0959",
            "timestamp_utc": "2026-03-10T02:52:31.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "Second RC4 service ticket requested for SPN cifs/srv-corp-fs02.eu.corp.example"
          }
        ]
      },
      {
        "order": 6,
        "name": "Pivot to SRV-CORP-FS02 as EU\\svc-backup",
        "start_utc": "2026-03-11T03:10:05.0000000Z",
        "end_utc": "2026-03-11T03:14:51.0000000Z",
        "description": "The implant opened SMB to 10.0.5.20 as EU\\svc-backup; the file server records the matching type-3 logon from 10.0.5.41 four seconds later. The loader was copied in as C:\\Windows\\upd.exe with a SHA-256 identical to updatesvc.exe on the workstation, registered as the auto-start service SyncHostSvc, and began second-stage beaconing to sync-relay.example.",
        "mitre_tactic": "Lateral Movement",
        "finding_ids": [
          "F-003",
          "F-008"
        ],
        "evidence": [
          {
            "row_hash": "0cc473c18c81651c1b3e4d8940aedca970f07cc26cda17499cdc9915e3fe7e92",
            "timestamp_utc": "2026-03-11T03:10:05.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "SMB session from updatesvc.exe to SRV-CORP-FS02 using the recovered service account"
          },
          {
            "row_hash": "f91615ca69db13e1f017205ee86ad4f3f59fef17fe59b09d81341627848937b8",
            "timestamp_utc": "2026-03-11T03:10:09.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Network logon (type 3) for EU\\svc-backup from 10.0.5.41 - first ever logon from a workstation"
          },
          {
            "row_hash": "253e72b162e4ec8b48405524d58368ad6e8cfd9a921b931105261d920bfa8df6",
            "timestamp_utc": "2026-03-11T03:10:40.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Implant copied to the file server as C:\\Windows\\upd.exe (identical SHA-256 to updatesvc.exe on WKS-CORP-01)"
          },
          {
            "row_hash": "e218c6139f5b53d94e81d75b834c8af5dae1c25a48086bf9dd3ece1afaf7e468",
            "timestamp_utc": "2026-03-11T03:11:02.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Service installed remotely: SyncHostSvc -> C:\\Windows\\upd.exe (auto start, LocalSystem)"
          },
          {
            "row_hash": "422957041d957ec8d086c5fb5a41fb8c880770aac363fa6841d74f9ea8ff526b",
            "timestamp_utc": "2026-03-11T03:11:20.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Implant running as SYSTEM under services.exe: upd.exe"
          },
          {
            "row_hash": "c87b4138df7c463f18066867592c00c92fc9e27b13cd7bb691316579210e6494",
            "timestamp_utc": "2026-03-11T03:14:51.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Second-stage C2 session from upd.exe to sync-relay.example"
          }
        ]
      },
      {
        "order": 7,
        "name": "Cross-domain escalation from eu.corp.example to the forest root",
        "start_utc": "2026-03-12T01:32:14.0000000Z",
        "end_utc": "2026-03-12T01:52:40.0000000Z",
        "description": "From the file server the attacker ran kt.exe with a SID-history argument naming the forest-root Enterprise Admins RID. DC-CORP-01 then logged a cross-realm ticket carrying that privileged ExtraSid, DS-Replication-Get-Changes-All exercised by a non-DC principal from 10.0.5.20, creation of CORP\\svc-support in the root domain, its addition to Enterprise Admins, and an RDP logon by that account eight minutes after it was created. This is the step the two-domain forest makes possible.",
        "mitre_tactic": "Privilege Escalation",
        "finding_ids": [
          "F-009",
          "F-010"
        ],
        "evidence": [
          {
            "row_hash": "877919bb4ec3ea76727b72083eeff3d9d55b40651bd65f9787cea58bca166919",
            "timestamp_utc": "2026-03-12T01:32:14.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Ticket-manipulation tool staged on the file server: kt.exe"
          },
          {
            "row_hash": "872d570a51d5eb4881248863e0d28b2d130c9c3dffe52e0ba82380b526d62bf5",
            "timestamp_utc": "2026-03-12T01:36:02.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "kt.exe executed with a cross-realm SID-history argument referencing the forest-root Enterprise Admins SID"
          },
          {
            "row_hash": "35f5e9f8c523eed19d7f4550ebe3e1793dcd8484c05995693d110df5699f70b8",
            "timestamp_utc": "2026-03-12T01:40:22.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "Cross-realm ticket presented to corp.example carrying ExtraSids for the root-domain Enterprise Admins group"
          },
          {
            "row_hash": "8c2c8aca2f65face882bbb7f82f43e765aaef544054781e13691b7a35641e5ef",
            "timestamp_utc": "2026-03-12T01:43:51.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "Directory replication rights exercised by a non-DC principal from 10.0.5.20 (DS-Replication-Get-Changes-All)"
          },
          {
            "row_hash": "1d7b2d692a8e5f9f8ad706bb8fee5bb22f0dcd706e0c9daccffe84663f4f94fa",
            "timestamp_utc": "2026-03-12T01:44:03.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "User account created in the FOREST ROOT domain: CORP\\svc-support"
          },
          {
            "row_hash": "c410debb43e0d8122afe85117b37b4cc64384b06713ed83a58ce4f0e32afb739",
            "timestamp_utc": "2026-03-12T01:44:11.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "CORP\\svc-support added to Enterprise Admins (forest-wide privilege)"
          },
          {
            "row_hash": "d7c89fa9f7138736392a44c716208543588537f1541844e53589fed1560e53b5",
            "timestamp_utc": "2026-03-12T01:52:40.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "Interactive remote logon (type 10) to the forest-root DC by the newly created account"
          }
        ]
      },
      {
        "order": 8,
        "name": "3.4 GB of finance data staged and transferred out",
        "start_utc": "2026-03-13T22:40:18.0000000Z",
        "end_utc": "2026-03-13T23:56:12.0000000Z",
        "description": "A renamed archiver produced an encrypted-header archive of D:\\Finance\\2026Q1 in C:\\Windows\\Temp. The outbound transfer to files-transfer-node.example moved exactly 3,612,479,488 bytes - byte-for-byte the archive size - after which the archive was deleted, leaving the USN record behind.",
        "mitre_tactic": "Collection and Exfiltration",
        "finding_ids": [
          "F-011"
        ],
        "evidence": [
          {
            "row_hash": "a1338591f744fca34d223ebede50a17358be8e631173c82fd0264a4db21fe425",
            "timestamp_utc": "2026-03-13T22:40:18.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Renamed archiver executed against the finance share with an encrypted-header password"
          },
          {
            "row_hash": "c90d32691767c1402e7bd3fe617c26a5cbd842fa1d0f64bbe0a10352f0033b5e",
            "timestamp_utc": "2026-03-13T22:58:02.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Staging archive written: fin-2026Q1.7z (3.4 GB) in C:\\Windows\\Temp"
          },
          {
            "row_hash": "3552e2b79a2625d6dea56c489ede0edf1c89356063dd9e80075654edd9845d6e",
            "timestamp_utc": "2026-03-13T23:05:44.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Sustained 3.4 GB outbound transfer to files-transfer-node.example over 47 minutes"
          },
          {
            "row_hash": "daace936b2606b7985f3fdd86570e713a52fbc0954afbd2b6b38b59fd5fd8211",
            "timestamp_utc": "2026-03-13T23:56:12.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Staging archive deleted after transfer completed (USN FILE_DELETE)"
          }
        ]
      },
      {
        "order": 9,
        "name": "Audit logs cleared and shadow copies destroyed",
        "start_utc": "2026-03-14T00:12:41.0000000Z",
        "end_utc": "2026-03-14T00:31:12.0000000Z",
        "description": "wevtutil cleared the Security channel on the file server (event 1102 is the last record before the gap), all volume shadow copies were deleted, the LSASS dump was removed from the workstation, and the forest-root DC audit log was cleared by the attacker-created account. Filesystem and USN artefacts survive on every host, which is why the acquisition still reconstructs the story.",
        "mitre_tactic": "Defense Evasion",
        "finding_ids": [
          "F-012"
        ],
        "evidence": [
          {
            "row_hash": "14b7d10d5fa24b80ce66ed13a3a91cefc80ac82392b7a7ceb31b7948fdb82b30",
            "timestamp_utc": "2026-03-14T00:12:41.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "Event log cleared from the command line: wevtutil.exe cl Security"
          },
          {
            "row_hash": "c0da06181fe22c3c0f25d0d65249f6e29e0afeda261b8641916a7b0e0205c8d2",
            "timestamp_utc": "2026-03-14T00:12:58.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "The audit log was cleared (the last record before the gap)"
          },
          {
            "row_hash": "f4d343d7b3b25932434f5b68deb3da5848fcde373ffcfb572136453b1bf50bc1",
            "timestamp_utc": "2026-03-14T00:18:20.0000000Z",
            "host": "SRV-CORP-FS02",
            "excerpt": "All volume shadow copies deleted: vssadmin.exe delete shadows /all /quiet"
          },
          {
            "row_hash": "18c30d7725aacd8b7f111e995952fbe33b4a4cee9d1fa406abae829abbfa2865",
            "timestamp_utc": "2026-03-14T00:25:05.0000000Z",
            "host": "WKS-CORP-01",
            "excerpt": "LSASS dump deleted from the workstation: cmd.exe /c del /f /q C:\\Windows\\Temp\\ls.dmp"
          },
          {
            "row_hash": "9451ddf86e7042affcdde03da6f8ce47825612383c6dbe7a46f3db21d8ebcdba",
            "timestamp_utc": "2026-03-14T00:31:12.0000000Z",
            "host": "DC-CORP-01",
            "excerpt": "The audit log was cleared on the forest-root domain controller"
          }
        ]
      }
    ]
  },
  "iocs": {
    "files": [
      {
        "value": "Invoice_Q1_2026.xlsm",
        "context": "Macro-enabled lure attachment",
        "first_seen_utc": "2026-03-09T09:12:44.0000000Z",
        "last_seen_utc": "2026-03-09T09:12:47.0000000Z",
        "occurrences": 2,
        "confidence": "high",
        "finding_ids": [
          "F-001",
          "F-013"
        ],
        "row_hashes": [
          "52de27b38dcdf875cb0e8c1b1a0274b0d619152a3cdaa087f3b8b0f196cd932e",
          "9cb2081b95af2908bafaf4d5de40d32f2cf60b4b79661adb7025d973958c3711"
        ],
        "verdict": "malicious"
      },
      {
        "value": "inv8841.js",
        "context": "WScript dropper written by the macro",
        "first_seen_utc": "2026-03-09T09:14:09.0000000Z",
        "last_seen_utc": "2026-03-09T09:14:09.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-002"
        ],
        "row_hashes": [
          "a90de20f3af3b96b4a4c21e3253756271263130fec5733efa19839b4557ff9a0"
        ],
        "verdict": "malicious"
      },
      {
        "value": "updatesvc.exe",
        "context": "First-stage implant (also deployed as upd.exe on SRV-CORP-FS02)",
        "first_seen_utc": "2026-03-09T09:15:44.0000000Z",
        "last_seen_utc": "2026-03-11T03:11:20.0000000Z",
        "occurrences": 4,
        "confidence": "high",
        "finding_ids": [
          "F-002",
          "F-008"
        ],
        "row_hashes": [
          "253e72b162e4ec8b48405524d58368ad6e8cfd9a921b931105261d920bfa8df6",
          "422957041d957ec8d086c5fb5a41fb8c880770aac363fa6841d74f9ea8ff526b",
          "b4c5e6c4d0b80684dc62aa48bdfcfd77cb67402024d5816cc5cee3e55ff72f7c",
          "ef57d88d8e8a71f4409b87efdb9292eb9a6b70c058d319e68a8ad4a81f381fda"
        ],
        "verdict": "malicious"
      },
      {
        "value": "adq.exe",
        "context": "AD enumeration utility staged in the user temp directory",
        "first_seen_utc": "2026-03-10T02:12:33.0000000Z",
        "last_seen_utc": "2026-03-10T02:13:02.0000000Z",
        "occurrences": 2,
        "confidence": "high",
        "finding_ids": [
          "F-005"
        ],
        "row_hashes": [
          "3f65fa34fb1b085a430c38428f2c55497b133331191384b025db5558667ee551",
          "d515440f105918d1fabe0fdda7b165851e958f6795963fe48f1759af42df05c1"
        ],
        "verdict": "malicious"
      },
      {
        "value": "svcq.exe",
        "context": "Kerberos service-ticket harvesting tool",
        "first_seen_utc": "2026-03-10T02:44:08.0000000Z",
        "last_seen_utc": "2026-03-10T02:44:08.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-007"
        ],
        "row_hashes": [
          "39730224a3ce10fdf8c0b1420a5050a14ed4d29b8855117adea564b83cf4e462"
        ],
        "verdict": "malicious"
      },
      {
        "value": "ls.dmp",
        "context": "LSASS process minidump",
        "first_seen_utc": "2026-03-10T02:31:24.0000000Z",
        "last_seen_utc": "2026-03-10T02:31:24.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-006"
        ],
        "row_hashes": [
          "f8d43e4300fee31c4e83ff9e05618c9af57cda010120134f46222a83461d8d0b"
        ],
        "verdict": "malicious"
      },
      {
        "value": "kt.exe",
        "context": "Credential/ticket manipulation tool used for the cross-domain step",
        "first_seen_utc": "2026-03-12T01:32:14.0000000Z",
        "last_seen_utc": "2026-03-12T01:36:02.0000000Z",
        "occurrences": 2,
        "confidence": "high",
        "finding_ids": [
          "F-009"
        ],
        "row_hashes": [
          "872d570a51d5eb4881248863e0d28b2d130c9c3dffe52e0ba82380b526d62bf5",
          "877919bb4ec3ea76727b72083eeff3d9d55b40651bd65f9787cea58bca166919"
        ],
        "verdict": "malicious"
      },
      {
        "value": "a.exe",
        "context": "Renamed archive utility used to stage finance data",
        "first_seen_utc": "2026-03-13T22:40:18.0000000Z",
        "last_seen_utc": "2026-03-13T22:40:18.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-011"
        ],
        "row_hashes": [
          "a1338591f744fca34d223ebede50a17358be8e631173c82fd0264a4db21fe425"
        ],
        "verdict": "malicious"
      },
      {
        "value": "fin-2026Q1.7z",
        "context": "Encrypted staging archive (3.4 GB)",
        "first_seen_utc": "2026-03-13T22:58:02.0000000Z",
        "last_seen_utc": "2026-03-13T22:58:02.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-011"
        ],
        "row_hashes": [
          "c90d32691767c1402e7bd3fe617c26a5cbd842fa1d0f64bbe0a10352f0033b5e"
        ],
        "verdict": "malicious"
      },
      {
        "value": "procdump.exe",
        "context": "Signed Sysinternals ProcDump used legitimately by IT (dismissible detection). Dismissed — see dismissed_detections.",
        "first_seen_utc": "2026-03-12T09:51:00.0000000Z",
        "last_seen_utc": "2026-03-12T09:51:00.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "row_hashes": [
          "dda374dce5f39f47c208c59d06ebaf68b83d245136d38e777dcabea860ea4a52"
        ],
        "verdict": "benign"
      }
    ],
    "hashes": [
      {
        "value": "c1d85360bd6f4a15e401b4b97fd3f5d9bb99a51c73088b1fdae7129d3232b61e",
        "context": "SHA-256 of Invoice_Q1_2026.xlsm: Macro-enabled lure attachment",
        "first_seen_utc": "2026-03-09T09:12:44.0000000Z",
        "last_seen_utc": "2026-03-09T09:12:47.0000000Z",
        "occurrences": 2,
        "confidence": "high",
        "finding_ids": [
          "F-001",
          "F-013"
        ],
        "row_hashes": [
          "52de27b38dcdf875cb0e8c1b1a0274b0d619152a3cdaa087f3b8b0f196cd932e",
          "9cb2081b95af2908bafaf4d5de40d32f2cf60b4b79661adb7025d973958c3711"
        ],
        "verdict": "malicious"
      },
      {
        "value": "c03dda7b05b4325f3cee22b9557c30f620ead98104fc60ea6f3b08b1d906cb62",
        "context": "SHA-256 of inv8841.js: WScript dropper written by the macro",
        "first_seen_utc": "2026-03-09T09:14:09.0000000Z",
        "last_seen_utc": "2026-03-09T09:14:09.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-002"
        ],
        "row_hashes": [
          "a90de20f3af3b96b4a4c21e3253756271263130fec5733efa19839b4557ff9a0"
        ],
        "verdict": "malicious"
      },
      {
        "value": "d7d5201e38631d05a77cedb1130deddc29f7241c84bb689ac99c25cb66ef26c5",
        "context": "SHA-256 of updatesvc.exe: First-stage implant (also deployed as upd.exe on SRV-CORP-FS02)",
        "first_seen_utc": "2026-03-09T09:15:44.0000000Z",
        "last_seen_utc": "2026-03-11T03:11:20.0000000Z",
        "occurrences": 4,
        "confidence": "high",
        "finding_ids": [
          "F-002",
          "F-008"
        ],
        "row_hashes": [
          "253e72b162e4ec8b48405524d58368ad6e8cfd9a921b931105261d920bfa8df6",
          "422957041d957ec8d086c5fb5a41fb8c880770aac363fa6841d74f9ea8ff526b",
          "b4c5e6c4d0b80684dc62aa48bdfcfd77cb67402024d5816cc5cee3e55ff72f7c",
          "ef57d88d8e8a71f4409b87efdb9292eb9a6b70c058d319e68a8ad4a81f381fda"
        ],
        "verdict": "malicious"
      },
      {
        "value": "362495bdb4404d73c8edf1c046ab790e45dc2b7e0972f6e0b2642f146e4c726d",
        "context": "SHA-256 of adq.exe: AD enumeration utility staged in the user temp directory",
        "first_seen_utc": "2026-03-10T02:12:33.0000000Z",
        "last_seen_utc": "2026-03-10T02:13:02.0000000Z",
        "occurrences": 2,
        "confidence": "high",
        "finding_ids": [
          "F-005"
        ],
        "row_hashes": [
          "3f65fa34fb1b085a430c38428f2c55497b133331191384b025db5558667ee551",
          "d515440f105918d1fabe0fdda7b165851e958f6795963fe48f1759af42df05c1"
        ],
        "verdict": "malicious"
      },
      {
        "value": "74cd297cee86867e865e4b48ed5ef485c8803748e972f3178a0eb6c2b9b57665",
        "context": "SHA-256 of svcq.exe: Kerberos service-ticket harvesting tool",
        "first_seen_utc": "2026-03-10T02:44:08.0000000Z",
        "last_seen_utc": "2026-03-10T02:44:08.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-007"
        ],
        "row_hashes": [
          "39730224a3ce10fdf8c0b1420a5050a14ed4d29b8855117adea564b83cf4e462"
        ],
        "verdict": "malicious"
      },
      {
        "value": "4e2861ff65eafb848dac6cb0371c782b5d7d2810766b0094712da215501ec4df",
        "context": "SHA-256 of ls.dmp: LSASS process minidump",
        "first_seen_utc": "2026-03-10T02:31:24.0000000Z",
        "last_seen_utc": "2026-03-10T02:31:24.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-006"
        ],
        "row_hashes": [
          "f8d43e4300fee31c4e83ff9e05618c9af57cda010120134f46222a83461d8d0b"
        ],
        "verdict": "malicious"
      },
      {
        "value": "7b60f0a0b74fe4c24525a1661ad5e9ace42b2ed1449d4e53bc3deb0eb02ae263",
        "context": "SHA-256 of kt.exe: Credential/ticket manipulation tool used for the cross-domain step",
        "first_seen_utc": "2026-03-12T01:32:14.0000000Z",
        "last_seen_utc": "2026-03-12T01:36:02.0000000Z",
        "occurrences": 2,
        "confidence": "high",
        "finding_ids": [
          "F-009"
        ],
        "row_hashes": [
          "872d570a51d5eb4881248863e0d28b2d130c9c3dffe52e0ba82380b526d62bf5",
          "877919bb4ec3ea76727b72083eeff3d9d55b40651bd65f9787cea58bca166919"
        ],
        "verdict": "malicious"
      },
      {
        "value": "5af8d60483f1c9ed88514c036bb429677ab0e8287d9e123e12359a85b84bff44",
        "context": "SHA-256 of a.exe: Renamed archive utility used to stage finance data",
        "first_seen_utc": "2026-03-13T22:40:18.0000000Z",
        "last_seen_utc": "2026-03-13T22:40:18.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-011"
        ],
        "row_hashes": [
          "a1338591f744fca34d223ebede50a17358be8e631173c82fd0264a4db21fe425"
        ],
        "verdict": "malicious"
      },
      {
        "value": "e0f9e2e36d5ca08013ca6b33082e8c1ff881e3a23d278657e3e5ce585c8d81ba",
        "context": "SHA-256 of fin-2026Q1.7z: Encrypted staging archive (3.4 GB)",
        "first_seen_utc": "2026-03-13T22:58:02.0000000Z",
        "last_seen_utc": "2026-03-13T22:58:02.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-011"
        ],
        "row_hashes": [
          "c90d32691767c1402e7bd3fe617c26a5cbd842fa1d0f64bbe0a10352f0033b5e"
        ],
        "verdict": "malicious"
      },
      {
        "value": "d62a9037cfcf81f3341e3a386a29145a9dd9452fc4abe89611a9ea81bf5f1eac",
        "context": "SHA-256 of procdump.exe: Signed Sysinternals ProcDump used legitimately by IT (dismissible detection). Dismissed — see dismissed_detections.",
        "first_seen_utc": "2026-03-12T09:51:00.0000000Z",
        "last_seen_utc": "2026-03-12T09:51:00.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "row_hashes": [
          "dda374dce5f39f47c208c59d06ebaf68b83d245136d38e777dcabea860ea4a52"
        ],
        "verdict": "benign"
      }
    ],
    "ip_addresses": [
      {
        "value": "192.0.2.61",
        "context": "Phishing mail relay that delivered the lure",
        "first_seen_utc": "2026-03-09T09:04:12.0000000Z",
        "last_seen_utc": "2026-03-09T09:04:12.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-001"
        ],
        "row_hashes": [
          "16948020a627b7b9c467b0f57a7f05a7179cdd6c00fc1925db2fc9150ef5eeb8"
        ],
        "verdict": "malicious"
      },
      {
        "value": "198.51.100.24",
        "context": "Lure download host and first-stage C2 (TLS 443)",
        "first_seen_utc": "2026-03-09T09:12:44.0000000Z",
        "last_seen_utc": "2026-03-09T09:18:22.0000000Z",
        "occurrences": 3,
        "confidence": "high",
        "finding_ids": [
          "F-001",
          "F-003",
          "F-013"
        ],
        "row_hashes": [
          "05ca445242f666728fdf7cfabf10846fd614b6de9144cb6baeceaa9c740b4ea6",
          "52de27b38dcdf875cb0e8c1b1a0274b0d619152a3cdaa087f3b8b0f196cd932e",
          "6b1bfea712f8f2dec5d05b160d74da4465207655f7368ef072d12217692632d8"
        ],
        "verdict": "malicious"
      },
      {
        "value": "203.0.113.77",
        "context": "Second-stage C2 reached from SRV-CORP-FS02",
        "first_seen_utc": "2026-03-11T03:14:51.0000000Z",
        "last_seen_utc": "2026-03-11T03:14:51.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-003"
        ],
        "row_hashes": [
          "c87b4138df7c463f18066867592c00c92fc9e27b13cd7bb691316579210e6494"
        ],
        "verdict": "malicious"
      },
      {
        "value": "203.0.113.142",
        "context": "Exfiltration endpoint (3.4 GB outbound)",
        "first_seen_utc": "2026-03-13T23:05:44.0000000Z",
        "last_seen_utc": "2026-03-13T23:05:44.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-011"
        ],
        "row_hashes": [
          "3552e2b79a2625d6dea56c489ede0edf1c89356063dd9e80075654edd9845d6e"
        ],
        "verdict": "malicious"
      }
    ],
    "domains": [
      {
        "value": "invoices.billing-portal.example",
        "context": "Lure download host",
        "first_seen_utc": "2026-03-09T09:04:12.0000000Z",
        "last_seen_utc": "2026-03-09T09:12:44.0000000Z",
        "occurrences": 2,
        "confidence": "high",
        "finding_ids": [
          "F-001",
          "F-013"
        ],
        "row_hashes": [
          "16948020a627b7b9c467b0f57a7f05a7179cdd6c00fc1925db2fc9150ef5eeb8",
          "52de27b38dcdf875cb0e8c1b1a0274b0d619152a3cdaa087f3b8b0f196cd932e"
        ],
        "verdict": "malicious"
      },
      {
        "value": "cdn-sync-updates.example",
        "context": "First-stage C2 (update-service impersonation)",
        "first_seen_utc": "2026-03-09T09:15:12.0000000Z",
        "last_seen_utc": "2026-03-09T09:18:22.0000000Z",
        "occurrences": 2,
        "confidence": "high",
        "finding_ids": [
          "F-003",
          "F-013"
        ],
        "row_hashes": [
          "05ca445242f666728fdf7cfabf10846fd614b6de9144cb6baeceaa9c740b4ea6",
          "6b1bfea712f8f2dec5d05b160d74da4465207655f7368ef072d12217692632d8"
        ],
        "verdict": "malicious"
      },
      {
        "value": "sync-relay.example",
        "context": "Second-stage C2 reached from SRV-CORP-FS02",
        "first_seen_utc": "2026-03-11T03:14:51.0000000Z",
        "last_seen_utc": "2026-03-11T03:14:51.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-003"
        ],
        "row_hashes": [
          "c87b4138df7c463f18066867592c00c92fc9e27b13cd7bb691316579210e6494"
        ],
        "verdict": "malicious"
      },
      {
        "value": "files-transfer-node.example",
        "context": "Exfiltration endpoint",
        "first_seen_utc": "2026-03-13T23:05:44.0000000Z",
        "last_seen_utc": "2026-03-13T23:05:44.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-011"
        ],
        "row_hashes": [
          "3552e2b79a2625d6dea56c489ede0edf1c89356063dd9e80075654edd9845d6e"
        ],
        "verdict": "malicious"
      }
    ],
    "urls": [
      {
        "value": "https://invoices.billing-portal.example/dl/inv-8841/Invoice_Q1_2026.xlsm",
        "context": "Download URL for the lure attachment.",
        "first_seen_utc": "2026-03-09T09:12:44.0000000Z",
        "last_seen_utc": "2026-03-09T09:12:44.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-001",
          "F-013"
        ],
        "row_hashes": [
          "52de27b38dcdf875cb0e8c1b1a0274b0d619152a3cdaa087f3b8b0f196cd932e"
        ],
        "verdict": "malicious"
      }
    ],
    "registry_keys": [
      {
        "value": "HKU\\S-1-5-21-2109-1147-3301-1104\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\SyncUpdater",
        "context": "Autostart value pointing at C:\\Users\\alice\\AppData\\Roaming\\Sync\\updatesvc.exe.",
        "first_seen_utc": "2026-03-09T09:22:10.0000000Z",
        "last_seen_utc": "2026-03-09T09:22:10.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-004"
        ],
        "row_hashes": [
          "07eca98642a761db9d28c792696f726e39ac67e5673f756e7675698aa536a24f"
        ],
        "verdict": "malicious"
      }
    ],
    "accounts": [
      {
        "value": "CORP\\svc-support",
        "context": "Created by the attacker in the forest-root domain and added to Enterprise Admins (F-010). Disable, do not delete.",
        "first_seen_utc": "2026-03-12T01:44:03.0000000Z",
        "last_seen_utc": "2026-03-14T00:31:12.0000000Z",
        "occurrences": 3,
        "confidence": "high",
        "finding_ids": [
          "F-010",
          "F-012"
        ],
        "row_hashes": [
          "1d7b2d692a8e5f9f8ad706bb8fee5bb22f0dcd706e0c9daccffe84663f4f94fa",
          "9451ddf86e7042affcdde03da6f8ce47825612383c6dbe7a46f3db21d8ebcdba",
          "d7c89fa9f7138736392a44c716208543588537f1541844e53589fed1560e53b5"
        ],
        "verdict": "malicious"
      },
      {
        "value": "EU\\svc-backup",
        "context": "Legitimate backup service account, kerberoasted (F-007) and then used for the pivot to the file server (F-008). Credential must be treated as known to the attacker.",
        "first_seen_utc": "2026-03-07T00:30:32.9600000Z",
        "last_seen_utc": "2026-03-14T17:56:27.4540000Z",
        "occurrences": 202,
        "confidence": "high",
        "finding_ids": [
          "F-007",
          "F-008",
          "F-009",
          "F-010"
        ],
        "row_hashes": [
          "01207d429f3d97065c5b8866b24d18faaeb929deee3b697b8eff4e49f2f24fd1",
          "0176283bbc1a3b0e86199aa7104ffad0c667a20162e650d74d11b89a730a249f",
          "03d45e56b8780a77e368c9857a62775d9001b010fc313e1e4b07aae940eda246",
          "03fc3cb4377232cea18e423433071dfa370c9a5cf7ad642ac393fe309d91aa40",
          "088d98601a5914e755184b6f7c0ea1d0ff2f3838dcd34e0e71e81569801a6b1d",
          "090c35565aad3ff497860de893cc03d459d74de030c7dcb01c6d62c4cdf25cc9",
          "0a2fb74d832ef0c931372636605abdcfe8d137c23ee6b8db78e37eaed087cb9b",
          "0cc473c18c81651c1b3e4d8940aedca970f07cc26cda17499cdc9915e3fe7e92"
        ],
        "verdict": "suspicious"
      },
      {
        "value": "EU\\alice",
        "context": "Finance analyst who opened the lure. Not an attacker account, but every credential cached in her session is exposed via F-006.",
        "first_seen_utc": "2026-03-07T00:05:05.0000000Z",
        "last_seen_utc": "2026-03-14T20:50:20.0870000Z",
        "occurrences": 590,
        "confidence": "high",
        "finding_ids": [
          "F-001",
          "F-002",
          "F-003",
          "F-004",
          "F-005",
          "F-006",
          "F-007",
          "F-012",
          "F-013",
          "F-014"
        ],
        "row_hashes": [
          "00622f877ce5d075b4836baf7a372f93db365235afd90027350e487e7d8301ff",
          "0140ce7bf9da55bcac4ab39178e68305ae0602fa27583371037a7861c574d5ae",
          "01899252433cebc442978d8c6eefd3368bdf8bf14d0b3178dd739f3fb79e1086",
          "0269dc1b8892a0c0ff9a244f9867878899f3f0c72621d1d1dbb191d73363a59e",
          "029c34ef145da73515f7e8ac2ca61d6e781959403922b7e1abe4dcedea050a64",
          "02da5e3ff3266fcf1b22cc9a56a88d13e4c4a2f662b09adfaa725b13afaf2233",
          "031c14de15427798421198e779148872a42da7a7e3a799c910bef3cd1eb2f333",
          "0374ca14ca4902b1baf03e7b6fb4eb2ca1ec5cfeaef93ab29b8dc95674d891d5"
        ],
        "verdict": "benign"
      }
    ],
    "processes": [
      {
        "value": "updatesvc.exe",
        "context": "First-stage implant on WKS-CORP-01, executed from %APPDATA%\\Sync (F-002).",
        "first_seen_utc": "2026-03-09T09:16:03.0000000Z",
        "last_seen_utc": "2026-03-11T03:10:05.0000000Z",
        "occurrences": 4,
        "confidence": "high",
        "finding_ids": [
          "F-002",
          "F-003",
          "F-008"
        ],
        "row_hashes": [
          "05ca445242f666728fdf7cfabf10846fd614b6de9144cb6baeceaa9c740b4ea6",
          "0cc473c18c81651c1b3e4d8940aedca970f07cc26cda17499cdc9915e3fe7e92",
          "733742f9cdb0229651c72e17d4adb964dde5def02cf3ddd40ae89d67207331a4",
          "ef57d88d8e8a71f4409b87efdb9292eb9a6b70c058d319e68a8ad4a81f381fda"
        ],
        "verdict": "malicious"
      },
      {
        "value": "upd.exe",
        "context": "The same implant on SRV-CORP-FS02, running as SYSTEM under the SyncHostSvc service (F-008).",
        "first_seen_utc": "2026-03-11T03:11:20.0000000Z",
        "last_seen_utc": "2026-03-13T23:05:44.0000000Z",
        "occurrences": 3,
        "confidence": "high",
        "finding_ids": [
          "F-003",
          "F-008",
          "F-011"
        ],
        "row_hashes": [
          "3552e2b79a2625d6dea56c489ede0edf1c89356063dd9e80075654edd9845d6e",
          "422957041d957ec8d086c5fb5a41fb8c880770aac363fa6841d74f9ea8ff526b",
          "c87b4138df7c463f18066867592c00c92fc9e27b13cd7bb691316579210e6494"
        ],
        "verdict": "malicious"
      },
      {
        "value": "adq.exe",
        "context": "Directory-enumeration utility staged in the user temp directory (F-005).",
        "first_seen_utc": "2026-03-10T02:13:02.0000000Z",
        "last_seen_utc": "2026-03-10T02:13:02.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-005"
        ],
        "row_hashes": [
          "3f65fa34fb1b085a430c38428f2c55497b133331191384b025db5558667ee551"
        ],
        "verdict": "malicious"
      },
      {
        "value": "kt.exe",
        "context": "Ticket-manipulation tool used for the SID-history escalation across the trust (F-009).",
        "first_seen_utc": "2026-03-12T01:36:02.0000000Z",
        "last_seen_utc": "2026-03-12T01:36:02.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-009"
        ],
        "row_hashes": [
          "872d570a51d5eb4881248863e0d28b2d130c9c3dffe52e0ba82380b526d62bf5"
        ],
        "verdict": "malicious"
      },
      {
        "value": "a.exe",
        "context": "Renamed archive utility used to stage the finance data (F-011).",
        "first_seen_utc": "2026-03-13T22:40:18.0000000Z",
        "last_seen_utc": "2026-03-13T22:40:18.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-011"
        ],
        "row_hashes": [
          "a1338591f744fca34d223ebede50a17358be8e631173c82fd0264a4db21fe425"
        ],
        "verdict": "malicious"
      },
      {
        "value": "wscript.exe",
        "context": "Legitimate Windows binary, but here the second link of the macro chain (F-002). Hunt on the parent/child pair, not on the name.",
        "first_seen_utc": "2026-03-09T09:14:02.0000000Z",
        "last_seen_utc": "2026-03-09T09:14:02.0000000Z",
        "occurrences": 1,
        "confidence": "moderate",
        "finding_ids": [
          "F-002"
        ],
        "row_hashes": [
          "de402144e2e4483f9c362c288c902d84ae7e326f3c0d69af6094e10f26907539"
        ],
        "verdict": "suspicious"
      }
    ],
    "scheduled_tasks": [
      {
        "value": "\\Microsoft\\Windows\\Sync\\SyncUpdateTask",
        "context": "Task impersonating a Microsoft update component; runs C:\\Users\\alice\\AppData\\Roaming\\Sync\\updatesvc.exe AtLogon.",
        "first_seen_utc": "2026-03-09T09:22:48.0000000Z",
        "last_seen_utc": "2026-03-09T09:22:48.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-004"
        ],
        "row_hashes": [
          "79c501471539152fe57ed5bbd0c54e9902c541547c25f838f87a8dc2136f3b38"
        ],
        "verdict": "malicious"
      }
    ],
    "services": [
      {
        "value": "SyncHostSvc",
        "context": "Auto-start service running C:\\Windows\\upd.exe as LocalSystem.",
        "first_seen_utc": "2026-03-11T03:11:02.0000000Z",
        "last_seen_utc": "2026-03-11T03:11:02.0000000Z",
        "occurrences": 1,
        "confidence": "high",
        "finding_ids": [
          "F-008"
        ],
        "row_hashes": [
          "e218c6139f5b53d94e81d75b834c8af5dae1c25a48086bf9dd3ece1afaf7e468"
        ],
        "verdict": "malicious"
      }
    ]
  },
  "mitre_coverage": [
    {
      "technique_id": "T1003.001",
      "technique_name": "OS Credential Dumping: LSASS Memory",
      "tactic": "Credential Access",
      "event_count": 5,
      "finding_ids": [
        "F-006"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1003.006",
      "technique_name": "OS Credential Dumping: DCSync",
      "tactic": "Credential Access",
      "event_count": 2,
      "finding_ids": [
        "F-009"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1018",
      "technique_name": "Remote System Discovery",
      "tactic": "Discovery",
      "event_count": 1,
      "finding_ids": [
        "F-005"
      ],
      "max_severity": "medium"
    },
    {
      "technique_id": "T1021.001",
      "technique_name": "Remote Services: Remote Desktop Protocol",
      "tactic": "Lateral Movement",
      "event_count": 1,
      "finding_ids": [
        "F-010"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1021.002",
      "technique_name": "Remote Services: SMB/Windows Admin Shares",
      "tactic": "Lateral Movement",
      "event_count": 3,
      "finding_ids": [
        "F-008"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1027",
      "technique_name": "Obfuscated Files or Information",
      "tactic": "Defense Evasion",
      "event_count": 1,
      "finding_ids": [
        "F-002"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1033",
      "technique_name": "System Owner/User Discovery",
      "tactic": "Discovery",
      "event_count": 1,
      "finding_ids": [
        "F-005"
      ],
      "max_severity": "medium"
    },
    {
      "technique_id": "T1041",
      "technique_name": "Exfiltration Over C2 Channel",
      "tactic": "Exfiltration",
      "event_count": 2,
      "finding_ids": [
        "F-011"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1053.005",
      "technique_name": "Scheduled Task/Job: Scheduled Task",
      "tactic": "Persistence",
      "event_count": 1,
      "finding_ids": [
        "F-004"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1059.001",
      "technique_name": "Command and Scripting Interpreter: PowerShell",
      "tactic": "Execution",
      "event_count": 2,
      "finding_ids": [
        "F-002"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1059.007",
      "technique_name": "Command and Scripting Interpreter: JavaScript",
      "tactic": "Execution",
      "event_count": 2,
      "finding_ids": [
        "F-002"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1069.002",
      "technique_name": "Permission Groups Discovery: Domain Groups",
      "tactic": "Discovery",
      "event_count": 1,
      "finding_ids": [
        "F-005"
      ],
      "max_severity": "medium"
    },
    {
      "technique_id": "T1070.001",
      "technique_name": "Indicator Removal: Clear Windows Event Logs",
      "tactic": "Defense Evasion",
      "event_count": 3,
      "finding_ids": [
        "F-012"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1070.004",
      "technique_name": "Indicator Removal: File Deletion",
      "tactic": "Defense Evasion",
      "event_count": 2,
      "finding_ids": [
        "F-011",
        "F-012"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1071.001",
      "technique_name": "Application Layer Protocol: Web Protocols",
      "tactic": "Command and Control",
      "event_count": 4,
      "finding_ids": [
        "F-002",
        "F-003",
        "F-013"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1074.001",
      "technique_name": "Data Staged: Local Data Staging",
      "tactic": "Collection",
      "event_count": 3,
      "finding_ids": [
        "F-011"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1078.002",
      "technique_name": "Valid Accounts: Domain Accounts",
      "tactic": "Persistence",
      "event_count": 4,
      "finding_ids": [
        "F-008",
        "F-010"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1087.002",
      "technique_name": "Account Discovery: Domain Account",
      "tactic": "Discovery",
      "event_count": 2,
      "finding_ids": [
        "F-005"
      ],
      "max_severity": "medium"
    },
    {
      "technique_id": "T1098",
      "technique_name": "Account Manipulation",
      "tactic": "Persistence",
      "event_count": 1,
      "finding_ids": [
        "F-010"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1105",
      "technique_name": "Ingress Tool Transfer",
      "tactic": "Command and Control",
      "event_count": 4,
      "finding_ids": [
        "F-002",
        "F-003",
        "F-008",
        "F-013"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1110.001",
      "technique_name": "Brute Force: Password Guessing",
      "tactic": "Credential Access",
      "event_count": 1,
      "max_severity": "low"
    },
    {
      "technique_id": "T1134.005",
      "technique_name": "Access Token Manipulation: SID-History Injection",
      "tactic": "Privilege Escalation",
      "event_count": 3,
      "finding_ids": [
        "F-009"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1136.002",
      "technique_name": "Create Account: Domain Account",
      "tactic": "Persistence",
      "event_count": 1,
      "finding_ids": [
        "F-010"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1204.002",
      "technique_name": "User Execution: Malicious File",
      "tactic": "Execution",
      "event_count": 4,
      "finding_ids": [
        "F-001",
        "F-002",
        "F-013"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1218.011",
      "technique_name": "System Binary Proxy Execution: Rundll32",
      "tactic": "Defense Evasion",
      "event_count": 1,
      "max_severity": "low"
    },
    {
      "technique_id": "T1482",
      "technique_name": "Domain Trust Discovery",
      "tactic": "Discovery",
      "event_count": 1,
      "finding_ids": [
        "F-005",
        "F-014"
      ],
      "max_severity": "medium"
    },
    {
      "technique_id": "T1490",
      "technique_name": "Inhibit System Recovery",
      "tactic": "Impact",
      "event_count": 1,
      "finding_ids": [
        "F-012"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1543.003",
      "technique_name": "Create or Modify System Process: Windows Service",
      "tactic": "Persistence",
      "event_count": 2,
      "finding_ids": [
        "F-008"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1547.001",
      "technique_name": "Boot or Logon Autostart Execution: Registry Run Keys",
      "tactic": "Persistence",
      "event_count": 1,
      "finding_ids": [
        "F-004"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1558.001",
      "technique_name": "Steal or Forge Kerberos Tickets: Golden Ticket",
      "tactic": "Credential Access",
      "event_count": 3,
      "finding_ids": [
        "F-009"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1558.003",
      "technique_name": "Steal or Forge Kerberos Tickets: Kerberoasting",
      "tactic": "Credential Access",
      "event_count": 3,
      "finding_ids": [
        "F-007"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1560.001",
      "technique_name": "Archive Collected Data: Archive via Utility",
      "tactic": "Collection",
      "event_count": 2,
      "finding_ids": [
        "F-011"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1566.001",
      "technique_name": "Phishing: Spearphishing Attachment",
      "tactic": "Initial Access",
      "event_count": 1,
      "finding_ids": [
        "F-002"
      ],
      "max_severity": "critical"
    },
    {
      "technique_id": "T1566.002",
      "technique_name": "Phishing: Spearphishing Link",
      "tactic": "Initial Access",
      "event_count": 2,
      "finding_ids": [
        "F-001",
        "F-013"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1569.002",
      "technique_name": "System Services: Service Execution",
      "tactic": "Execution",
      "event_count": 1,
      "finding_ids": [
        "F-008"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1570",
      "technique_name": "Lateral Tool Transfer",
      "tactic": "Lateral Movement",
      "event_count": 1,
      "finding_ids": [
        "F-008"
      ],
      "max_severity": "high"
    },
    {
      "technique_id": "T1573.001",
      "technique_name": "Encrypted Channel: Symmetric Cryptography",
      "tactic": "Command and Control",
      "event_count": 2,
      "finding_ids": [
        "F-003"
      ],
      "max_severity": "high"
    }
  ],
  "recommendations": {
    "immediate": [
      {
        "action": "Treat the whole corp.example forest as compromised and convene AD recovery planning before any cleanup begins.",
        "priority": "critical",
        "effort": "significant",
        "rationale": "F-009 and F-010 put an attacker-created Enterprise Admin in the forest root. Per-host remediation cannot undo that, and cleaning hosts first destroys evidence while leaving the foothold in place.",
        "finding_ids": [
          "F-009",
          "F-010"
        ]
      },
      {
        "action": "Disable (do not delete) CORP\\svc-support and remove it from Enterprise Admins.",
        "priority": "critical",
        "effort": "trivial",
        "rationale": "It is the attacker's most durable foothold and the principal that cleared the domain controller audit log. Disabling preserves its history for the investigation; deleting it destroys it.",
        "finding_ids": [
          "F-010",
          "F-012"
        ]
      },
      {
        "action": "Network-isolate WKS-CORP-01 and SRV-CORP-FS02, leaving them powered on pending memory acquisition.",
        "priority": "critical",
        "effort": "trivial",
        "rationale": "Both host live implants with active C2. Powering them off loses the memory image that would close the largest analytic gap in this report.",
        "finding_ids": [
          "F-002",
          "F-003",
          "F-008"
        ]
      },
      {
        "action": "Block and sinkhole all four attacker domains and external addresses at the egress point, and search history for any other internal host that reached them.",
        "priority": "high",
        "effort": "trivial",
        "rationale": "Two independent C2 channels were in use (F-003); blocking one is not containment. Egress history is also the fastest way to find a host this three-host acquisition did not cover.",
        "finding_ids": [
          "F-003",
          "F-011"
        ]
      },
      {
        "action": "Reset krbtgt in both domains twice with the recommended interval, then rotate every privileged credential and every credential cached on the two compromised hosts.",
        "priority": "critical",
        "effort": "moderate",
        "rationale": "F-006 exposes everything cached on the workstation and F-009 implies the directory was replicated, so ticket-granting material must be assumed known.",
        "finding_ids": [
          "F-006",
          "F-007",
          "F-009"
        ]
      },
      {
        "action": "Begin the data-breach assessment for the Q1 2026 finance dataset.",
        "priority": "high",
        "effort": "moderate",
        "rationale": "F-011 is a confirmed exfiltration with a byte-exact match between the staged archive and the outbound transfer. Notification clocks in most jurisdictions start at awareness, not at the end of the investigation.",
        "finding_ids": [
          "F-011"
        ]
      }
    ],
    "short_term": [
      {
        "action": "Enable SID filtering on the eu.corp.example to corp.example trust.",
        "priority": "high",
        "effort": "moderate",
        "rationale": "Directly removes the mechanism in F-009: a child-domain principal could present root-domain SIDs and the root domain accepted them.",
        "finding_ids": [
          "F-009"
        ]
      },
      {
        "action": "Deploy LSASS protection (RunAsPPL) and Credential Guard, and disable RC4 for Kerberos in both domains.",
        "priority": "high",
        "effort": "moderate",
        "rationale": "Removes both credential-access techniques used here: the comsvcs.dll dump in F-006 and the offline-crackable RC4 tickets in F-007.",
        "finding_ids": [
          "F-006",
          "F-007"
        ]
      },
      {
        "action": "Forward Windows event logs off-host in real time and alert on event 1102 and on vssadmin delete shadows.",
        "priority": "high",
        "effort": "moderate",
        "rationale": "F-012 made an entire Security channel unrecoverable. Off-host forwarding converts that from evidence destruction into an alert.",
        "finding_ids": [
          "F-012"
        ]
      },
      {
        "action": "Convert EU\\svc-backup to a group-managed service account, remove unnecessary SPNs, and restrict where it may log on.",
        "priority": "high",
        "effort": "moderate",
        "rationale": "A crackable SPN on an account permitted to authenticate from anywhere is what made the pivot in F-008 possible.",
        "finding_ids": [
          "F-007",
          "F-008"
        ]
      },
      {
        "action": "Block macro-enabled and executable downloads from newly observed domains at the web proxy.",
        "priority": "medium",
        "effort": "moderate",
        "rationale": "On this timeline the proxy had two separate opportunities to interrupt the intrusion before any credential was touched (F-013).",
        "finding_ids": [
          "F-001",
          "F-013"
        ]
      }
    ],
    "long_term": [
      {
        "action": "Reconsider the two-domain forest: either collapse eu.corp.example into corp.example or re-model it as a separate forest with a selective-authentication trust.",
        "priority": "medium",
        "effort": "significant",
        "rationale": "The trust is not a misconfiguration, but it is the structural reason a Finance workstation compromise became a forest-root compromise. A security boundary that is a trust boundary in name only will be crossed again.",
        "finding_ids": [
          "F-009"
        ]
      },
      {
        "action": "Block Office child processes (script interpreters and shells) by policy, with an exception process for the finance automation that needs it.",
        "priority": "high",
        "effort": "moderate",
        "rationale": "The whole of F-002 depends on EXCEL.EXE being able to spawn wscript.exe.",
        "finding_ids": [
          "F-002"
        ]
      },
      {
        "action": "Tier administrative access so that file-server and workstation administration cannot reach domain-controller administration.",
        "priority": "high",
        "effort": "significant",
        "rationale": "SYSTEM on a file server should not be one step from the forest root, which is the path F-008 to F-009 takes.",
        "finding_ids": [
          "F-008",
          "F-009"
        ]
      },
      {
        "action": "Alert on discovery tooling — nltest, bulk LDAP reads and privileged-group enumeration — sourced from workstation-class hosts.",
        "priority": "medium",
        "effort": "moderate",
        "rationale": "F-005 is individually low-signal and is the last cheap opportunity to interrupt this pattern before credential theft.",
        "finding_ids": [
          "F-005"
        ]
      }
    ],
    "further_collection": [
      {
        "action": "Acquire DC-EU-01 (10.0.5.10) with the same collection profile.",
        "priority": "critical",
        "effort": "trivial",
        "rationale": "It is the authoritative Kerberos record for the child domain and the single largest gap in this report; additional roasted accounts or pivot targets would appear only there.",
        "finding_ids": [
          "F-007",
          "F-008",
          "F-014"
        ]
      },
      {
        "action": "Acquire full physical memory from both compromised hosts before rebuilding them.",
        "priority": "high",
        "effort": "moderate",
        "rationale": "Nothing in this acquisition can exclude injected or memory-only tooling, and both hosts are still running.",
        "finding_ids": [
          "F-002",
          "F-008"
        ]
      },
      {
        "action": "Retrieve proxy, netflow and firewall records for 10.0.5.20 and 10.0.5.41 across the whole collection window.",
        "priority": "high",
        "effort": "moderate",
        "rationale": "Would confirm the exfiltration content and volume independently of the host, and reveal any channel that left no on-disk artefact.",
        "finding_ids": [
          "F-003",
          "F-011"
        ]
      },
      {
        "action": "Run a mail-platform message trace for the sender and the attachment hash, and collect any endpoint where the lure was opened.",
        "priority": "high",
        "effort": "trivial",
        "rationale": "One recipient opening the lure means others received it; this is how a second patient zero is found.",
        "finding_ids": [
          "F-001"
        ]
      },
      {
        "action": "Sweep the fleet for the implant SHA-256, the SyncUpdater Run value and the \\Microsoft\\Windows\\Sync\\SyncUpdateTask task path.",
        "priority": "high",
        "effort": "trivial",
        "rationale": "These are the cheapest high-fidelity indicators in the report and they scale to every host without a full collection.",
        "finding_ids": [
          "F-002",
          "F-004"
        ]
      }
    ]
  },
  "analytic_gaps": [
    {
      "gap": "The child-domain controller DC-EU-01 (10.0.5.10) was not collected, so the authoritative Kerberos record for eu.corp.example is absent.",
      "reason": "evidence_not_collected",
      "detail": "DC-EU-01 issued the service tickets in F-007 and authenticated the pivot in F-008, but only the forest-root domain controller was acquired. Additional roasted accounts, further logons by EU\\svc-backup and any second pivot target would appear there and nowhere in this dataset.",
      "how_to_close": "Run IRTriage against DC-EU-01 with the same profile and merge the resulting timeline into this SuperTimeline."
    },
    {
      "gap": "The Security channel on SRV-CORP-FS02 is unrecoverable before 14 March 00:12 UTC.",
      "reason": "anti_forensics_suspected",
      "detail": "wevtutil cleared the channel and event 1102 is the last record before the gap (F-012). Anything logged on that host between the pivot and the clearing — additional logons, service installs, share access — is gone. The reconstruction above for that host rests on filesystem, USN, service and registry artefacts, which survived.",
      "how_to_close": "Recover the same events from a log-forwarding platform or SIEM if one retained them; failing that, this window cannot be closed from the host."
    },
    {
      "gap": "Whether the kerberoasted EU\\svc-backup ticket was actually cracked cannot be established.",
      "reason": "ambiguous_evidence",
      "detail": "The request for RC4 service tickets is on-host evidence; the offline cracking is not, by definition. The inference rests on the account authenticating from the workstation the next night. An alternative path — the credential being recovered from the LSASS dump in F-006 instead — fits the same evidence and would have the same containment consequence.",
      "how_to_close": "Not closable from host artefacts. Either path implies the same action: reset the account and remove its SPNs."
    },
    {
      "gap": "No memory image was acquired, so injected or memory-only tooling cannot be ruled out.",
      "reason": "requires_memory_image",
      "detail": "Every conclusion here derives from on-disk and event-log artefacts. Reflectively loaded modules, injected threads in legitimate processes and in-memory credential material leave no trace in this acquisition.",
      "how_to_close": "Acquire full physical memory from WKS-CORP-01 and SRV-CORP-FS02 before they are rebuilt, and re-run analysis with the memory-derived timeline merged in."
    },
    {
      "gap": "The exfiltrated content is inferred from byte counts, not from captured traffic.",
      "reason": "requires_network_telemetry",
      "detail": "The 3,612,479,488-byte transfer in F-011 matches the staging archive exactly, which is why exfiltration is asserted with high confidence. What was inside the archive is inferred from the source path (D:\\Finance\\2026Q1) rather than observed; the archive itself was deleted and had encrypted headers.",
      "how_to_close": "Reconstruct the file inventory of D:\\Finance\\2026Q1 as at 13 March from the share's own backups, and pull netflow or proxy records for 10.0.5.20 for that window."
    },
    {
      "gap": "The delivery infrastructure and the full recipient list for the lure are outside this collection.",
      "reason": "evidence_not_collected",
      "detail": "One inbound message is visible in the mailbox artefacts on WKS-CORP-01. Whether other users received the same lure, and whether any of them opened it, cannot be answered from three endpoints.",
      "how_to_close": "Run a message trace for the sender and the attachment hash across the mail platform, and collect any endpoint that opened it."
    },
    {
      "gap": "WKS-CORP-02 (10.0.5.42) appears in the asset inventory but was not collected.",
      "reason": "evidence_not_collected",
      "detail": "A second Finance workstation on the same subnet with a comparable user population is in scope for the same lure but out of scope for this acquisition. No evidence in this dataset implicates it; equally, none clears it.",
      "how_to_close": "Sweep it for the implant hash, the SyncUpdater Run value and the scheduled-task path, and collect it if any hit."
    }
  ],
  "dismissed_detections": [
    {
      "engine": "hayabusa",
      "rule_id": "demo-haya-0005",
      "rule_name": "Multiple Logon Failures Followed By Success",
      "occurrences": 1,
      "rationale": "Three failed logons then a success for EU\\carol from her usual host, consistent with a stale cached password after a routine change, and unconnected to any account involved in this intrusion. Dismissed with moderate rather than high confidence because password-spray precursors look identical at this volume; it should be re-checked against authentication telemetry if any is retained.",
      "confidence": "moderate"
    },
    {
      "engine": "sigma",
      "rule_id": "demo-sigma-0038",
      "rule_name": "Non-standard PowerShell Profile Load",
      "occurrences": 1,
      "rationale": "The profile is C:\\ProgramData\\Corp\\IT\\Microsoft.PowerShell_profile.ps1, loaded by EU\\bob (IT support) from a machine-wide managed path during working hours, with cmd.exe as parent. It matches the estate's documented workstation baseline and appears on a schedule unrelated to the intrusion window. Dismissed as managed configuration.",
      "confidence": "high"
    },
    {
      "engine": "sigma",
      "rule_id": "demo-sigma-0039",
      "rule_name": "Rundll32 Execution Without Command-Line Arguments",
      "occurrences": 1,
      "rationale": "rundll32.exe with no arguments, parented by explorer.exe in an interactive session — the signature of a Control Panel applet, which is the rule's own documented false positive. Note the contrast with F-006, where rundll32 carried an explicit comsvcs.dll MiniDump command line and was parented by the implant: the same binary, opposite verdicts, decided by parentage and arguments.",
      "confidence": "high"
    },
    {
      "engine": "sigma",
      "rule_id": "demo-sigma-0040",
      "rule_name": "Archive Utility Execution From Administrative Context",
      "occurrences": 1,
      "rationale": "Genuine 7z.exe from C:\\Program Files\\7-Zip, run by EU\\bob against the previous quarter's share and writing to the archive volume E:\\. Compare F-011: a renamed archiver, encrypted headers, staging into C:\\Windows\\Temp and an immediate outbound transfer. The tool class is the same; none of the malicious properties are present.",
      "confidence": "high"
    },
    {
      "engine": "yara",
      "rule_id": "demo-yara-0008",
      "rule_name": "Tool_Name_Match_ProcDump",
      "occurrences": 1,
      "rationale": "A filename match only — the rule explicitly states it does not evaluate signature or signer. The file is Microsoft-signed with a valid signature, lives in C:\\Tools\\Sysinternals with the rest of the IT toolkit, and was never executed anywhere in this timeline. Dismissed as a name collision. It is retained in the report because an unexecuted credential-dumping tool on a user workstation is still worth an access-control conversation.",
      "confidence": "high"
    }
  ],
  "provenance": {
    "evidence_pack_digest": "c408a8f9ec95a1626e14e9594ef6b0a12d3bb534c38b1fce77bc1a3e6ddec7af",
    "pack_count": 3,
    "packs": [
      {
        "index": 0,
        "rows": 940,
        "estimated_tokens": 211889,
        "time_range": {
          "start_utc": "2026-03-07T00:05:00.0000000Z",
          "end_utc": "2026-03-14T23:29:42.2860000Z"
        },
        "selection_strategy": "whole-host (no reduction required)"
      },
      {
        "index": 1,
        "rows": 726,
        "estimated_tokens": 153970,
        "time_range": {
          "start_utc": "2026-03-07T00:05:00.0000000Z",
          "end_utc": "2026-03-14T23:26:36.7560000Z"
        },
        "selection_strategy": "whole-host (no reduction required)"
      },
      {
        "index": 2,
        "rows": 721,
        "estimated_tokens": 160343,
        "time_range": {
          "start_utc": "2026-03-07T00:05:00.0000000Z",
          "end_utc": "2026-03-14T22:41:50.7710000Z"
        },
        "selection_strategy": "whole-host (no reduction required)"
      }
    ],
    "reduction_strategy": "None. All 2,387 rows fit inside a single-pass budget, so every row was shown and no conclusion here rests on a sample. One pack per collected host preserves per-host coherence.",
    "rows_omitted": 0,
    "redactions_applied": [],
    "warnings": [
      "SYNTHETIC DEMONSTRATION REPORT. The evidence is generated by scripts/gen-demo-dataset.mjs and the analysis is pre-authored by scripts/gen-demo-report.mjs. No language model produced any text in this report, which is why meta.model.provider is \"mock\", passes is 0 and usage is zero throughout.",
      "Every host, account, IP address, domain and file hash is invented: external addresses come from the RFC 5737 documentation ranges and every DNS name uses the RFC 2606 reserved .example TLD.",
      "A real run records the actual provider, model, prompt version, token usage and cost here, and its findings carry the model's own wording rather than an author's."
    ],
    "repair_attempts": 0
  }
};

export default report;
