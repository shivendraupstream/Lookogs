import Fastify from "fastify";
import cors from "@fastify/cors";

import { appRoutes } from "./routes/app.routes.js";
import { sourceRoutes } from "./routes/source.routes.js";
import { ingestRoutes } from "./routes/ingest.routes.js";
import { logRoutes } from "./routes/log.routes.js";

export const app = Fastify({
  logger: true,
});

await app.register(cors);

await app.register(appRoutes);
await app.register(sourceRoutes);
await app.register(ingestRoutes);
await app.register(logRoutes);

app.get("/health", async () => {
  return {
    status: "healthy",
  };
});