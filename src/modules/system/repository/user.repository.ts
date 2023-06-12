import { BaseRepository } from '@/modules/database/base';

import { CustomRepository } from '@/modules/database/decorator';

import { UserEntity } from '../entity';

@CustomRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {

    qbName = 'user';

}
