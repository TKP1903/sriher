import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { API_URL } from "../../key";
import { getMySelf } from "../../Redux/Reducer/User/user.action";

const CertificatePage = () => {
  const [user, setuser] = useState();
  const [certData, setCertData] = useState([]);
  const navigate = useNavigate();
  const generateCert = (user_name) => {
    localStorage.setItem("cert_name", user_name);
    navigate("/certificate");
  };
  const userState = useSelector((userStore) => userStore.user);
  useEffect(() => {
    userState?.user && setuser(userState.user?.user);
  }, [userState]);

  const getUserCertificates = async () => {
    try {
      const user_id = userState.user?.user?._id;
      const session_user_id = localStorage.getItem("user_id");
      const cert_res = await axios.get(
        `${API_URL}/certificates/get-user-certificates/${
          user_id ? user_id : session_user_id
        }`
      );
      setCertData(cert_res.data?.data);
    } catch (error) {
      alert(error);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMySelf());
    getUserCertificates();
  }, []);

  let idCount = 1;

  return (
    <>
      <div className="relative top-10 lg:top-20 py-5 lg:py-10">
        <div className="px-10 py-5 lg:px-44 md:py-20">
          <div className="pb-8 w-full">
            <h1 className="text-center bg-gray-100 py-1 w-full text-2xl md:font-3xl font-semibold md:font-bold pl-3">
              Certificates
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 overflow-x-scroll">
            <Paper sx={{ width: "100%" }}>
              <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableCell">ID</TableCell>
                      <TableCell className="tableCell">
                        CONFERENCE NAME
                      </TableCell>
                      <TableCell className="tableCell">OPTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {certData?.length > 0 ? (
                      certData?.map((row) => (
                        <TableRow key={row._id} className="hover:bg-gray-100">
                          <TableCell className="tableCell">
                            {idCount++}
                          </TableCell>
                          <TableCell className="tableCell">
                            {row.feedback_event_id?.name}
                          </TableCell>
                          <TableCell
                            className="tableCell cursor-pointer text-semibold text-lg"
                            onClick={() => {
                              generateCert(row.name);
                            }}
                          >
                            Download
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatePage;
