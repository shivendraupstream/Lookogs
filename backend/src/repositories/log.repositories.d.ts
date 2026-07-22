import type { Log, Severity } from '../generated/prisma/index.js';
export type ParsedLog = {
    message: string;
    severity: Severity;
    eventTime: Date;
    attributes: any;
};
export interface CreateLogsInput {
    appId: string;
    sourceId: string;
    logs: ParsedLog[];
}
export interface FindLogsQuery {
    appId: string;
    severity?: Severity;
    sourceId?: string;
    search?: string;
    startTime?: Date;
    endTime?: Date;
    cursor?: {
        id: string;
        eventTime: Date;
    };
    limit?: number;
}
export declare class LogRepository {
    private prisma;
    /**
     * Bulk inserts parsed log lines.
     * Note: Server sets ingestTime automatically, client payload provides eventTime.
     */
    createMany(input: CreateLogsInput): Promise<number>;
    /**
     * Fetches logs using cursor pagination (eventTime + id) scoped strictly to an appId.
     */
    findMany(query: FindLogsQuery): Promise<Log[]>;
    findById(appId: string, id: string): Promise<Log | null>;
}
//# sourceMappingURL=log.repositories.d.ts.map