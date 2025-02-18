import React from "react";
import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, NavLink } from "react-router-dom";
import useSession from "../../../Hooks/useSession";
import useMaterial from "../../../Hooks/useMaterial";
import useBookedSession from "../../../Hooks/useBookedSession";

const AllStudyMaterials = () => {
  const [session, refetch] = useBookedSession();
  //   const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();
  

  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl ">Items: {session.length}</h2>
        {/* <h2 className="text-4xl ">Total Price: {totalPrice}</h2> */}
        {session.length ? (
          <Link to={"/dashboard/payment"}>
            <button className="btn btn-primary hidden">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary hidden">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Session Title</th>
              <th>Session Owner</th>
              <th>Session Fee</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {session.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item?.sessionTitle}</td>
                <td>{item?.tutorEmail}</td>
                <td>{item?.registrationFee}</td>
                <td>{item?.status}</td>
                <th>
                  <NavLink to={`/dashboard/studentMaterials/${item.sessionId}`}>
                    <button className="btn btn-ghost btn-lg">
                      View All Materials
                    </button>
                  </NavLink>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default AllStudyMaterials;
