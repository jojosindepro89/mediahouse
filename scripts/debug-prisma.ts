
import { PrismaClient } from '@prisma/client';

console.log('PRISMA_CLIENT_ENGINE_TYPE:', process.env.PRISMA_CLIENT_ENGINE_TYPE);
console.log('NODE_ENV:', process.env.NODE_ENV);

try {
    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });
    console.log('PrismaClient initialized successfully.');

    // Try to connect
    prisma.$connect().then(() => {
        console.log('PrismaClient connected successfully.');
        process.exit(0);
    }).catch((e) => {
        console.error('Connection failed:', e);
        process.exit(1);
    });

} catch (e) {
    console.error('Initialization failed:', e);
    process.exit(1);
}
