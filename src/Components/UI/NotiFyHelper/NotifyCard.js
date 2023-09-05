import React, { useState } from "react";
import { GET_READABLE_TIME } from "../Utils/data";
import { useSelector } from "react-redux";
import { writeData } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../../store/notification-slice";
const NotifyCard = ({
  uid,
  profilePic,
  notificationId,
  profileName,
  msg,
  read,
  timestamp,
  text,
  content,
}) => {
  const [visited, setVisited] = useState(read);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setVisitedHandler = () => {
    setVisited(true);
    // -----------update database read state--------------
    writeData({
      key: `notifications/${user.uid}/${notificationId}`,
      id: "read",
      payload: true,
    });
    // ----------update store-------------
    dispatch(notificationActions.reduceUnreanNotification());
    // --------------navigate to sender profile------------
    navigate(`/my-profile/${uid}`);
  };
  const textWrapper = (text, word) => {
    if (text.length < word) return text;
    return text?.substring(0, word - 1) + "...";
  };
  const time = GET_READABLE_TIME(timestamp);
  // console.log(time, timestamp);
  return (
    <div
      onClick={setVisitedHandler}
      className={`w-[100%] ${
        !visited ? "bg-sky-50" : ""
      } cursor-pointer pl-3 pr-3 flex items-center justify-between h-[100px] max-h-[150px]`}
    >
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
        <img
          className="w-[100%] h-[100%] object-cover"
          src={profilePic}
          alt=""
        />
      </div>
      <div className="w-[80%] pl-2 flex flex-col">
        <p className="text-[14px] opacity-70">
          <span className={`font-bold ${text ? "text-[16px]" : ""}`}>
            {profileName}
          </span>{" "}
          {msg}
        </p>
        {text && (
          <p className="text-[14px] opacity-70">
            <span className="font-bold">{"You"}:</span> {text}
          </p>
        )}
        {content && (
          <div className="flex w-[100%] mt-1  rounded-r-md overflow-hidden bg-gray-200 items-center">
            {content.type === "img" ? (
              <img
                className="w-[80px] h-[50px] overflow-hidden object-cover"
                src={content.file}
                alt=""
              />
            ) : (
              <iframe
                title={Math.random()}
                className="w-[80px] h-[50px] overflow-hidden object-cover"
                src={content.file}
                alt=""
              />
            )}
            <p className="text-[14px] opacity-70 pl-[5px]">
              {textWrapper(content.title, 36)}
            </p>
          </div>
        )}
      </div>
      <div className="flex w-[10%] items-center flex-col">
        <p className="text-[14px] opacity-70">
          {textWrapper(time.toString(), 6)}
        </p>
        <p className="text-center font-bold w-[30px] h-[30px] rounded-full hover:bg-gray-200 cursor-pointer">
          . . .
        </p>
      </div>
    </div>
  );
};

export default NotifyCard;
