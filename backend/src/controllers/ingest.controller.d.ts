import { type FastifyReply, type FastifyRequest } from "fastify";
import { type IngestRequest } from "../types/ingest.types.js";
export declare class IngestController {
    ingest(request: FastifyRequest<{
        Body: IngestRequest;
    }>, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=ingest.controller.d.ts.map