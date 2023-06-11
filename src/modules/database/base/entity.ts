import { Column } from "typeorm";
import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
    @Column("bigint", { primary: true, name: "id", comment: "主键" })
    id: number;
}