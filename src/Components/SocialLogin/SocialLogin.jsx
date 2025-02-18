import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: "student",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        
        navigate("/");
      });
    });
  };
  const handleGithubSignIn = () => {
    githubSignIn().then((result) => {
      
      const userInfo = {
        email: result.user?.providerData[0]?.email,
        name: result.user?.displayName,
        role: "student",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        
        navigate("/");
      });
    });
  };
  return (
    <div className="p-8">
      <div className="divider"></div>
      <div className="space-x-3">
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle className="m-2"></FaGoogle>
          Google
        </button>
        <button onClick={handleGithubSignIn} className="btn">
          <FaGithub className="m-2"></FaGithub>
          Github
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
