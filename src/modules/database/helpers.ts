import { resolve } from 'path';
import { isNil } from 'lodash';
import { ObjectLiteral, SelectQueryBuilder, DataSource, ObjectType, Repository } from 'typeorm';

import { CUSTOM_REPOSITORY_METADATA } from './constants';

import { Configure } from '../core/configure';
import { EnvironmentType } from '../core/constants';
import { deepMerge, createConnectionOptions } from '../core/helper';
import { ConfigureFactory, ConfigureRegister } from '../core/types';

import {
    DbConfig,
    DbConfigOptions,
    OrderQueryType,
    PaginateOptions,
    PaginateReturn,
} from './types';

/**
 * 创建数据库配置
 * @param options 自定义配置
 */
export const createDbOptions = (configure: Configure, options: DbConfigOptions) => {
    const newOptions: DbConfigOptions = {
        common: deepMerge(
            {
                charset: 'utf8mb4',
                logging: ['error'],
                migrations: [],
                paths: {
                    migration: resolve(__dirname, '../../database/migrations'),
                },
            },
            options.common ?? {},
            'replace',
        ),
        connections: createConnectionOptions(options.connections ?? []),
    };
    newOptions.connections = newOptions.connections.map((connection) => {
        const entities = connection.entities ?? [];
        const newOption = { ...connection, entities };
        return deepMerge(
            newOptions.common,
            {
                ...newOption,
                synchronize: configure.getRunEnv() !== EnvironmentType.PRODUCTION,
                autoLoadEntities: true,
            } as any,
            'replace',
        );
    });
    return newOptions as DbConfig;
};

export const createDbConfig: (
    register: ConfigureRegister<RePartial<DbConfigOptions>>,
) => ConfigureFactory<DbConfigOptions, DbConfig> = (register) => ({
    register,
    hook: (configure, value) => createDbOptions(configure, value),
    defaultRegister: () => ({
        common: {
            charset: 'utf8mb4',
            logging: ['error'],
        },
        connections: [],
    }),
});

/**
 * 分页函数
 * @param queryBuilder 接收复用的SelectQueryBuilder
 * @param options 分页选项
 */
export const paginate = async <E extends ObjectLiteral>
        (queryBuilder: SelectQueryBuilder<E>, options: PaginateOptions): Promise<PaginateReturn<E>> => {
    // 计算take和skip的值，并查询分页数据
    const start = options.page > 0 ? options.page - 1 : 0;
    queryBuilder.take(options.size).skip(start * options.size);
    const items = await queryBuilder.getMany();
    // 查询数据总条数
    const totalItems = await queryBuilder.getCount();
    // 计算总页数
    const totalPages = Math.ceil(totalItems / options.size);
    // 计算当前页项目数量
    const remainder = totalItems % options.size !== 0 ? totalItems % options.size : options.size;
    const itemCount = options.page < totalPages ? options.size : remainder;
    return {
        items,
        meta: {
            totalItems,
            itemCount,
            size: options.size,
            totalPages,
            page: options.page,
        },
    };
};

/**
 * 为查询添加排序,默认排序规则为DESC
 * @param qb 原查询
 * @param alias 别名
 * @param orderBy 查询排序
 */
export const getOrderByQuery = <E extends ObjectLiteral>(
    qb: SelectQueryBuilder<E>,
    alias: string,
    orderBy?: OrderQueryType,
) => {
    if (isNil(orderBy)) return qb;
    if (typeof orderBy === 'string') return qb.orderBy(`${alias}.${orderBy}`, 'DESC');
    if (Array.isArray(orderBy)) {
        const i = 0;
        for (const item of orderBy) {
            if (i === 0) {
                typeof item === 'string'
                    ? qb.orderBy(`${alias}.${item}`, 'DESC')
                    : qb.orderBy(`${alias}.${item}`, item.order);
            } else {
                typeof item === 'string'
                    ? qb.addOrderBy(`${alias}.${item}`, 'DESC')
                    : qb.addOrderBy(`${alias}.${item}`, item.order);
            }
        }
        return qb;
    }
    return qb.orderBy(`${alias}.${(orderBy as any).name}`, (orderBy as any).order);
};

/**
 * 获取自定义Repository的实例
 * @param dataSource 数据连接池
 * @param Repo repository类
 */
export const getCustomRepository = <T extends Repository<E>, E extends ObjectLiteral>(
    dataSource: DataSource,
    Repo: ClassType<T>,
): T => {
    if (isNil(Repo)) return null;
    const entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, Repo);
    if (!entity) return null;
    const base = dataSource.getRepository<ObjectType<any>>(entity);
    return new Repo(base.target, base.manager, base.queryRunner) as T;
};
