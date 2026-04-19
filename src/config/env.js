const dotenv = require("dotenv");
const { z } = require("zod");

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  LOG_LEVEL: z.string().default("info"),
  MAX_FILE_SIZE_MB: z.coerce.number().positive().default(5),
  ALLOWED_FILE_TYPES: z.string().default(
    "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg,image/jpg"
  ),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  LLM_PROVIDER: z.enum(["gemini", "openai", "ollama"]).default("gemini"),
  GEMINI_API_KEY: z.string().optional().default(""),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  OPENAI_API_KEY: z.string().optional().default(""),
  OPENAI_BASE_URL: z.string().url().default("https://api.openai.com/v1"),
  OPENAI_MODEL: z.string().default("gpt-5"),
  OLLAMA_BASE_URL: z.string().url().default("http://localhost:11434"),
  OLLAMA_MODEL: z.string().default("mistral"),
  ENABLE_LLM: z
    .string()
    .optional()
    .transform((value) => value !== "false"),
  ENABLE_HEURISTIC_FALLBACK: z
    .string()
    .optional()
    .transform((value) => value !== "false")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = parsed.data;

env.ALLOWED_FILE_TYPES = env.ALLOWED_FILE_TYPES.split(",").map((item) => item.trim());

module.exports = { env };
