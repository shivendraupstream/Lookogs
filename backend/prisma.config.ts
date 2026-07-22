import { resolve } from "node:path";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

const backendEnvPath = resolve(process.cwd(), ".env");
dotenv.config({ path: backendEnvPath });

const databaseUrl = process.env.DATABASE_URL || "postgresql://shivendra:Shivyat123@localhost:5433/lookogs_logs";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});