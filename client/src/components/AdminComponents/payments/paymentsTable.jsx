import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { CSVLink } from "react-csv";
import { MdFileDownload } from "react-icons/md";

import { API_URL } from "../../../key";

const columns = [
  //   { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "phone",
    label: "Phone\u00a0Number",
    minWidth: 170,
    align: "center",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "center",
  },
  { id: "paymentId", label: "PaymentId", minWidth: 100 },
];

export default function PaymentsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [paymentsData, setPaymentsData] = React.useState([]);
  const getPaymentsData = async () => {
    const paymentsData = await axios.get(`${API_URL}/payment/get-all-payments`);
    setPaymentsData(paymentsData?.data?.payments);
    console.log(paymentsData?.data?.payments);
  };

  React.useEffect(() => {
    getPaymentsData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  const rows = [
    paymentsData.map((item) => {
      createData(item.name, item.email, item.phone, item.amount);
    }),
  ];
  const csvData = paymentsData;
  let totalAmount = 0;
  paymentsData.map((item) => {
    totalAmount += item.amount;
  });
  return (
    <div className="flex flex-col items-end justify-center shadow-lg">
      {paymentsData?.length > 0 ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-row items-start gap-4 bg-white border-2 border-gray-300 px-4 py-1 rounded-md shadow-xl">
            <h4 className="text-xl font-semibold text-gray-600">
              Toal Amount:
            </h4>
            <h2 className="text-2xl font-bold text-gray-800">{totalAmount}</h2>
          </div>
          <div className="flex items-center gap-2 border border-gray-50 bg-green-700 text-gray-50 text-xl font-semibold p-2 rounded-md shadow-md mb-2">
            <CSVLink data={csvData} filename={"payments.csv"}>
              Download
            </CSVLink>
            <MdFileDownload className="w-6 h-6" />
          </div>
        </div>
      ) : (
        <span>
          <div className="flex items-center gap-2 border border-gray-50 bg-red-700 text-gray-50 text-xl font-semibold p-2 rounded-md shadow-md mb-2">
            No Data To Download
            <MdFileDownload className="w-6 h-6" />
          </div>
        </span>
      )}
      <Paper sx={{ width: "100%", overflow: "scroll" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <>
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
