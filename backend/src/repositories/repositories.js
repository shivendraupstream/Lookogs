import { prisma } from "../lib/prisma.js";
export class AppRepository {
    async create(data) {
        return prisma.app.create({
            data,
        });
    }
    async findAll() {
        return prisma.app.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async findById(id) {
        return prisma.app.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return prisma.app.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma.app.delete({
            where: { id },
        });
    }
}
export class SourceRepository {
    async create(data) {
        return prisma.source.create({
            data,
        });
    }
    async findAllByApp(appId) {
        return prisma.source.findMany({
            where: { appId },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async findById(id) {
        return prisma.source.findUnique({
            where: { id },
        });
    }
    async findByApiKeyHash(apiKeyHash) {
        return prisma.source.findUnique({
            where: { apiKeyHash },
        });
    }
    async update(id, data) {
        return prisma.source.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma.source.delete({
            where: { id },
        });
    }
}
//# sourceMappingURL=repositories.js.map