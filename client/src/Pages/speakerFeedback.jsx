import React from "react";


//Redux actions
import FeedbackForm from "../components/FeedBack/feedbackForm";
import NavBar from "../components/Navbar/NavBar";

const SpeakerFeedback = () => {
  return (
    <>
      <NavBar />
      <div className="pt-16 md:py-40 ">
        <FeedbackForm />
      </div>
    </>
  );
};

export default SpeakerFeedback;
