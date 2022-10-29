import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";
import { MdClose } from "react-icons/md";
import logo from "../assets/logo.png";

import { HiLogout } from "react-icons/hi";
//Redux action
import { signOut } from "../../Redux/Reducer/Auth/auth.action";


const SmNavBar = () => {
  const { type } = useParams();
  const [ isDropDownOpen, setIsDropDownOpen ] =  useState(false);
  const [value, setValue] = useState("");

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  // const [user, setUser] = useState();

 
  const dispatch = useDispatch();
  const reduxState = useSelector((globalStore) => globalStore.user.user);

//   useEffect(() => {
//   reduxState?.user && setUser(reduxState?.user);
//  }, [reduxState]);

 const signOutHandler = () => {
  window.location.reload(false);
  dispatch(signOut())
 };

  return (
    <div className="">
      <div className="fixed lg:hidden z-10 w-full h-14 bg-gray-50 shadow-xl border-b flex flex-row items-center justify-between gap-2 pr-4">
        <div className="w-80 h-full border border-gray-100 my-1">
          <img src={logo} alt="Logo" className="w-full h-full" />
        </div>
        <div
          className="w-6 h-6"
          onClick={() => setIsDropDownOpen((prev) => !prev)}
        >
          {isDropDownOpen ? (
            <MdClose className="w-full h-full" />
          ) : (
            <GiHamburgerMenu className="w-full h-full" />
          )}
        </div>
        {isDropDownOpen && (
          <div className="bg-gray-200 absolute right-0 top-14 w-1/2">
            <ul className="flex flex-col items-start justify-center gap-4 block px-4 py-2 hover:bg-gray-100 font-bold h-full">
              <li
                className={
                  type === "home" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/home"}>Home</Link>
              </li>
              <li
                className={
                  type === "events" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/events"}>Events</Link>
              </li>
              {/* <li
                className={
                  type === "cde" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/cde"}>CDE</Link>
              </li> */}
              {/* <li
                className={
                  type === "achivements" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/achivements"}>Achivements</Link>
              </li> */}
              <li
                className={
                  type === "faculty" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/faculty"}>Faculty</Link>
              </li>
              <li
                className={
                  type === "visitingfaculty" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/visitingfaculty"}>Visiting Faculty</Link>
              </li>
              <li
                className={
                  type === "pg" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/pg"}>PG</Link>
              </li>
              {/* <li
                className={
                  type === "gallery" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/gallery"}>Gallery</Link>
              </li> */}
              {/* <li
                className={
                  type === "projects" &&
                  "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                }
              >
                <Link to={"/projects"}>Projects</Link>
              </li> */}
              {reduxState?.user ? (
                <div className="flex flex-col items-start justify-center gap-4 block px-0 py-2 hover:bg-gray-100 font-bold w-full">
                  <li
                    className={
                      type === "conference" &&
                      "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                    }
                  >
                    <Link to={"/conference"}>Conference</Link>
                  </li>
                  <li
                    className={
                      type === "feedback" &&
                      "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                    }
                  >
                    <Link to={"/feedback"}>Feedback</Link>
                  </li>
                  <li
                    className={
                      type === "profile" &&
                      "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                    }
                  >
                    <Link to={"/profile"} className="w-full">
                      Profile
                    </Link>
                  </li>
                  <li
                    className={
                      type === "register" &&
                      "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                    }
                  >
                    <button
                      className="py-1 font-bold flex items-center gap-2 justify-center"
                      onClick={signOutHandler}
                    >
                      Logout <HiLogout className="text-xl text-red-700" />
                    </button>
                  </li>
                </div>
              ) : (
                <div className="flex flex-col gap-4 items-start justify-center w-full">
                  <li
                    className={
                      type === "login" &&
                      "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                    }
                  >
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li
                    className={
                      type === "register" &&
                      "bg-slate-900 text-center w-full border border-grey-50 shadow-xl py-1 px-2 rounded-sm text-blue-50 transition duration-700 ease-in-out delay-150"
                    }
                  >
                    <Link to={"/register"}>Register</Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}


export default SmNavBar;
