import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Treatment } from '../../treatments/entities/treatment.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('patient_treatments')
export class PatientTreatment {
  @PrimaryGeneratedColumn()
  patient_treatment_id: number;

  @ManyToOne(() => Patient, (patient) => patient.patient_id)
  patient: Patient;

  @ManyToOne(() => Treatment, (treatment) => treatment.treatment_id)
  treatment: Treatment;

  @ManyToOne(() => Appointment, (appointment) => appointment.appointment_id)
  appointment: Appointment;

  @Column({ nullable: true })
  notes: string;
}
