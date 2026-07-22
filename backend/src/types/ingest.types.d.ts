export interface IngestLog {
    message: string;
    severity: string;
    eventTime: string;
    attributes?: Record<string, unknown>;
}
export interface IngestRequest {
    logs: IngestLog[];
}
//# sourceMappingURL=ingest.types.d.ts.map