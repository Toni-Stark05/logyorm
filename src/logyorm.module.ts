import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { createConnection, ConnectionOptions, Connection } from './core/connection';
import { LogyOrmService } from './logyorm.service';

export interface LogyOrmModuleAsyncOptions {
    useFactory: (...args: any[]) => Promise<ConnectionOptions> | ConnectionOptions;
    inject?: any[];
}

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

    static forRootAsync(options: LogyOrmModuleAsyncOptions): DynamicModule {
        const connectionProvider: Provider = {
            provide: 'DATABASE_CONNECTION',
            useFactory: async (...args: any[]) => {
                const connectionOptions = await options.useFactory(...args);
                return await createConnection(connectionOptions);
            },
            inject: options.inject || [],
        };

        return {
            module: LogyOrmModule,
            providers: [connectionProvider, LogyOrmService],
            exports: [LogyOrmService],
        };
    }
}
