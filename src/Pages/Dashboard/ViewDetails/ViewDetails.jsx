import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
// import useAuth from "../../Hooks/useAuth";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ViewDetails = () => {
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [reviewText, setReviewText] = useState(""); // State for review input
  const [rating, setRating] = useState(0); // State for rating input
  const axiosSecure = useAxiosSecure();
  const {
    sessionId, // Use sessionId directly
    sessionTitle,
    tutorName,
    sessionDetails,
    registrationFee,
    tutorEmail,
    status,
    registrationStarts,
    registrationEnds,
    classStarts,
    classEnds,
    classDuration,
  } = useLoaderData();
  //   const { user } = useAuth(); // Logged-in user details

  //   const studentEmail = user?.email;

  // Fetch reviews for the current session
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(`/reviews/${sessionId}`);
        if (response.data.success) {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [sessionId, axiosSecure]);

  // Handle review submission
  const handleReviewSubmit = async () => {
    if (!reviewText || rating <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Please provide a review and rating",
      });
      return;
    }

    const reviewData = {
      sessionId,
      reviewText,
      rating,
      createdAt: new Date(),
    };

    try {
      const response = await axiosSecure.post("/reviews", reviewData);
      if (response.data.success) {
        setReviews((prev) => [...prev, reviewData]); // Update the reviews list
        setReviewText(""); // Reset review input
        setRating(0); // Reset rating
        Swal.fire({
          icon: "success",
          title: "Review submitted successfully",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to submit review",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">{sessionTitle}</h1>
      <p className="text-lg mb-2">Tutor: {tutorName}</p>
      <p className="text-lg mb-2">Tutor Email: {tutorEmail}</p>
      <p className="text-lg mb-2">Status: {status}</p>
      <p className="text-lg mb-2">Registration Starts: {registrationStarts}</p>
      <p className="text-lg mb-2">Registration Ends: {registrationEnds}</p>
      <p className="text-lg mb-2">Class Starts: {classStarts}</p>
      <p className="text-lg mb-2">Class Ends: {classEnds}</p>
      <p className="text-lg mb-2">Class Duration: {classDuration}</p>
      <p>{sessionDetails}</p>
      <p>
        Registration Fee: {registrationFee > 0 ? `$${registrationFee}` : "Free"}
      </p>

      {/* Review Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="border p-4 rounded">
                <p className="text-sm">Rating: {review.rating} ⭐</p>
                <p>{review.reviewText}</p>
                <p className="text-xs text-gray-500">
                  Reviewed by: {review.studentEmail} on{" "}
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review this session!</p>
        )}

        {/* Review Form */}
        <div className="mt-6">
          <h3 className="text-lg font-medium">Add a Review</h3>
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <div className="mt-2">
            <label className="block text-sm">Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              className="w-20 border rounded p-2"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>
          <button className="btn mt-4" onClick={handleReviewSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
