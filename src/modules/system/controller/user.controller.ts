import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from "@/modules/restful/base";
import { Crud, Depends } from "@/modules/restful/decorator";
import { createHookOption } from '@/modules/restful/helpers';
import { SystemModule } from "@/modules/system/system.module";

import { UserService } from '../service';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from "../dto";

@ApiTags('用户')
@Depends(SystemModule)
@Crud(async () => ({
    id: 'user',
    enabled: [
        {
            name: 'list',
            option: createHookOption('用户查询，以分页模式展示'),
        },
        {
            name: 'detail',
            option: createHookOption('用户详情'),
        },
        {
            name: 'create',
            option: createHookOption('新建用户'),
        },
        {
            name: 'update',
            option: createHookOption('更新用户'),
        },
        {
            name: 'delete',
            option: createHookOption('删除用户'),
        },
    ],
    dto: {
        create: CreateUserDto,
        update: UpdateUserDto,
        list: QueryUserDto,
    },
}))
@Controller('user')
export class UserController extends BaseController<UserService> {
    constructor(private readonly userService: UserService) {
        super(userService);
    }

    /**
     * 查询用户信息，并附带其他关联数据
     */
    @Get("info/:id")
    info(@Param('id') id: number) {
        return this.userService.info(id);
    }

}
