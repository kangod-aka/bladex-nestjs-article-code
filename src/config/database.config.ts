import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * 数据库配置
 */
export const database = (): TypeOrmModuleOptions => ({
    charset: 'utf8mb4',
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'blade',
    synchronize: false, // true：自动同步数据表
    autoLoadEntities: false, // true：可以使用TypeOrmModule.forFeature来动态的加入Entity
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    // logging: ['error'], // 打印error级别的SQL
    logging: true // true：打印SQL
});
