import React, { Fragment, useState, useEffect, useCallback } from "react";
// import network from "../../Assets/users-filled.svg";
import NetworkComponent from "../UI/NetworkHelper/NetworkComponent";
import InvitationCard from "../UI/NetworkHelper/InvitationCard";
import down from "../../Assets/down-arrow.svg";
import up from "../../Assets/up-arrow.svg";
import contact from "../../Assets/contacts.svg";
import group from "../../Assets/group.svg";
import event from "../../Assets/event.svg";
import page from "../../Assets/page.svg";
import newsletter from "../../Assets/news.svg";
import hashtag from "../../Assets/hashtag.svg";
import connect from "../../Assets/connect.svg";
import follow from "../../Assets/follow.svg";
import UserCard from "../UI/NetworkHelper/UserCard";
import FollowCard from "../UI/NetworkHelper/FollowCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllChildData, writeData } from "../../firebase/firebase";
import InvitationSent from "../UI/NetworkHelper/InvitationSent";
import ToggleContainer from "../UI/Utils/ToggleContainer";
import { connectionActions } from "../../store/connection-slice";
import {
  ADD_CONNECTION,
  ADD_TO_CONNECTION_LIST,
  REMOVE_REQUEST,
  SEND_NOTIFICATION,
  isAConnection,
} from "../UI/Utils/data";
import SkeletonLoader from "../UI/Utils/SkeletonLoader";

// const SortData = (data) => {
//   // console.log(comments);
//   const sortedData = [];
//   Object.keys(data)
//     .sort((a, b) => b - a)
//     .forEach((childKey) => {
//       sortedData.push(data[childKey]);
//     });
//   return sortedData;
// };

