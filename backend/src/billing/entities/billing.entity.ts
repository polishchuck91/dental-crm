import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { PaymentStatus } from 'src/enums/payment-status.enum';
import { TimestampsEntity } from 'src/entities/timestamps.entity';

@Entity('billing')
@Index(['id', 'appointment'])
export class Billing extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.id, {
    onDelete: 'SET NULL',
  })
  appointment: Appointment;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  payment_status: string;

  @Column({ nullable: true, type: 'datetime' })
  payment_date: Date;
}
