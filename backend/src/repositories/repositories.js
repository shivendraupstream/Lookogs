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
//# sourceMappingURL=repositories.js.map