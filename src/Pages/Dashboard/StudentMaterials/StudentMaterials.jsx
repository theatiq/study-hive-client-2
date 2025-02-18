import React from "react";
import { useLoaderData } from "react-router-dom";

const StudentMaterials = () => {
  const { sessionTitle, tutorName, tutorEmail, doc1, doc2, doc3, image } =
    useLoaderData();

    

  // Function to handle image download
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "study-material-image.jpg"); // Ensures it downloads the file
    document.body.appendChild(link); // Append the link to the DOM
    link.click(); // Simulate a click
    document.body.removeChild(link); // Remove it after click
  };

  // Function to open image in a new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Session Details */}
      <h1 className="text-2xl font-bold mb-4">{sessionTitle}</h1>
      <p className="text-lg mb-2">
        <strong>Tutor:</strong> {tutorName}
      </p>
      <p className="text-lg mb-4">
        <strong>Email:</strong> {tutorEmail}
      </p>

      {/* Image Display */}
      <div className="mb-6">
        <img
          src={image}
          alt="Study Material"
          className="max-w-md rounded shadow"
        />
        <div className="mt-2 space-x-4">
          <button
            className="btn btn-primary"
            onClick={() => handleDownload(image)}
          >
            Download Image
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => openInNewTab(image)}
          >
            View in New Tab
          </button>
        </div>
      </div>

      {/* Links to Study Materials */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Study Materials</h2>
        <ul className="list-disc pl-6">
          <li>
            <a
              href={doc1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Material 1
            </a>
          </li>
          <li>
            <a
              href={doc2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Material 2
            </a>
          </li>
          <li>
            <a
              href={doc3}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Material 3
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentMaterials;
