import { type FastifyInstance } from "fastify";

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: unknown, request, reply) => {
    // Safely log the error
    request.log.error(error);

    const message = error instanceof Error ? error.message : String(error ?? "Unknown error");

    return reply.status(500).send({
      error: "Internal Server Error",
      message,
    });
  });
}