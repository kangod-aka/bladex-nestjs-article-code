import { Faker } from '@faker-js/faker';
import { DiscordSnowflake } from '@sapphire/snowflake';
import { Md5 } from 'ts-md5';
import {
    DEFAULT_USER_PASSWORD,
    DEFAULT_USER_TENANT_ID,
    DEFAULT_USER_ROLE_ID,
    DEFAULT_USER_DEPT_ID,
    DEFAULT_USER_POST_ID
} from "@/modules/restful/constants";

import { UserEntity, RoleEntity, DeptEntity } from '@/modules/system/entity';
import { defineFactory } from '@/modules/database/helpers';

export type IUserFactoryOptions = Partial<{
    title: string;
    summary: string;
    body: string;
    isPublished: boolean;
    roleArray: RoleEntity[];
    deptArray: DeptEntity[];
}>;
export const SystemFactory = defineFactory(
    UserEntity,
    async (faker: Faker, options: IUserFactoryOptions) => {
        const user = new UserEntity();
        const randomNum = Math.floor(Math.random() * 100);
        user.id = Number(DiscordSnowflake.generate() + "");
        user.account = 'test00' + randomNum;
        user.tenantId = DEFAULT_USER_TENANT_ID;
        user.password = Md5.hashStr(DEFAULT_USER_PASSWORD);
        user.name = 'test00' + randomNum;
        user.realName = 'test00' + randomNum;
        user.roleId = DEFAULT_USER_ROLE_ID;
        user.deptId = DEFAULT_USER_DEPT_ID;
        user.postId = DEFAULT_USER_POST_ID;
        return user;
    },
);
