import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsNotEmpty
} from 'class-validator';

import { ListQueryDto } from "@/modules/restful/dto";
import { DtoValidation } from '@/modules/core/decorator';

import { UserEntity } from '../entity';

/**
 * 用户创建验证
 */
@DtoValidation({ groups: ['create'] })
export class CreateUserDto extends UserEntity {

    @ApiProperty({ description: '账号'})
    @IsNotEmpty({ groups: ['create', 'update'], message: '请输入登录账号' })
    declare account: string;

    @ApiProperty({ description: '租户ID'})
    @IsNotEmpty({ groups: ['create', 'update'], message: '请选择所属租户' })
    declare tenantId: string;

    @ApiProperty({ description: '密码'})
    @IsNotEmpty({ groups: ['create'], message: '请输入密码' })
    @IsOptional({ groups: ['update'] })
    declare password: string;

    @ApiProperty({ description: '昵称'})
    @IsNotEmpty({ groups: ['create', 'update'], message: '请输入用户昵称' })
    declare name: string;

    @ApiProperty({ description: '用户姓名'})
    @IsNotEmpty({ groups: ['create', 'update'], message: '请输入用户姓名' })
    declare realName: string;

    @ApiProperty({ description: '角色id'})
    @IsNotEmpty({ groups: ['create', 'update'], message: '请选择所属角色' })
    declare roleId: string;

    @ApiProperty({ description: '部门id'})
    @IsNotEmpty({ groups: ['create', 'update'], message: '请选择所属部门' })
    declare deptId: string;

    @ApiProperty({ description: '岗位id'})
    @IsNotEmpty({ groups: ['create', 'update'], message: '请选择所属岗位' })
    declare postId: string;
}

/**
 * 用户更新验证
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {

}

/**
 * 用户分页查询验证
 */
export class QueryUserDto extends ListQueryDto {

}
