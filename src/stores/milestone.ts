import { atom } from "recoil";
import { v1 } from "uuid";

export interface IMilestone {
  keyID: string;
  title: string;
  content: string;
  price: number;
  startDate: Date;
  endDate: Date;
}
export interface IMilestoneUser {
  keyID: string;
  title: string;
  content: string;
  price: number;
  startDate: Date;
  endDate: Date;
  type: string;
  result: string;
}

const milestoneState = atom<IMilestone[]>({
  key: `milestoneState/${v1()}`,
  default: [],
});

export { milestoneState };
