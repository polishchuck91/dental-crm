import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { PaymentStatus } from 'src/enums/payment-status.enum';

@Entity('billing')
export class Billing {
  @PrimaryGeneratedColumn()
  bill_id: number;

  @ManyToOne(() => Patient, (patient) => patient.patient_id)
  patient: Patient;

  @ManyToOne(() => Appointment, (appointment) => appointment.appointment_id)
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
  payment_status: string;

  @Column({ nullable: true, type: 'datetime' })
  payment_date: Date;
}
