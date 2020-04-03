import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column({ length: 50 })
  // @ts-ignore
  firstName: string;

  @Column({ length: 50 })
  // @ts-ignore
  lastName: string;

  @Column()
  // @ts-ignore
  age: number;
}
