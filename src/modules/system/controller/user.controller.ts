import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { UserService } from '../service';
import { UserEntity } from '../entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() userEntity: UserEntity) {
        return this.userService.create(userEntity);
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
