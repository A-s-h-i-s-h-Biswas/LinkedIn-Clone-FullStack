import React from 'react';
import logo from "../../../Assets/linkedin.svg"
const SkeletonLoader = () => {
  return (
    <div className='h-screen w-[100%] flex flex-col items-center justify-center'>
      <img className='w-[150px] h-[80px] object-cover' src={logo} alt=''/>
      <div className="animate-spin h-16 w-16 border-t-2 border-blue-500 border-solid rounded-full"></div> 
      {/* <div className="w-[100%] p-4 space-y-4">
      <div className="h-12 bg-blue-600 rounded-lg w-full animate-pulse"></div>
      <div className="h-80 bg-blue-600 rounded-lg w-full animate-pulse"></div>
      <div className="h-16 bg-blue-600 rounded-lg w-full animate-pulse"></div>
      <div className="h-32 bg-blue-600 rounded-lg w-full animate-pulse"></div>
    </div>  */}
    
  </div>
  );
};

export default SkeletonLoader;