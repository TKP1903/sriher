import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaUserTie, FaUserFriends } from "react-icons/fa";
import { MdOutlineEmojiEvents, MdFeedback, MdOutlinePayment, MdViewCarousel  } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
import { GiAchievement, GiBookCover } from "react-icons/gi";
import { GoProject } from "react-icons/go";
import { RiGalleryFill, RiSlideshow3Fill } from "react-icons/ri";
import { HiLogout } from "react-icons/hi";
import logo from "../assets/logo.png";


//Redux action
import { signOut } from "../../Redux/Reducer/Auth/auth.action";

const SideBar = () => {
    const dispatch = useDispatch();
    const reduxState = useSelector((globalStore) => globalStore.user.user);
    const signOutHandler = () => dispatch(signOut());
    const siderbarList = [
      {
        name: "Users",
        color: "text-blue-900",
        icon: <FaUser className="w-6 h-6" />,
        path: "users",
      },
      {
        name: "Events",
        color: "text-yellow-500",
        icon: <MdOutlineEmojiEvents className="w-6 h-6" />,
        path: "events",
      },
      {
        name: "Faculty",
        color: "text-blue-900",
        icon: <FaUserTie className="w-6 h-6" />,
        path: "faculty",
      },
      {
        name: "Visiting Faculty",
        color: "text-blue-900",
        icon: <ImUserTie className="w-6 h-6" />,
        path: "visitingfaculty",
      },
      {
        name: "PG",
        color: "text-blue-900",
        icon: <FaUserFriends className="w-6 h-6" />,
        path: "pg",
      },
      {
        name: "Projects",
        color: "text-blue-900",
        icon: <GoProject className="w-6 h-6" />,
        path: "projects",
      },
      {
        name: "Achievements",
        color: "text-blue-900",
        icon: <GiAchievement className="w-6 h-6" />,
        path: "achievements",
      },
      {
        name: "Gallery",
        color: "text-green-400",
        icon: <RiGalleryFill className="w-6 h-6" />,
        path: "gallery",
      },
      {
        name: "Home Page Sliders",
        color: "text-cyan-800",
        icon: <MdViewCarousel className="w-6 h-6" />,
        path: "slider",
      },
      {
        name: "Feedback",
        color: "text-yellow-400",
        icon: <MdFeedback className="w-6 h-6" />,
        path: "feedback",
      },
      {
        name: "Successful Payments",
        color: "text-green-800",
        icon: <MdOutlinePayment className="w-6 h-6" />,
        path: "payments",
      },
    ];
    return (
      <>
        <div className="hidden lg:block fixed w-64 h-screen border-r-2 border-gray-300">
          <div className="md:w-64 lg:w-full h-14 border border-gray-100">
            <Link to="/admin">
              <img src={logo} alt="Logo" className="w-full h-full" />
            </Link>
          </div>
          <hr />
          <div className="h-screen overflow-y-auto">
            <ul className="text-lg  text-gray-600 flex flex-col items-start w-full pt-2">
              {siderbarList.map((data) => (
                <li className="pl-6 py-3.5 w-full border-b border-gray-300 hover:bg-gray-100">
                  <Link
                    to={`/admin/${data.path}`}
                    className="flex items-center justify-start gap-4 w-full"
                    id="sidebar_items"
                  >
                    <div className={`${data.color}`}>{data.icon}</div>
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
}

export default SideBar