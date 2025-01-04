import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Staff } from '../../staff/entities/staff.entity';
import { Role } from 'src/enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

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
  role: string;

  @ManyToOne(() => Staff, (staff) => staff.staff_id)
  staff: Staff;

  @BeforeInsert()
  async setPasswordHash() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
