import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdDelete, MdGppGood } from "react-icons/md";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//Redux action
import { getAllUsers, deleteUser } from '../../Redux/Reducer/User/user.action';

const DataTable = () => {
    const [rows, setRows] = useState([]);
    const reduxState = useSelector((globalStore) => globalStore.user.allUsers);

    useEffect(() => {
      reduxState?.user && setRows(reduxState.user);
    }, [reduxState]);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllUsers());
    }, []);

    const deleteItem = (_id) => {
      const de = dispatch(deleteUser(_id));
      console.log(de);
    };

    var idCount = 1;
    return (
      <>
        {/* <div style={{ height: 500, width: "100%" }}> */}
        <Paper sx={{ width: "100%", overflow: "scroll" }}>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">ID</TableCell>
                  <TableCell className="tableCell">User Name</TableCell>
                  <TableCell className="tableCell">Institution</TableCell>
                  {/* <TableCell className="tableCell">StateDentalCode</TableCell> */}
                  {/* <TableCell className="tableCell">State</TableCell> */}
                  <TableCell className="tableCell">PhoneNumber</TableCell>
                  <TableCell className="tableCell">User Type</TableCell>
                  <TableCell className="tableCell">Email</TableCell>
                  <TableCell className="tableCell">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {}
                {rows?.length > 0 ? (
                  rows?.map((row) => (
                    <TableRow key={row._id} className="hover:bg-gray-100">
                      <TableCell className="tableCell">{idCount++}</TableCell>
                      <TableCell className="tableCell">
                        <div className="flex items-center">{row.fullName}</div>
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.institution}
                      </TableCell>
                      {/* <TableCell className="tableCell">
                        {row.stateDentalCode}
                      </TableCell> */}
                      {/* <TableCell className="tableCell">{row.state}</TableCell> */}
                      <TableCell className="tableCell">
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.typeOfRegistration}
                      </TableCell>
                      <TableCell className="tableCell">{row.email}</TableCell>
                      <TableCell className="tableCell">
                        <Link
                          to="/admin/"
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
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* </div> */}
      </>
    );
}

export default DataTable;
