import { prisma } from "../lib/prisma.js";

export class AppRepository {
  async create(data: {
    name: string;
    description?: string;
  }) {
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

  async findById(id: string) {
    return prisma.app.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
    }
  ) {
    return prisma.app.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.app.delete({
      where: { id },
    });
  }
}