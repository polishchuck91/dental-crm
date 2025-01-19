import { TimestampsEntity } from 'src/entities/timestamps.entity';
import { Gender } from 'src/enums/gender.enum';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('staff')
export class Staff extends TimestampsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ length: 15, unique: true })
  contact_number: string;

  @Column({ type: 'date' })
  hire_date: string;

  @OneToOne(() => User, (user) => user.staff, {
    onDelete: 'CASCADE', // Ensures the User is deleted when Staff is deleted
  })
  @JoinColumn({ name: 'user_id' }) // Specifies that Staff is the owning side
  user: User;
}
