import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserFriends, FaUserTie } from "react-icons/fa";

//Components
import SideBar from "../../components/AdminComponents/siderbar";
import AdminNavBar from "../../components/AdminComponents/adminNavBar";
import Card from "../../components/AdminComponents/card";
import DataTable from "../../components/AdminComponents/dataTable";

//Redux actions
import { getAllUsers } from "../../Redux/Reducer/User/user.action";
import AdminSearchNavBar from "../../components/AdminComponents/adminSearchNavBar";

const AdminHomePage = () => {
  const [userData, setUserData] = useState([]);
  const [searchKey, setSearchKey] = useState([]);

  var pg = 0;
  var faculty = 0;
  var international = 0;

  userData.map((data) => {
    if (data.typeOfRegistration === "Postgraduate") pg = pg + 1;
    if (data.typeOfRegistration === "Faculty") faculty += 1;
    if (data.typeOfRegistration === "International") international += 1;
  });
  const cardData = [
    {
      name: "TOTAl USERS",
      count: userData?.length,
      icon: <FaUserFriends />,
    },
    {
      name: "STUDENTS",
      count: pg,
      icon: <FaUserFriends />,
    },
    {
      name: "FACULTY",
      count: faculty,
      icon: <FaUserTie />,
    },
    {
      name: "International",
      count: international,
      icon: <FaUserTie />,
    },
  ];

  // const getUsersData = () => {
  //   axios.get("http://localhost:4000/user/allusers")
  //   .then((res) => {
  //     const data = res.data;
  //     setUserData(data.user);
  //   })
  //   .catch(e => alert("Cant get User Data"))
  // }

  const reduxState = useSelector((globalStore) => globalStore.user.allUsers);

  useEffect(() => {
    reduxState?.user && setUserData(reduxState.user);
  }, [reduxState]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <>
      <div className="flex flex-row w-full">
        <div className=" w-1/5">
          <SideBar />
        </div>
        <div className="w-4/5 flex flex-col">
          <AdminSearchNavBar setSearchKey={setSearchKey} />
          <div className="flex flex-col gap-10 mt-5">
            <div className="flex flex-row items-center justify-around w-full">
              {cardData.map((data) => (
                <Card {...data} />
              ))}
            </div>
            <div className="mx-10">
              <DataTable searchKey={searchKey} />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
