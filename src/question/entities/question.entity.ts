import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("questions")
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: "unique identifier",
  })
  id: number;

  @Column({
    type: "text",
    nullable: false,
  })
  question: string;

  @Column({
    type: "text",
    nullable: false,
  })
  tags: string;

  @Column({
    type: "json",
    nullable: false,
  })
  description: string;

  @Column({
    type: "bigint",
    nullable: false,
  })
  owner: number;

  @Column({
    type: "text",
    nullable: false,
  })
  username: string;

  @Column({
    type: "jsonb",
    default: [],
  })
  answers: any[];

  @Column({
    type: "bigint",
    default: 0,
  })
  views: number;
}
