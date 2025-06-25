import logger from '@/utils/logger';
import {MongoClient} from 'mongodb';

const database = process.env.MONGO_INITDB_DATABASE;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

if (!database || !host || !port) {
    logger.error('Missing MongoDB environment variables');
    process.exit(1);
}

const client = new MongoClient(`mongodb://${host}:${port}/${database}`);
const db = client.db(database);

try {
    logger.info('Connecting to MongoDB...');
    client.connect().then(() => logger.info('Connected to MongoDB'));
} catch (error) {
    logger.error(error, 'Failed to connect to MongoDB');
}

export default db;
