import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMaterialAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  const { refetch, data: session = [] } = useQuery({
    queryKey: ["session", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials");
      return res.data;
    },
  });
  return [session, refetch];
};

export default useMaterialAdmin;
