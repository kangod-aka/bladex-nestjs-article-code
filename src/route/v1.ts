import * as systemControllers from '@/modules/system/controller';
import { Configure } from '@/modules/core/configure';
import { ApiVersionOption } from '@/modules/restful/types';

export const v1 = async (configure: Configure): Promise<ApiVersionOption> => ({
    routes: [
        {
            name: 'app',
            path: '/',
            controllers: [],
            doc: {
                title: '应用接口',
                description: 'CMS系统的应用接口',
                tags: [
                    { name: '用户', description: '用户的增删查改操作' },
                ],
            },
            children: [
                {
                    name: 'system',
                    path: 'system',
                    controllers: Object.values(systemControllers),
                },
            ],
        },
    ],
});
