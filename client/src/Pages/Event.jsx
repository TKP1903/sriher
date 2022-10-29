import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Components
import OnGoingEvents from "../components/Events/onGoingEvents";
import CompletedEvents from "../components/Events/completedEvents";
import DialogMsg from "../components/dialog/dialog.component";
//Redux actions
import { getEvents, getUserEvent } from "../Redux/Reducer/Events/event.action";
import CDE from "../components/Events/cde";

const Event = () => {
  const { type } = useParams();
  const [eventData, setEventsData] = useState([]);
  const [onGoingEventsCount, setOnGoingEventsCount] = useState(0);
  const [completedEventsCount, setCompletedEventsCount] = useState(0);

  const dispatch = useDispatch();
  const reduxState = useSelector((globalStore) => globalStore.event);
  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    reduxState?.events && setEventsData(reduxState.events?.events);
  }, [reduxState?.events]);

  useEffect(() => {
    eventData?.map((data) => {
      //data.status !== "complete" ? setOnGoingEventsCount(onGoingEventsCount+1) : setCompletedEventsCount(completedEventsCount+1)
      if (data.status === "active") {
        setOnGoingEventsCount(onGoingEventsCount + 1);
      } else {
        setCompletedEventsCount(completedEventsCount + 1);
      }
      // if (data.status === "inactive") {
      // }
    });
  }, [reduxState?.events]);

  return (
    <>
      <div className="relative top-10 lg:top-20 py-10">
        {type === "cde" ? (
          <div className="px-3 md:px-10 lg:px-0">
            <CDE />
          </div>
        ) : (
          <div className="flex flex-col gap-10 w-full items-center justify-center pb-10 px-3 md:px-10 lg:px-0">
            {/* {openModel === true && <DialogMsg />} */}
            <OnGoingEvents />
            <CompletedEvents />
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
