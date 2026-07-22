import { type FastifyInstance } from "fastify";
import { IngestController } from "../controllers/ingest.controller.js";

const controller = new IngestController();

export async function ingestRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/api/v1/ingest",
    controller.ingest.bind(controller)
  );
}