import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-gray-200 w-[100%] max-w-[500px] mt-2  h-[150px] flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-[80%] ">
        <Link to="#">
        
          <p className="text-[12px]">About</p>
        </Link>
        <Link to="#">
        
          <p className="text-[12px]">Accessibility</p>
        </Link>
        <Link to="#">
        
          <p className="text-[12px]">Help Center</p>
        </Link>
        <Link to="#">
        
          <p className="text-[12px]">Privacy & Terms</p>
        </Link>
        <Link to="#">
        
          <p className="text-[12px]">Ad Choices</p>
        </Link>
      </div>
      <div className="flex items-center justify-between pt-2 w-[70%]">
      <Link to="#">
        
          <p className="text-[12px]">Advertising</p>
        </Link>
        <Link to="#">
          <p className="text-[12px]">Business Services</p>
        </Link>
        <Link to="#">
          <p className="text-[12px]">Get the LinkedIn app</p>
        </Link>
        <Link to="#">
          <p className="text-[12px]">More</p>
        </Link>
      </div>
      <div className="flex items-center justify-center pt-7">
        <p className="text-[12px] font-bold"> LinkedIn Corporation © 2023</p>
      </div>
    </div>
  );
};

export default Footer;
