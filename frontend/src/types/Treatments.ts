import { Timestamp } from "./Common";

export interface Treatment extends Timestamp {
  id: number;
  treatment_name: string;
  description: string;
  cost: string;
  cost_comment: string;
}
