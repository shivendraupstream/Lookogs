import type { FastifyInstance } from "fastify";
import { LogController } from "../controllers/log.controller.js";

const logController = new LogController();

export async function logRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/v1/logs",
    logController.getLogs.bind(logController)
  );
}