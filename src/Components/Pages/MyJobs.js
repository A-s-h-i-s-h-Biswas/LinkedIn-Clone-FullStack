import React, { useState } from "react";
import JobContainer from "../UI/JobHelper/JobContainer";
import bookmark from "../../Assets/bookmark-filled.svg";
// import Line from "../UI/Line";
const MyJobs = () => {
  const [position, setPosition] = useState("job");
  const setPositionHanseler = (payload) => {
    setPosition(payload);
  };
  return (
    <div className="w-[100%] max-w-[550px] h-auto flex flex-col p-3">
      <div className="w-[100%] h-[130px] relative bg-white mt-1  transition-all flex flex-col justify-between rounded-md">
        {/* <div
          className={`absolute w-[5px] h-[calc(100%/3)] left-0  top-[${position === "job" ? "0px" : "75px"}] bg-blue-800 `}
        /> */}
        <div className="h-[calc(130px/3)] flex pl-3">
          <p className="flex items-center font-bold opacity-60 ">
            <img
              className="w-[20px] h-[20px] mr-[5px]  object-cover"
              src={bookmark}
              alt=""
            />
            My items
          </p>
        </div>
        <div
          className={`h-[calc(130px/3)] flex flex-col overflow-hidden  justify-between border-blue-800 ${
            position === "job" ? "border-l-4 bg-blue-50 " : ""
          }`}
        >
          <div className="w-[100%] h-[.1px] bg-gray-200 " />
          <p
            onClick={() => setPositionHanseler("job")}
            className={`font-bold opacity-50 pl-4 h-[75%]  hover:opacity-70    text-[14px] cursor-pointer border-blue`}
          >
            Saved Jobs
          </p>
        </div>
        <div
          className={`h-[calc(130px/3)] flex flex-col overflow-hidden  justify-between border-blue-800 ${
            position === "post" ? "border-l-4 bg-blue-50 " : ""
          }`}
        >
          <div className="w-[100%] h-[.1px] bg-gray-200 " />
          <p
            onClick={() => setPositionHanseler("post")}
            className={`font-bold opacity-50 pl-4 h-[75%]  hover:opacity-70    text-[14px] cursor-pointer border-blue`}
          >
            Saved Post and Articles
          </p>
        </div>
      </div>
      {position === "job" ? (
        <JobContainer
          type={"job"}
          title={"My Saved Jobs"}
          label1={"Applied"}
          label2={"Archived"}
        />
      ) : (
        <JobContainer
          // bookmark={bookmark}
          title={"Saved Post & Articles"}
          type={"post"}
          // label1={"Applied"}
          // label2={"Archived"}
        />
      )}
    </div>
  );
};

export default MyJobs;
