import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'tp1',
    entities: ["dist/**/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
}
