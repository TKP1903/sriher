import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PG = () => {
    const [pgData, setPgData] = useState([""]);    
    
    const reduxState = useSelector((globalStore) => globalStore.pg);
    useEffect(() => {
      reduxState.PG && setPgData(reduxState?.PG.pg);
    }, [reduxState?.PG]);
    return (
      <>
        <div className="flex flex-col md:my-14">
          <h1 className="text-2xl text-center bg-gray-100 py-1 md:font-3xl my-4 font-bold md:font-bold pl-3">
            PG
          </h1>
          <div className="flex flex-col items-center justify-center gap-8 md:gap-20">
            {pgData?.length > 0 ? (
              pgData.map(
                (data) =>
                  data.status === "Active" && (
                    <div
                      key={data.name}
                      className="lg:mx-0 flex flex-col md:flex-row items-center justify-center md:justify-between md:gap-24 shadow-2xl md:shadow-sm"
                    >
                      <div className="w-80 md:h-48 border-2">
                        <img
                          src={`${data.image}`}
                          alt="Loading..."
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-full md:w-3/5 md:ml-10 md:ml-0 px-2 md:px-10 py-5 bg-slate-50 flex flex-col gap-2 md:gap-5">
                        <div className="flex flex-col items-start gap-0.2">
                          <h5 className="text-md md:text-lg font-bold">
                            {data.name}
                          </h5>
                          <h6 className="text-md text-blue-400 font-semilight">
                            {data.deg}
                          </h6>
                          <p className="text-md font-thin text-blue-400">
                            {data.year}
                          </p>
                        </div>
                        <p className="text-sm md:text-md font-light text-gray-500 w-80 md:w-full">
                          {data.description}
                        </p>
                      </div>
                    </div>
                  )
              )
            ) : (
              <>Loading....</>
            )}
          </div>
        </div>
      </>
    );
}

export default PG