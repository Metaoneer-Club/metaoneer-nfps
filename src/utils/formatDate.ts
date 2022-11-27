import moment from "moment";

export const formatDate = (date: Date): string => {
  return date ? moment(date).format("YYYY년 MM월 DD일") : date;
};

export const formatDateSlash = (date: Date): string => {
  return date ? moment(date).format("YYYY/MM/DD") : date;
};
export const formatDay = (date: Date): string => {
  return date ? moment(date).format("DD") : date;
};
