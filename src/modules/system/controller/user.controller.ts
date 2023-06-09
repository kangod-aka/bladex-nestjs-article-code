import { Controller, Param, Body, Get, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { UserService } from '../service';
import { UserEntity } from '../entity';
import { CreateUserDto } from "../dto";

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

    @Put(':id')
    update(@Param('id') id: number, @Body() userEntity: UserEntity) {
        return this.userService.update(id, userEntity);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
