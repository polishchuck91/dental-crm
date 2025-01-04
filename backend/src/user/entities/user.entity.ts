import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Staff } from '../../staff/entities/staff.entity';
import { Role } from 'src/enums/role.enum';
import { Patient } from 'src/patients/entities/patient.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Guest,
  })
  role: Role;

  @ManyToOne(() => Staff, (staff) => staff.user, { nullable: true })
  staff: Staff;

  @OneToOne(() => Patient, (patient) => patient.user, { nullable: true })
  @JoinColumn()
  patient: Patient;

  @BeforeInsert()
  async setPasswordHash() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
