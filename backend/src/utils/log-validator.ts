import type { IngestLog } from "../types/ingest.types.js";

const VALID_SEVERITIES = [
  "TRACE",
  "DEBUG",
  "INFO",
  "WARN",
  "ERROR",
  "FATAL",
] as const;

export function validateLog(log: IngestLog): string[] {
  const errors: string[] = [];

  if (!log.message || log.message.trim().length === 0) {
    errors.push("Message is required.");
  }

  if (!VALID_SEVERITIES.includes(log.severity as any)) {
    errors.push("Invalid severity.");
  }

  if (Number.isNaN(Date.parse(log.eventTime))) {
    errors.push("Invalid eventTime.");
  }

  if (
    log.attributes !== undefined &&
    (typeof log.attributes !== "object" || Array.isArray(log.attributes))
  ) {
    errors.push("Attributes must be an object.");
  }

  return errors;
}