import axios from "axios";
import { ICreateMilestone } from "api/APIModel";

const CreateMilestoneAPI = async (args: ICreateMilestone) => {
  const request = await axios
    .post("/create", {
      description: args.description,
      image: args.image,
      name: args.name,
      external_url: args.external_url,
      attributes: args.attributes,
      milestones: args.milestones,
    })
    .then((res) => res.data);

  return request;
};

export { CreateMilestoneAPI };
