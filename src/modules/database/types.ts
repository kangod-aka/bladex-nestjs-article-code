import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { SelectQueryBuilder, ObjectLiteral, Repository } from 'typeorm';

import { BaseRepository } from './base/repository';
import { OrderType } from './constants';

/**
 * 自定义数据库配置
 */
export type DbConfigOptions = {
    common: Record<string, any>;
    connections: Array<TypeOrmModuleOptions>;
};

/**
 * 最终数据库配置
 */
export type DbConfig = Record<string, any> & {
    common: Record<string, any>;
    connections: TypeormOption[];
};

/**
 * Typeorm连接配置
 */
export type TypeormOption = Omit<TypeOrmModuleOptions, 'name' | 'migrations'> & {
    name: string;
};

/**
 * 分页原数据
 */
export interface PaginateMeta {
    /**
     * 当前页项目数量
     */
    itemCount: number;
    /**
     * 项目总数量
     */
    totalItems?: number;
    /**
     * 每页显示数量
     */
    size: number;
    /**
     * 总页数
     */
    totalPages?: number;
    /**
     * 当前页数
     */
    page: number;
}
/**
 * 分页选项
 */
export interface PaginateOptions {
    /**
     * 当前页数
     */
    page: number;
    /**
     * 每页显示数量
     */
    size: number;
}

/**
 * 分页返回数据
 */
export interface PaginateReturn<E extends ObjectLiteral> {
    meta: PaginateMeta;
    items: E[];
}

/**
 * 为queryBuilder添加查询的回调函数接口
 */
export type QueryHook<Entity> = (qb: SelectQueryBuilder<Entity>) => Promise<SelectQueryBuilder<Entity>>;

/**
 * 排序类型,{字段名称: 排序方法}
 * 如果多个值则传入数组即可
 * 排序方法不设置,默认DESC
 */
export type OrderQueryType =
    | string
    | { name: string; order: `${OrderType}` }
| Array<{ name: string; order: `${OrderType}` } | string>;

    /**
     * 数据列表查询类型
     */
export interface QueryParams<E extends ObjectLiteral> {
addQuery?: QueryHook<E>;
orderBy?: OrderQueryType;
withTrashed?: boolean;
onlyTrashed?: boolean;
}

    /**
     * Repository类型
     */
export type RepositoryType<E extends ObjectLiteral> =
| Repository<E>
| BaseRepository<E>;
