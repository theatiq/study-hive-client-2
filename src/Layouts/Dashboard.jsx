import React from "react";
import {
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaRProject,
  FaSearch,
  FaUsers,
  FaUtensils,
  FaVoicemail,
} from "react-icons/fa";
import { FaH } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";
import useSession from "../Hooks/useSession";
import useTutor from "../Hooks/useTutor";

const Dashboard = () => {
  const [session] = useSession();
  const [cart] = useCart();
  // todo get isAdmin value from database
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-blue-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to={"/dashboard/userHome"}
                  className={"flex gap-2 items-center"}
                >
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/allUsers"}
                  className={"flex gap-2 items-center"}
                >
                  <FaUtensils></FaUtensils> View All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/everyStudySessions"}
                  className={"flex gap-2 items-center"}
                >
                  <FaList></FaList> All Study Sessions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/allMaterialsAdmin"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> All Materials
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/bookings"}
                  className={"flex gap-2 items-center"}
                >
                  <FaBook></FaBook> Manage Bookings
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to={"/dashboard/users"}
                  className={"flex gap-2 items-center"}
                >
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li> */}
            </>
          ) : isTutor ? (
            <>
              <li>
                <NavLink
                  to={"/dashboard/userHome"}
                  className={"flex gap-2 items-center"}
                >
                  <FaHome></FaHome> Tutor Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/createSession"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> Create Study Session
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/allStudySessions"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> All Study Session
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/uploadMaterials"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> Upload Materials
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/allMaterials"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> All Materials
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to={"/dashboard/updateMaterials"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> Update Materials
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to={"/dashboard/cart"}
                  className={"flex gap-2 items-center"}
                >
                  <MdShoppingCart></MdShoppingCart>My Cart ({session.length})
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/review"}
                  className={"flex gap-2 items-center"}
                >
                  <FaRProject></FaRProject> Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/paymentHistory"}
                  className={"flex gap-2 items-center"}
                >
                  <FaList></FaList> Payment Real History
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to={"/dashboard/userHome"}
                  className={"flex gap-2 items-center"}
                >
                  <FaHome></FaHome> Student Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/bookedSession"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> My Booked Sessions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/createNotes"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> Create Notes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/updateNotes"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> Update Notes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/allStudyMaterials"}
                  className={"flex gap-2 items-center"}
                >
                  <FaCalendar></FaCalendar> View All Study Materials
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/cart"}
                  className={"flex gap-2 items-center"}
                >
                  <MdShoppingCart></MdShoppingCart>My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/review"}
                  className={"flex gap-2 items-center"}
                >
                  <FaRProject></FaRProject> Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/paymentHistory"}
                  className={"flex gap-2 items-center"}
                >
                  <FaList></FaList> Payment History
                </NavLink>
              </li>
            </>
          )}
          {/* Shared navlinks */}
          <div className="divider"></div>
          <li>
            <NavLink to={"/"} className={"flex gap-2 items-center"}>
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink to={""} className={"flex gap-2 items-center"}>
              <FaSearch></FaSearch> Menu
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink
              to={""}
              className={"flex gap-2 items-center"}
            >
              <FaEnvelope></FaEnvelope> Contact
            </NavLink>
          </li> */}
        </ul>
      </div>
      {/* Dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
