import { Column, Entity } from "typeorm";

@Entity("blade_dict", { schema: "blade" })
export class DictEntity {
  @Column("bigint", { primary: true, name: "id", comment: "主键" })
  id: number;

  @Column("bigint", {
    name: "parent_id",
    nullable: true,
    comment: "父主键",
    default: () => "'0'",
  })
  parentId: string | null;

  @Column("varchar", {
    name: "code",
    nullable: true,
    comment: "字典码",
    length: 255,
  })
  code: string | null;

  @Column("int", { name: "dict_key", nullable: true, comment: "字典值" })
  dictKey: number | null;

  @Column("varchar", {
    name: "dict_value",
    nullable: true,
    comment: "字典名称",
    length: 255,
  })
  dictValue: string | null;

  @Column("int", { name: "sort", nullable: true, comment: "排序" })
  sort: number | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "字典备注",
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
