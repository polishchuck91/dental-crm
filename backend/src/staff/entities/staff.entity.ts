import { TimestampsEntity } from 'src/entities/timestamps.entity';
import { Gender } from 'src/enums/gender.enum';
import { Role } from 'src/enums/role.enum';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('staff')
export class Staff extends TimestampsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: string;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column({ length: 15 })
  contact_number: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date' })
  hire_date: Date;

  @OneToOne(() => User, (user) => user.staff)
  user: User;
}
