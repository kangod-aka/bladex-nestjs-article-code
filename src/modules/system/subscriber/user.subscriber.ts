import { DataSource, EventSubscriber } from 'typeorm';

import { BaseSubscriber } from '@/modules/database/base';

import { UserEntity } from '../entity';
import { UserRepository } from '../repository';

/**
 * 用户模型观察者
 */
@EventSubscriber()
export class UserSubscriber extends BaseSubscriber<UserEntity> {

    constructor(
        protected dataSource: DataSource,
        protected userRepository: UserRepository
    ) {
        super(dataSource);
    }

    protected entity = UserEntity;

    listenTo() {
        return UserEntity;
    }

    /**
     * 控制台打印用户密码过短的警告
     */
    async afterLoad(entity: UserEntity) {
        if (!entity.password === undefined) {
            if (entity.password.length  < 32) {
                console.log("ID=" + entity.id + "的用户，密码未加密成功");
            }
        }
    }

}
