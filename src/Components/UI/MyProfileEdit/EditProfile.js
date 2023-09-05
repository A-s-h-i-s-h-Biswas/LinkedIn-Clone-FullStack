import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAction } from "../../../store/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { UploadFile, writeData } from "../../../firebase/firebase";

const EditProfile = () => {
  //   const emailRef = useRef();
  const nameRef = useRef();
  const bioRef = useRef();
  const [pic, setPic] = useState();
  const [banner, setBanner] = useState();
  const addrsRef = useRef();
  const eduTRef = useRef();
  // const genderRef=useRef();
  const [gender, setGender] = useState(null);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const email = useSelector((state) => state.auth.email);
  const navigate = useNavigate();

  const setPicUrlHandler = (url) => {
    console.log("i'm called: ", url);
    setPic(url);
  };

  const setBannerUrlHandler = (url) => {
    console.log("i'm called: ", url);
    setBanner(url);
  };

  const onChangeHandler = async (e, payload) => {
    console.log(e.target.files[0]);
    if (payload === "pic" && e.target.files[0]) {
      await UploadFile({
        file: e.target.files[0],
        id: uid,
        setUrlHandler: setPicUrlHandler,
      });
    } else if (payload === "banner" && e.target.files[0]) {
      await UploadFile({
        file: e.target.files[0],
        id: uid,
        setUrlHandler: setBannerUrlHandler,
      });
    }
  };

  const formSunmitHandler = async (e) => {
    e.preventDefault();

    // ------------------store user data in database------------------
    const userInfo = {
      uid,
      name: nameRef.current.value,
      email,
      gender,
      bio: bioRef.current.value,
      pic,
      banner,
      education: eduTRef.current.value,
      address: addrsRef.current.value,
      connections: 0,
      followers: 0,
      following: 0,
    };
    writeData({
      key: "users",
      id: uid,
      payload: { ...userInfo },
    });
    dispatch(userAction.updateProfile(userInfo));
    navigate("/my-profile");
  };
  // console.log(gender);
  return (
    <div className="w-[100%] h-screen flex  flex-col">
      <div className="  flex flex-col items-center rounded-md justify-center w-[100%] ">
        <form
          onSubmit={formSunmitHandler}
          className="flex flex-col p-5 w-[100%] rounded-md mt-2 max-w-[400px] bg-white md:shadow-md md:shadow-gray-400/90"
        >
          <h1 className="text-4xl text-blue-600 pb-5">Edit Profile</h1>
          <div className="flex flex-col relative pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] opacity-0 z-10  rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="file"
              //   ref={picRef}
              onChange={(e) => onChangeHandler(e, "pic")}
              required
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
              //   ref={bannerRef}
              required
              placeholder="Update background photo"
            />
            <span className="absolute font-bold opacity-50 top-0 left-0 w-[100%] h-[50px] pl-5 flex items-center justify-cente rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 border-[1.5px]">
              Update background photo
            </span>
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="text"
              ref={nameRef}
              required
              placeholder="Full Name"
            />
          </div>
          <div className="flex items-center">
            <label className="font-bold opacity-50 pr-2">
              Select your gender:
            </label>
            <input
              className=""
              type="radio"
              name="gender"
              // ref={genderRef}
              value="male"
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label className="ml-2">Male</label>
            <input
              className="pl-5 ml-4 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="radio"
              name="gender"
              value="female"
              // ref={genderRef}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label className="ml-2">Female</label>
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="text"
              ref={bioRef}
              required
              placeholder="Something about you"
            />
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="text"
              ref={eduTRef}
              required
              placeholder="Latest Education"
            />
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="text"
              ref={addrsRef}
              required
              placeholder="Current location"
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

export default EditProfile;
