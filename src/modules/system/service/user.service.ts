import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscordSnowflake } from '@sapphire/snowflake';
import { Md5 } from 'ts-md5';

import { Repository } from 'typeorm';
import { UserEntity } from '../entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) protected userRepository: Repository<UserEntity>) {}

    create(userEntity: UserEntity) {
        // ID使用雪花算法
        userEntity.id = Number(DiscordSnowflake.generate() + "");
        // 密码使用MD5加密
        userEntity.password = Md5.hashStr(userEntity.password);
        return this.userRepository.save(userEntity);
    }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

    async update(id: number, userEntity: UserEntity) {
        await this.userRepository.update(id, userEntity);
        return this.findOne(id);
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }
}
