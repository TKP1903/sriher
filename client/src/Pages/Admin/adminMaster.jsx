import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//Pages
import EventsPage from "./events.page";
import FacultyPage from "./faculty.page";
import PGPage from "./pg.page";
import VisitingFacultyPage from "./visitingfaculty.page";
import ProjectsPage from "./projects.page";
import AchievementsPage from "./achievements.page";
import GalleryPage from "./gallery.page";
import UserPage from "./user.page";
import SliderPage from "./slider.page";
import FeedbackPage from "./AFeedback/feedback.page";
import PaymentsPage from "./payments/payments.page";

const AdminMaster = () => {
  let { type } = useParams();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [type]);
  console.log(type);
  return (
    <div>
      {type === "users" && <UserPage urltype={type} />}
      {type === "adduser" && <UserPage urltype={type} />}
      {type === "events" && <EventsPage urltype={type} />}
      {type === "addevent" && <EventsPage urltype={type} />}
      {type === "faculty" && <FacultyPage urltype={type} />}
      {type === "addfaculty" && <FacultyPage urltype={type} />}
      {type === "addvisitingfaculty" && <VisitingFacultyPage urltype={type} />}
      {type === "visitingfaculty" && <VisitingFacultyPage urltype={type} />}
      {type === "pg" && <PGPage urltype={type} />}
      {type === "addpg" && <PGPage urltype={type} />}
      {type === "projects" && <ProjectsPage urltype={type} />}
      {type === "addproject" && <ProjectsPage urltype={type} />}
      {type === "achievements" && <AchievementsPage urltype={type} />}
      {type === "addachievement" && <AchievementsPage urltype={type} />}
      {type === "gallery" && <GalleryPage urltype={type} />}
      {type === "addimage" && <GalleryPage urltype={type} />}
      {type === "slider" && <SliderPage urltype={type} />}
      {type === "addslider" && <SliderPage urltype={type} />}
      {type === "feedback" && <FeedbackPage urltype={type} />}
      {type === "add-faculty-feedback" && <FeedbackPage urltype={type} />}
      {type === "payments" && <PaymentsPage />}
    </div>
  );
};

export default AdminMaster;
