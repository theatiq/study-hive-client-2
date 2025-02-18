import React from "react";
import { motion, useAnimation } from "framer-motion";
// import img2 from "../assets/01.jfif";
import img2 from "../../../src/assets//01.jfif";

const Banner = () => {
  const textAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      color: ["#FFFFFF", "#FFD700", "#00FF00", "#FF4500", "#FFFFFF"], // Color cycle
      transition: {
        duration: 4, // Total duration for color cycle
        repeat: Infinity, // Loop the animation
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-full h-[550px] overflow-hidden">
      {/* Background Image */}
      <img
        src={img2}
        className="w-full h-full object-cover mt-[95px]"
        alt="Slide"
      />

      {/* Overlay and Animated Text */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-5">
        <motion.h2
          className="text-4xl font-bold mb-3"
          variants={textAnimation}
          initial="initial"
          animate="animate"
        >
          Welcome to Online Study Collaborative
        </motion.h2>
        <motion.p
          className="text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Stay ahead with the latest in online collaboration trends! Explore
          insights, tips, and innovations shaping the future of remote teamwork
          and digital connectivity.
        </motion.p>
      </div>
    </div>
  );
};

export default Banner;
