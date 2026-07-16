import { AppRepository } from "../repositories/repositories.js";

export class AppService {
  private appRepository = new AppRepository();

  async create(name: string, description?: string) {
    const data: { name: string; description?: string } = { name };
    if (description !== undefined) data.description = description;
    return this.appRepository.create(data);
  }

  async findAll() {
    return this.appRepository.findAll();
  }

  async findById(id: string) {
    return this.appRepository.findById(id);
  }

  async update(
    id: string,
    name?: string,
    description?: string
  ) {
    const data: { name?: string; description?: string } = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    return this.appRepository.update(id, data);
  }

  async delete(id: string) {
    return this.appRepository.delete(id);
  }
}