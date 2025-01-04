import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn()
  treatment_id: number;

  @Column()
  treatment_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;
}
