import React from "react";
import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useSession from "../../../Hooks/useSession";

const AllStudySessions = () => {
  const [session, refetch] = useSession();
  //   const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();
  

  const handleRequest = (item) => {
    const updatedData = {
      status: "pending",
    };

    axiosSecure
      .patch(`/sessionsRequest/${item._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Requested!",
            text: "The session has been requested for further approval.",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Request Failed.",
          icon: "error",
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/sessions/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl ">Items: {session.length}</h2>
        {/* <h2 className="text-4xl ">Total Price: {totalPrice}</h2> */}
        {session.length ? (
          <Link to={"/dashboard/payment"}>
            <button className=""></button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
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
              <th>Rejection Reason</th>
              <th>Feedback</th>
              <th>Re-request</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {session.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.sessionTitle}</td>
                <td>{item.tutorEmail}</td>
                <td>{item.registrationFee}</td>
                <td>{item.status}</td>
                <td>{item?.rejectionReason}</td>
                <td>{item?.feedback}</td>
                <th>
                  <button
                    disabled={item.status !== "rejected"}
                    onClick={() => handleRequest(item)}
                    className="btn btn-ghost btn-lg"
                  >
                    Request
                  </button>
                </th>
                <th>
                  <button
                    disabled={item.status === "approved"}
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
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

export default AllStudySessions;
