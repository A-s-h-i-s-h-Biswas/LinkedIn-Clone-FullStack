import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { userAction } from "../../../store/user-slice";
import { useSelector } from "react-redux";
import { UploadFile, writeData } from "../../../firebase/firebase";
import CloseBtn from "./CloseBtn";

const CreateJob = ({ openEdit }) => {
  const titleRef = useRef();
  const companyRef = useRef();
  const locRef = useRef();
  const [pic, setPic] = useState();
  const [fileName, setFileName]=useState(null);
  // const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  
  const setPicUrlHandler = (url) => {
    console.log("i'm called: ", url);
    setPic(url);
  };

  console.log(fileName);

  const onChangeHandler = async (e, payload) => {
    // console.log(e.target.files[0]);
    if (payload === "pic" && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      await UploadFile({
        file: e.target.files[0],
        id: user.uid,
        setUrlHandler: setPicUrlHandler,
      });
    }
  };

  const formSunmitHandler = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value?.trim();
    const company = companyRef.current.value?.trim();
    const location = locRef.current.value?.trim();

    const valid = pic && title && company && location;
    if (!valid) {
      alert("Please fill Data you wanna update");
      return;
    }
    // ------------------store user data in database------------------
      const timestamp=Date.now();
      writeData({
        key: `jobs`,
        id: timestamp,
        payload: {id:timestamp, logo:pic, title, company, location, timestamp},
      });
    
    openEdit();
  };

  return (
    <div className="w-[100%] max-w-[400px] h-auto  flex  flex-col">
      <CloseBtn onClick={openEdit} />
      <div className=" flex flex-col items-center rounded-md justify-center w-[100%] ">
        <form
          onSubmit={formSunmitHandler}
          className="flex flex-col p-5 w-[100%] rounded-md mt-2 max-w-[400px] bg-white md:shadow-md md:shadow-gray-400/90"
        >
          <h1 className="text-4xl text-blue-600 pb-5">Add Free Job</h1>

          <div className="relative flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] opacity-0 z-10  rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="file"
              onChange={(e) => onChangeHandler(e, "pic")}
              placeholder={"Update company photo"}
            />
            <span className="absolute font-bold opacity-50 top-0 left-0 w-[100%] h-[50px] pl-5 flex items-center justify-cente rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 border-[1.5px]">
              {fileName? fileName : "Update company logo"}
            </span>
          </div>

          {/* <div className="flex flex-col relative pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] opacity-0 z-10 rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="file"
              onChange={(e) => onChangeHandler(e, "banner")}
              placeholder="Update background photo"
            />
            <span className="absolute font-bold opacity-50 top-0 left-0 w-[100%] h-[50px] pl-5 flex items-center justify-cente rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 border-[1.5px]">
            Update background photo
            </span>
          </div> */}

          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px]  rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500  h-[50px]"
              type="text"
              ref={titleRef}
              placeholder="Job role title"
            />
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px]  rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500  h-[50px]"
              type="text"
              ref={companyRef}
              placeholder="Company name"
            />
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px]  rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500  h-[50px]"
              type="text"
              ref={locRef}
              placeholder="Job location or type"
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

export default CreateJob;
