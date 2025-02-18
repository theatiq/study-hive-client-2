import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateNotes = () => {
  const { user } = useAuth(); // Logged-in user details
  const axiosSecure = useAxiosSecure(); // Axios instance with secure configuration
  const studentEmail = user?.email;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNoteSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      email: studentEmail,
      title,
      description,
      createdAt: new Date(),
    };

    try {
      const response = await axiosSecure.post("/notes", noteData);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Note created successfully!",
        });
        // Reset form fields
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to create note",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Create Note</h1>
      <form onSubmit={handleNoteSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={studentEmail}
            readOnly
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        {/* Title Field */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded p-2"
            placeholder="Enter note title"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded p-2"
            rows="4"
            placeholder="Enter note description"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNotes;
