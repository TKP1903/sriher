import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

//components
import VisitingFacultyCard from "../components/Faculty/visitingFaculty.Component";
import { getVisitingFaculty } from "../Redux/Reducer/VisitingFaculty/visitingFaculty.action";
//Redux actions

const AllVisitingFaculty = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVisitingFaculty());
  }, []);

  return (
    <>
      <div className="relative top-16 md:top-0 lg:top-20 md:py-10">
        <VisitingFacultyCard />
      </div>
    </>
  );
};

export default AllVisitingFaculty;
