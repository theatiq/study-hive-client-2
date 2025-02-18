import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBookedSession = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user?.email}`);
      return res.data;
    },
  });
  return [bookings, refetch];
};

export default useBookedSession;
