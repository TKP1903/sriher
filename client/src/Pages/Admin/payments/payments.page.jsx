import React from "react";
//Components
import SideBar from "../../../components/AdminComponents/siderbar";
import AdminNavBar from "../../../components/AdminComponents/adminNavBar";
import PaymentsTable from "../../../components/AdminComponents/payments/paymentsTable";

const PaymentsPage = () => {
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="w-4/5 flex flex-col gap-5">
          <AdminNavBar />
          <div className="mx-10">
            <PaymentsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentsPage;
