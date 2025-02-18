import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useLoaderData } from "react-router-dom";
import useSession from "../../../Hooks/useSession";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import useMaterial from "../../../Hooks/useMaterial";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMaterials = () => {
  const { _id, sessionTitle, tutorName, tutorEmail, doc1, doc2, doc3 } =
    useLoaderData();
  
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Upload the image to imgbb
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imageResponse = await axiosPublic.post(
        image_hosting_api,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (imageResponse.data.success) {
        // Prepare the data to send to the backend
        const materialData = {
          doc1: data.doc1 || "",
          doc2: data.doc2 || "",
          doc3: data.doc3 || "",
          image: imageResponse.data.data.display_url,
        };

        // Send data to the backend
        const response = await axiosSecure.patch(
          `/material/${_id}`,
          materialData
        );

        if (response.data.modifiedCount > 0) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Material updated successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Changes",
            text: "No data was modified.",
          });
        }
      }
    } catch (error) {
      console.error("Error updating material:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating the material!",
      });
    }
  };

  return (
    <div>
      {/* <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Items: {session.length}</h2>
        {session.length ? (
          <Link to={"/dashboard/payment"}>
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div> */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Session Title</th>
              <th>Session Owner</th>
              <th>Session Fee</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{sessionTitle}</td>
              <td>{tutorName}</td>
              <td>{tutorEmail}</td>

              <td>
                <form
                  className=""
                  onSubmit={handleSubmit((data) => onSubmit(data, _id))}
                >
                  <input
                    {...register("sessionTitle")}
                    type="hidden"
                    value={sessionTitle}
                  />
                  <div className="form-control w-full my-6">
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      className="file-input w-full max-w-xs"
                    />
                    * Required
                  </div>
                  <div className="form-control w-full my-6">
                    <input
                      {...register("doc1")}
                      type="text"
                      placeholder="Doc-1"
                      defaultValue={doc1}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control w-full my-6">
                    <input
                      {...register("doc2")}
                      type="text"
                      placeholder="Doc-2"
                      defaultValue={doc2}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control w-full my-6">
                    <input
                      {...register("doc3")}
                      type="text"
                      placeholder="Doc-3"
                      defaultValue={doc3}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateMaterials;
