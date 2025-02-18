import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSession = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  const { refetch, data: session = [] } = useQuery({
    queryKey: ["session", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions?email=${user?.email}`);
      return res.data;
    },
  });
  return [session, refetch];
};

export default useSession;