const Network = () => {
  const [connections, setConnections] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allPages, setAllPages] = useState([]);
  const user = useSelector((state) => state.user);
  const myConnections = useSelector((state) => state.connection.connections);
  const [followers, setFollowers] = useState(user.followers);
  const [connectionCount, setConnectionCount] = useState(myConnections.length);
  const [openConnectionList, setOpenConnectionList] = useState(false);
  const [Requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [sortBtn, setSortBtn] = useState("label1");
  const sortBtnHandler = (payload) => {
    setSortBtn(payload);
  };
  const openConnectionHandler = () => {
    setOpenConnectionList((prev) => !prev);
  };

  const setAllUsersHandler = useCallback(
    (payload) => {
      // console.log("im useCallback");

      const personal = payload.filter(
        (e) =>
          e.page !== true &&
          e.uid !== user.uid &&
          !isAConnection({ myConnectionList: myConnections, uid: e.uid })
      );
      const pages = payload.filter(
        (e) =>
          e.page === true &&
          !isAConnection({ myConnectionList: myConnections, uid: e.uid })
      );
      setAllUsers(personal);
      setAllPages(pages);
    },
    [myConnections, user.uid]
  );

  useEffect(() => {
    // console.log("###################");
    const len = myConnections?.length;
    setConnectionCount(len);
  }, [myConnections]);

  useEffect(() => {
    const fetchAllUsersAndConnectiona = async () => {
      await getAllChildData({
        key: "users",
        setDataHandler: setAllUsersHandler,
      });
    };
    fetchAllUsersAndConnectiona();
  }, [setAllUsersHandler, user.uid]);

  const setConnectionHandler = (payload) => {
    setConnectionCount(payload.connections);
    setFollowers(payload.followers);
  };

  const setRequestDataHandler = (payload) => {
    // console.log(payload);
    setRequests(payload);
  };
  const setSentRequestDataHandler = (payload) => {
    // console.log(payload);
    setSentRequests(payload);
  };
  useEffect(() => {
    const fetchAllRequest = async () => {
      await getAllChildData({
        key: `getRequest/${user.uid}`,
        setDataHandler: setRequestDataHandler,
      });
      await getAllChildData({
        key: `postRequest/${user.uid}`,
        setDataHandler: setSentRequestDataHandler,
      });
    };
    fetchAllRequest();
  }, [user.uid]);

  const withdrawHandler = (payload) => {
    if (payload.type === "sent") {
      const filteredSendReq = sentRequests.filter(
        (req) => req.uid !== payload.uid
      );
      setSentRequests(filteredSendReq);
      writeData({
        key: `getRequest/${payload.uid}`,
        id: user.uid,
        payload: null,
      });
      writeData({
        key: `postRequest/${user.uid}`,
        id: payload.uid,
        payload: null,
      });
    } else if (payload.type === "received") {
      const filtereddReq = Requests.filter((req) => req.uid !== payload.uid);
      setRequests(filtereddReq);
      writeData({
        key: `getRequest/${user.uid}`,
        id: payload.uid,
        payload: null,
      });
      writeData({
        key: `postRequest/${payload.uid}`,
        id: user.uid,
        payload: null,
      });
    }
  };

  const acceptHandler = async (payload) => {
    const filteredReq = Requests.filter((req) => req.uid !== payload.uid);
    setRequests(filteredReq);
    // ---------------remove request from both user list----------------

    REMOVE_REQUEST({ key: `getRequest/${user.uid}`, d: payload.uid });
    REMOVE_REQUEST({ key: `postRequest/${payload.uid}`, id: user.uid });
    // ----------------add both as connected user in connections list-----------------
    ADD_TO_CONNECTION_LIST({ myid: payload.uid, user });
    ADD_TO_CONNECTION_LIST({ myid: user.uid, user: payload });

    await ADD_CONNECTION({
      sender: payload,
      receiverId: user.uid,
      setConnection: setConnectionHandler,
    });
    await ADD_CONNECTION({
      sender: user,
      receiverId: payload.uid,
      setConnection: null,
    });

    // ------------------update connection store--------------
    dispatch(
      connectionActions.addConnection({
        uid: payload.uid,
        name: payload.name,
        pic: payload.pic,
        bio: payload.bio,
      })
    );
    // ----------send notification to let the user know request accepted-------------
    const status = ` accepted your connection request. You can send message to ${user.name}`;
    SEND_NOTIFICATION({
      sender: user,
      receiverId: payload.uid,
      status,
      content: null,
    });
  };
  const connectionHandler = () => {
    setConnections((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) return <SkeletonLoader />;

  return (
    <div className="w-[100%] max-w-[550px]    mt-[2px] flex flex-col">
      <div className="w-[100%] h-auto rounded-md bg-white p-3 flex flex-col">
        <p className="font-bold opacity-60">Manage my network</p>
        <div className="w-[100%] h-auto flex flex-col items-center transition-all">
          <NetworkComponent
            logo={connect}
            connectionList={myConnections}
            title={"Connections"}
            value={connectionCount}
            onClick={openConnectionHandler}
          />
          {connections && (
            <Fragment>
              <NetworkComponent logo={contact} title={"Contacts"} value={0} />
              <NetworkComponent
                logo={follow}
                title={"Following & followers"}
                value={followers}
              />
              <NetworkComponent logo={group} title={"Groups"} value={0} />
              <NetworkComponent logo={event} title={"Events"} value={0} />
              <NetworkComponent logo={page} title={"Pages"} value={0} />
              <NetworkComponent
                logo={newsletter}
                title={"Newsletters"}
                value={0}
              />
              <NetworkComponent logo={hashtag} title={"Hashtags"} value={0} />
            </Fragment>
          )}
        </div>
        <button
          className="w-[145px] flex items-center opacity-50 font-bold p-2 transition-all hover:bg-gray-300 hover:rounded-md"
          onClick={connectionHandler}
        >
          {connections ? "Show less" : "Show more"}
          <img
            className="w-[12px] h-[12px] pt-1 ml-1 object-cover"
            src={connections ? up : down}
            alt=""
          />
        </button>
      </div>
      {openConnectionList && (
        <div className="w-[100%] bg-white rounded-md p-3 flex flex-col mt-3 pt-2 pb-2">
          <h1 className="font-bold opacity-60">My Connections</h1>
          {myConnections.map((e) => (
            <InvitationSent
              key={e.requestId}
              uid={e.uid}
              name={e.name}
              pic={e.pic}
              bio={e.bio}
              label={"Message"}
            />
          ))}
          <div className="flex items-center justify-center">
            <button
              onClick={openConnectionHandler}
              className="border-rose-500 border-[1.5px] hover:border-[2px] h-[45px] w-[180px] rounded-3xl  text-slate-800 opacity-60 font-bold "
            >
              Hide Connections
            </button>
          </div>
        </div>
      )}
      {(Requests.length > 0 || setRequests.length > 0) && (
        <div className="w-[100%] bg-white rounded-md p-3 flex flex-col mt-3 pt-2 pb-2">
          {/* <p className="font-bold opacity-60 ">Invitations</p> */}
          <ToggleContainer
            sortBtnHandler={sortBtnHandler}
            sortBtn={sortBtn}
            title={"Invitations"}
            label1={"Received"}
            label2={"Sent"}
          />
          {sortBtn === "label1" &&
            Requests.map((request) => (
              <InvitationCard
                key={request.requestId}
                acceptHandler={acceptHandler}
                withdrawHandler={withdrawHandler}
                uid={request.uid}
                name={request.name}
                pic={request.pic}
                bio={request.bio}
                timestamp={request.requestId}
              />
            ))}
          {sortBtn === "label2" &&
            sentRequests.map((request) => (
              <InvitationSent
                key={request.requestId}
                withdrawHandler={withdrawHandler}
                uid={request.uid}
                name={request.name}
                pic={request.pic}
                bio={request.bio}
                timestamp={request.requestId}
              />
            ))}
        </div>
      )}
      <div className="w-[100%] flex flex-col h-auto bg-white mt-3 p-3 rounded-md">
        <p className="opacity-60 mb-3">People you may know</p>
        <div className="w-[100%] flex flex-row  flex-wrap justify-between transition-all">
          {allUsers.map((usr) => (
            <UserCard
              key={usr.uid}
              uid={usr.uid}
              wt={"220px"}
              ht={"290px"}
              name={usr.name}
              pic={usr.pic}
              banner={usr.banner}
              bio={usr.bio}
            />
          ))}
        </div>
      </div>
      <div className="w-[100%] bg-white p-3 mt-3 rounded-md flex-col items-center justify-center">
        {allPages.map((page) => (
          <FollowCard
            key={page.uid}
            uid={page.uid}
            name={page.name}
            pic={page.pic}
            banner={page.banner}
            bio={page.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default Network;
