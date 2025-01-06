import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Treatment } from '../../treatments/entities/treatment.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { TimestampsEntity } from 'src/entities/timestamps.entity';

@Entity('patient_treatments')
export class PatientTreatment extends TimestampsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, (patient) => patient.id)
  patient: Patient;

  @ManyToOne(() => Treatment, (treatment) => treatment.id)
  treatment: Treatment;

  @ManyToOne(() => Appointment, (appointment) => appointment.id)
  appointment: Appointment;

  @Column({ nullable: true })
  notes: string;
}
