import moment from "moment";

export const formatDate = (date: Date): string => {
  return moment(date).format("YYYY년 MM월 DD일");
};
export const formatDay = (date: Date): string => {
  return moment(date).format("DD");
};
