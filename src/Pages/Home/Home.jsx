import React from "react";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Featured from "../../Shared/Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";
import SessionCard from "../SessionCard/SessionCard";
import Tutors from "../Tutors/Tutors";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>StudyHive | Home</title>
      </Helmet>
      <Banner></Banner>
      <div>
        <h1 className="text-5xl text-center text-blue-600 font-bold my-5">
          Session Cards
        </h1>
      </div>
      <SessionCard></SessionCard>
      <h1 className="text-5xl text-center text-blue-600 font-bold my-5">
        All Tutors
      </h1>
      <Tutors></Tutors>
    </div>
  );
};

export default Home;
