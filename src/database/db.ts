import {MongoClient} from 'mongodb';

const database = process.env.MONGO_INITDB_DATABASE;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

if (!database || !host || !port) {
    console.error('Missing MongoDB environment variables');
    process.exit(1);
}

const client = new MongoClient(`mongodb://${host}:${port}/${database}`);
const db = client.db(database);

try {
    client.connect().then(() => console.log('Connected to MongoDB'));
} catch (error) {
    console.error('Failed to connect to MongoDB:', error);
}

export default db;
