import axios from "axios";
import { useMutation, queryClient, useQueryClient } from "react-query";
import { instance } from "../axios";

export const useDeleteEvents = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "events",
    (id) => instance.get("event/deleteEvent", { params: { eventId: id } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
      },
    }
  );
};
