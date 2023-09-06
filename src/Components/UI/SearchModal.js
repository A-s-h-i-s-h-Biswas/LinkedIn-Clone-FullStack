import React, { useState, useEffect, useCallback, Fragment, useRef } from "react";
// import ModalContainer from "./ModalContainer";
import { SearchUser } from "./Utils/data";
import { useNavigate } from "react-router-dom";
import { getAllChildData } from "../../firebase/firebase";
import { useSelector } from "react-redux";

const SearchModal = ({ modalCloseHandler, SearchModal}) => {
  const textWrapper = (text, word = 30) => {
    if (text.length < word) return text;
    return text.substring(0, word) + "...";
  };
  const [allUsers, setAllUsers] = useState([]);
  const [resultUsers, setResultUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const modalref=useRef();
  const navigate = useNavigate();

  const setAllUserHandler = useCallback((payload) => {
    setAllUsers(payload);
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      await getAllChildData({
        key: "users",
        setDataHandler: setAllUserHandler,
      });
    };
    fetchAllUsers();
  }, [setAllUserHandler]);

  const changeInputHandler = async (e) => {
    const searchKey = e.target.value?.trim();
    if (!searchKey) {
      setResultUsers([]);
      return;
    }
    let searchResults = await SearchUser({ allUsers, searchKey });
    searchResults = searchResults.filter((res) => res.uid !== user.uid);
    setResultUsers(searchResults);
  };

  const gotoProfile = (payload) => {
    // close modal
    modalCloseHandler(false);
    // if(payload === user.uid)navigate(`/my-profile`);
    navigate(`/my-profile/${payload}`);
  };
  useEffect(()=>{
    modalref.current?.scrollIntoView({ behavior: "smooth" });
  },[SearchModal])

  return (
    <Fragment >
      <div
        onClick={() => modalCloseHandler(false)}
        className="w-[100%] h-screen z-20 fixed top-0 left-0 bg-[rgba(0,0,0,0.45)] overflow-hidden"
      />
      <div ref={modalref} className="absolute w-[350px] min-h-[150px] rounded-md z-20 top-0 left-[calc(50%-175px)] bg-white shadow-lg shadow-gray-800/90  pl-3 pr-3 flex flex-col  justify-between">
        <input
          className="w-[100%] bg-gray-50 h-[40px] mt-3 mb-3 hover:border-[2px] rounded-3xl pl-4 border-[1.5px] border-slate-800 "
          type="text"
          onChange={changeInputHandler}
          // value={searchKey}
          placeholder="Search a user"
        />
        {resultUsers.map((result) => (
          <div key={result.uid}>
            <div
              onClick={() => gotoProfile(result.uid)}
              className="flex items-center justify-between cursor-pointer mb-2"
            >
              <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                <img
                  className="w-[100%] h-[100%] object-cover"
                  src={result.pic}
                  alt=""
                />
              </div>
              <div className="flex flex-col w-[80%]">
                <h3 className="text-slate-700 font-bold opacity-70 ">
                  {result.name}
                </h3>
                <p className="text-slate-700 text-[14px] opacity-50 font-bold">
                  {textWrapper(result.bio)}
                </p>
              </div>
            </div>
            <div className="w-[100%] h-[.5px] bg-gray-200 mb-2 mt-1" />
          </div>
        ))}
      </div>
    </Fragment>

    // <div className="w-[100%] h-[100%]  overflow-hidden z-20 relative ">
    //   <div
    //     onClick={()=>modalCloseHandler(false)}
    //     className="w-[100%] h-[100%] fixed top-0 left-0 bg-[rgba(0,0,0,0.45)] overflow-hidden"
    //   />
    //   <div className="absolute w-[300px] h-[100px]  top-0 left-[calc(50%-150px)] bg-rose-800  flex flex-col items-center justify-between">
    //     <input
    //       className="w-[90%] bg-gray-50 h-[40px] hover:border-[2px] rounded-3xl pl-4 border-[1.5px] border-slate-800 "
    //       type="text"
    //       placeholder="Search a user"
    //     />
    //   </div>
    // </div>
  );
};

export default SearchModal;
