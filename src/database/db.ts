import mongoose from 'mongoose';
import {logger} from '@/utils';

const database = process.env.MONGO_INITDB_DATABASE;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

if (!database || !host || !port) {
    logger.error('Missing MongoDB environment variables');
    process.exit(1);
}

export const mongoUrl = `mongodb://${host}:${port}/${database}`;

const initializeMongoServer = async () => {
    logger.info('Connecting to MongoDB...');
    await mongoose.connect(mongoUrl);
};

export default initializeMongoServer;
