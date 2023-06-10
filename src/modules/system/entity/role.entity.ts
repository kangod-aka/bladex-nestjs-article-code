import { Column, Entity } from "typeorm";

@Entity("blade_role", { schema: "blade" })
export class RoleEntity {
  @Column("bigint", { primary: true, name: "id", comment: "主键" })
  id: number;

  @Column("varchar", {
    name: "tenant_id",
    nullable: true,
    comment: "租户ID",
    length: 12,
    default: () => "'000000'",
  })
  tenantId: string | null;

  @Column("bigint", {
    name: "parent_id",
    nullable: true,
    comment: "父主键",
    default: () => "'0'",
  })
  parentId: string | null;

  @Column("varchar", {
    name: "role_name",
    nullable: true,
    comment: "角色名",
    length: 255,
  })
  roleName: string | null;

  @Column("int", { name: "sort", nullable: true, comment: "排序" })
  sort: number | null;

  @Column("varchar", {
    name: "role_alias",
    nullable: true,
    comment: "角色别名",
    length: 255,
  })
  roleAlias: string | null;

  @Column("int", {
    name: "is_deleted",
    nullable: true,
    comment: "是否已删除",
    default: () => "'0'",
  })
  isDeleted: number | null;
}
