import React from "react";
// import imageIcon from "../assets/Logo.jfif";
import imageIcon from "../../../src/assets/Logo.jfif";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Info Section */}
        <div>
          <h6 className="text-lg font-bold mb-4">Contact Info</h6>
          <p className="mb-2">
            <FaEnvelope className="inline mr-2" /> Email:{" "}
            <a
              href="mailto:theatiq@gmail.com"
              className="hover:underline text-blue-400"
            >
              theatiq@gmail.com
            </a>
          </p>
          <p className="mb-2">
            <FaPhone className="inline mr-2" /> Phone:{" "}
            <a href="tel:+8801677836566" className="hover:underline">
              +8801677836566
            </a>
          </p>
          <p className="mb-2">
            <FaWhatsapp className="inline mr-2" /> WhatsApp:{" "}
            <a href="https://wa.me/8801677836566" className="hover:underline">
              +8801677836566
            </a>
          </p>
          <p>Location: Cumilla, Bangladesh</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h6 className="text-lg font-bold mb-4">Quick Links</h6>
          <nav className="flex flex-col space-y-2">
            <Link to={"/"}>
              <a className="hover:text-blue-400">Home</a>
            </Link>
            <Link to={"/allBlogs"}>
              <a className="hover:text-blue-400">All Blogs</a>
            </Link>
            <Link to={"/myBlogs"}>
              <a className="hover:text-blue-400">My Blogs</a>
            </Link>
            <Link to={"/featuredBlogs"}>
              <a className="hover:text-blue-400">Featured Blogs</a>
            </Link>
          </nav>
        </div>

        {/* Social Links Section */}
        <div>
          <h6 className="text-lg font-bold mb-4">Follow Me</h6>
          <div className="flex gap-6 text-2xl">
            <Link
              to="https://github.com/theatiq"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaGithub />
            </Link>
            <Link
              to="https://www.linkedin.com/in/atiqurdottech/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </Link>
            <Link
              to="https://web.facebook.com/atiqur.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebook />
            </Link>
            <Link
              to="https://www.instagram.com/atiqur.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaInstagram />
            </Link>
            <Link
              to="https://www.youtube.com/@atiqur.tech."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Link
          to={"/"}
          className="flex items-center gap-2 text-lg font-semibold text-teal-400"
        >
          <img className="w-8 rounded-full" src={imageIcon} alt="Logo" />
          <span className="hidden lg:flex">StudyHive</span>
        </Link>
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} StudyHive All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
