import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Staff } from '../../staff/entities/staff.entity';
import { AppointmentStatus } from 'src/enums/appointment-status.enum';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  appointment_id: number;

  @ManyToOne(() => Patient, (patient) => patient.patient_id)
  patient: Patient;

  @ManyToOne(() => Staff, (staff) => staff.staff_id)
  staff: Staff;

  @Column({ type: 'datetime' })
  appointment_date: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.Scheduled,
  })
  status: string;

  @Column({ nullable: true })
  notes: string;
}
