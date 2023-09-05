import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../UI/Utils/SkeletonLoader";
const Message = () => {
  const [loading, setLoading]=useState(true);
  const connections =useSelector((state) => state.connection.connections);
  const navigate=useNavigate();
  const gotoChatRoom=(payload)=>{
    navigate(`/chat-room/${payload}`);
  }
  const textWrapper=(text,word=60)=>{
    if(text?.length< word)return text;
    return text.substring(0,word)+"...";
  }

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },1000);
  },[]);

  

  if(loading)return <SkeletonLoader/>
  if(connections.length === 0) return <div className="w-[100%] h-screen flex items-center justify-center"><p className="font-bold opacity-60">You don't have any connections to send messages</p></div>
  return (
    <div className="flex flex-col w-[100%] max-w-[550px] p-3 overflow-hidden bg-white mt-2  h-auto  rounded-md">
      <h3 className="font-bold text-[18px] opacity-60 mb-3">
        Send Message to your connections
      </h3>
      {connections.map((con) => (
        <div onClick={()=>gotoChatRoom(con.uid)} key={con.uid} className="w-[100%] h-[80px] flex flex-col justify-between hover:bg-blue-200">
          <div className="w-[100%] h-[.2px] bg-gray-100" />
          <div className="flex h-[80%] cursor-pointer ">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
              <img
                className="w-[100%] h-[100%] object-cover"
                src={con.pic}
                alt=""
              />
            </div>
            <div className="flex flex-col pl-2">
              <p className="font-bold opacity-60">{con.name}</p>
              <p className="font-bold opacity-60 text-[10px]">{textWrapper(con.bio)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
