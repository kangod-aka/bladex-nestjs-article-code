import { BaseRepository } from '@/modules/database/base';

import { CustomRepository } from '@/modules/database/decorator';

import { RoleEntity } from '../entity';

@CustomRepository(RoleEntity)
export class RoleRepository extends BaseRepository<RoleEntity> {

    qbName = 'role';

}
