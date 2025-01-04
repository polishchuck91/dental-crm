import { Gender } from 'src/enums/gender.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  patient_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column({ length: 15 })
  contact_number: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @CreateDateColumn()
  registration_date: Date;
}