import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllChildData, getData, writeData } from "../../firebase/firebase";
import { GET_READABLE_TIME } from "../UI/Utils/data";
const ChatRoom = () => {
  const params = useParams().uid;
  const lastMsgRef = useRef();
  const textRef = useRef();
  const uid = useSelector((state) => state.user.uid);
  const [roomer, setRoomer] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getId = uid?.localeCompare(params) > 0 ? params + uid : uid + params;

  const setRoomerHandler = useCallback((payload) => {
    setRoomer(payload);
  }, []);
  const getPrevMessages = useCallback((payload) => {
    // console.log(payload);
    setMessages(payload);
  }, []);

  useEffect(() => {
    getData({ key: `users`, id: params, setDataHandler: setRoomerHandler });
    getAllChildData({
      key: `messages/${getId}`,
      setDataHandler: getPrevMessages,
    });
  }, [setRoomerHandler, params, getPrevMessages, getId]);

  const sendeMsgHandler = () => {
    const text = textRef.current.value?.trim();
    if (!text) return;
    const payload = {
      uid,
      text,
      timestamp: Date.now(),
    };
    const id = getId;
    const timestamp = Date.now();
    writeData({ key: `messages/${id}`, id: timestamp, payload });
    textRef.current.value = "";
  };
  // console.log(getId);

  return (
    <div className="bg-gray-100  rounded overflow-hidden w-[100%] max-w-[500px] min-h-[570px] flex flex-col">
      <div className=" w-[100%] h-[65px] fixed max-w-[500px] z-10 pl-3 flex items-center bg-blue-300">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            className="w-[100%] h-[100%] object-cover"
            src={roomer?.pic}
            alt=""
          />
        </div>
        <p className="pl-3 font-bold opacity-70 text-white">{roomer?.name}</p>
      </div>
      <div className="w-[100%] min-h-[400px] mt-[66px] pl-3 pr-3 flex flex-col  bg-gray-100">
        {messages.map((msg) =>
          msg.uid === uid ? (
            <div>
              <p className="text-right text-[14px]  opacity-50 italic">
                {GET_READABLE_TIME(msg.timestamp)}
              </p>
              <div className=" bg-blue-400  rounded-md w-[60%] ml-[40%] min-h-[50px] flex items-center  mb-2 text-slate-600 pl-3 pr-3 h-auto">
                <p ref={lastMsgRef} className="w-[100%] break-words pt-1 pb-1">
                  {msg.text}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className=" text-[14px] italic opacity-50 ">
                {GET_READABLE_TIME(msg.timestamp)}
              </p>
              <div className=" bg-rose-400 rounded-md w-[60%]  min-h-[50px] flex items-center mb-2 text-slate-600 pl-3 pr-3 h-auto">
                <p ref={lastMsgRef} className="w-[100%] pt-1 pb-1 break-words">
                  {msg.text}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="w-[100%] h-[70px] flex items-center justify-center bg-blue-50">
        <input
          ref={textRef}
          className="w-[75%] h-[70%] bg-white pl-5 pr-5 rounded-md border-[1.5px] border-blue-600 outline-none hover:border-[2px]"
        />
        <button
          onClick={sendeMsgHandler}
          className="w-[20%] ml-2 bg-blue-600 rounded-md h-[68%] text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
