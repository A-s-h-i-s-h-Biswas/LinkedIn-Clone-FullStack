import React, { useState } from "react";
import pen from "../../../Assets/pen.svg";
import add from "../../../Assets/plus.svg";
import Line from "../Utils/Line";

const Skills = ({ edit = true, openEdit, allSkills }) => {
  const [showLess, setShowLess] = useState(true);
  const showLessHandler = () => {
    setShowLess((prev) => !prev);
  };

  const showLebel = `Show ${
    showLess ? `all ${allSkills.length} ` : "less "
  }skills`;

  return (
    <div className="w-[100%] h-auto mt-2 p-[25px] rounded-md bg-white flex flex-col">
      <div className="w-[100%] flex justify-between items-center">
        <h2 className="text-[20px] font-bold opacity-70">{"My Skills"}</h2>
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
      {allSkills.map((skill, indx) => {
        if (showLess && indx > 3) return <></>;
        return (
          <div key={indx} className="w-[100%] flex flex-col">
            <Line />
            <p className="font-bold opacity-70 cursor-pointer hover:text-blue-600 hover:underline ">
              {skill.title}
            </p>
          </div>
        );
      })}

      <Line />
      {allSkills.length > 4 && (
        <p
          onClick={showLessHandler}
          className="font-bold text-center  opacity-50  cursor-pointer hover:text-blue-600 hover:underline"
        >
          {showLebel}
        </p>
      )}
    </div>
  );
};

export default Skills;
