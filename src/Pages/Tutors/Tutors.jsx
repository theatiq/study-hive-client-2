import React from "react";
import useAllTutors from "../../Hooks/useAllTutors";

const Tutors = () => {
  const [tutors, refetch] = useAllTutors();

  if (tutors.length === 0) {
    return <div>No tutors found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tutors.map((tutor) => (
        <div key={tutor._id} className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{tutor.name}</h2>
            <h2 className="card-title">{tutor.email}</h2>
            <h2 className="card-title">{tutor.role}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tutors;
