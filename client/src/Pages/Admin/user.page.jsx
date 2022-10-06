import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";

//Components
import SideBar from "../../components/AdminComponents/siderbar";
import Card from "../../components/AdminComponents/card";
import DataTable from "../../components/AdminComponents/dataTable";
import AdminSearchNavBar from "../../components/AdminComponents/adminSearchNavBar";
//Redux actions
import { getAllUsers } from "../../Redux/Reducer/User/user.action";
import AddUser from "../../components/AdminComponents/addUser";

const UserPage = (props) => {
  const [users, setUsers] = useState([]);
  const [searchKey, setSearchKey] = useState([]);

  const reduxState = useSelector((globalState) => globalState.user);
  useEffect(() => {
    reduxState?.allUsers && setUsers(reduxState?.allUsers.user);
  }, [reduxState]);

  const cardData = [
    {
      name: "Users",
      count: users ? users.length : 0,
      link: "View all users",
      linkUrl: "/",
      icon: <FaUserTie />,
    },
  ];
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="w-4/5 flex flex-col gap-5">
          <AdminSearchNavBar setSearchKey={setSearchKey} />
          <div className="flex flex-col gap-10 mt-5">
            <div className="flex flex-row items-end justify-between mx-10">
              <div className="flex flex-row items-start">
                {cardData.map((data) => (
                  <Card {...data} />
                ))}
              </div>
              <Link
                to="/admin/adduser"
                className="text-white bg-green-800 text-lg font-light px-2 py-1 rounded-md flex items-center gap-1"
              >
                Add User <IoMdAdd />
              </Link>
            </div>
            <div className="mx-10">
              {props.urltype === "users" && <DataTable searchKey={searchKey} />}
              {props.urltype === "adduser" && <AddUser />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
