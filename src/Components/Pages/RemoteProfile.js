import React, { useState, useEffect } from "react";
import YourProfile from "../UI/ProfileHelper/YourProfile";
import Analytics from "../UI/ProfileHelper/Analytics";
import ProfileCard from "../UI/ProfileHelper/ProfileCard";
import Skills from "../UI/ProfileHelper/Skills";
import Projects from "../UI/ProfileHelper/Projects";
import building from "../../Assets/buildings.svg";
import { useParams, useNavigate } from "react-router-dom";
import { getAllChildData, getData } from "../../firebase/firebase";
import { useCallback } from "react";
import { useSelector } from "react-redux";
// import {connectionActions} from "../../store/connection-slice";
import SkeletonLoader from "../UI/Utils/SkeletonLoader";
const college =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx-PSpOutH_0cFU2I7mrEZNMxGoatf4o7BqA&usqp=CAU";

const RemoteProfile = () => {
  const [remoteUser, setRemoteUser] = useState({});
  const [remoteUserExp, setRemoteUserExp] = useState({});
  const [remoteUserEdu, setRemoteUserEdu] = useState({});
  const [remoteUserprojects, setRemoteUserProjects] = useState([]);
  const [remoteUserSkills, setRemoteUserSkills] = useState([]);
  const [connectionStatus, setConStatus] = useState("Get connected");
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const params = useParams().uid;
  // const dispatch=useDispatch();
  const user = useSelector((state) => state.user);
  const list = useSelector((state) => state.connection.connections);

  useEffect(() => {
    const isFound = list.filter((itm) => itm.uid === params);
    if (isFound) setIsConnected(true);
    // console.log("#######################");
  }, [params, list]);
  const setRemoteUserHandler = useCallback(
    (payload) => {
      if (!payload) {
        navigate("/notfound");
      }
      setRemoteUser(payload);
    },
    [navigate]
  );

  const setRemoteUserExpHandler = useCallback((payload) => {
    setRemoteUserExp(payload);
  }, []);
  const setRemoteUserEduHandler = useCallback((payload) => {
    setRemoteUserEdu(payload);
  }, []);
  const setRemoteUserProjectsHandler = useCallback((payload) => {
    setRemoteUserProjects(payload);
  }, []);
  const setRemoteUserSkillsHandler = useCallback((payload) => {
    setRemoteUserSkills(payload);
  }, []);
  const setConnectedStatus = useCallback((payload) => {
    // console.log(payload);
    if (!payload) return;
    setConStatus("Connection pending");
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchRemoteUser = async () => {
      await getData({
        key: "users",
        id: params,
        setDataHandler: setRemoteUserHandler,
      });
      await getData({
        key: "education",
        id: params,
        setDataHandler: setRemoteUserEduHandler,
      });
      await getData({
        key: "education",
        id: params,
        setDataHandler: setRemoteUserEduHandler,
      });
      await getData({
        key: `postRequest/${user.uid}`,
        id: params,
        setDataHandler: setConnectedStatus,
      });
      await getAllChildData({
        key: `projects/${params}`,
        setDataHandler: setRemoteUserProjectsHandler,
      });
      await getAllChildData({
        key: `skills/${params}`,
        setDataHandler: setRemoteUserSkillsHandler,
      });
    };
    params && fetchRemoteUser();
  }, [
    params,
    user.uid,
    setRemoteUserHandler,
    setRemoteUserEduHandler,
    setRemoteUserExpHandler,
    setRemoteUserProjectsHandler,
    setRemoteUserSkillsHandler,
    setConnectedStatus,
  ]);

  // console.log(list);
  if (loading) return <SkeletonLoader />;
  return (
    <div className="flex flex-col w-[100%] h-auto max-w-[550px]">
      <YourProfile
        edit={false}
        uid={remoteUser.uid}
        pic={remoteUser.pic}
        bio={remoteUser.bio}
        name={remoteUser.name}
        isConnected={isConnected}
        banner={remoteUser.banner}
        addrs={remoteUser.address}
        education={remoteUser.education}
        connections={remoteUser.connections}
        connectionStatus={connectionStatus}
        sender={user}
        receiver={remoteUser}
      />
      <Analytics />
      <ProfileCard
        edit={false}
        heading={"Experience"}
        title={remoteUserExp?.title}
        logo={building}
        text={remoteUserExp?.about}
        timestamp={remoteUserExp?.timespan}
      />
      <ProfileCard
        edit={false}
        heading={"Education"}
        title={remoteUserEdu?.title}
        logo={college}
        text={remoteUserEdu?.about}
        timestamp={remoteUserEdu?.timespan}
      />
      <Projects edit={false} allProjects={remoteUserprojects} />
      <Skills edit={false} allSkills={remoteUserSkills} />
    </div>
  );
};

export default RemoteProfile;
