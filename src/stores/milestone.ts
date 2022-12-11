import { atom } from "recoil";
import { v1 } from "uuid";

export interface IProject {
  limitprice: number;
  totalFundamount: number;
  fundingStart: number;
  fundingEnd: number;
  fundingList: any;
  daoPass: number;
  daoReject: number;
  owner: string;
}

export interface IMilestone {
  keyID: string;
  title: string;
  content: {
    id: number;
    name: string;
    done: boolean;
  }[];
  price: number;
  startDate: Date;
  expired: Date;
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
