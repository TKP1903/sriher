import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//components
import FacultyCarousal from "./faculty.Carousal";

const FacultyCard = () => {
  const [faculty, setFaculty] = useState([]);
  const reduxState = useSelector((globalStore) => globalStore.faculty);
  useEffect(() => {
    reduxState?.faculty && setFaculty(reduxState?.faculty.data);
  }, [reduxState?.faculty]);

  return (
    <>
      <div className="mb-20 md:py-10 mx-5 lg:mx-20">
        <div className="flex flex-row items-center justify-between pb-8">
          <h1 className="text-center bg-gray-100 py-1 w-full text-2xl md:font-3xl font-semibold md:font-bold pl-3">
            Faculty
          </h1>
        </div>
        <div className="md:w-auto flex flex-wrap items-center justify-center gap-10">
          {faculty?.length > 0 ? (
            faculty?.map(
              (data) =>
                data.status === "Active" && <FacultyCarousal {...data} />
            )
          ) : (
            <>Loading .....</>
          )}
        </div>
      </div>
    </>
  );
};

export default FacultyCard;
