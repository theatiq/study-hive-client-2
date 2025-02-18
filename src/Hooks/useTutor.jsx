import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTutor = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isTutor, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isTutor"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/tutor/${user.email}`);
      
      return res.data?.tutor;
    },
  });
  return [isTutor, isAdminLoading];
};

export default useTutor;
