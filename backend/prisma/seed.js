import dotenv from "dotenv";
dotenv.config();
import { PrismaClient, Severity } from "../src/generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import crypto from "crypto";
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
}
const prisma = new PrismaClient({ adapter: new PrismaPg(databaseUrl) });
const messages = [
    { severity: Severity.INFO, message: "Server started successfully" },
    { severity: Severity.INFO, message: "GET /health 200" },
    { severity: Severity.DEBUG, message: "JWT validated" },
    { severity: Severity.DEBUG, message: "User session loaded" },
    { severity: Severity.WARN, message: "Slow database query" },
    { severity: Severity.WARN, message: "Cache miss" },
    { severity: Severity.ERROR, message: "Database connection timeout" },
    { severity: Severity.ERROR, message: "Failed to upload file" },
    { severity: Severity.TRACE, message: "Request entered middleware" },
    { severity: Severity.FATAL, message: "Worker process crashed" }
];
function randomItem(items) {
    const index = Math.floor(Math.random() * items.length);
    const item = items[index];
    if (item === undefined) {
        throw new Error("Cannot select a random item from an empty array");
    }
    return item;
}
async function main() {
    console.log("🌱 Seeding database...");
    await prisma.log.deleteMany();
    await prisma.source.deleteMany();
    await prisma.savedView.deleteMany();
    await prisma.app.deleteMany();
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
        data: {
            email: "admin@lookogs.local",
            passwordHash: "demo-password"
        }
    });
    const app = await prisma.app.create({
        data: {
            name: "Lookogs Demo",
            description: "Development demo application"
        }
    });
    const backendSource = await prisma.source.create({
        data: {
            name: "Backend",
            environment: "development",
            apiKeyHash: "backend-demo-key",
            appId: app.id
        }
    });
    const frontendSource = await prisma.source.create({
        data: {
            name: "Frontend",
            environment: "development",
            apiKeyHash: "frontend-demo-key",
            appId: app.id
        }
    });
    const sources = [backendSource, frontendSource];
    const logs = [];
    for (let i = 0; i < 100; i++) {
        const sample = randomItem(messages);
        const source = randomItem(sources);
        const eventTime = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));
        logs.push({
            appId: app.id,
            sourceId: source.id,
            severity: sample.severity,
            message: sample.message,
            hostname: "localhost",
            service: source.name.toLowerCase(),
            version: "1.0.0",
            eventTime,
            attributes: {
                requestId: crypto.randomUUID(),
                method: randomItem(["GET", "POST", "PUT", "DELETE"]),
                path: randomItem([
                    "/health",
                    "/api/apps",
                    "/api/logs",
                    "/api/sources"
                ]),
                status: randomItem([200, 201, 400, 401, 404, 500]),
                durationMs: Math.floor(Math.random() * 500),
                ip: `192.168.1.${Math.floor(Math.random() * 255)}`
            }
        });
    }
    await prisma.log.createMany({
        data: logs
    });
    console.log("✅ Seed completed!");
    console.log(`User: ${user.email}`);
    console.log(`App: ${app.name}`);
    console.log(`Sources: ${sources.length}`);
    console.log(`Logs: ${logs.length}`);
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map