import React from "react";
import useEverySession from "../../Hooks/useEverySession";
import { isAfter, parseISO } from "date-fns";
import { NavLink } from "react-router-dom";

const SessionCard = () => {
  const [session, refetch] = useEverySession();

  // Filter sessions with status "approved" and limit to 6
  const approvedSessions = session
    .filter((item) => item.status === "approved")
    .slice(0, 6); // Limit to 6 sessions

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {approvedSessions.map((item) => {
        // Check if the item is ongoing or closed using date-fns
        const isOngoing =
          isAfter(parseISO(item.registrationEnds), new Date()) &&
          isAfter(new Date(), parseISO(item.registrationStarts));

        return (
          <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                className="h-40 w-full object-contain"
                src={item.image}
                alt={"Session Image"}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.sessionTitle}</h2>
              <p>{item.sessionDetails || "No description available."}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline">
                  {isOngoing ? "Ongoing" : "Closed"}
                </button>
                <NavLink to={`/readMore/${item._id}`}>
                  <button className="btn btn-outline">Read More</button>
                </NavLink>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SessionCard;
