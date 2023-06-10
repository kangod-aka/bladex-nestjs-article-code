import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controller';
import { UserService } from './service';
import { UserEntity, DeptEntity, RoleEntity, DictEntity} from './entity';

@Module({
    imports: [
        // 在TypeOrm中注册entity成为repository
        TypeOrmModule.forFeature([UserEntity, RoleEntity, DeptEntity, DictEntity]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class SystemModule {}
