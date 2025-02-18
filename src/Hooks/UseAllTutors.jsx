import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAllTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { refetch, data: tutors = [] } = useQuery({
    queryKey: ["tutors", user?.email], // Include email for dynamic queries
    // enabled: !!user?.email, // Only fetch if user email exists
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors"); // Call the tutors endpoint
      return res.data;
    },
  });

  return [tutors, refetch];
};

export default useAllTutors;
