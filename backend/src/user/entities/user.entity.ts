import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Staff } from '../../staff/entities/staff.entity';
import { Role } from 'src/enums/role.enum';
import { TimestampsEntity } from 'src/entities/timestamps.entity';

@Entity('users')
export class User extends TimestampsEntity {
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

  @OneToOne(() => Staff, (staff) => staff.user, {
    cascade: true, // Cascade delete to Staff
    onDelete: 'CASCADE', // Ensure database-level cascade
  })
  staff: Staff;

  @BeforeInsert()
  async setPasswordHash() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
