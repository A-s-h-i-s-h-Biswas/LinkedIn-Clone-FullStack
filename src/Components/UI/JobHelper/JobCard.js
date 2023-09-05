import React, { Fragment } from "react";
import { GET_READABLE_TIME } from "../Utils/data";
import { writeData } from "../../../firebase/firebase";
// import JobCardLoader from "./Utils/JobCardLoader";

const JobCard = ({
  id,
  appliedJobIds = [],
  uid,
  title,
  status,
  company,
  desc,
  timestamp,
  img,
  bookmark,
}) => {
  const time = GET_READABLE_TIME(timestamp);

  const label = appliedJobIds.indexOf(id) < 0 ? "Apply" : "Applied";
  const applyHandler = () => {
    if (label === "Applied") return;
    writeData({
      key: `myjobs/${uid}`,
      id: Date.now(),
      payload: {
        id: id,
        title,
        company,
        logo: img,
        timestamp: Date.now(),
        status: "Pending",
      },
    });
    window.location.reload();
  };

  // if(isLoading) return <JobCardLoader/>
  return (
    <Fragment>
      <div className="w-[100%] h-[.1px] opacity-20 mt-3 bg-gray-400" />
      <div className="w-[100%] h-[100px] cursor-pointer flex items-center justify-between">
        <div className="w-[50px] h-[50px]   rounded-md overflow-hidden">
          <img className="w-[100%] h-[100%] object-cover" src={img} alt="" />
        </div>
        <div className="flex flex-col  w-[65%]  ">
          <h3 className="font-bold text-md text-blue-600 opacity-80">
            {title}
          </h3>
          <p className="opacity-80 text-[14px]">{company}</p>
          <p className="opacity-80 text-justify text-[14px]">{desc}</p>
          <p className="text-[13px] text-green-600 opacity-80 ">
            {timestamp ? time + " ago" : status}
          </p>
        </div>
        <div>
          {bookmark ? (
            <button
              onClick={applyHandler}
              className="hover:bg-green-500 hover:text-white  w-[75px] h-[35px] rounded-3xl border-green-500 border-[1.5px]  "
            >
              {label}
            </button>
          ) : (
            <p className="w-[35px] h-[35px] text-center hover:bg-gray-200 rounded-full   opacity-50">
              <span className=" font-bold -pb-1">. . .</span>
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default JobCard;
