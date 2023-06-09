import { Module } from '@nestjs/common';

import { database } from './config';
import { DatabaseModule } from './modules/database/database.module';
import { SystemModule } from './modules/system/system.module';

@Module({
  // 注册数据库模块以及其他模块
  imports: [DatabaseModule.forRoot(database), SystemModule]
})
export class AppModule {}