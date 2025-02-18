import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
  baseURL: "https://study-hive-server-weld.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
