import { Controller, Param, Get } from '@nestjs/common';

import { UserService } from '../service';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from "../dto";
import { BaseController } from "@/modules/restful/base";
import { Crud } from "@/modules/restful/decorator";

@Crud({
    id: 'user',
    enabled: ['list', 'detail', 'create', 'update', 'delete'],
    dto: {
        list: QueryUserDto,
        create: CreateUserDto,
        update: UpdateUserDto,
    },
})

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
