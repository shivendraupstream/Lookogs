import {} from "fastify";
import { IngestController } from "../controllers/ingest.controller.js";
const controller = new IngestController();
export async function ingestRoutes(fastify) {
    fastify.post("/api/v1/ingest", controller.ingest.bind(controller));
}
//# sourceMappingURL=ingest.routes.js.map