import {} from "fastify";
import { IngestService } from "../services/ingest.service.js";
import {} from "../types/ingest.types.js";
const ingestService = new IngestService();
export class IngestController {
    async ingest(request, reply) {
        console.log(request.headers);
        const apiKey = request.headers["x-api-key"];
        if (typeof apiKey !== "string") {
            return reply.code(400).send({
                error: "Missing X-API-Key header",
            });
        }
        const { logs } = request.body;
            const result = await ingestService.ingest(apiKey, logs);
            return reply.code(200).send(result);
        
    }
}
//# sourceMappingURL=ingest.controller.js.map