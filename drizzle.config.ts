import { loadEnvConfig } from "@next/env";
import { defineConfig, type Config } from "drizzle-kit";
import { cwd } from "node:process";

loadEnvConfig(cwd());

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
  verbose: true,
  strict: true,
}) satisfies Config;
