import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Staff } from '../../staff/entities/staff.entity';
import { AppointmentStatus } from 'src/enums/appointment-status.enum';
import { TimestampsEntity } from 'src/entities/timestamps.entity';

@Entity('appointments')
export class Appointment extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.id)
  patient: Patient;

  @ManyToOne(() => Staff, (staff) => staff.id)
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
