import { AppService } from "../services/app.service.js";
export async function appRoutes(fastify) {
    const appService = new AppService();
    fastify.post("/apps", {
        schema: {
            body: {
                type: "object",
                required: ["name"],
                additionalProperties: false,
                properties: {
                    name: { type: "string", minLength: 1 },
                    description: { type: "string" },
                },
            },
        },
    }, async (request, reply) => {
        const { name, description } = request.body;
        const created = await appService.create(name, description);
        reply.code(201).send(created);
    });
    fastify.get("/apps", async () => {
        return appService.findAll();
    });
    fastify.get("/apps/:id", {
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: { type: "string", minLength: 1 },
                },
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const found = await appService.findById(id);
        if (!found) {
            reply.code(404).send({ error: "App not found" });
            return;
        }
        return found;
    });
}
//# sourceMappingURL=app.routes.js.map