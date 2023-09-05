import React from "react";
const NetworkComponent = ({logo,title,value=0, onClick, connectionList}) => {
  return (
    <div onClick={onClick} className="w-[100%] p-2 flex items-center justify-between hover:bg-gray-200 hover:rounded-md cursor-pointer">
      <div className="w-[30px] h-[30px] hover:bg-gray-200 hover:rounded-full">
        <img
          className="w-[100%] h-[100%] opacity-70  object-cover"
          src={logo}
          alt=""
        />
      </div>
      <p className="w-[80%] opacity-70">{title}</p>
      <p className="w-[10%] opacity-70">{value}</p>
    </div>
  );
};

export default NetworkComponent;
