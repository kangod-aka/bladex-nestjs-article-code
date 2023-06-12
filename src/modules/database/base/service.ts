import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { paginate } from '../helpers';
import { QueryHook, PaginateReturn, PaginateOptions } from '../types';

import { BaseRepository } from './repository';

/**
 *  CURD操作服务
 */
export abstract class BaseService<
    E extends ObjectLiteral,
    R extends BaseRepository<E>
> {
    /**
     * 服务默认存储类
     */
    protected repository: R;

    /**
     * 是否开启软删除功能
     */
    protected enableTrash = true;

    constructor(repository: R) {
        this.repository = repository;
        if (!(this.repository !instanceof BaseRepository)) {
            throw new Error('Repository must instance of BaseRepository in DataService!');
        }
    }

    /**
     * 获取数据列表
     * @param callback 回调查询
     */
    async findAll(callback?: QueryHook<E>): Promise<E[]> {
        const queryBuilder = await this.buildListQB(this.repository.buildBaseQB(), callback);
        return queryBuilder.getMany();
    }

    /**
     * 获取分页数据
     * @param options 分页选项
     * @param callback 回调查询
     */
    async paginate(
        options?: PaginateOptions,
        callback?: QueryHook<E>,
    ): Promise<PaginateReturn<E>> {
        const qb = await this.buildListQB(this.repository.buildBaseQB(), callback);
        return paginate(qb, options);
    }

    /**
     * 获取数据详情
     * @param id
     * @param callback 回调查询
     */
    async detail(id: number, callback?: QueryHook<E>): Promise<E> {
        const qb = await this.buildItemQB(id, this.repository.buildBaseQB(), callback);
        const item = await qb.getOne();
        if (!item) throw new NotFoundException(`${this.repository.qbName} ${id} not exists!`);
        return item;
    }

    /**
     * 创建数据,如果子类没有实现则抛出404
     * @param data 请求数据
     * @param others 其它参数
     */
    create(data: any, ...others: any[]): Promise<E> {
        throw new ForbiddenException(`Can not to create ${this.repository.qbName}!`);
    }

    /**
     * 更新数据,如果子类没有实现则抛出404
     * @param data 请求数据
     * @param others 其它参数
     */
    update(data: any, ...others: any[]): Promise<E> {
        throw new ForbiddenException(`Can not to update ${this.repository.qbName}!`);
    }

    /**
     * 批量删除数据
     */
    async deleteBatch(ids: number[], options: E) {
        if (this.enableTrash) {
            // 软删除，只修改isDeleted的值
            console.log("opt="+options);
            return this.repository.update(ids, options);
        } else {
            // 硬删除，就直接删除数据
            return this.repository.delete(ids);
        }
    }

    /**
     * 获取查询单个项目的QueryBuilder
     * @param id 查询数据的ID
     * @param qb querybuilder实例
     * @param callback 查询回调
     */
    protected async buildItemQB(id: number, qb: SelectQueryBuilder<E>, callback?: QueryHook<E>) {
        qb.where(`${this.repository.qbName}.id = :id`, { id });
        if (callback) return callback(qb);
        return qb;
    }

    /**
     * 获取查询数据列表的 QueryBuilder
     * @param queryBuilder querybuilder实例
     * @param callback 查询回调
     */
    protected async buildListQB(queryBuilder: SelectQueryBuilder<E>, callback?: QueryHook<E>) {
        const queryName = this.repository.qbName;
        // 如果开启了软删除，就查询未删除的数据；如果没开启软删除，就正常查询所有
        if (this.enableTrash) {
            queryBuilder.where(`${queryName}.isDeleted = 0`);
        }
        if (callback) return callback(queryBuilder);
        return queryBuilder;
    }
}
