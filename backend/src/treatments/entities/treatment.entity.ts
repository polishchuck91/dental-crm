import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  treatment_name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  cost_comment: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;
}
