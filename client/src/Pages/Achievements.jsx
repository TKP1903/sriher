import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

//Components
import NavBar from "../components/Navbar/NavBar";
import UGStudents from "../components/Achievemts/ugStudents";
import PG from "../components/Achievemts/pg";
import FacultyAch from "../components/Achievemts/facultyAch";
import Footer from "../components/footer";

//Redux actions
import { getAchievement } from "../Redux/Reducer/Achivements/achievements.action";

const Achievements = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAchievement());
  }, []);

  return (
    <>
      <div className="relative top-10 lg:top-20 py-5 lg:py-10">
        <div className="md:mt-5 lg:mt-10 mx-2 md:mx-20 lg:mx-44">
          <UGStudents />
          <PG />
          <FacultyAch />
        </div>
      </div>
    </>
  );
};

export default Achievements;
