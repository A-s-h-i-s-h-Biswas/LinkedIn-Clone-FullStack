import { useEffect, useState, useCallback } from "react";
import Header from "./Components/UI/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Network from "./Components/Pages/Network";
import Jobs from "./Components/Pages/Jobs";
import Message from "./Components/Pages/Message";
import Notification from "./Components/Pages/Notification";
import Footer from "./Components/UI/Footer";
import MyJobs from "./Components/Pages/MyJobs";
import MyProfile from "./Components/Pages/MyProfile";
import LogIn from "./Components/Pages/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth-slice";
import { Navigate } from "react-router-dom";
import { getAllChildData, getData } from "./firebase/firebase";
import { userAction } from "./store/user-slice";
import RemoteProfile from "./Components/Pages/RemoteProfile";
import NotFound from "./Components/Pages/NotFound";
import { connectionActions } from "./store/connection-slice";
import { educationAction } from "./store/education-slice";
import { experienceAction } from "./store/experience-slice";
import { skillAction } from "./store/skill-slice";
import { projectActions } from "./store/project-slice";
import { notificationActions } from "./store/notification-slice";
import ChatRoom from "./Components/Pages/ChatRoom";
import SkeletonLoader from "./Components/UI/Utils/SkeletonLoader";


function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  const setUserDataHandler = (payload) => {
    setUserInfo(payload);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUid(localStorage.getItem("uid"));
    if (uid) {
      dispatch(authAction.login({ token, uid }));
    }
  }, [dispatch, uid]);

  const isLogin = useSelector((state) => state.auth.isLogin);
  const {
    name,
    email,
    pic,
    banner,
    bio,
    gender,
    education,
    address,
    connections,
    followers,
    following,
  } = userInfo ?? {};

  useEffect(() => {
    // console.log("Im user Info");
    const getDataFromDB = async () => {
      if (uid) {
        await getData({
          key: "users",
          id: uid,
          setDataHandler: setUserDataHandler,
        });
        dispatch(
          userAction.updateProfile({
            uid,
            name,
            email,
            pic,
            banner,
            gender,
            bio,
            education,
            address,
            connections,
            followers,
            following,
          })
        );
      }
    };
    uid && getDataFromDB();
  }, [
    dispatch,
    uid,
    name,
    email,
    gender,
    pic,
    banner,
    bio,
    education,
    address,
    connections,
    followers,
    following,
  ]);

  const setConnectionHandler = useCallback(
    (payload) => {
      if (!payload || payload.length === 0) return;
      dispatch(connectionActions.addAllConnection(payload));
    },
    [dispatch]
  );
  const userId = useSelector((state) => state.user.uid);

  useEffect(() => {
    const fetchAllConnections = async () => {
      await getAllChildData({
        key: `users/${userId}/connectionList`,
        setDataHandler: setConnectionHandler,
      });
    };
    fetchAllConnections();
  }, [userId, setConnectionHandler]);

  const getEduCationData = useCallback(
    (payload) => {
      if (!payload) return;
      dispatch(educationAction.updateEducation(payload));
    },
    [dispatch]
  );

  const getExperienceData = useCallback(
    (payload) => {
      if (!payload) return;
      dispatch(experienceAction.updateExperience(payload));
    },
    [dispatch]
  );

  const getAllSkillsData = useCallback(
    (payload) => {
      if (!payload) return;
      dispatch(skillAction.addAllSkill(payload));
    },
    [dispatch]
  );

  const getAllPROJECTSData = useCallback(
    (payload) => {
      if (!payload) return;
      dispatch(projectActions.addAllProject(payload));
    },
    [dispatch]
  );

  const getAllNotificationsData = useCallback(
    (payload) => {
      if (!payload) return;
      dispatch(notificationActions.addAllNotification(payload));
    },
    [dispatch]
  );
  useEffect(() => {
    const fetch_Education_Exp_Skills_Projects = async () => {
      await getData({
        key: "education",
        id: userId,
        setDataHandler: getEduCationData,
      });
      await getData({
        key: "experience",
        id: userId,
        setDataHandler: getExperienceData,
      });
      await getAllChildData({
        key: `skills/${userId}`,
        setDataHandler: getAllSkillsData,
      });
      await getAllChildData({
        key: `projects/${userId}`,
        setDataHandler: getAllPROJECTSData,
      });
      await getAllChildData({
        key: `notifications/${userId}`,
        setDataHandler: getAllNotificationsData,
      });
    };
    fetch_Education_Exp_Skills_Projects();
  }, [
    userId,
    getEduCationData,
    getExperienceData,
    getAllSkillsData,
    getAllPROJECTSData,
    getAllNotificationsData,
  ]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  



  if (loading) return <SkeletonLoader />;
  return (
    <div className="bg-gray-200 w-full h-auto  flex flex-col items-center justify-center">
      {isLogin && <Header />}
      {isLogin && <div className="h-[70px]" />}
      <Routes>
        {/* {isLogin && <> */}
        <Route
          exact
          path="/"
          element={isLogin ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route
          exact
          path="/network"
          element={isLogin ? <Network /> : <Navigate replace to="/login" />}
        />

        <Route
          exact
          path="/jobs"
          element={isLogin ? <Jobs /> : <Navigate replace to="/login" />}
        />

        <Route
          exact
          path="/my-jobs"
          element={isLogin ? <MyJobs /> : <Navigate replace to="/login" />}
        />

        <Route
          exact
          path="/my-profile"
          element={isLogin ? <MyProfile /> : <Navigate replace to="/login" />}
        />

        <Route
          exact
          path="/messages"
          element={isLogin ? <Message /> : <Navigate replace to="/login" />}
        />
        <Route
          exact
          path="/chat-room/:uid"
          element={isLogin ? <ChatRoom /> : <Navigate replace to="/login" />}
        />

        <Route
          exact
          path="/my-profile/:uid"
          element={
            isLogin ? <RemoteProfile /> : <Navigate replace to="/login" />
          }
        />

        <Route
          exact
          path="/notifications"
          element={
            isLogin ? <Notification /> : <Navigate replace to="/login" />
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route
          exact
          path="/login"
          element={!isLogin ? <LogIn /> : <Navigate replace to="/" />}
        />
      </Routes>
      {!isLogin && (
        <Routes>
          <Route element={<Navigate replace to="/login" />} />
        </Routes>
      )}

      {isLogin && <Footer />}
    </div>
  );
}

export default App;
