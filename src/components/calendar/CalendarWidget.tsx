import React, { Dispatch, FC, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

/* Component */
import { AutoSVG, formatDate, formatDay } from "utils";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

interface Props {
  isOpen: boolean;
  date: Date;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<Date>>;
}

const CalendarWidget: FC<Props> = ({ isOpen, date, setIsOpen, setDate }) => {
  return (
    <div className="mb-5 mt-2">
      <div className={clsx("relative mt-2", !isOpen && "mb-5")}>
        <div
          className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer "
          onClick={() => setIsOpen(!isOpen)}
        >
          <AutoSVG
            className={
              isOpen
                ? "transition-transform scale-125 duration-150 text-indigo-600"
                : ""
            }
            src="/media/icons/calendar.svg"
          />
        </div>
        <input
          className={clsx(
            "text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-400 border",
            isOpen ? " rounded-t" : "rounded"
          )}
          placeholder={formatDate(date)}
        />
      </div>
      {isOpen && (
        <Calendar
          className="-mt-3 bg-white dark:bg-dark rounded w-full p-4 border border-gray-400"
          onChange={(e: any) => {
            setDate(e);
            setIsOpen(false);
          }}
          value={date}
          formatDay={(locale, date) => formatDay(date)}
        />
      )}
    </div>
  );
};

export { CalendarWidget };
