import { atom } from "recoil";
import { v1 } from "uuid";

export interface IMilestone {
  keyID: string;
  title: string;
  content: {
    id: number;
    name: string;
    done: boolean;
  }[];
  price: number;
  startDate: number;
  expired: number;
}
export interface IMilestoneUser {
  keyID: string;
  title: string;
  content: {
    id: number;
    name: string;
    done: boolean;
  }[];
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

const milestoneContentState = atom<any>({
  key: `milestoneContentState/${v1()}`,
  default: new Map(),
});

export { milestoneState, milestoneContentState };
