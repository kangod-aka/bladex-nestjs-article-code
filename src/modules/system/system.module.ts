import { ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModuleBuilder } from '../core/decorator';

import { DatabaseModule } from '../database/database.module';

import * as entities from './entity';
import * as repositories from './repository';
import * as services from './service';
import { UserService } from './service';
import { UserSubscriber } from './subscriber';
import { UserRepository, RoleRepository, DeptRepository, DictRepository } from "./repository";

@ModuleBuilder(async (configure) => {
    const providers: ModuleMetadata['providers'] = [
        ...Object.values(services),
        UserSubscriber,
        {
            provide: UserService,
            inject: [
                UserRepository,
                RoleRepository,
                DeptRepository,
                DictRepository
            ],
            useFactory(
                userRepository: UserRepository,
                roleRepository: RoleRepository,
                deptRepository: DeptRepository,
                dictRepository: DictRepository
            ) {
                return new UserService(
                    userRepository,
                    roleRepository,
                    deptRepository,
                    dictRepository
                );
            },
        },
    ];
    return {
        imports: [
            TypeOrmModule.forFeature(Object.values(entities)),
            DatabaseModule.forRepository(Object.values(repositories)),
        ],
        providers,
        exports: [
            ...Object.values(services),
            UserService,
            DatabaseModule.forRepository(Object.values(repositories)),
        ],
    };
})
export class SystemModule {}
