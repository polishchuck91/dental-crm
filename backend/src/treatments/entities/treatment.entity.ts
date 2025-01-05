import { TimestampsEntity } from 'src/entities/timestamps.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('treatments')
export class Treatment extends TimestampsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  treatment_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  cost_comment: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;
}
