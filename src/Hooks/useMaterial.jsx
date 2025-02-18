import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMaterial = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  const { refetch, data: session = [] } = useQuery({
    queryKey: ["session", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials?email=${user?.email}`);
      return res.data;
    },
  });
  return [session, refetch];
};

export default useMaterial;
