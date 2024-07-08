import { Injectable, Inject } from '@nestjs/common';
import { Connection } from './core/connection';

@Injectable()
export class LogyOrmService {
    constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) {}

    getConnection(): Connection {
        return this.connection;
    }

    async query(queryText: string, params?: any[]): Promise<any> {
        return this.connection.query(queryText, params);
    }
}
