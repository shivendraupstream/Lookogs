import { createHash, randomBytes } from "node:crypto";
import { SourceRepository } from "../repositories/repositories.js";
function generateApiKey() {
    return randomBytes(32).toString("hex");
}
function hashApiKey(rawKey) {
    return createHash("sha256").update(rawKey).digest("hex");
}
export class SourceService {
    sourceRepository = new SourceRepository();
    async create(appId, name, environment) {
        const apiKey = generateApiKey();
        const apiKeyHash = hashApiKey(apiKey);
        const source = await this.sourceRepository.create({
            name,
            environment,
            apiKeyHash,
            appId,
        });
        return { ...source, apiKey };
    }
    async findAllByApp(appId) {
        return this.sourceRepository.findAllByApp(appId);
    }
    async findById(id) {
        return this.sourceRepository.findById(id);
    }
    async findByApiKey(rawKey) {
        return this.sourceRepository.findByApiKeyHash(hashApiKey(rawKey));
    }
    async update(id, name, environment) {
        const data = {};
        if (name !== undefined)
            data.name = name;
        if (environment !== undefined)
            data.environment = environment;
        return this.sourceRepository.update(id, data);
    }
    async delete(id) {
        return this.sourceRepository.delete(id);
    }
}
//# sourceMappingURL=source.service.js.map