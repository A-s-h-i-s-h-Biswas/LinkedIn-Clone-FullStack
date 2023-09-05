import React from "react";
import { Link } from "react-router-dom";
import pen from "../../../Assets/pen.svg";
import add from "../../../Assets/plus.svg";
import Line from "../Utils/Line";
// import { useSelector } from "react-redux";
import redirect from "../../../Assets/redirect.svg";
const Projects = ({ edit = true, openEdit, allProjects }) => {
  const textWrapper = (text, word) => {
    return text.substring(0, word) + "...";
  };

  return (
    <div className="w-[100%] h-auto mt-2 p-[25px] rounded-md bg-white flex flex-col">
      <div className="w-[100%] flex justify-between items-center">
        <h2 className="text-[20px] font-bold opacity-70">{"My Projects"}</h2>
        {edit && (
          <div className="flex w-[18%] justify-between">
            <img
              onClick={openEdit}
              className="w-[25px] h-[25px] object-cover cursor-pointer"
              src={add}
              alt=""
            />
            <img
              className="w-[25px] h-[25px] object-cover cursor-pointer"
              src={pen}
              alt=""
            />
          </div>
        )}
      </div>
      {allProjects.map((project) => (
        <div key={project.id} className="flex flex-col w-[100%]">
          <Line />
          <h2 className="text font-bold opacity-70">{project.title}</h2>
          <p className="text-[14px] opacity-70 pt-2">{project.timespan}</p>
          <Link
            to={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center mt-2 border-[1px] w-[150px] h-[35px] border-black rounded-3xl hover:border-[2px] hover:bg-gray-100"
          >
            <p className="font-bold opacity-50 pr-1  ">Show Project</p>
            <img
              className="w-[10px] h-[10px]  object-cover cursor-pointer"
              src={redirect}
              alt=""
            />
          </Link>
          <p className="text-[14px] opacity-70 pt-3">
            {textWrapper(project.about, 150)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
