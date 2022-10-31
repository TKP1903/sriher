import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";

//components
import PG from "../components/PG/pg";

//Redux actions
import { getPg } from "../Redux/Reducer/Pg/pg.action";

const AllPGStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPg());
  }, []);

  return (
    <>
      <NavBar />
      <div className="relative top-16 md:top-0 lg:top-20 md:py-10">
        <div className="px-5 md:px-10 lg:mx-44 mb-10">
          <PG />
        </div>
      </div>
    </>
  );
};

export default AllPGStudents;
