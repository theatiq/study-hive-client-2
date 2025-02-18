import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";
import useBookedSession from "../../../Hooks/useBookedSession";

const BookedSession = () => {
  const [session] = useBookedSession();
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const rowsPerPage = 10; // Maximum rows per page

  // Calculate pagination
  const totalPages = Math.ceil(session.length / rowsPerPage);
  const paginatedSessions = session.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Items: {session.length}</h2>
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
          {/* Table Head */}
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
          {/* Table Body */}
          <tbody>
            {paginatedSessions.map((item, index) => (
              <tr key={item._id}>
                <th>{(currentPage - 1) * rowsPerPage + index + 1}</th>
                <td>{item?.sessionTitle}</td>
                <td>{item?.tutorEmail}</td>
                <td>{item?.registrationFee}</td>
                <td>{item?.status}</td>
                <th>
                  <NavLink to={`/dashboard/viewDetails/${item._id}`}>
                    <button className="btn btn-ghost btn-lg">
                      View Details
                    </button>
                  </NavLink>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <div className="btn-group">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? "btn-active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookedSession;
