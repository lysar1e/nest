import { Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: "unique identifier",
  })
  id: number;

  @Column({
    type: "text",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "text",
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: "text",
    nullable: false,
  })
  @Length(6)
  password: string;

  @Column({
    type: "boolean",
    default: false,
  })
  is_admin: boolean;

  @Column({
    type: "jsonb",
    default: [],
  })
  question: [];

  @Column({
    type: "text",
    default: "",
  })
  refreshToken: string;
}
