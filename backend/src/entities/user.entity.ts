import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDetail } from './user-detail.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
  PATIENT = 'patient',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Username is required' })
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters' })
  username: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(60)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PATIENT,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserDetail, (details) => details.user, { lazy: true })
  details: Promise<UserDetail[]>;

  @BeforeInsert()
  async setPasswordHash() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
