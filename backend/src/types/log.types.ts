import type { Severity } from "../generated/prisma/index.js";

export interface ParsedLog {
  message: string;
  severity: Severity;
  eventTime: Date;
  attributes: Record<string, unknown>;
}