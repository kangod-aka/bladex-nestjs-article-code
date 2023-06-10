import { Controller, Param, Body, Query, Get, Post, Put, Delete, ValidationPipe } from '@nestjs/common';

import { UserService } from '../service';
import { UserEntity } from '../entity';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from "../dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
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

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
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
}
