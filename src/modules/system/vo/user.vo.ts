import { PartialType } from '@nestjs/swagger';
import {UserEntity} from "../entity";

export class QueryUserVo extends PartialType(UserEntity) {

    /**
     * 角色名称
     */
    roleName: string;
    /**
     * 部门名称
     */
    deptName: string;
    /**
     * 性别-字典值
     */
    sexName: string;

}