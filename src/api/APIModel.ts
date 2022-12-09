export interface InitialUserData {
  address?: string;
  chain_id?: number;
}

export interface IAddProfileAPI extends InitialUserData {
  nonce?: string;
  image?: any;
  signature?: string;
  nickname?: string;
  content?: string;
}

export interface IImageProfileAPI extends InitialUserData {
  image: any;
}

export interface ICreateMilestone {
  description: string;
  image?: any;
  name: string;
  external_url: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  milestones: {
    id: number;
    name: string;
    done: boolean;
  }[][];
}
