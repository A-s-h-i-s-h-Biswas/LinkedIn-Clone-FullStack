import Pen from "../../../Assets/pen.svg";
import Dot from "../Utils/Dot";
import { SendRequest } from "../Utils/data";
import { useNavigate } from "react-router-dom";
const YourProfile = ({
  uid,
  name,
  pic,
  banner,
  bio,
  education,
  addrs,
  connections,
  edit = true,
  isConnected,
  connectionStatus,
  openEdit,
  sender,
  receiver,
}) => {
  const navigate = useNavigate();

  const sendConnection = () => {
    if (edit) return;
    if (isConnected) {
      navigate(`/chat-room/${uid}`);
      return;
    }
    SendRequest({ sender, receiver });
  };

  return (
    <div className="w-[100%] flex flex-col mt-2 bg-white rounded-md">
      <div className="flex flex-col relative w-[100%] h-[170px]">
        <div className="w-[100%] h-[120px] rounded-tl-md rounded-tr-md overflow-hidden">
          <img className="w-[100%] h-[100%] object-cover" src={banner} alt="" />
        </div>
        {edit && (
          <div className="w-[100%] h-[50px]  flex items-center justify-end pr-10">
            <img
              onClick={openEdit}
              className="w-[23px] h-[23px] cursor-pointer object-cover"
              src={Pen}
              alt=""
            />
          </div>
        )}
        <div className="w-[140px] h-[140px] absolute top-[calc(100%/2-70px)] left-[25px] rounded-full border-4 border-white overflow-hidden">
          <img className="w-[100%] h-[100%] object-cover" src={pic} alt="" />
        </div>
      </div>
      <div className="flex flex-col w-[100%] pl-[25px] pr-[30px] pb-3">
        <h3 className="font-bold opacity-80 text-[20px]">{name}</h3>
        <p className=" opacity-70 text-[15px]">{bio}</p>
      </div>
      <div className="flex flex-col w-[100%] pl-[25px] pr-[30px] pb-3">
        <p className="opacity-60 text-[14px] pb-2">{education}</p>
        <p className="flex items-center text-[14px] pb-2">
          <span className="opacity-60 ">{addrs}</span> <Dot />
          <span className="opacity-90 text-blue-600 font-bold">
            Contact info
          </span>
        </p>
        <p className="opacity-90 text-[14px] pb-2 text-blue-600 font-bold">
          {connections} connections
        </p>
      </div>
      <div className="flex items-center justify-between w-[100%] pl-[25px] pr-[30px] pb-3 transition-all">
        <button className="w-[170px] h-[35px] rounded-3xl font-bold text-white bg-blue-600">
          Open to
        </button>
        <button
          onClick={sendConnection}
          className="w-[170px] h-[35px] rounded-3xl text-blue-600 border-[1.5px] hover:border-[2px] border-blue-600"
        >
          {edit
            ? "Add profile section"
            : isConnected
            ? "Send message"
            : connectionStatus}
        </button>
        <button className="w-[30px] h-[30px] flex items-center justify-center rounded-full border-[1.5px] border-gray-600 hover:border-[2px] hover:bg-gray-200">
          <div className="pb-2 font-bold ">. . .</div>
        </button>
      </div>
    </div>
  );
};

export default YourProfile;
