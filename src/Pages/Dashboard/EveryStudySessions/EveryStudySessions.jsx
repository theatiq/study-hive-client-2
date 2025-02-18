import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEverySession from "../../../Hooks/useEverySession";
import { NavLink } from "react-router-dom";

const EveryStudySessions = () => {
  const [session, refetch] = useEverySession();
  const [selectedSession, setSelectedSession] = useState(null); // State for selected session
  const [rejectionReason, setRejectionReason] = useState(""); // Rejection reason
  const [feedback, setFeedback] = useState(""); // Feedback
  const axiosSecure = useAxiosSecure();
  const [isFree, setIsFree] = useState(true); // State to track if session is free
  const [amount, setAmount] = useState(""); // State to store the amount
  const [selectedApprovalSession, setSelectedApprovalSession] = useState(null); // State for session under approval

  const openApprovalModal = (item) => {
    setSelectedApprovalSession(item);
    setIsFree(true); // Default to free
    setAmount(""); // Reset amount
  };

  const submitApproval = () => {
    const updatedData = {
      status: "approved",
      isFree,
      amount: isFree ? 0 : parseFloat(amount), // Save 0 if free, otherwise the amount
    };

    axiosSecure
      .patch(`/sessionsApproval/${selectedApprovalSession._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Approved!",
            text: "The session has been approved successfully.",
            icon: "success",
          });
          closeApprovalModal();
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to approve the session.",
          icon: "error",
        });
      });
  };

  const closeApprovalModal = () => {
    setSelectedApprovalSession(null);
    setIsFree(true);
    setAmount("");
  };

  const handleApprove = (item) => {
    const updatedData = {
      status: "approved",
    };

    axiosSecure
      .patch(`/sessions/${item._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Approved!",
            text: "The session has been approved successfully.",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to approve the session.",
          icon: "error",
        });
      });
  };

  const handleReject = () => {
    if (!rejectionReason || !feedback) {
      Swal.fire({
        title: "Error!",
        text: "Please provide a rejection reason and feedback.",
        icon: "error",
      });
      return;
    }

    const updatedData = {
      feedback,
      rejectionReason,
      status: "rejected",
    };

    axiosSecure
      .patch(`/selectedSession/${selectedSession._id}`, updatedData)
      .then((res) => {
        if (res.data.message) {
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "The session has been rejected successfully.",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to reject the session.",
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
              text: "Your session has been rejected/deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Session Title</th>
              <th>Session Owner</th>
              <th>Session Fee</th>
              <th>Status</th>
              <th>Reject</th>
              <th>Approve</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {session.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.sessionTitle}</td>
                <td>{item.tutorEmail}</td>
                <td>{item.registrationFee}</td>
                <td>{item.status}</td>
                <th>
                  <button
                    disabled={item.status !== "pending"}
                    onClick={() => setSelectedSession(item)}
                    className="btn btn-ghost btn-lg"
                  >
                    Reject
                  </button>
                </th>

                <th>
                  <button
                    disabled={item.status !== "pending"}
                    onClick={() => openApprovalModal(item)}
                    className="btn btn-ghost btn-lg"
                  >
                    Approval
                  </button>
                </th>

                <th>
                  <NavLink to={`/dashboard/updateSession/${item._id}`}>
                    <button
                      disabled={item.status !== "approved"}
                      className="btn btn-ghost btn-lg"
                    >
                      Update
                    </button>
                  </NavLink>
                </th>
                <th>
                  <button
                    disabled={item.status !== "approved"}
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Approval Modal */}

      {selectedApprovalSession && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Approve Session</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Is this session free?</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                />
              </label>
            </div>
            {!isFree && (
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Specify Amount:</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter the session fee"
                />
              </div>
            )}
            <div className="modal-action">
              <button className="btn btn-primary" onClick={submitApproval}>
                Submit
              </button>
              <button className="btn" onClick={closeApprovalModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {selectedSession && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Reject Session</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rejection Reason:</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter the reason for rejection"
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Feedback:</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback"
              />
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleReject}>
                Submit
              </button>
              <button
                className="btn"
                onClick={() => {
                  setSelectedSession(null);
                  setRejectionReason("");
                  setFeedback("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EveryStudySessions;
