import axios from "axios";
import { useQuery } from "react-query";
import { instance } from "../axios";

const getDate = () => {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  console.log(start, end);
  return {
    start: Math.floor(start.getTime() / 1000),
    end: Math.floor(end.getTime() / 1000),
  };
};

export const useEvents = () => {
  return useQuery("events", () =>
    instance.get("event/getEventsBetween", {
      params: {
        startDate: getDate().start,
        endDate: getDate().end,
        realtorId: 1,
      },
    })
  );
};
