import React, { Dispatch, FC, SetStateAction } from "react";
import dynamic from "next/dynamic";
import moment from "moment";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

interface Props {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const CalendarWidget: FC<Props> = ({ date, setDate }) => {
  return (
    <div className="mt-2">
      <Calendar
        className="bg-white rounded w-full p-4 border border-gray-400"
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => moment(date).format("DD")}
      />
    </div>
  );
};

export { CalendarWidget };
