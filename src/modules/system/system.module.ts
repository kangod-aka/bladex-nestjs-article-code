import { DynamicModule, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';

import * as controllers from './controller';
import * as entities from './entity';
import * as repositories from './repository';
import * as services from './service';
import { UserService } from './service';
import { UserSubscriber } from './subscriber';
import { UserRepository, RoleRepository, DeptRepository, DictRepository } from "./repository";

export class SystemModule {
    static forRoot(): DynamicModule {
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
            module: SystemModule,
            imports: [
                TypeOrmModule.forFeature(Object.values(entities)),
                DatabaseModule.forRepository(Object.values(repositories)),
            ],
            controllers: Object.values(controllers),
            providers,
            exports: [
                ...Object.values(services),
                UserService,
                DatabaseModule.forRepository(Object.values(repositories)),
            ],
        };
    }
}
