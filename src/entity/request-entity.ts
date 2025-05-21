import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user-entity.js"
import { Software } from "./software-entity.js";

@Entity()
export class Request {
  @PrimaryGeneratedColumn({type: "int"})
  id! : number;

  @ManyToOne(() => User, { eager: true })
  user! : User;

  @ManyToOne(() => Software, { eager: true })
  software!: Software;

  @Column({ type: "enum", enum: ["Read", "Write", "Admin"] })
  accessType!: "Read" | "Write" | "Admin";

  @Column({type:'varchar', nullable: false, default:"text"})
  reason!: string;

  @Column({ type: "enum", enum: ["Pending", "Approved", "Rejected"], default: "Pending" })
  status! : "Pending" | "Approved" | "Rejected";
}
