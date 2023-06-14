import { BaseRepository } from '@/modules/database/base';

import { CustomRepository } from '@/modules/database/decorator';

import { DictEntity } from '../entity';

@CustomRepository(DictEntity)
export class DictRepository extends BaseRepository<DictEntity> {

    qbName = 'dict';

}
