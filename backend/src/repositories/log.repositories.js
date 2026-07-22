import { prisma } from '../lib/prisma.js';
export class LogRepository {
    prisma = prisma;
    /**
     * Bulk inserts parsed log lines.
     * Note: Server sets ingestTime automatically, client payload provides eventTime.
     */
    async createMany(input) {
        const { appId, sourceId, logs } = input;
        const ingestTime = new Date();
        const data = logs.map((log) => ({
            appId,
            sourceId,
            message: log.message,
            // cast severity to the Prisma enum type if it's a string
            severity: log.severity,
            eventTime: log.eventTime,
            ingestTime,
            attributes: log.attributes,
        }));
        const result = await this.prisma.log.createMany({
            data,
        });
        return result.count;
    }
    /**
     * Fetches logs using cursor pagination (eventTime + id) scoped strictly to an appId.
     */
    async findMany(query) {
        const { appId, severity, sourceId, search, startTime, endTime, cursor, limit = 50 } = query;
        const where = { appId };
        if (severity)
            where.severity = severity;
        if (sourceId)
            where.sourceId = sourceId;
        if (search) {
            where.message = {
                contains: search,
                mode: 'insensitive',
            };
        }
        if (startTime || endTime) {
            where.eventTime = {};
            if (startTime)
                where.eventTime.gte = startTime;
            if (endTime)
                where.eventTime.lte = endTime;
        }
        // Cursor pagination logic (eventTime DESC, id DESC)
        if (cursor) {
            where.OR = [
                { eventTime: { lt: cursor.eventTime } },
                {
                    eventTime: cursor.eventTime,
                    id: { lt: cursor.id },
                },
            ];
        }
        const logs = await this.prisma.log.findMany({
            where,
            orderBy: [
                { eventTime: 'desc' },
                { id: 'desc' },
            ],
            take: limit,
        });
        return logs;
    }
    async findById(appId, id) {
        return this.prisma.log.findFirst({
            where: { id, appId },
        });
    }
}
//# sourceMappingURL=log.repositories.js.map