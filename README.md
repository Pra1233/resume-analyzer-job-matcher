# Resume Analyzer + Job Matcher

A free-first Node.js application for:

- uploading resumes
- extracting text from PDF, DOCX, and image resumes
- applying OCR for image-based files
- matching resumes against job descriptions
- returning structured output for n8n or frontend clients
- using Gemini, OpenAI GPT, or Ollama for analysis
- providing a React frontend for direct browser uploads

## What is included

- Express API with production-style structure
- Centralized config, logging, and error handling
- PDF and DOCX text extraction
- OCR support for image files
- Google Gemini Developer API integration for free-tier cloud usage
- OpenAI GPT integration via the Responses API
- Ollama adapter for local LLM analysis
- Heuristic fallback matcher when LLM is unavailable
- React frontend with upload, loading, error, and result states
- n8n integration notes and example requests

## Project structure

```text
src/
  app.js
  server.js
  config/
  constants/
  controllers/
  errors/
  lib/
  middleware/
  routes/
  schemas/
  services/
    extractors/
    llm/
    matchers/
  utils/
docs/
samples/
client/
```

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Copy environment file:

```bash
cp .env.example .env
```

3. Set your provider:

- For Gemini, set `LLM_PROVIDER=gemini` and add `GEMINI_API_KEY`
- For OpenAI GPT, set `LLM_PROVIDER=openai` and add `OPENAI_API_KEY`
- For Ollama, set `LLM_PROVIDER=ollama`

4. Start the API server:

```bash
npm run dev
```

5. Start the React frontend in another terminal:

```bash
npm run dev:client
```

6. Open the app:

```text
http://localhost:5173
```

7. Health check:

```bash
GET /health
```

## Main endpoint

```bash
POST /api/v1/resumes/analyze
Content-Type: multipart/form-data
```

Form fields:

- `resume`: file upload
- `jobDescription`: required text
- `jobTitle`: optional text

## Frontend

The React frontend lives in [`client`](C:\Users\Pooja Singh\Documents\Codex\2026-04-19-https-chatgpt-com-g-g-p\client).

It provides:

- a browser upload interface
- a polished animated layout
- success and error banners
- results for score, matching skills, missing skills, suggestions, and extracted text

If your API runs somewhere other than `http://localhost:3000`, create `client/.env.local` with:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Deploy on Netlify

This repository is now prepared for a single-site Netlify deployment:

- the React frontend is built to `dist`
- the Express API is wrapped as a Netlify Function
- `/api/*` and `/health` are redirected to the serverless function through [`netlify.toml`](C:\Users\Pooja Singh\Documents\Codex\2026-04-19-https-chatgpt-com-g-g-p\netlify.toml)

### Netlify settings

When creating the Netlify site, use:

- Build command: `npm run build:client`
- Publish directory: `dist`

### Netlify environment variables

Set these in the Netlify dashboard:

```env
NODE_VERSION=20
NODE_ENV=production
LOG_LEVEL=info
MAX_FILE_SIZE_MB=5
CLIENT_URL=https://your-site-name.netlify.app
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
ENABLE_LLM=true
ENABLE_HEURISTIC_FALLBACK=true
```

If you later switch providers, also set the relevant OpenAI or Ollama variables.

### Important deployment note

This Netlify deployment is best for:

- React frontend
- PDF and DOCX analysis
- Gemini-backed scoring

The OCR path using `tesseract.js` is heavier and may be less reliable in a serverless environment because Netlify synchronous functions have short execution limits. For image OCR-heavy production use, move the backend to a dedicated server platform later.

### Deploy steps

1. Push this repository to GitHub.
2. In Netlify, choose `Add new site` -> `Import an existing project`.
3. Select your GitHub repository.
4. Confirm the build command and publish directory above.
5. Add the environment variables in the Netlify UI.
6. Deploy.
7. After deploy, update `CLIENT_URL` to your real Netlify site URL if needed and trigger a redeploy.

## Notes about OCR

- OCR is implemented for image files using `tesseract.js`.
- Text-based PDFs are parsed with `pdf-parse`.
- DOCX files are parsed with `mammoth`.
- Scanned PDFs often need PDF-to-image rasterization before OCR. This repository keeps the OCR layer abstract so you can add a rasterizer later without rewriting the app.

## Suggested free stack

- `n8n` locally
- this API locally
- `Ollama` locally with `mistral` or `llama3`
- React frontend for direct upload and review

## Suggested GPT stack

- `n8n` locally
- this API locally
- OpenAI GPT via the Responses API
- React frontend for direct upload and review

## Suggested free cloud stack

- this API locally
- React frontend locally
- Gemini Developer API free tier
- no credit card required for initial free-tier testing

## LLM provider configuration

### Gemini

Set these in `.env`:

```env
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

### OpenAI GPT

Set these in `.env`:

```env
LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5
```

### Ollama

Set these in `.env`:

```env
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral
```

## Next steps

- add scanned PDF rasterization for stronger OCR fallback
- add persistence to PostgreSQL or MongoDB
- import workflow into n8n using the docs in [`docs/n8n-workflow.md`](C:\Users\Pooja Singh\Documents\Codex\2026-04-19-https-chatgpt-com-g-g-p\docs\n8n-workflow.md)
