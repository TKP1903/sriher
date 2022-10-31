import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import gravatar from "gravatar";

//Components
import SmNavBar from "./smNavBar";
import logo from "../assets/logo.png";
import { EventsDropdownRender, StaffDropdownRender } from "./navDropDown";

//Redux action
import { signOut } from "../../Redux/Reducer/Auth/auth.action";

const LgNav = () => {
  const { type } = useParams();
  const [value, setValue] = useState("");
  //const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const dispatch = useDispatch();
  const reduxState = useSelector((globalStore) => globalStore.user.user);

  //   useEffect(() => {
  //   reduxState?.user && setUser(reduxState?.user);
  //  }, [reduxState]);

  const signOutHandler = () => {
    window.location.reload(false);
    dispatch(signOut());
  };

  const staff = [
    {
      name: "Faculty",
      path: "faculty",
    },
    {
      name: "Visiting Faculty",
      path: "visitingfaculty",
    },
    {
      name: "PG",
      path: "pg",
    },
  ];
  const events = [
    {
      name: "Conferences",
      path: "events",
    },
    // {
    //   name: "CDE",
    //   path: "cde",
    // },
  ];

  const navbarList = [
    {
      name: "Home",
      path: "home",
    },
    // {
    //   name: "Achivements",
    //   path: "achivements",
    // },
    // {
    //   name: "Gallery",
    //   path: "gallery",
    // },
    // {
    //   name: "Projects",
    //   path: "projects",
    // },
  ];

  return (
    <div className="hidden fixed z-10 w-full bg-gray-50 lg:flex flex-col items-start gap-2">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="md:w-64 lg:w-96 border border-gray-100 ml-20 mt-2">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-full h-full" />
          </Link>
        </div>
        <div className="lg:mr-6">
          {reduxState?.user ? (
            <div className="flex flex-row items-center justify-center gap-4">
              <button
                className="bg-teal-700 px-2.5 py-1 text-gray-50 rounded-md border border-gray-50 shadow-md"
                onClick={signOutHandler}
              >
                Logout
              </button>
              <Link
                to="/profile"
                className="p-1 border-2 border-gray-300 text-red-400 w-14 h-14 rounded-full"
              >
                <img
                  src={gravatar.url(reduxState?.user?.email)}
                  alt={reduxState?.user?.email}
                  className="w-full h-full rounded-full object-cover border-2"
                />
              </Link>
            </div>
          ) : (
            <span className="flex flex-row items-center justify-between md:gap-6 lg:gap-12 md:text-sm lg:text-lg text-gray-50 mx-8 cursor-pointer">
              <div className="bg-teal-700 px-2.5 py-1 rounded-md border border-gray-50 shadow-md">
                <Link
                  to={"/login"}
                  className={
                    type === "login"
                      ? "bg-teal-800 border border-teal-500 border-grey-50 shadow-2xl px-2.5 py-1 w-full rounded-sm transition duration-700 ease-in-out delay-150"
                      : ""
                  }
                >
                  Login
                </Link>
              </div>
              <div className="bg-teal-700 px-2.5 py-1 rounded-md border border-gray-50 shadow-md">
                <Link
                  to={"/register"}
                  className={
                    type === "register"
                      ? "bg-teal-800 border border-teal-500 border-grey-50 shadow-2xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                      : ""
                  }
                >
                  Register
                </Link>
              </div>
            </span>
          )}
        </div>
      </div>
      <div className="bg-teal-700 w-screen h-10 flex items-center opacity-90 flex flex-row items-center justify-between">
        <ul className="flex flex-row lg:ml-20 items-center justify-between md:gap-6 lg:gap-12 md:text-sm lg:text-lg text-gray-50 mx-8 cursor-pointer">
          {navbarList.map((data) => (
            <li
              key={data?.name}
              className={
                type === data.path
                  ? "font-semibold bg-teal-800 border border-teal-500 border-grey-50 shadow-2xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                  : "font-semibold"
              }
            >
              <Link to={`/${data.path}`} id="nav_items">
                {data.name}
              </Link>
            </li>
          ))}
          <li>
            <StaffDropdownRender data={staff} name="Teaching Staff" />
          </li>
          <li>
            <EventsDropdownRender data={events} name="Events" />
          </li>
          <li></li>
        </ul>
        {reduxState?.user && (
          <div className="flex font-semibold items-center text-gray-50 text-lg  gap-6 mr-14">
            <span
              className={
                type === "conference"
                  ? "bg-teal-800 border border-teal-500 border-grey-50 shadow-2xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                  : ""
              }
            >
              <Link to={"/conference"} id="nav_items">
                Conferences
              </Link>
            </span>
            <span
              className={
                type === "certificates-page"
                  ? "bg-teal-800 border border-teal-500 border-grey-50 shadow-2xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                  : ""
              }
            >
              <Link to={"/certificates-page"} id="nav_items">
                Certificates
              </Link>
            </span>
            <span
              className={
                type === "feedback"
                  ? "bg-teal-800 border border-teal-500 border-grey-50 shadow-2xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                  : ""
              }
            >
              <Link to={"/feedback"} id="nav_items">
                Feedback
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <>
      <div>
        <LgNav />
        <SmNavBar />
      </div>
    </>
  );
};

export default NavBar;
