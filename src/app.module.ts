import { Module } from '@nestjs/common';
import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { database } from './config';
import { DatabaseModule } from './modules/database/database.module';
import { SystemModule } from './modules/system/system.module';
import { AppPipe, AppIntercepter, AppFilter } from './modules/core/provider';

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
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppIntercepter,
    },
    {
      provide: APP_FILTER,
      useClass: AppFilter,
    },
  ],
})
export class AppModule {}