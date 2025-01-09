import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { PaymentStatus } from 'src/enums/payment-status.enum';
import { TimestampsEntity } from 'src/entities/timestamps.entity';

@Entity('billing')
export class Billing extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Patient, (patient) => patient.id)
  patient: Patient;

  @ManyToOne(() => Appointment, (appointment) => appointment.id)
  appointment: Appointment;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  amount_paid: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  status: string;

  @Column({ nullable: true, type: 'datetime' })
  payment_date: Date;
}
