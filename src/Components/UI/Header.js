import React, { useState, useEffect, Fragment } from "react";
import logo from "../../Assets/logo.svg";
import search from "../../Assets/search.svg";
import home from "../../Assets/home-f.svg";
import network from "../../Assets/network-f.svg";
import job from "../../Assets/job-f.svg";
import notify from "../../Assets/notify-f - Copy.svg";
import mgs from "../../Assets/message-f.svg";
import SearchModal from "./SearchModal";
import { Link, useLocation } from "react-router-dom";
import ProfileModal from "./ProfileHelper/ProfileModal";
import { useSelector } from "react-redux";

const Header = () => {
  const [searchModal, setsearchModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [path, setPath] = useState("/");
  const location = useLocation();

  const profilePic = useSelector((state) => state.user.pic);

  const unreadNotification = useSelector(
    (state) => state.notification.unreadNotification
  );
  const isNotificationVisited = useSelector(
    (state) => state.notification.isActive
  );
  const profileModalHandler = () => {
    setProfileModal((prev) => !prev);
  };
  const searchModalHandler = (payload) => {
    if (!payload) {
      document.body.style.overflow = "unset";
    } else if (payload) {
      // console.log("here");
      document.body.style.overflow = "hidden";
    }
    setsearchModal(payload);
  };

  const cpath = location.pathname;
  useEffect(() => {
    setPath(cpath);
  }, [cpath]);
  // console.log(location);
  return (
  <Fragment>
    {searchModal && <SearchModal searchModal={searchModal} modalCloseHandler={searchModalHandler} />}
    <div className="bg-white w-full   fixed top-0 left-0  lg:pl-20 z-10  h-[70px] pl-3 pr-3 flex gap-5  items-center justify-between ">
      <div className="flex">
        {/* ------------------------logo icon-------------------- */}
        <div className=" w-[45px] h-[45px]  flex items-center justify-center">
          <Link to="/">
            <img
              className="w-[100%] h-[100%] object-cover cursor-pointer "
              src={logo}
              alt=""
            />
          </Link>
        </div>
        {/* ------------------------search icon-------------------- */}
        <div className="flex items-center relative overflow-hidden">
          <div
            onClick={() => searchModalHandler(true)}
            className="w-[32px] h-[32px] "
          >
            <img
              className="w-[100%] h-[100%] object-cover cursor-pointer"
              src={search}
              alt=""
            />
          </div>
          <div className="hidden md:block  h-[35px] flex-1 rounded-md overflow-hidden">
            <input
              onClick={() => searchModalHandler(true)}
              className="bg-sky-50 w-[250px] lg:w-[300px] h-[100%] pl-3 pr-3 rounded-md border-s-black outline-gray-500 "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="w-[calc(100vw-50px)] relative max-w-[400px] lg:max-w-[600px] flex items-center justify-between">
        {/* ------------------------Home icon-------------------- */}
        <div className=" w-[calc(100%/5)] ">
          <Link
            to="/"
            className={`flex flex-col ${
              path === "/" ? "opacity-100" : "opacity-50"
            } hover:opacity-100 items-center justify-center`}
          >
            <img className="w-[30px] h-[30px] object-cover" src={home} alt="" />
            <p className="hidden  lg:inline text-black text-[13px] opacity-80">
              Home
            </p>
          </Link>
        </div>
        {/* ------------------------Network icon-------------------- */}
        <div className="w-[calc(100%/5)] ">
          <Link
            to="/network"
            className={`flex flex-col items-center justify-center ${
              path === "/network" ? "opacity-100" : "opacity-50"
            } hover:opacity-100`}
          >
            <img
              className="w-[30px] h-[30px] object-cover"
              src={network}
              alt=""
            />
            <p className="hidden  lg:inline text-black text-[13px] opacity-80">
              My Network
            </p>
          </Link>
        </div>
        {/* ------------------------Job icon-------------------- */}
        <div className="w-[calc(100%/5)] ">
          <Link
            to="/jobs"
            className={`flex flex-col items-center justify-center ${
              path === "/jobs" ? "opacity-100" : "opacity-50"
            } hover:opacity-100`}
          >
            <img className="w-[30px] h-[30px] object-cover" src={job} alt="" />
            <p className="hidden  lg:inline text-black text-[13px] opacity-80">
              Jobs
            </p>
          </Link>
        </div>
        {/* ------------------------Message icon-------------------- */}
        <div className="w-[calc(100%/5)] ">
          <Link
            to="/messages"
            className={`flex flex-col ${
              path === "/messages" ? "opacity-100" : "opacity-50"
            } hover:opacity-100 items-center justify-center`}
          >
            <img className="w-[30px] h-[30px] object-cover" src={mgs} alt="" />
            <p className="hidden  lg:inline text-black text-[13px] opacity-80 ">
              Messaging
            </p>
          </Link>
        </div>
        {/* ------------------------Notification icon-------------------- */}
        <div className="w-[calc(100%/5)] ">
          <Link
            to="/notifications"
            className={`flex flex-col relative items-center justify-center ${
              path === "/notifications" ? "opacity-100" : "opacity-50"
            } hover:opacity-100`}
          >
            {unreadNotification > 0 && !isNotificationVisited && (
              <div className="absolute -top-2 left-8 w-[20px] h-[20px] bg-blue-900 rounded-full overflow-hidden flex items-center justify-center">
                <span className="font-bold w-[100%] h-[100%] flex items-center justify-center">
                  {unreadNotification}
                </span>
              </div>
            )}

            <img
              className="w-[30px] h-[30px] object-cover"
              src={notify}
              alt=""
            />
            <p className="hidden  lg:inline text-black text-[13px] opacity-80 ">
              Notifications
            </p>
          </Link>
        </div>
        <div className="hidden md:flex md:w-[calc(100%/6)]">
          <img
            onClick={profileModalHandler}
            className="w-[35px] h-[35px] cursor-pointer rounded-full overflow-hidden object-cover"
            src={profilePic}
            alt="profilePic"
          />
        </div>
        {profileModal && (
          <div
            onMouseLeave={profileModalHandler}
            className="absolute top-14 right-16"
          >
            <ProfileModal />
          </div>
        )}
      </div>
    </div>
  </Fragment>
  )
};

export default Header;
