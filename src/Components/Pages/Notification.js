import React, { useState, useEffect, useCallback } from "react";
import NotifyCard from "../UI/NotiFyHelper/NotifyCard";
import { getAllChildData } from "../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";
import SkeletonLoader from "../UI/Utils/SkeletonLoader";

const Notification = () => {
  const [sortBtn, setSortBtn] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [myPostnotifications, setMyPostNotifications] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const notifications=useSelector(state=>state.notification.allNotifications);
  const myPostnotifications = useSelector(
    (state) => state.notification.postNotification
  );

  const setNotificationHandler = useCallback(
    (payload) => {
      const sortNotifications=payload.sort((a,b)=>b.timestamp-a.timestamp)
      setNotifications(sortNotifications);
      dispatch(notificationActions.addAllNotification(sortNotifications));
      dispatch(notificationActions.setActiveState(true));
    },
    [dispatch]
  );
  useEffect(() => {
    const fetchAllNotifications = async () => {
      await getAllChildData({
        key: `notifications/${user.uid}`,
        setDataHandler: setNotificationHandler,
      });
    };
    fetchAllNotifications();
  }, [user.uid, setNotificationHandler]);

  const sortBtnHandler = (payload) => {
    setSortBtn(payload);
  };

  // console.log();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) return <SkeletonLoader />;

  return (
    <div className="max-w-[550px]  w-[100%]">
      <div className="w-[100%] h-[70px]  bg-white mt-1 p-3 transition-all flex items-center   rounded-md">
        <p
          onClick={() => sortBtnHandler("all")}
          className={`font-bold w-[100px] h-[35px] flex items-center justify-center cursor-pointer border-2 mr-2 text-center ${
            sortBtn === "all" ? "bg-green-600" : ""
          } rounded-3xl`}
        >
          <span className="opacity-60">All</span>
        </p>
        <p
          onClick={() => sortBtnHandler("my posts")}
          className={`font-bold w-[100px] h-[35px] flex items-center justify-center cursor-pointer border-2 mr-2 text-center ${
            sortBtn === "my posts" ? "bg-green-600" : ""
          } rounded-3xl`}
        >
          <span className="opacity-60">My posts</span>
        </p>
        <p
          onClick={() => sortBtnHandler("mentions")}
          className={`font-bold w-[100px] h-[35px] flex items-center justify-center cursor-pointer border-2 mr-2 text-center ${
            sortBtn === "mentions" ? "bg-green-600" : ""
          } rounded-3xl`}
        >
          <span className="opacity-60">Mentions</span>
        </p>
      </div>
      <div className="flex flex-col w-[100%] bg-white mt-2  h-auto  rounded-md overflow-hidden">
        {sortBtn === "all"
          ? notifications.map((noti, indx) => (
              <NotifyCard
                key={indx}
                notificationId={noti.notificationId}
                uid={noti.uid}
                profileName={noti.name}
                profilePic={noti.pic}
                msg={noti.status}
                read={noti.read}
                content={noti.content}
                timestamp={noti.timestamp}
              />
            ))
          : myPostnotifications.map((noti) => (
              <NotifyCard
                key={noti.uid}
                uid={noti.uid}
                notificationId={noti.notificationId}
                profileName={noti.name}
                profilePic={noti.pic}
                msg={noti.status}
                read={noti.read}
                content={noti.content}
                timestamp={noti.timestamp}
              />
            ))}
      </div>
    </div>
  );
};

export default Notification;
