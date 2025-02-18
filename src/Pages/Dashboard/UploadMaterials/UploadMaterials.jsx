import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useSession from "../../../Hooks/useSession";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadMaterials = () => {
  const [session, refetch] = useSession();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data, sessionId) => {
    try {
      // Upload the image to imgbb
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imageResponse = await axiosPublic.post(
        image_hosting_api,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imageResponse.data.success) {
        // Prepare the data to send to the backend
        const materialData = {
          sessionId,
          sessionTitle: data.sessionTitle || "",
          tutorName: user?.displayName || "",
          tutorEmail: user?.email || "",
          doc1: data.doc1 || "",
          doc2: data.doc2 || "",
          doc3: data.doc3 || "",
          image: imageResponse.data.data.display_url,
        };

        // Send data to the backend
        const response = await axiosSecure.post("/material", materialData);
        
        if (response.data.insertedId) {
          reset();
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Material for ${materialData.sessionTitle} uploaded successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Error uploading material:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while uploading the material!",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Items: {session.length}</h2>
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
            {session
              .filter((item) => item.status === "approved")
              .map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.sessionTitle}</td>
                  <td>{item.tutorEmail}</td>
                  <td>{item.registrationFee}</td>
                  <td>{item.status}</td>
                  <td>
                    <form
                      className=""
                      onSubmit={handleSubmit((data) =>
                        onSubmit(data, item._id)
                      )}
                    >
                      <input
                        {...register("sessionTitle")}
                        type="hidden"
                        value={item.sessionTitle}
                      />
                      <div className="form-control w-full my-6">
                        <input
                          {...register("image")}
                          type="file"
                          className="file-input w-full max-w-xs"
                        />
                      </div>
                      <div className="form-control w-full my-6">
                        <input
                          {...register("doc1")}
                          type="text"
                          placeholder="Doc-1"
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="form-control w-full my-6">
                        <input
                          {...register("doc2")}
                          type="text"
                          placeholder="Doc-2"
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="form-control w-full my-6">
                        <input
                          {...register("doc3")}
                          type="text"
                          placeholder="Doc-3"
                          className="input input-bordered w-full"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Upload
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadMaterials;
