import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
  import { IoMdAdd } from 'react-icons/io';

//Components
import SideBar from '../../../components/AdminComponents/siderbar'
import AdminNavBar from '../../../components/AdminComponents/adminNavBar';

//Redux actions
import { getFaculty } from "../../../Redux/Reducer/Faculty/faculty.action";
import Card from '../../../components/AdminComponents/card';
import FacultyList from '../../../components/AdminComponents/Feedback/facultyList';
import AddFeedbackFaculty from '../../../components/AdminComponents/Feedback/addFeedbackFaculty';

const FeedbackPage = (props) => {
  // const cardData = [
  //   {
  //     name: "Brochure",
  //     count: 0,
  //     icon: <FaUserFriends />,
  //   }
  // ]

  const reduxState = useSelector((globalStore) => globalStore.faculty);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFaculty());
  }, []);

  useEffect(() => {
    //reduxState?.faculty && setFacultyData(reduxState?.faculty.data);
  }, [reduxState?.faculty]);

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="w-4/5 flex flex-col gap-5 overflow-auto">
          <AdminNavBar />
          <div className="flex flex-col gap-10 mt-5">
            <div className="flex flex-row items-end justify-between mx-10">
              <div className="flex flex-row items-start">
                {/* {
                      cardData.map((data) => <Card {...data}/>)
                    } */}
              </div>
              <Link
                to="/admin/add-faculty-feedback"
                className="text-white bg-green-800 text-lg font-light px-2 py-1 rounded-md flex items-center gap-1 shadow-xl"
                // onClick={openModal}
              >
                Add
                <IoMdAdd />
              </Link>
            </div>
            <div className="mx-20">
              {props.urltype === "feedback" && <FacultyList />}
              {props.urltype === "add-faculty-feedback" && (
                <AddFeedbackFaculty />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackPage;