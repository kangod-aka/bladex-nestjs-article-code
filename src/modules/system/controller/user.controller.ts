import { Controller, Param, Body, Query, Get, Post, Put, Delete, ValidationPipe } from '@nestjs/common';

import { UserService } from '../service';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from "../dto";
import { DeleteDto } from '@/modules/restful/dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }

    /**
     * 新建用户，添加ValidationPipe验证管道
     */
    @Post()
    create(@Body(
        new ValidationPipe({
            transform: true, // 验证之后对数据进行序列化
            forbidUnknownValues: true, // 禁止未定义属性，报错403
            validationError: { target: false }, // 响应数据隐藏验证类
            groups: ['create'], // 设置验证组
        }),
    ) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }



    /**
     * 更新用户，添加ValidationPipe验证管道
     */
    @Put(':id')
    update(@Param('id') id: number,
           @Body(new ValidationPipe({
                   transform: true,
                   forbidUnknownValues: true,
                   validationError: { target: false },
                   groups: ['update'],
               }),
           ) updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    /**
     * 分页查询，验证分页参数
     */
    @Get("pageQuery")
    async pageQuery(@Query(
            new ValidationPipe({
                transform: true,
                forbidUnknownValues: true,
                validationError: { target: false },
            }),
        ) queryUserDto: QueryUserDto) {
        return await this.userService.pageQuery(queryUserDto);
    }

    /**
     * 查询用户信息，并附带其他关联数据
     */
    @Get("info/:id")
    info(@Param('id') id: number) {
        return this.userService.info(id);
    }

    /**
     * 批量删除（软删除），传入ID数组
     */
    @Delete()
    async delete(@Body() data: DeleteDto) {
        return this.userService.removeForBatch(data.ids);
    }
}
