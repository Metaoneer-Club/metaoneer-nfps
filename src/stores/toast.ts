import { atom } from "recoil";
import { v1 } from "uuid";

const isToastState = atom<boolean>({
  key: `isToastState/${v1()}`,
  default: false,
});

const toastContentState = atom({
  key: `toastContentState/${v1()}`,
  default: {
    content: "",
    type: "primary",
  },
});

export { isToastState, toastContentState };
