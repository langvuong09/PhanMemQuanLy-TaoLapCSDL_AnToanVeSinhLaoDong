import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("industries")
export class Industry {
  @PrimaryGeneratedColumn("increment") id!: number;

  @Column({ unique: true }) code!: string; 
  @Column() name!: string;               
  @Column({ default: true }) isActive!: boolean;

  @Column({ nullable: true }) parentId?: number;

  @ManyToOne(() => Industry, (industry) => industry.children, { onDelete: 'SET NULL' })
  @JoinColumn({ name: "parentId" })
  parent?: Industry;

  @OneToMany(() => Industry, (industry) => industry.parent)
  children?: Industry[];

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}