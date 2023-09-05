import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { skillAction } from "../../../store/skill-slice";
import { useDispatch, useSelector } from "react-redux";
import { writeData } from "../../../firebase/firebase";
import CloseBtn from "./CloseBtn";

const AddSkill = ({ openEdit }) => {
  const titleRef = useRef();
  const ratingRef = useRef();
  const certificateRef = useRef();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const formSunmitHandler = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value?.trim();
    const experticeLabel = ratingRef.current.value?.trim();
    const certificate = certificateRef.current.value?.trim();

    if (!(title && experticeLabel)) {
      alert("Please fill Data you to update");
      return;
    }
    // ------------------store user data in database------------------

    dispatch(
      skillAction.addSkill({ id: Date.now(), title, experticeLabel, certificate })
    );
    writeData({
      key: `skills/${user.uid}`,
      id: Date.now(),
      payload: { id: Date.now(), title, experticeLabel, certificate },
    });

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
          <h1 className="text-4xl text-blue-600 pb-5">Add a Skill</h1>

          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="text"
              ref={titleRef}
              placeholder="Add Skill Name"
            />
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              ref={ratingRef}
              placeholder={"Add Expertice Level"}
            />
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="text"
              ref={certificateRef}
              placeholder={"Do you have Cetificate ?"}
            />
          </div>

          <div className=" pt-3 ">
            <button
              className={`bg-blue-600 w-[100%] h-[45px] text-white font-bold rounded-3xl`}
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
