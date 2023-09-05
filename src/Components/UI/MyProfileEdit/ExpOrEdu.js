import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { educationAction } from "../../../store/education-slice";
import { experienceAction } from "../../../store/experience-slice";
import { useDispatch, useSelector } from "react-redux";
import { writeData } from "../../../firebase/firebase";
import CloseBtn from "./CloseBtn";

const ExpOrEdu = ({ openEdit, label }) => {
  const aboutRef = useRef();
  const titleRef = useRef();
  const timespanRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const titleLabel= label=== "Experience"? "Current working Role" : "College Name";
  const aboutLabel = label === "Experience" ? "Add more about Experience" : "Latest Education"
  const timespanLabel= label === "Experience" ? "Add current job timespan" : "Add timespan for latest qualification"

  const formSunmitHandler = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value?.trim();
    const about = aboutRef.current.value?.trim();
    const timespan = timespanRef.current.value?.trim();
    
    if (!(title && about && timespan)) {
      alert("Please fill Data you to update");
      return;
    }
    // ------------------store user data in database------------------
    if(label === "Experience"){
        dispatch(experienceAction.updateExperience({title, about, timespan}));
        writeData({
        key: `experience`,
        id: user.uid,
        payload: {title, about, timespan},
      });
    }
    else{
        dispatch(educationAction.updateEducation({title, about, timespan}));
        writeData({
        key: `education`,
        id: user.uid,
        payload: {title, about, timespan},
      });
    }
    openEdit();
    navigate("/my-profile");
  };

  return (
    
      <div className="w-[100%] max-w-[400px] h-auto  flex  flex-col">
        <CloseBtn onClick={openEdit}/>
        <div className=" flex flex-col items-center rounded-md justify-center w-[100%] ">
          <form
            onSubmit={formSunmitHandler}
            className="flex flex-col p-5 w-[100%] rounded-md mt-2 max-w-[400px] bg-white md:shadow-md md:shadow-gray-400/90"
          >
            <h1 className="text-4xl text-blue-600 pb-5">Edit {label}</h1>

            

            <div className="flex flex-col pt-2 pb-2">
              <input
                className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
                type="text"
                ref={titleRef}
                placeholder={titleLabel}
              />
            </div>
            <div className="flex flex-col pt-2 pb-2">
              <input
                className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
                type="text"
                ref={aboutRef}
                placeholder={aboutLabel}
              />
            </div>
            <div className="flex flex-col pt-2 pb-2">
              <input
                className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
                type="text"
                ref={timespanRef}
                placeholder={timespanLabel}
              />
            </div>

            <div className=" pt-3 ">
              <button
                className={`bg-blue-600 w-[100%] h-[45px] text-white font-bold rounded-3xl`}
              >
                Update {label}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default ExpOrEdu;
