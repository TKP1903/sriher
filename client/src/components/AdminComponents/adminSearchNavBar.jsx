import React from "react";
import { FaUser } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { HiLogout } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

//Redux action
import { signOut } from "../../Redux/Reducer/Auth/auth.action";
import axios from "axios";

const AdminSearchNavBar = ({ setSearchKey }) => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const signOutHandler = () => dispatch(signOut());
  const searchKey = (e) => {
    setSearchKey(e.target.value);
  };
  return (
    <>
      <div className="w-full h-14 flex flex-row justify-between items-center w-full border-b border-grey-900 text-center">
        <div className="w-1/2 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md shadow-md ml-10">
          <input
            type="text"
            onChange={searchKey}
            className="w-full py-2 active:outline-none focus:outline-none rounded-l-md px-3 text-md font-semibold"
          />
          <span className="py-2 px-3 text-2xl font-bold text-center flex items-center justify-center bg-gray-200 rounded-r-md">
            <FiSearch />
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-start gap-4 text-xl py-3.5 w-full border-b border-gray-300 text-red-600 hover:bg-red-900 hover:text-gray-50 bg-red-50">
            <Link to="/admin/">
              <button
                className="font-semibold  flex items-center justify-start gap-4 w-full px-4"
                onClick={signOutHandler}
              >
                <HiLogout className="w-7 h-7" />
                Signout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSearchNavBar;
