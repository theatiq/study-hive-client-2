import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateNotes = () => {
  const { user } = useAuth(); // Logged-in user details
  const axiosSecure = useAxiosSecure(); // Axios instance with secure config
  const studentEmail = user?.email;

  const [notes, setNotes] = useState([]);

  // Fetch user's notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosSecure.get("/notes", {
          params: { email: studentEmail },
        });

        if (response.data.success) {
          setNotes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (studentEmail) {
      fetchNotes();
    }
  }, [studentEmail, axiosSecure]);

  // Handle note update
  const handleUpdate = (noteId) => {
    Swal.fire({
      title: "Update Note",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Title">
        <textarea id="swal-input2" class="swal2-textarea" placeholder="Description"></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById("swal-input1").value;
        const description = document.getElementById("swal-input2").value;

        return { title, description };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { title, description } = result.value;
          await axiosSecure.put(`/notes/${noteId}`, { title, description });

          Swal.fire("Updated!", "Your note has been updated.", "success");
          // Refresh notes
          setNotes((prev) =>
            prev.map((note) =>
              note._id === noteId ? { ...note, title, description } : note
            )
          );
        } catch (error) {
          console.error("Error updating note:", error);
        }
      }
    });
  };

  // Handle note deletion
  const handleDelete = async (noteId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/notes/${noteId}`);

        Swal.fire("Deleted!", "Your note has been deleted.", "success");
        // Remove note from list
        setNotes((prev) => prev.filter((note) => note._id !== noteId));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Notes</h1>
      {notes.length > 0 ? (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note._id} className="p-4 border rounded">
              <h2 className="text-lg font-bold">{note.title}</h2>
              <p className="text-sm text-gray-600">{note.description}</p>
              <div className="mt-2 space-x-2">
                <button
                  className="btn btn-sm"
                  onClick={() => handleUpdate(note._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default UpdateNotes;
