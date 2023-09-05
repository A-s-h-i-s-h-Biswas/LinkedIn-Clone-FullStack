// import React, { useState } from "react";

const ToggleContainer = ({ title, label1, label2, sortBtn,sortBtnHandler }) => {
//   const [sortBtn, setSortBtn] = useState("label1");
//   const sortBtnHandler = (payload) => {
//     setSortBtn(payload);
//   };
  return (
    <div className="w-[100%] bg-white mt-2 pl-3 pt-2 pr-3 flex flex-col rounded-md">
      <h3 className="font-bold opacity-70 text-xl">{title}</h3>
      {label1 && (
        <div className="flex items-center mt-1 h-[40px]">
          <div
            onClick={() => sortBtnHandler("label1")}
            className={`w-[80px] h-[80%] flex items-center justify-center rounded-3xl border-2 ${
              sortBtn === "label1" ? "bg-green-600 text-white" : ""
            } cursor-pointer mr-3 `}
          >
            <p className={` font-bold text-[14px] opacity-70 `}>{label1}</p>
          </div>
          <div
            onClick={() => sortBtnHandler("label2")}
            className={`w-[80px] h-[80%] flex items-center justify-center rounded-3xl border-2 ${
              sortBtn === "label2" ? "bg-green-600  text-white" : ""
            } cursor-pointer`}
          >
            <p className={` font-bold text-[14px] opacity-70 `}>{label2}</p>
          </div>
        </div>
      )}
      </div>
  );
};

export default ToggleContainer;
