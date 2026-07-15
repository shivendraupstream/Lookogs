import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const currentDir = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(currentDir, "../../.env") });
dotenv.config({ path: resolve(currentDir, "../../../.env") });

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL!,
};