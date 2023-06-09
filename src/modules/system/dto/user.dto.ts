import {
    IsOptional,
    IsNotEmpty
} from 'class-validator';

import { UserEntity } from '../entity';

/**
 * 用户创建验证
 */
export class CreateUserDto extends UserEntity {

    @IsNotEmpty({ groups: ['create', 'update'], message: '请输入登录账号' })
    account: string;

    @IsNotEmpty({ groups: ['create', 'update'], message: '请选择所属租户' })
    tenantId: string;

    @IsNotEmpty({ groups: ['create'], message: '请输入密码' })
    @IsOptional({ groups: ['update'] })
    password: string;

    @IsNotEmpty({ groups: ['create', 'update'], message: '请输入用户昵称' })
    name: string;

    @IsNotEmpty({ groups: ['create', 'update'], message: '请输入用户姓名' })
    realName: string;

    @IsNotEmpty({ groups: ['create', 'update'], message: '请选择所属角色' })
    roleId: string;

    @IsNotEmpty({ groups: ['create', 'update'], message: '请选择所属部门' })
    deptId: string;

    @IsNotEmpty({ groups: ['create', 'update'], message: '请选择所属岗位' })
    postId: string;
}