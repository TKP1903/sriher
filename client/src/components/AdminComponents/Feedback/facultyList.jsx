import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { IoOpen } from "react-icons/io5";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//Redux action
import { getFeedback, deleteFacultyFeedback } from '../../../Redux/Reducer/Feedback/feedback.action'; 
const FacultyList = (props) => {   
    const [feedbackData, setFeedbackData] = useState();    
     
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(getFeedback());
      }, [])

      const reduxState = useSelector((globalStore) => globalStore.Feedback)
      
      
      useEffect(() => {
        reduxState?.feedback && setFeedbackData(reduxState.feedback.feedbackData);
      }, [reduxState?.feedback]);
      console.log(feedbackData);

      var id = 1;
      const deleteItem = (_id) => {
        dispatch(deleteFacultyFeedback(_id));
        return;    
      }

  return (
    <>
      <div>
        <div>
          <Link to=""></Link>
        </div>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
                <TableCell className="tableCell">Faculty Name</TableCell>
                <TableCell className="tableCell">Status</TableCell>
                <TableCell className="tableCell">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackData?.length > 0 ? (
                feedbackData?.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-100">
                    <TableCell className="tableCell">{id++}</TableCell>
                    <TableCell className="tableCell">
                      <div className="flex items-center">
                        <img
                          src={row.image}
                          alt="image"
                          className="w-12 h-12 rounded-md mr-10 fit"
                        />
                        {row.name}
                      </div>
                    </TableCell>
                    <TableCell className="tableCell">
                      <span
                        className={
                          row.feedback_status === "Active"
                            ? "p-2 rounded-sm text-white bg-green-900"
                            : "p-2 rounded-sm text-yellow-100 bg-yellow-500"
                        }
                      >
                        {row.feedback_status}
                      </span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <div className="flex items-center justify-around">
                        <Link to={`/admin/feedback/${row._id}`} id="edit_label">
                          <span
                            className="absolute z-50 text-sm font-light text-gray-50 bg-blue-600 rounded-md px-1.5 py-0.5"
                            id="edit"
                          >
                            Edit
                          </span>
                          <BiEdit className="w-6 h-6 text-blue-600" />
                        </Link>
                        <Link
                          to={`/admin/faculty-feedback/${row._id}`}
                          id="view_label"
                        >
                          <span
                            className="absolute z-50 text-sm font-light text-gray-50 bg-green-600 rounded-md px-1.5 py-0.5"
                            id="view"
                          >
                            View
                          </span>
                          <IoOpen className="w-6 h-6 text-green-600" />
                        </Link>
                        <Link
                          to="/admin/feedback"
                          onClick={() => deleteItem(row._id)}
                          id="delete_label"
                        >
                          <span
                            className="absolute z-50 text-sm font-light text-gray-50 bg-red-600 rounded-md px-1.5 py-0.5"
                            id="delete"
                          >
                            Delete
                          </span>
                          <MdDelete className="w-6 h-6 text-red-600" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <>Loading...</>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default FacultyList;