import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity("blade_user", { schema: "blade" })
export class UserEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "主键" })
    id: number;

    @Column("varchar", {
        name: "tenant_id",
        nullable: true,
        comment: "租户ID",
        length: 12,
        default: () => "'000000'",
    })
    tenantId: string | null;

    @Column("varchar", {
        name: "code",
        nullable: true,
        comment: "用户编号",
        length: 12,
    })
    code: string | null;

    @Column("varchar", {
        name: "account",
        nullable: true,
        comment: "账号",
        length: 45,
    })
    account: string | null;

    @Column("varchar", {
        name: "password",
        nullable: true,
        comment: "密码",
        length: 45,
    })
    password: string | null;

    @Column("varchar", {
        name: "name",
        nullable: true,
        comment: "昵称",
        length: 20,
    })
    name: string | null;

    @Column("varchar", {
        name: "real_name",
        nullable: true,
        comment: "真名",
        length: 10,
    })
    realName: string | null;

    @Column("varchar", {
        name: "avatar",
        nullable: true,
        comment: "头像",
        length: 2000,
    })
    avatar: string | null;

    @Column("varchar", {
        name: "email",
        nullable: true,
        comment: "邮箱",
        length: 45,
    })
    email: string | null;

    @Column("varchar", {
        name: "phone",
        nullable: true,
        comment: "手机",
        length: 45,
    })
    phone: string | null;

    @Column("datetime", { name: "birthday", nullable: true, comment: "生日" })
    birthday: Date | null;

    @Column("smallint", { name: "sex", nullable: true, comment: "性别" })
    sex: number | null;

    @Column("varchar", {
        name: "role_id",
        nullable: true,
        comment: "角色id",
        length: 1000,
    })
    roleId: string | null;

    @Column("varchar", {
        name: "dept_id",
        nullable: true,
        comment: "部门id",
        length: 1000,
    })
    deptId: string | null;

    @Column("varchar", {
        name: "post_id",
        nullable: true,
        comment: "岗位id",
        length: 1000,
    })
    postId: string | null;

    @Column("bigint", { name: "create_user", nullable: true, comment: "创建人" })
    createUser: string | null;

    @Column("bigint", {
        name: "create_dept",
        nullable: true,
        comment: "创建部门",
    })
    createDept: string | null;

    @Column("datetime", {
        name: "create_time",
        nullable: true,
        comment: "创建时间",
    })
    createTime: Date | null;

    @Column("bigint", { name: "update_user", nullable: true, comment: "修改人" })
    updateUser: string | null;

    @Column("datetime", {
        name: "update_time",
        nullable: true,
        comment: "修改时间",
    })
    updateTime: Date | null;

    @Column("int", { name: "status", nullable: true, comment: "状态" })
    status: number | null;

    @Column("int", {
        name: "is_deleted",
        nullable: true,
        comment: "是否已删除",
        default: () => "'0'",
    })
    isDeleted: number | null;
}
