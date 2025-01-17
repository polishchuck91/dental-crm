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

@Entity('patients')
export class Patient extends TimestampsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column({ length: 15, unique: true })
  contact_number: string;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => User, (user) => user.patient, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
