import Fastify from "fastify";
import cors from "@fastify/cors";
export const app = Fastify({
    logger: true,
});
await app.register(cors);
app.get("/health", async () => {
    return {
        status: "healthy",
    };
});
//# sourceMappingURL=app.js.map