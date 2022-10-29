import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//Pages
import Event from "./Event";
import GalleryPage from "./Gallery";
import Home from "./Home";
import Achievements from "./Achievements";
import Projects from "./Projects";
import LoginPage from "./Login.page";
import RegisterPage from "./Register.page";
import AllFaculty from "./allFaculty";
import AllVisitingFaculty from "./allVisitingFaculty";
import AllPGStudents from "./allPgStudents";
import Profile from "./Profile";
import Conference from "./conference";
import SpeakerFeedback from "./speakerFeedback";
import Brochure from "./brochure";
import ForgotPassword from "./forgotpassword";
import CertificateGeneratorByImage from "../certificate";

const Master = () => {
  let { type } = useParams();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [type]);

  return (
    <div>
      {type === "home" && <Home />}
      {/* {type === "broucher" && <PdfReader />} */}
      {type === "events" && <Event />}
      {type === "cde" && <Event />}
      {type === "gallery" && <GalleryPage />}
      {type === "achivements" && <Achievements />}
      {type === "faculty" && <AllFaculty />}
      {type === "visitingfaculty" && <AllVisitingFaculty />}
      {type === "pg" && <AllPGStudents />}
      {type === "projects" && <Projects />}
      {type === "login" && <LoginPage />}
      {type === "register" && <RegisterPage />}
      {type === "forgotpassword" && <ForgotPassword />}

      {localStorage.SRCUser && type !== "login" && type !== "register" ? (
        <>
          {type === "conference" && <Conference />}
          {type === "feedback" && <SpeakerFeedback />}
          {type === "profile" && <Profile urlType={"profile"} />}
          {type === "update-profile" && <Profile urlType={"update-profile"} />}
          {/* {type === "certificate" && <CertificateGeneratorByImage />} */}
        </>
      ) : (
        <>
          {type !== "login" && type !== "register" && (
            <div className="flex flex-col gap-10 items-center justify-center">
              <h1 className="text-2xl font-bold text-black pt-20">
                Please Login to to open the {type} Page
              </h1>
              <Link
                to="/login"
                className="bg-cyan-400 text-xl font-bold px-5 py-1.5 rounded-md text-gray-50"
              >
                Click here to open signin page
              </Link>
            </div>
          )}
        </>
      )}
      {/* {localStorage.SRCUser ? (
        type === "update-profile" && <Profile urlType={"update-profile"} />
      ) : (
        <div>
          {type === "update-profile" && (
            <h1>Please Login to Update your profile</h1>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Master;
