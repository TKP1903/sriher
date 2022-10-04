import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

//components
import FacultyCarousal from "./faculty.Carousal";

const VisitingFacultyCard = () => {
    const [faculty, setFaculty] = useState([ ]);
    const reduxState = useSelector((globalStore) => globalStore.visitingFaculty);
    console.log(reduxState);
    useEffect(() => {
         reduxState?.faculty && setFaculty(reduxState?.faculty.data);
    }, [reduxState?.faculty]);
    
  return (
    <>
      <div className="pb-24 md:py-10">
        <div className="flex flex-row items-center justify-between mx-8 md:mx-40 pb-8">
          <h1 className="text-center bg-gray-100 py-1 w-full text-2xl md:font-3xl font-semibold md:font-bold pl-3">
            Visiting Faculty
          </h1>
          <a href="./allfaculty">
            <p className="text-xs md:text-sm font-light"></p>
          </a>
        </div>
        <div className="md:w-auto flex flex-wrap items-center justify-center gap-10">
          {faculty?.map(
            (data) => data.status === "Active" && <FacultyCarousal {...data} />
          )}
        </div>
      </div>
    </>
  );
}

export default VisitingFacultyCard;