import React, { Fragment } from "react";
import Line from "../Utils/Line";
import { GET_READABLE_TIME } from "../Utils/data";
import { useNavigate } from "react-router-dom";
const InvitationSent = ({
  uid,
  name,
  pic,
  bio,
  timestamp,
  word = 43,
  withdrawHandler,
  label,
}) => {
  const time = GET_READABLE_TIME(timestamp);
  const textWrapper = (text, word) => {
    if (text.length < word + 1) return text;
    return text.substring(0, word) + "...";
  };
  const shoerBio = textWrapper(bio, word);
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate(`/my-profile/${uid}`);
  };

  return (
    <Fragment>
      <Line />
      <div className="flex items-center justify-between">
        <div
          onClick={goToProfile}
          className="w-[70px] cursor-pointer h-[70px] rounded-full overflow-hidden"
        >
          <img className="w-[100%] h-[100%] object-cover" src={pic} alt="" />
        </div>
        <div className="w-[60%] pl-1 flex flex-col">
          <h3 className="font-bold opacity-70">{name}</h3>
          <p className="text-[14px] opacity-70">{shoerBio}</p>
          {timestamp && (
            <p className="text-[13px] opacity-50">Sent {time} ago</p>
          )}
        </div>
        <div className="flex items-center pt-3 transition-all">
          <button
            onClick={
              !label ? () => withdrawHandler({ uid, type: "sent" }) : () => {}
            }
            className="opacity-70 w-[90px] mr-2 h-[35px] text-center hover:rounded-2xl hover:border-rose-700 hover:border-[2px]"
          >
            {label ?? "Withdraw"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default InvitationSent;
