import { exit } from 'process';

import { DynamicModule, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, ObjectType } from 'typeorm';

import { ModuleBuilder } from '../core/decorator';

import { CUSTOM_REPOSITORY_METADATA } from './constants';
import { DataExistConstraint, UniqueExistContraint, UniqueConstraint } from './constraint';
import { DbConfig } from './types';

@ModuleBuilder(async (configure) => {
    const imports: ModuleMetadata['imports'] = [];

    if (!configure.has('database')) {
        throw new Error('Database config not exists or not right!');
        exit(1);
    }
    const { connections } = await configure.get<DbConfig>('database');
    for (const dbOption of connections) {
        imports.push(TypeOrmModule.forRoot(dbOption as TypeOrmModuleOptions));
    }
    const providers: ModuleMetadata['providers'] = [
        DataExistConstraint,
        UniqueConstraint,
        UniqueExistContraint,
    ];
    return {
        global: true,
        imports,
        providers,
    };
})
export class DatabaseModule {
    /**
     * 注册自定义Repository
     * @param repositories 需要注册的自定义类列表
     * @param dataSourceName 数据池名称,默认为默认连接
     */
    static forRepository<T extends Type<any>>(
        repositories: T[],
        dataSourceName?: string,
    ): DynamicModule {
        const providers: Provider[] = [];

        for (const Repo of repositories) {
            const entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, Repo);

            if (!entity) {
                continue;
            }

            providers.push({
                inject: [getDataSourceToken(dataSourceName)],
                provide: Repo,
                useFactory: (dataSource: DataSource): InstanceType<typeof Repo> => {
                    const base = dataSource.getRepository<ObjectType<any>>(entity);
                    return new Repo(base.target, base.manager, base.queryRunner);
                },
            });
        }

        return {
            exports: providers,
            module: DatabaseModule,
            providers,
        };
    }
}
