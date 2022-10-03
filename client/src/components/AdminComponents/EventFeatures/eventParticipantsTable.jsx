import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CSVLink  } from "react-csv";
import { MdFileDownload } from "react-icons/md";
import options from "../../css/options.css";

//Redux actions
import { getAllRegistredEvents } from "../../../Redux/Reducer/Events/event.action";
import LoadingCell from "../loadingCell";

const EventParticipantsTable = () => {
  const { type } = useParams();
  const [events, setEvents] = useState();
console.log(events);
const dispatch = useDispatch();

const reduxState = useSelector((globalStore) => globalStore.event);
useEffect(() => {
  dispatch(getAllRegistredEvents(type));
}, []);

useEffect(() => {
  reduxState?.userEvents && setEvents(reduxState?.userEvents?.data);
}, [reduxState]);

let idCount = 1;

const csvData = events;

return (
  <>
    <div className="flex flex-col items-end justify-center shadow-lg">
      {events?.length > 0 ? (
        <div className="flex items-center gap-2 border border-gray-50 bg-green-700 text-gray-50 text-xl font-semibold p-2 rounded-md shadow-md mb-2">
          <CSVLink data={csvData} filename={"events.csv"}>
            Download
          </CSVLink>
          <MdFileDownload className="w-6 h-6" />
        </div>
      ) : (
        <span>
          <div className="flex items-center gap-2 border border-gray-50 bg-red-700 text-gray-50 text-xl font-semibold p-2 rounded-md shadow-md mb-2">
            No Data To Download
            <MdFileDownload className="w-6 h-6" />
          </div>
        </span>
      )}
      {/* <div
        style={{ height: 600, width: "100%" }}
        className="w-full overflow-x-scroll"
      > */}
      <Paper sx={{ width: "100%", overflow: "scroll" }}>
        <TableContainer component={Paper} className="table">
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            id="table-to-xls"
          >
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
                <TableCell className="tableCell">User Name</TableCell>
                <TableCell className="tableCell">Email</TableCell>
                <TableCell className="tableCell">PhoneNumber</TableCell>
                <TableCell className="tableCell">Institution</TableCell>
                <TableCell className="tableCell">State</TableCell>
                <TableCell className="tableCell">Amount</TableCell>
                <TableCell className="tableCell">Payment</TableCell>
                <TableCell className="tableCell">Registration Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events?.length > 0 ? (
                events?.map((row) => (
                  <TableRow key={row._id} className="hover:bg-gray-100">
                    <TableCell className="tableCell">{idCount++}</TableCell>
                    <TableCell className="tableCell">{row.user_name}</TableCell>
                    <TableCell className="tableCell">
                      {row.user_email}
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.user_phonenumber}
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.user_institution}
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.user_State}
                    </TableCell>
                    <TableCell className="tableCell">{row.amount}</TableCell>
                    <TableCell className="tableCell">
                      {row.eventCostType === "Free" ? (
                        "FREE"
                      ) : row.paymentStatus === true ? (
                        <p className="text-green-800">Successfull</p>
                      ) : (
                        <p className="text-red-800"> Payment Failed</p>
                      )}
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.registrationDate}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <>
                  <TableRow>
                    <LoadingCell />
                    <LoadingCell />
                    <LoadingCell />
                    <LoadingCell />
                    <LoadingCell />
                    <LoadingCell />
                    <LoadingCell />
                    <LoadingCell />
                    <LoadingCell />
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* </div> */}
    </div>
  </>
);
};

export default EventParticipantsTable;