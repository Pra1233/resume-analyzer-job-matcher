# n8n Integration Guide

## Goal

Use n8n as the workflow orchestrator while this Node.js API handles parsing and matching.

## Suggested workflow

1. `Webhook` node
2. `HTTP Request` node to call `POST /api/v1/resumes/analyze`
3. Optional `IF` node for success/failure branching
4. Save response into Google Sheets, Notion, or database
5. Send result by email or show in frontend

## Request configuration

- Method: `POST`
- URL: `http://localhost:3000/api/v1/resumes/analyze`
- Send body as `Form-Data`

Fields:

- `resume`: binary file
- `jobDescription`: string
- `jobTitle`: string

## Response fields

- `data.extraction.text`
- `data.extraction.strategy`
- `data.match.provider`
- `data.match.analysis.matchScore`
- `data.match.analysis.missingSkills`
- `data.match.analysis.suggestions`

## Important note

If you want full scanned-PDF OCR support in production, add a PDF rasterization step before OCR.
