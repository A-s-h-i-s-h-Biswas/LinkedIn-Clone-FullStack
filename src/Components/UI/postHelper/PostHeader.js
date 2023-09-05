import React, { Fragment, useState } from "react";
import Dot from "../Utils/Dot";
import { GET_READABLE_TIME, SendRequest, isAConnection } from "../Utils/data";
import { useSelector } from "react-redux";
// import { writeData } from "../../firebase/firebase";
// import { connectionActions } from "../../store/connection-slice";
import { useNavigate } from "react-router-dom";

const PostHeader = ({ ownerId, logo, name, about, time, desc, gender }) => {
  const postTime = GET_READABLE_TIME(time);
  const user = useSelector((state) => state.user);
  const genderStatus =
    gender === "male" ? "(He/Him)" : gender === "female" ? "(She/Her)" : "";
  const [connect, setConnect] = useState("Connect");

  const connectionRequestHandler = () => {
    SendRequest({
      sender: user,
      receiver: { uid: ownerId, bio: about, pic: logo, name },
    });

    setConnect("Pending");
  };

  const myConnections = useSelector((state) => state.connection.connections);
  // console.log(ownerId, " -----> "   ,isConnected);
  const isConnected = isAConnection({
    myConnectionList: myConnections,
    uid: ownerId,
  });

  const navigate = useNavigate();
  const goToProfile = () => {
    if (ownerId === user.uid) {
      navigate("/my-profile");
    } else {
      navigate(`/my-profile/${ownerId}`);
    }
  };

  return (
    <Fragment>
      <div className="w-[100%] h-[100px] mt-3 flex items-center justify-between">
        <div className="flex items-center">
          <div
            onClick={goToProfile}
            className="w-[50px] h-[50px] cursor-pointer  rounded-full overflow-hidden"
          >
            <img
              className="w-[100%] h-[100%] object-cover "
              src={logo}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center pl-5 h-[50px] ">
            <p className=" opacity-75  flex items-center">
              <span className=" font-bold">{name}</span>
              {genderStatus}
              <Dot />
              1st
            </p>
            <p className="text-[13px] opacity-75 ">{about}</p>
            <p className="text-[13px]  opacity-75 flex items-center">
              {postTime} ago
              <Dot />
              🌏
            </p>
          </div>
        </div>
        {ownerId !== user.uid && !isConnected && (
          <div
            onClick={connectionRequestHandler}
            className="flex items-center cursor-pointer pl-2 pr-2 h-[35px] hover:bg-blue-200 hover:rounded-md"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.1"
                d="M13 9.5C13 11.433 11.433 13 9.5 13C7.567 13 6 11.433 6 9.5C6 7.567 7.567 6 9.5 6C11.433 6 13 7.567 13 9.5Z"
                fill="#0A66C2"
              />
              <path
                d="M3 19C3.69137 16.6928 5.46998 16 9.5 16C13.53 16 15.3086 16.6928 16 19"
                stroke="#0A66C2"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M13 9.5C13 11.433 11.433 13 9.5 13C7.567 13 6 11.433 6 9.5C6 7.567 7.567 6 9.5 6C11.433 6 13 7.567 13 9.5Z"
                stroke="#0A66C2"
                stroke-width="2"
              />
              <path
                d="M15 6H21"
                stroke="#0A66C2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 3L18 9"
                stroke="#0A66C2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-[#0A66C2] font-bold">{connect}</p>
          </div>
        )}
      </div>
      <div className="text-justify pt-3 text-[15px] w-[80%] ">
        <p>{desc}</p>
      </div>
    </Fragment>
  );
};

export default PostHeader;
