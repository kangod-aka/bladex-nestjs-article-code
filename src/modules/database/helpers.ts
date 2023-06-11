import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { PaginateOptions, PaginateReturn } from './types';

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
