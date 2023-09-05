import React from "react";
import Dot from "../Utils/Dot";

const CommentCard = ({ profileName, profilePic, timestamp, comment }) => {
  return (
    <div className="flex flex-col w-[90%] h-[50px] max-h-[75px] pl-2 pt-[2px] pb-1 rounded-md">
      <div className="flex pt-1">
        <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
          <img
            className="w-[100%] h-[100%] object-cover"
            src={profilePic}
            alt=""
          />
        </div>
        <p className="text-[14px] pl-[3px] flex items-center opacity-50 font-bold">
          {profileName}
          <span className=" text-[12px] flex items-center justify-center ">
            <Dot />
            {timestamp} ago
          </span>
        </p>
      </div>
      <div className=" w-[80%]  pl-7  ">
        <p className="text-[15px] opacity-90 break-words ">{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
