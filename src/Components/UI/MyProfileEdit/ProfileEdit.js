import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAction } from "../../../store/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { UploadFile, writeData } from "../../../firebase/firebase";
import CloseBtn from "./CloseBtn";

const ProfileEdit = ({ openEdit }) => {
  const bioRef = useRef();
  const [pic, setPic] = useState();
  const [banner, setBanner] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const setPicUrlHandler = (url) => {
    console.log("i'm called: ", url);
    setPic(url);
  };

  const setBannerUrlHandler = (url) => {
    console.log("i'm called: ", url);
    setBanner(url);
  };

  const onChangeHandler = async (e, payload) => {
    // console.log(e.target.files[0]);
    if (payload === "pic" && e.target.files[0]) {
      await UploadFile({
        file: e.target.files[0],
        id: user.uid,
        setUrlHandler: setPicUrlHandler,
      });
    } else if (payload === "banner" && e.target.files[0]) {
      await UploadFile({
        file: e.target.files[0],
        id: user.uid,
        setUrlHandler: setBannerUrlHandler,
      });
    }
  };

  const formSunmitHandler = async (e) => {
    e.preventDefault();
    const bio = bioRef.current.value?.trim();

    const valid = pic || banner || bio;
    if (!valid) {
      alert("Please fill Data you wanna update");
      return;
    }
    // ------------------store user data in database------------------
    if (pic) {
      dispatch(userAction.changePic(pic));
      writeData({
        key: `users/${user.uid}`,
        id: "pic",
        payload: pic,
      });
    }
    if (banner) {
      dispatch(userAction.changeBanner(banner));
      writeData({
        key: `users/${user.uid}`,
        id: "banner",
        payload: banner,
      });
    }
    if (bio) {
      dispatch(userAction.changeBio(bio));
      writeData({
        key: `users/${user.uid}`,
        id: "bio",
        payload: bio,
      });
    }
    openEdit();
    navigate("/my-profile");
  };

  return (
    <div className="w-[100%] max-w-[400px] h-auto  flex  flex-col">
      <CloseBtn onClick={openEdit} />
      <div className=" flex flex-col items-center rounded-md justify-center w-[100%] ">
        <form
          onSubmit={formSunmitHandler}
          className="flex flex-col p-5 w-[100%] rounded-md mt-2 max-w-[400px] bg-white md:shadow-md md:shadow-gray-400/90"
        >
          <h1 className="text-4xl text-blue-600 pb-5">Edit Profile</h1>

          <div className="relative flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] opacity-0 z-10  rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="file"
              onChange={(e) => onChangeHandler(e, "pic")}
              placeholder="Update profile photo"
            />
            <span className="absolute font-bold opacity-50 top-0 left-0 w-[100%] h-[50px] pl-5 flex items-center justify-cente rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 border-[1.5px]">
              Update profile photo
            </span>
          </div>

          <div className="flex flex-col relative pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] opacity-0 z-10 rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="file"
              onChange={(e) => onChangeHandler(e, "banner")}
              placeholder="Update background photo"
            />
            <span className="absolute font-bold opacity-50 top-0 left-0 w-[100%] h-[50px] pl-5 flex items-center justify-cente rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 border-[1.5px]">
            Update background photo
            </span>
          </div>

          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px]  rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500  h-[50px]"
              type="text"
              ref={bioRef}
              placeholder="Something about you"
            />
          </div>

          <div className=" pt-3 ">
            <button
              className={`bg-blue-600 w-[100%] h-[45px] text-white font-bold rounded-3xl`}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
