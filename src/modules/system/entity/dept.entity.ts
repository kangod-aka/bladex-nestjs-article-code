import { Column, Entity } from "typeorm";

@Entity("blade_dept", { schema: "blade" })
export class DeptEntity {
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
    name: "ancestors",
    nullable: true,
    comment: "祖级列表",
    length: 2000,
  })
  ancestors: string | null;

  @Column("varchar", {
    name: "dept_name",
    nullable: true,
    comment: "部门名",
    length: 45,
  })
  deptName: string | null;

  @Column("varchar", {
    name: "full_name",
    nullable: true,
    comment: "部门全称",
    length: 45,
  })
  fullName: string | null;

  @Column("int", { name: "sort", nullable: true, comment: "排序" })
  sort: number | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 255,
  })
  remark: string | null;

  @Column("int", {
    name: "is_deleted",
    nullable: true,
    comment: "是否已删除",
    default: () => "'0'",
  })
  isDeleted: number | null;
}
