import React, { useState } from "react";
import { SendRequest } from "../Utils/data";
// import { banner, dp} from "./data";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../../store/user-slice";
import { addFollowers, addFollowing } from "../../../firebase/firebase";

const UserCard = ({
  wt,
  ht,
  label,
  follow = false,
  name,
  uid,
  pic,
  banner,
  bio,
}) => {
  const [isLabel, setIsLabel] = useState(label);
  const [connect, setConnect] = useState("Connect");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const sendRequest = async (payload) => {
    if (payload) {
      await addFollowing(user.uid);
      await addFollowers(uid);
      dispatch(userAction.addFollowing());
      setIsLabel("Following");
      return;
    }
    SendRequest({ sender: user, receiver: { uid, name, pic, bio } });
    setConnect("Pending");
  };

  return (
    <div
      className={`w-[${wt}] rounded-md mb-3  overflow-hidden h-[${ht}] bg-white flex flex-col  items-center justify-between transition-all shadow-md hover:shadow-gray-500/80`}
    >
      {/* -----------------Profile pic----------------- */}
      <div
        className={`w-[100%] h-[${
          follow ? "100px" : "70%"
        }] relative flex flex-col`}
      >
        {/* -----------------Banner--------------------- */}
        <div
          className={`w-[100%] h-[${
            follow ? "70%" : "50%"
          }] bg-gradient-to-b from-indigo-500 to-orange-500`}
        >
          <img
            className="w-[100%] h-[100%] object-cover "
            src={banner}
            alt=""
          />
        </div>

        {/* --------------------White Space------------------------------ */}
        <div
          className={` w-[100%] h-[${follow ? "30%" : "50%"}] bg-white`}
        ></div>

        {/* ---------------------Pic------------------ */}
        <div
          className={`absolute w-[80px] h-[80px] border-[3px] border-white  rounded-full overflow-hidden left-[calc(50%-40px)] ${
            follow ? "left-[10%]" : ""
          }  top-[calc(50%-40px)]`}
        >
          <img className="w-[100%] h-[100%] object-cover " src={pic} alt="" />
        </div>
      </div>

      {/* ------------------Profile Bio------------------- */}
      {!follow && (
        <div
          className={`w-[100%] h-[${
            follow ? "60%" : "30%"
          }] -mt-4 flex flex-col items-center justify-${
            follow ? "start" : "center"
          }`}
        >
          <h3 className="opacity-70 text-xl font-bold ">{name}</h3>
          <p
            className={`opacity-70 text-[15px] ${
              follow ? "text-justify" : "text-center"
            }`}
          >
            {bio}
          </p>
        </div>
      )}
      {follow && (
        <div
          className={`w-[100%] h-[60%] flex flex-col pl-[10%] justify-center `}
        >
          <h3 className="opacity-70 text-xl font-bold ">{name}</h3>
          <p className={`opacity-70 text-[15px] text-justify`}>{bio}</p>
        </div>
      )}

      {/* ----------------Profile actions---------------- */}
      <div className="pt-3 pb-3 w-[100%] flex items-center justify-center transition-all">
        <button
          onClick={() => sendRequest(follow)}
          className={`w-[${
            follow ? "80%" : "200px"
          }] h-[40px] rounded-3xl border-blue-600 border-2 text-blue-600 font-bold hover:bg-blue-100`}
        >
          {isLabel ?? connect}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
