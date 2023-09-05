import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const user=useSelector(state=>state.user);
  const onClickHandler = () => {
    navigate("/my-profile");
  };
  return (
    <div className="w-[100%]  h-[200px] bg-white flex flex-col items-center justify-between shadow-md shadow-gray-500/80">
      {/* -----------------Profile pic----------------- */}
      <div className="w-[100%] h-[70%] relative flex flex-col">
        {/* -----------------Banner--------------------- */}
        <div className="w-[100%] h-[70px] bg-gradient-to-b from-indigo-500 to-orange-500">
        <img
            className="w-[100%] h-[100%] object-cover "
            src={user.banner} alt=""
          />
        </div>

        {/* --------------------White Space------------------------------ */}
        <div className=" w-[100%] h-[50%] bg-white"></div>

        {/* ---------------------Pic------------------ */}
        <div className="absolute w-[70px] h-[70px] rounded-full overflow-hidden left-[calc(50%-35px)] top-[calc(50%-35px)]">
          <img
            className="w-[100%] h-[100%] object-cover "
            src={user.pic} alt=""
          />
        </div>
      </div>

      {/* ------------------Profile Bio------------------- */}
      <div className="flex flex-col items-center justify-center">
        <h3 className=" font-bold ">{user.name}</h3>
        <p className="text-[14px] opacity-70 text-center">{user.bio}</p>
      </div>

      {/* ----------------Profile actions---------------- */}
      <div className="pt-3 pb-3 transition-all">
        <button
          onClick={onClickHandler}
          className="w-[200px] h-[30px] text-[14px] rounded-3xl border-blue-600 border-[1.5px] text-blue-600 font-bold hover:border-[2px] hover:bg-blue-100"
        >
          {"View profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
