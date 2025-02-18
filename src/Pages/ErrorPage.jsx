import React from "react";
import { useNavigate } from "react-router-dom";
// import errorPage from "../../src/assets/404.gif"; // Ensure the path is correct

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      {/* Header */}
      <header className="py-4 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Oops! Page Not Found</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        {/* <img
          src={errorPage}
          alt="404 Error"
          className="max-w-md w-full mb-8 rounded-lg shadow-lg"
        /> */}
        <h2 className="text-5xl font-extrabold mb-4">404</h2>
        <p className="text-lg mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleGoBack}
            className="btn bg-white text-purple-700 px-6 py-3 rounded-full shadow-lg hover:bg-purple-200 transition duration-300"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn bg-white text-purple-700 px-6 py-3 rounded-full shadow-lg hover:bg-purple-200 transition duration-300"
          >
            Go Home
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} StudyHive. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ErrorPage;
