import React from "react";
import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Hi, Welcome Back</h1>
      {user?.displayName ? user?.displayName : "Back"}
    </div>
  );
};

export default UserHome;
