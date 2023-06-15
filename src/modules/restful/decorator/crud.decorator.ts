import { Type } from '@nestjs/common';

/* eslint-disable new-cap */

import { BaseController } from '../base';
import { CRUD_OPTIONS_REGISTER } from '../constants';
import { CrudOptionsRegister } from '../types';

/**
 * 控制器上的CRUD装饰器
 * @param options
 */
export const Crud =
    (factory: CrudOptionsRegister) =>
        <T extends BaseController<any> >(Target: Type<T>) => {
            Reflect.defineMetadata(CRUD_OPTIONS_REGISTER, factory, Target);
        };
