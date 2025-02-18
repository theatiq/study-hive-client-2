import React from "react";
import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, NavLink } from "react-router-dom";
import useSession from "../../../Hooks/useSession";
import useMaterial from "../../../Hooks/useMaterial";
import useMaterialAdmin from "../../../Hooks/useMaterialAdmin";

const AllMaterialsAdmin = () => {
  const [session, refetch] = useMaterialAdmin();
  //   const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();
  
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
        axiosSecure.delete(`/materials/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Materials has been deleted.",
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
              <th>Owner Name</th>
              <th>Owner Email</th>
              <th>Session Fee</th>
              <th>Status</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {session.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.sessionTitle}</td>
                <td>{item.tutorName}</td>
                <td>{item.tutorEmail}</td>
                <td className="text-wrap">{item.doc1}</td>
                <td>{item.doc2}</td>
                <td>{item.doc3}</td>

                <th>
                  <button
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

export default AllMaterialsAdmin;
