import { Pool } from 'pg';

export interface ConnectionOptions {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class Connection {
    private pool: Pool;

    constructor(private options: ConnectionOptions) {
        this.pool = new Pool({
            host: options.host,
            port: options.port,
            user: options.username,
            password: options.password,
            database: options.database,
        });
    }

    async query(queryText: string, params?: any[]): Promise<any> {
        const client = await this.pool.connect();
        try {
            const res = await client.query(queryText, params);
            return res.rows;
        } finally {
            client.release();
        }
    }

    async close() {
        await this.pool.end();
    }
}

export async function createConnection(options: ConnectionOptions): Promise<Connection> {
    const connection = new Connection(options);
    // Here you can add additional initialization logic if needed
    return connection;
}
