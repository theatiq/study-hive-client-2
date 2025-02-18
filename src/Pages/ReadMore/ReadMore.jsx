import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { isAfter, parseISO } from "date-fns";
import Footer from "../../Shared/Footer/Footer";
import { NavLink } from "react-router-dom";

const ReadMore = () => {
  const [currentUser, setCurrentUser] = useState(null); // State for current user
  const [reviews, setReviews] = useState([]); // State for reviews
  const [averageRating, setAverageRating] = useState(0); // State for average rating
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    sessionTitle,
    tutorName,
    tutorEmail,
    status,
    registrationFee,
    registrationStarts,
    registrationEnds,
    classStarts,
    classEnds,
    sessionDetails,
    classDuration,
  } = useLoaderData();
  const { user } = useAuth();
  const studentEmail = user?.email;

  // Fetch current user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosSecure.get(`/users/${studentEmail}`);
        if (response.data.success) {
          setCurrentUser(response.data.user);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (studentEmail) fetchUser();
  }, [axiosSecure, studentEmail]);

  // Fetch reviews and average rating
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(`/reviews/${_id}`);
        if (response.data.success) {
          setReviews(response.data.reviews);
          setAverageRating(response.data.averageRating);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [_id, axiosSecure]);

  const handleBook = async () => {
    const bookedItem = {
      sessionId: _id,
      studentEmail,
      sessionTitle,
      tutorName,
      tutorEmail,
      status,
      registrationFee: parseFloat(registrationFee) || 0,
      registrationStarts,
      registrationEnds,
      classStarts,
      classEnds,
      sessionDetails,
      classDuration,
      bookingStatus: "booked",
    };

    try {
      const bookedRes = await axiosSecure.post(`/bookings/${_id}`, bookedItem);
      if (bookedRes.data.bookedInsertedId || bookedRes.data.cartsInsertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${sessionTitle} will be booked after payment.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to book the session. Please try again later.",
      });
    }
  };

  const isOngoing =
    isAfter(parseISO(registrationEnds), new Date()) &&
    isAfter(new Date(), parseISO(registrationStarts));

  const isStudent = currentUser?.role === "student";

  return (
    <div>
      <div className="min-h-screen px-8 py-4">
        {/* Session Details */}
        <h1 className="text-2xl font-bold mb-4">{sessionTitle}</h1>
        <p className="text-lg mb-2">Tutor: {tutorName}</p>
        <p>{sessionDetails}</p>
        <p>Registration Start Date: {registrationStarts}</p>
        <p>Registration End Date: {registrationEnds}</p>
        <p>Class Start Time: {classStarts}</p>
        <p>Class End Date: {classEnds}</p>
        <p>Session Duration: {classDuration} minutes</p>
        <p>
          Registration Fee:{" "}
          {registrationFee > 0 ? `$${registrationFee}` : "Free"}
        </p>

        {/* Average Rating and Reviews */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Average Rating</h2>
          <p className="text-lg font-bold">{averageRating} / 5</p>

          <h2 className="text-xl font-semibold mt-4 mb-2">Reviews</h2>
          <ul className="list-disc pl-6 space-y-2">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <li key={review._id}>
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="italic">{review.comment}</p>
                  <p>Rating: {review.rating} / 5</p>
                </li>
              ))
            ) : (
              <p>No reviews available for this session.</p>
            )}
          </ul>
        </div>

        {/* Book Now Button */}
        {isStudent && (
          <div className="mt-6">
            <NavLink to={"/dashboard/cart"}>
              <button
                onClick={handleBook}
                className="btn"
                disabled={!isOngoing}
              >
                {isOngoing ? "Book Now" : "Registration Closed"}
              </button>
            </NavLink>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ReadMore;
