import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { projectActions } from "../../../store/project-slice";
import { useDispatch, useSelector } from "react-redux";
import { writeData } from "../../../firebase/firebase";
import CloseBtn from "./CloseBtn";

const AddProject = ({ openEdit }) => {
  const aboutRef = useRef();
  const urlRef = useRef();
  const titleRef = useRef();
  const timespanRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const formSunmitHandler = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value?.trim();
    const about = aboutRef.current.value?.trim();
    const projectUrl=urlRef.current.value?.trim();
    const timespan = timespanRef.current.value?.trim();
  
    if (!(title && about && timespan && projectUrl)) {
      alert("Please fill Data you to update");
      return;
    }
    // ------------------store user data in database------------------
    
        dispatch(projectActions.addProject({id:Date.now, title, about, timespan, projectUrl}));
        writeData({
        key: `projects/${user.uid}`,
        id: Date.now(),
        payload: {id: Date.now(), title, about, timespan, projectUrl},
      });
    
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
            <h1 className="text-4xl text-blue-600 pb-5">Add a Project</h1>

            

            <div className="flex flex-col pt-2 pb-2">
              <input
                className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
                type="text"
                ref={titleRef}
                placeholder="Project title"
              />
            </div>
            <div className="flex flex-col pt-2 pb-2">
              <textarea
                className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
                rows={10} cols={5}
                ref={aboutRef}
                placeholder={"Describe your project"}
              />
            </div>
            <div className="flex flex-col pt-2 pb-2">
              <input
                className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
                type="text"
                ref={urlRef}
                placeholder={"Add project URL"}
              />
            </div>
            <div className="flex flex-col pt-2 pb-2">
              <input
                className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
                type="text"
                ref={timespanRef}
                placeholder={"Specify project timespan"}
              />
            </div>

            <div className=" pt-3 ">
              <button
                className={`bg-blue-600 w-[100%] h-[45px] text-white font-bold rounded-3xl`}
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AddProject;
