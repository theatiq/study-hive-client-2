import React from "react";
import SectionTitle from "../../../Components/Sectiontitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useLoaderData } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateSession = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
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

  

  const onSubmit = async (data) => {
    
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const sessionItem = {
        sessionTitle: data.sessionTitle || "",
        tutorName: data.tutorName || "",
        tutorEmail: data.tutorEmail || "",
        status: data.status || "",
        registrationFee: parseFloat(data.registrationFee) || "",
        registrationStarts: data.registrationStarts || "",
        registrationEnds: data.registrationEnds || "",
        classStarts: data.classStarts || "",
        classEnds: data.classEnds || "",
        sessionDetails: data.sessionDetails || "",
        image: res.data.data.display_url,
        classDuration: data.classDuration || "",
      };
      const sessionRes = await axiosSecure.patch(
        `/session/${_id}`,
        sessionItem
      );
      
      if (sessionRes.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.sessionTitle} added to the Archive`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    
  };
  return (
    <div>
      <SectionTitle
        heading={"Update a Session"}
        // subHeading={"What's new"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Session Title*</span>
            </div>
            <input
              {...register("sessionTitle")}
              type="text"
              defaultValue={sessionTitle}
              placeholder="Session Title"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex gap-6">
            {/* Tutor Name */}

            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Tutor Name*</span>
              </div>
              <input
                {...register("tutorName")}
                type="text"
                placeholder="Tutor Name"
                defaultValue={tutorName}
                readOnly
                className="input input-bordered w-full"
              />
            </label>
            {/* Tutor Email */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Tutor Email*</span>
              </div>
              <input
                {...register("tutorEmail")}
                type="float"
                placeholder="Tutor Email"
                defaultValue={tutorEmail}
                readOnly
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="flex gap-6">
            {/* Status */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Status</span>
              </div>
              <select
                defaultValue={status}
                {...register("status")}
                className="select select-bordered w-full"
              >
                <option value="pending">Pending</option>
                {/* <option value="pending">Pending</option> */}
                <option value="rejected">Rejected</option>
                <option value="approved">Approved</option>
              </select>
            </label>
            {/* Price */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Registration Fee*</span>
              </div>
              <input
                {...register("registrationFee")}
                type="float"
                placeholder="Registration Fee"
                defaultValue={registrationFee}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="flex gap-6">
            {/* Registration Starts */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Registration Starts</span>
              </div>
              <input
                {...register("registrationStarts")}
                type="date"
                defaultValue={registrationStarts}
                placeholder="Registration Starts"
                className="input input-bordered w-full"
              />
            </label>
            {/* Registration Ends */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Registration Ends*</span>
              </div>
              <input
                {...register("registrationEnds")}
                type="date"
                defaultValue={registrationEnds}
                placeholder="Registration Ends"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="flex gap-6">
            {/* Class Starts */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Class Starts</span>
              </div>
              <input
                {...register("classStarts")}
                type="date"
                defaultValue={classStarts}
                placeholder="Class Starts"
                className="input input-bordered w-full"
              />
            </label>
            {/* Class Ends */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Class Ends*</span>
              </div>
              <input
                {...register("classEnds")}
                type="date"
                defaultValue={classEnds}
                placeholder="Class Ends"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          {/* Session Details */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Session Details</span>
            </div>
            <textarea
              {...register("sessionDetails")}
              className="textarea textarea-bordered h-24"
              defaultValue={sessionDetails}
              placeholder="Session Details"
            ></textarea>
          </label>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Upload a file</span>
              </div>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full max-w-xs"
              />
              * Required
            </div>
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Class Duration (in Minutes)</span>
              </div>
              <input
                {...register("classDuration")}
                type="number"
                defaultValue={classDuration}
                placeholder="Class Duration"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <button className="btn">
            Add Item <FaUtensils className="ml-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSession;
