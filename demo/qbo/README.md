# QBO Sandbox Demo — Cursor + QuickBooks API

Demo 2 for the Chamber presentation. See [PRESENTATION_SCRIPT.md](../../PRESENTATION_SCRIPT.md) for full runbook.

## Quick Setup

1. Create account at [developer.intuit.com](https://developer.intuit.com)
2. My Hub → Sandboxes → Create → QBO Plus → US
3. Create app → get Client ID + Secret
4. [OAuth 2.0 Playground](https://developer.intuit.com/app/developer/playground) → get Refresh Token + Realm ID
5. Copy `.env.example` to `.env` and fill in values

## Before the Talk

```bash
cd demo/qbo
cp .env.example .env   # if not done yet
# Fill in .env with your tokens

# Refresh access token and test query (scripts to be added during rehearsal)
node refresh-token.js
node query-overdue.js
```

Run the full flow 30 minutes before presenting.

## Fallback

If OAuth fails on stage: export Invoices CSV from QBO sandbox → analyze in Cursor with a local CSV file. See PRESENTATION_SCRIPT.md Demo 2 fallback section.

## API Base URL

```
https://sandbox-quickbooks.api.intuit.com/v3/company/{REALM_ID}/
```

## Sample Query (QBO SQL)

```
SELECT * FROM Invoice WHERE Balance > '0'
```

Filter overdue in script by comparing `DueDate` to today minus 30 days.
