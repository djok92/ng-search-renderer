import { Handler } from "../classes/Handler";

export interface Category {
  id?: number;
  products?: number;
  name: string;
  active?: boolean;
  handler?: Handler;
}
