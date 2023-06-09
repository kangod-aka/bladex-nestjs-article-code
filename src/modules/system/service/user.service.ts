import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from '../entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) protected userRepository: Repository<UserEntity>) {}

    create(userEntity: UserEntity) {
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
