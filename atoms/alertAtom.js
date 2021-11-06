import { atom } from "recoil";
export const alertState = atom({
  key: "alertState",
  default: false,
});
export const alertData = atom({
  key: "alertData",
  default: {
    type: "Alert",
    title: "",
    description: "",
    postId: "",
  },
});
