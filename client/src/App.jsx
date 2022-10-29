import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams } from "react-router-dom";
import axios from "axios";

// React-Slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Pages
import Master from "./Pages/master";
import Home from "./Pages/Home";
import AdminMaster from "./Pages/Admin/adminMaster";
import AdminHomePage from "./Pages/Admin/admin.home";
import AchUpdate from "./Pages/Admin/achievemenetUpdate.page";
import EventsUpdate from "./Pages/Admin/eventsUpdate.page";
import FacultyUpdate from "./Pages/Admin/facultyUpdate.page";
import VFUpdate from "./Pages/Admin/vfUpdate.page";
import PGUpdate from "./Pages/Admin/pgUpdate.page";
import ProjectUpdate from "./Pages/Admin/projectUpdate.page";
import GalleryUpdate from "./Pages/Admin/galleryUpdate.page";

//Redux actions
import { getMySelf } from "./Redux/Reducer/User/user.action";
import SliderUpdate from "./Pages/Admin/sliderUpdate.page";
import EventParticipants from "./Pages/Admin/eventsParticipants.page";
import UpdateFeedbackFaculty from "./components/AdminComponents/Feedback/updateFeedbackFaculty";
import FFUpdate from "./Pages/Admin/AFeedback/feedbackFacultyUpdate.page";
import DognutChart from "./components/AdminComponents/Feedback/dognutChart";
import SpeakerFeedback from "./Pages/speakerFeedback";
import NavBar from "./components/Navbar/NavBar";
import CertificateGeneratorByImage from "./certificate";

// axios global settings
if (localStorage.SRCUser) {
  const { token } = JSON.parse(localStorage.SRCUser);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const App = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const data = localStorage.SRCUser;
  useEffect(() => {
    if (localStorage.SRCUser) {
      dispatch(getMySelf());
    }
  }, [data]);

  const reduxState = useSelector((globalStore) => globalStore.user.user);
  const user_role = reduxState?.user?.userRole;
  const userName = reduxState?.user?.fullName;
  console.log(reduxState?.user?.fullName);
  localStorage.setItem("user_id", reduxState?.user?._id);

  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type" element={<Master />} />
          <Route path="/feedback/:type" element={<SpeakerFeedback />} />
          <Route
            path="/certificate"
            element={<CertificateGeneratorByImage userName={userName} />}
          />
          <Route
            path="/certificate/:type"
            element={<CertificateGeneratorByImage />}
          />
        </Routes>
      </div>
      {user_role === "admin" ? (
        <Routes>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/:type" element={<AdminMaster />} />
          <Route
            path="/admin/achievemnts/:type"
            element={<AchUpdate urltype={"id"} />}
          />
          <Route
            path="/admin/events/:type"
            element={<EventsUpdate urltype={"id"} />}
          />
          <Route
            path="/admin/events/show-participants/:type"
            element={<EventParticipants />}
          />
          <Route
            path="/admin/faculty/:type"
            element={<FacultyUpdate urltype={"id"} />}
          />
          <Route
            path="/admin/visitingfaculty/:type"
            element={<VFUpdate urltype={"id"} />}
          />
          <Route path="/admin/pg/:type" element={<PGUpdate urltype={"id"} />} />
          <Route
            path="/admin/projects/:type"
            element={<ProjectUpdate urltype={"id"} />}
          />
          <Route
            path="/admin/gallery/:type"
            element={<GalleryUpdate urltype={"id"} />}
          />
          <Route
            path="/admin/slider/:type"
            element={<SliderUpdate urltype={"id"} />}
          />
          <Route
            path="/admin/feedback/:type"
            element={<FFUpdate urltype={"id"} />}
          />
          <Route
            path="/admin/faculty-feedback/:type"
            element={<FFUpdate urltype={"faculty-feedback"} />}
          />
        </Routes>
      ) : (
        <>
          {/* {type !== "login" && type !== "register" ? (
            <div className="w-full mt-20 flex items-center justify-center">
              <h1 className="text-2xl font-bold text-red-600">UnAuthorized</h1>
            </div>
          ) : (
            <></>
          )} */}
        </>
      )}
    </>
  );
};

export default App;