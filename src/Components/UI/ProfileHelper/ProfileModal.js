import React from "react";
// import { dp } from './data'
import Line from "../Utils/Line";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../../store/auth-slice";
import { useSelector } from "react-redux";
const ProfileModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    dispatch(authAction.logout());
    navigate("/login");
  };
  const gotoProfile = () => {
    navigate("/my-profile");
  };
  return (
    <div className="w-[250px] rounded-md bg-white shadow-sm shadow-gray-900/80 z-10 p-3 flex flex-col">
      <div className="flex flex-col">
        <div className="flex ">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              className="w-[100%] h-[100%] object-cover"
              src={user.pic}
              alt=""
            />
          </div>
          <div className="w-[80%] pl-2 flex flex-col">
            <h2 className="opacity-70 font-bold text-[14px]">{user.name}</h2>
            <p className="opacity-70 text-[14px]">{user.bio}</p>
          </div>
        </div>
        <button
          onClick={gotoProfile}
          className="h-[30px] text-[14px] mt-2 text-blue-600 rounded-3xl border-[1.5px] border-blue-600 hover:border-[2px] hover:bg-blue-100"
        >
          View profile
        </button>
      </div>
      <Line />
      <div className="flex flex-col">
        <h2 className="opacity-70 font-bold  text-[16px]">Account</h2>
        <p className="opacity-70 text-[14px] cursor-pointer hover:text-blue-600 hover:underline">
          Settings & privacy
        </p>
        <p className="opacity-70 text-[14px] cursor-pointer hover:text-blue-600 hover:underline">
          Language
        </p>
        <p className="opacity-70 text-[14px] cursor-pointer hover:text-blue-600 hover:underline">
          Help
        </p>
      </div>
      <Line />
      <div>
        <p
          onClick={logOutHandler}
          className="opacity-70 text-[14px] cursor-pointer hover:text-blue-600 hover:underline"
        >
          Sign out
        </p>
      </div>
    </div>
  );
};

export default ProfileModal;
