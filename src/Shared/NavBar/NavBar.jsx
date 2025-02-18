import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { MdShoppingCart } from "react-icons/md";
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";
import { Tooltip } from "react-tooltip";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import userImg from "../../../src/assets/user.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const NavBar = () => {
  // const { user, logOut } = useContext(AuthContext);
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
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

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {});
  };
  const navOptions = (
    <>
      {/* <li>
        <Link to={"/"}>Home</Link>
      </li> */}
      {/* <li>
        <Link to={"/menu"}>Our Menu</Link>
      </li> */}
      {/* <li>
        <Link to={"/order/salad"}>Order Food</Link>
      </li> */}

      {/* {user && isAdmin && (
        <li>
          <Link to={"/dashboard/adminHome"}>Dashboard</Link>
        </li>
      )}

      {user && isAdmin && (
        <li>
          <Link to={"/dashboard/adminHome"}>Dashboard</Link>
        </li>
      )} */}

      <li>
        <Link to={"/dashboard/cart"}>
          <button className="btn">
            <span>Dashboard</span>
            <div className="badge badge-info">+{cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          {/* <p>{user?.displayName}</p> */}
          {/* <button onClick={handleLogout} className="btn btn-active btn-ghost">
            Logout
          </button> */}
        </>
      ) : (
        <>
          {/* <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"}>Sign Up</Link>
          </li> */}
        </>
      )}
    </>
  );
  return (
    <>
      <div className="fixed z-50  text-white navbar bg-blue-950">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            StudyHive
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-4">
              {user?.email ? (
                <div>
                  <img
                    className="w-8 h-8 rounded-full border-2 border-teal-400"
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user?.displayName || "User"}
                    alt="User Avatar"
                  />
                  <Tooltip id="user-tooltip" />
                </div>
              ) : (
                <img
                  className="w-8 h-8 rounded-full border-2 border-gray-500"
                  src={userImg}
                  alt="Default Avatar"
                />
              )}
              <button
                onClick={logOut}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-sm flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
              >
                <FcGoogle />
              </button>
              <button
                onClick={handleGithubSignIn}
                className="btn btn-sm flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
              >
                <FaGithub />
              </button>
              <NavLink
                to={"/login"}
                className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white"
              >
                Login
              </NavLink>
              <NavLink
                to={"/signup"}
                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
