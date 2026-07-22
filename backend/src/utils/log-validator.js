const VALID_SEVERITIES = [
    "TRACE",
    "DEBUG",
    "INFO",
    "WARN",
    "ERROR",
    "FATAL",
];
export function validateLog(log) {
    const errors = [];
    if (!log.message || log.message.trim().length === 0) {
        errors.push("Message is required.");
    }
    if (!VALID_SEVERITIES.includes(log.severity)) {
        errors.push("Invalid severity.");
    }
    if (Number.isNaN(Date.parse(log.eventTime))) {
        errors.push("Invalid eventTime.");
    }
    if (log.attributes !== undefined &&
        (typeof log.attributes !== "object" || Array.isArray(log.attributes))) {
        errors.push("Attributes must be an object.");
    }
    return errors;
}
//# sourceMappingURL=log-validator.js.map