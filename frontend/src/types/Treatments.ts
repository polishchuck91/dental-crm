import { Timestamp } from './Common';

export interface Treatment extends Timestamp {
  id: number;
  treatment_name: string;
  description?: string;
  cost: number;
  cost_comment?: string;
}
