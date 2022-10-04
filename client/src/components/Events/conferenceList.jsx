import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//import AddAchievement from './addAchievement';
import SmConferenceList from "./smConferenceList";

//Redux actions
import { getUserEvent } from "../../Redux/Reducer/Events/event.action";

const ConferenceList = () => {
  const [events, setEvents] = useState([]);

  const dispatch = useDispatch();

  const reduxState = useSelector((globalStore) => globalStore.event);
  //   const userState = useSelector((globalStore) => globalStore.user.user);
  //   const user_id = userState?.user?._id;
  //   useEffect(() => {
  //     dispatch(getUserEvent(user_id));
  //   }, []);

  useEffect(() => {
    reduxState?.userEvents && setEvents(reduxState.userEvents.userEvents);
  }, [reduxState?.userEvents]);
  console.log(events);

  let idCount = 1;

  return (
    <>
      <div className="border border-gray-200 hidden md:block">
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
                <TableCell className="tableCell">CONFERENCE NAME</TableCell>
                <TableCell className="tableCell">VENUE</TableCell>
                <TableCell className="tableCell">START DATE</TableCell>
                <TableCell className="tableCell">END DATE</TableCell>
                <TableCell className="tableCell">Payment Status</TableCell>
                <TableCell className="tableCell">Amount</TableCell>
                <TableCell className="tableCell">Conference Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events?.length > 0 ? (
                events?.map((row) => (
                  <TableRow key={row.event_id} className="hover:bg-gray-100">
                    <TableCell className="tableCell">{idCount++}</TableCell>
                    <TableCell className="tableCell">{row.eventName}</TableCell>
                    <TableCell className="tableCell">{row.venue}</TableCell>
                    <TableCell className="tableCell">
                      {row.event_start_data}
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.event_end_data}
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.paymentStatus === false ? (
                        <span className="text-red-600 font-bold">Not Paid</span>
                      ) : (
                        <span className="text-green-600 font-bold">Paid</span>
                      )}
                    </TableCell>
                    <TableCell className="tableCell">{row.amount}</TableCell>
                    <TableCell className="tableCell">
                      {row.paymentStatus === false ? (
                        <span className="text-red-600 font-bold">
                          complete your payment
                        </span>
                      ) : (
                        <a href={`${row?.event_link}`}>{row.event_link}</a>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="md:hidden">
        <SmConferenceList events={events} />
      </div>
    </>
  );
};

export default ConferenceList;