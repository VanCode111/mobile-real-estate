import axios from "axios";
import { useMutation, queryClient, useQueryClient } from "react-query";
import { instance } from "../axios";

export const useCreateEvents = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "events",
    (values) => instance.post("event/createEvent", values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
      },
    }
  );
};
