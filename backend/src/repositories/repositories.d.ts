export declare class AppRepository {
    create(data: {
        name: string;
        description?: string;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, data: {
        name?: string;
        description?: string;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export declare class SourceRepository {
    create(data: {
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
    }): Promise<{
        id: string;
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
        createdAt: Date;
        updatedAt: Date;
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
    findByApiKeyHash(apiKeyHash: string): Promise<{
        id: string;
        name: string;
        environment: string;
        apiKeyHash: string;
        appId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, data: {
        name?: string;
        environment?: string;
    }): Promise<{
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
//# sourceMappingURL=repositories.d.ts.map