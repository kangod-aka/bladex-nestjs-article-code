import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { bootApp, createApp } from '@/modules/core/helper/app';

import * as configs from './config';

import { SystemModule } from './modules/system/system.module';

bootApp(
    createApp({
        configs,
        configure: { storage: true },
        modules: [SystemModule],
        builder: async ({ configure, BootModule }) => {
            return NestFactory.create<NestFastifyApplication>(BootModule, new FastifyAdapter(), {
                cors: true,
                logger: ['log', 'error', 'warn'],
            });
        },
    }),
);
