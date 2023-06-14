import { Injectable } from '@nestjs/common';
import { DiscordSnowflake } from '@sapphire/snowflake';
import { Md5 } from 'ts-md5';

import { UserEntity } from '../entity';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from "../dto";
import { QueryUserVo } from "../vo";
import { UserRepository, RoleRepository, DeptRepository, DictRepository } from "../repository";
import { PaginateOptions, QueryHook } from '@/modules/database/types';
import { BaseService } from "@/modules/database/base";

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {

    constructor(
        protected userRepository: UserRepository,
        protected roleRepository: RoleRepository,
        protected deptRepository: DeptRepository,
        protected dictRepository: DictRepository
    ) {
        super(userRepository);
    }

    /**
     * 新建用户，添加ValidationPipe验证管道
     */
    create(createUserDto: CreateUserDto) {
        // ID使用雪花算法
        createUserDto.id = Number(DiscordSnowflake.generate() + "");
        // 密码使用MD5加密
        createUserDto.password = Md5.hashStr(createUserDto.password);
        return this.userRepository.save(createUserDto);
    }

    list() {
        return super.list();
    }

    detail(id: number) {
        return super.detail(id);
    }

    /**
     * 更新用户，添加ValidationPipe验证管道
     */
    async update(updateUserDto: UpdateUserDto) {
        await this.userRepository.update(updateUserDto.id, updateUserDto);
        return this.detail(updateUserDto.id);
    }

    /**
     * 分页查询，验证分页参数
     */
    async pageQuery(dto: QueryUserDto) {
        // 计算skip、take值
        const skip = dto.size * (dto.page - 1);
        const take = dto.size;
        return await this.userRepository
            .createQueryBuilder("bu")
            .where("bu.isDeleted = 0")
            .skip(skip)
            .take(take)
            .getMany();
    }

    /**
     * 查询用户信息，并附带其他关联数据
     */
    async info(id: number) {
        // 先根据用户ID查询用户信息
        const userEntity = await this.detail(id);
        // 把用户的多个角色ID以","分隔，转为字符串数组
        const roleIdArray: string[] = userEntity.roleId.split(",");
        // 部门ID，同上
        const deptIdArray: string[] = userEntity.deptId.split(",");
        // 根据角色ID字符串数组查询角色名称，并返回拼接好的字符串
        let roleNameStr = await this.getRoleNameStrByRoleIdArray(roleIdArray);
        // 部门ID，同上
        let deptNameStr = await this.getDeptNameStrByDeptIdIdArray(deptIdArray);
        // 把entity转换为VO对象
        let queryUserVo = new QueryUserVo();
        Object.assign(queryUserVo, userEntity);
        // 去字典值表中查询性别value
        let dictEntity = await this.dictRepository.findOne({ where: { code: "sex", dictKey: userEntity.sex, isDeleted: 0 } });
        // 赋值
        queryUserVo.roleName = roleNameStr;
        queryUserVo.deptName = deptNameStr;
        queryUserVo.sexName = dictEntity.dictValue;
        return queryUserVo;
    }

    /**
     * 根据角色ID字符串数组查询角色名称，并返回拼接好的字符串
     */
    private async getRoleNameStrByRoleIdArray(roleIdArray: string[]) {
        // 再根据用户的角色ID数组查询角色名称
        let roleEntityArray = await this.roleRepository
            .createQueryBuilder("br")
            .where("br.id IN (:...roleIdArray) and br.isDeleted = 0", {roleIdArray: roleIdArray})
            .select("br.roleName")
            .getMany();
        // 遍历角色对象数组，拿到拼接起来的角色名称字符串
        let roleNameStr = "";
        roleEntityArray.forEach((roleEntity, index) => {
            roleNameStr += roleEntity.roleName;
            if (index != roleEntityArray.length - 1) {
                roleNameStr += ",";
            }
        });
        return roleNameStr;
    }

    /**
     * 根据部门ID字符串数组查询部门名称，并返回拼接好的字符串
     */
    private async getDeptNameStrByDeptIdIdArray(deptIdArray: string[]) {
        // 再根据用户的部门ID数组查询部门名称
        let deptEntityArray = await this.deptRepository
            .createQueryBuilder("bd")
            .where("bd.id IN (:...deptIdArray) and bd.isDeleted = 0", {deptIdArray: deptIdArray})
            .select("bd.deptName")
            .getMany();
        // 遍历部门对象数组，拿到拼接起来的部门名称字符串
        let deptNameStr = "";
        deptEntityArray.forEach((deptEntity, index) => {
            deptNameStr += deptEntity.deptName;
            if (index != deptEntityArray.length - 1) {
                deptNameStr += ",";
            }
        });
        return deptNameStr;
    }

    /**
     * 删除数据，传入ID数组
     */
    async delete(ids: number[]) {
        const userEntity = new UserEntity();
        userEntity.isDeleted = 1;
        return super.delete(ids, userEntity);
    }

    /**
     * 获取分页数据
     * @param options 分页选项
     * @param callback 添加额外的查询
     */
    async paginate(options: PaginateOptions, callback?: QueryHook<UserEntity>) {
        // if (callback) return callback(queryBuilder);
        // 调用分页函数
        return super.paginate(options, callback);
    }
}
