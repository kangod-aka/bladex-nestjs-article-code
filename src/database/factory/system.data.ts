import { DiscordSnowflake } from '@sapphire/snowflake';
import { Md5 } from 'ts-md5';
import {
    DEFAULT_USER_PASSWORD,
    DEFAULT_USER_TENANT_ID,
    DEFAULT_USER_ROLE_ID,
    DEFAULT_USER_DEPT_ID,
    DEFAULT_USER_POST_ID
} from "@/modules/restful/constants";

export interface UserData {
    id: number;
    account: string;
    tenantId: string;
    password: string;
    name: string;
    realName: string;
    roleId: string;
    deptId: string;
    postId: string;
}

export const users: UserData[] = [
    {
        id: Number(DiscordSnowflake.generate() + ""),
        account: 'lvmt',
        tenantId: DEFAULT_USER_TENANT_ID,
        password: Md5.hashStr(DEFAULT_USER_PASSWORD),
        name: '吕萌甜',
        realName: '吕萌甜',
        roleId: DEFAULT_USER_ROLE_ID,
        deptId: DEFAULT_USER_DEPT_ID,
        postId: DEFAULT_USER_POST_ID,
    },
    {
        id: Number(DiscordSnowflake.generate() + ""),
        account: 'konghs',
        tenantId: DEFAULT_USER_TENANT_ID,
        password: Md5.hashStr(DEFAULT_USER_PASSWORD),
        name: '孔和尚',
        realName: '孔和尚',
        roleId: DEFAULT_USER_ROLE_ID,
        deptId: DEFAULT_USER_DEPT_ID,
        postId: DEFAULT_USER_POST_ID,
    },
    {
        id: Number(DiscordSnowflake.generate() + ""),
        account: 'yangyq',
        tenantId: DEFAULT_USER_TENANT_ID,
        password: Md5.hashStr(DEFAULT_USER_PASSWORD),
        name: '杨悦齐',
        realName: '杨悦齐',
        roleId: DEFAULT_USER_ROLE_ID,
        deptId: DEFAULT_USER_DEPT_ID,
        postId: DEFAULT_USER_POST_ID,
    }
];
