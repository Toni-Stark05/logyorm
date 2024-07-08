import { Module, DynamicModule, Global } from '@nestjs/common';
import { createConnection, ConnectionOptions, Connection } from './core/connection';
import { LogyOrmService } from './logyorm.service';

@Global()
@Module({})
export class LogyOrmModule {
    static forRoot(options: ConnectionOptions): DynamicModule {
        const connectionProvider = {
            provide: 'DATABASE_CONNECTION',
            useFactory: async () => await createConnection(options),
        };

        return {
            module: LogyOrmModule,
            providers: [connectionProvider, LogyOrmService],
            exports: [LogyOrmService],
        };
    }
}
