import { type FastifyReply, type FastifyRequest } from "fastify";
import { IngestService } from "../services/ingest.service.js";
import { type IngestRequest } from "../types/ingest.types.js";

const ingestService = new IngestService();

export class IngestController {
    
  async ingest(
    request: FastifyRequest <{
      Body: IngestRequest;}>,
    reply: FastifyReply
  ) {
    console.log(request.headers);
    const apiKey = request.headers["x-api-key"];

    if (typeof apiKey !== "string") {
      return reply.code(400).send({
        error: "Missing X-API-Key header",
      });
    }

    const { logs } = request.body;

    try {   
        const result = await ingestService.ingest(apiKey, logs);
        return reply.code(200).send(result);
    } catch (error) {
        if (error instanceof Error) {
                return reply.code(400).send({
                error: error.message,
            });
        }
        return reply.code(500).send({
            error: "Internal Server Error",
        });
    }
  }
}
