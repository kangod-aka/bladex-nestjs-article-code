import { Transform } from 'class-transformer';
import {
    IsOptional,
    IsNotEmpty,
    IsNumber,
    Min
} from 'class-validator';
import { toNumber } from 'lodash';

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

/**
 * 用户分页查询验证
 */
export class QueryUserDto {

    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '当前页必须大于1' })
    @IsNumber()
    @IsOptional()
    page = 1;

    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '每页显示数据必须大于1' })
    @IsNumber()
    @IsOptional()
    size = 10;
}