import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimestampsEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
