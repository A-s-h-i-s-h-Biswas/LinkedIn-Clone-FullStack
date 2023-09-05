import React, { Fragment } from "react";
import Line from "../Utils/Line";
import { GET_READABLE_TIME } from "../Utils/data";
import { useNavigate } from "react-router-dom";

const InvitationCard = ({
  uid,
  name,
  pic,
  bio,
  timestamp,
  word = 36,
  acceptHandler,
  withdrawHandler,
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
        <div className="w-[50%] pl-2 flex flex-col">
          <h3 className="font-bold opacity-70">{name}</h3>
          <p className="text-[14px] opacity-70">{shoerBio}</p>
          <p className="text-[13px] opacity-50">{time} ago</p>
        </div>
        <div className="flex items-center pt-3 transition-all">
          <button
            onClick={() => withdrawHandler({ type: "received", uid })}
            className="opacity-70 w-[80px] mr-2 h-[35px] text-center hover:rounded-2xl hover:border-rose-700 hover:border-[2px]"
          >
            Ignore
          </button>
          <button
            onClick={() => acceptHandler({ uid, name, pic, bio })}
            className="rounded-2xl border-2 text-blue-700 border-blue-700 w-[80px] h-[35px] text-center hover:scale-95 hover:bg-blue-50"
          >
            Accept
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default InvitationCard;

// import React, { Fragment } from "react";
// import Line from "./Line";

// const InvitationCard = ({uid, name, pic, bio}) => {
//   return (
//     <Fragment>
//      <Line/>
//     <div className="flex  justify-between">
//       <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
//         <img
//           className="w-[100%] h-[100%] object-cover"
//           src={pic}
//           alt=""
//         />
//       </div>
//       <div className="w-[80%]">
//         <div className="w-[100%]">
//           <h3 className="font-bold opacity-70">{name}</h3>
//           <p className="text-[14px] opacity-70">{bio}</p>
//           {/* <p className="text-[14px] opacity-70">
//             <span className="">➰</span>Akash Roy Rana Das and 50 others
//           </p> */}
//         </div>
//         <div className="flex items-center pt-3 transition-all">
//           <button className="opacity-70 w-[80px] mr-2 h-[35px] text-center hover:rounded-2xl hover:border-rose-700 hover:border-[2px]">
//             Ignore
//           </button>
//           <button className="rounded-2xl border-2 text-blue-700 border-blue-700 w-[80px] h-[35px] text-center hover:scale-95 hover:bg-blue-50">
//             Accept
//           </button>
//         </div>
//       </div>
//     </div>

//     </Fragment>
//   );
// };

// export default InvitationCard;
