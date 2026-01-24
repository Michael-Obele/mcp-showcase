import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const DATABASE_URL = env.DATABASE_URL || process.env.DATABASE_URL;

/**
 * Creates a mock Prisma client that avoids crashing when no database is configured.
 */
const createMockPrisma = () => {
	console.warn('⚠️ DATABASE_URL is missing. Database features will be disabled (mocked).');
	return {
		checklistItem: {
			findMany: async () => [],
			upsert: async () => ({}),
			deleteMany: async () => ({}),
			findFirst: async () => null,
			findUnique: async () => null,
			update: async () => ({}),
			create: async () => ({}),
			delete: async () => ({})
		},
		$connect: async () => {},
		$disconnect: async () => {}
	} as unknown as PrismaClient;
};

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const databaseEnabled = !!DATABASE_URL;

export const prisma =
	globalForPrisma.prisma ?? (DATABASE_URL ? new PrismaClient() : createMockPrisma());

if (process.env.NODE_ENV !== 'production' && DATABASE_URL) {
	globalForPrisma.prisma = prisma;
}
