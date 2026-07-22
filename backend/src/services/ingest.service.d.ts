import { type IngestLog } from "../types/ingest.types.js";
export declare class IngestService {
    ingest(apiKey: string, logs: IngestLog[]): Promise<{
        status: string;
        ingested: number;
    }>;
}
//# sourceMappingURL=ingest.service.d.ts.map