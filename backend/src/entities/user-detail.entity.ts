import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Patient } from './patient.entity';
import { Employee } from './employee.entity';

@Entity('user_details')
export class UserDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.details, { nullable: false })
  @JoinColumn()
  user: User;

  @OneToOne(() => Patient, { nullable: true })
  @JoinColumn()
  patient: Patient;

  @OneToOne(() => Employee, { nullable: true })
  @JoinColumn()
  employee: Employee;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
