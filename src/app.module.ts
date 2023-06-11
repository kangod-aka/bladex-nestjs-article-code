import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { database } from './config';
import { DatabaseModule } from './modules/database/database.module';
import { SystemModule } from './modules/system/system.module';
import { AppPipe } from './modules/core/provider';

@Module({
  imports: [DatabaseModule.forRoot(database), SystemModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new AppPipe({
        transform: true,
        forbidUnknownValues: true,
        validationError: { target: false },
      }),
    }
  ],
})
export class AppModule {}