import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int"})
  id!: number;

  @Column({ type:'varchar', unique: true })
  username!: string;

  @Column({type: "varchar"})
  password!: string;

  @Column({ type: "enum", enum: ["Employee", "Manager", "Admin"] })
  role!: "Employee" | "Manager" | "Admin";
}
