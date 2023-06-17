import { DataSource, EntityManager } from 'typeorm';

import { UserEntity } from '@/modules/system/entity';

import { BaseSeeder } from '@/modules/database/base';

import { DbFactory } from '@/modules/database/types';

import { UserData, users } from '../factory/system.data';

export default class SystemSeeder extends BaseSeeder {
    protected truncates = [UserEntity];

    protected factorier!: DbFactory;

    async run(_factorier: DbFactory, _dataSource: DataSource, _em: EntityManager): Promise<any> {
        this.factorier = _factorier;
        await this.loadUsers(users);
    }

    private async loadUsers(data: UserData[]) {
        // ...
    }
}
