export interface InitialUserData {
  address?: string;
  chain_id?: number;
}

export interface IAddProfileAPI {
  token: string;
  nickname: string;
  content: string;
}

export interface ICreateMilestoneAPI {
  token_id: number;
  milestone_id: number;
  status: boolean;
  address: string;
}

export interface ICreateFundingAPI {
  image?: any;
  metadata: IFundingMetadata;
  address: string;
  token_id: number;
}

export interface IFundingMetadata {
  title: string;
  content: string;
  milestones: string[][];
}
