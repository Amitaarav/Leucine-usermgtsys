import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Software {
  @PrimaryGeneratedColumn({type: "int"})
  id!: number;

  @Column({type: 'varchar', nullable: false})
  name!: string;

  @Column({type:'varchar', nullable: false, default: "text"})
  description!: string;

  @Column("simple-array")
  accessLevels!: string[]; // e.g., ["Read", "Write", "Admin"]
}
