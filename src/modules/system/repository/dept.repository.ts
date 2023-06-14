import { BaseRepository } from '@/modules/database/base';

import { CustomRepository } from '@/modules/database/decorator';

import { DeptEntity } from '../entity';

@CustomRepository(DeptEntity)
export class DeptRepository extends BaseRepository<DeptEntity> {

    qbName = 'dept';

}
