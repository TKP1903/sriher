import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Components
import ConferenceList from "../components/Events/conferenceList";
import NavBar from "../components/Navbar/NavBar";

//Redux actions
import { getUserEvent } from "../Redux/Reducer/Events/event.action";

const Conference = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector((globalStore) => globalStore.event);
  const userState = useSelector((globalStore) => globalStore.user.user);
  const user_id = userState?.user?._id;

  useEffect(() => {
    dispatch(getUserEvent(user_id));
  }, []);
  return (
    <>
      <NavBar />
      <div className="py-10 pt-16 md:pt-40 mx-3 md:mx-20 lg:mx-40">
        <h4 className="text-2xl font-bold my-2">Conference List</h4>
        <ConferenceList />
      </div>
    </>
  );
};

export default Conference;
