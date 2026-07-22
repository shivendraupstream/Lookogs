export declare class SourceService {
    private sourceRepository;
    create(appId: string, name: string, environment: string): Promise<{
        id: string;
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
        createdAt: Date;
        updatedAt: Date;
        apiKey: string;
    }>;
    findAllByApp(appId: string): Promise<{
        id: string;
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByApiKey(rawKey: string): Promise<{
        id: string;
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, name?: string, environment?: string): Promise<{
        id: string;
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=source.service.d.ts.map