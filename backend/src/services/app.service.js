import { AppRepository } from "../repositories/repositories.js";
export class AppService {
    appRepository = new AppRepository();
    async create(name, description) {
        const data = { name };
        if (description !== undefined)
            data.description = description;
        return this.appRepository.create(data);
    }
    async findAll() {
        return this.appRepository.findAll();
    }
    async findById(id) {
        return this.appRepository.findById(id);
    }
    async update(id, name, description) {
        const data = {};
        if (name !== undefined)
            data.name = name;
        if (description !== undefined)
            data.description = description;
        return this.appRepository.update(id, data);
    }
    async delete(id) {
        return this.appRepository.delete(id);
    }
}
//# sourceMappingURL=app.service.js.map