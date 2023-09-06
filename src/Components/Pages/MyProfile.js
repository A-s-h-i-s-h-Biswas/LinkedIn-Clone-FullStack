import React, { useState } from "react";
import YourProfile from "../UI/ProfileHelper/YourProfile";
import Analytics from "../UI/ProfileHelper/Analytics";
import ProfileCard from "../UI/ProfileHelper/ProfileCard";
import Skills from "../UI/ProfileHelper/Skills";
import Projects from "../UI/ProfileHelper/Projects";
import building from "../../Assets/buildings.svg";
import EditProfile from "../UI/MyProfileEdit/EditProfile";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileEdit from "../UI/MyProfileEdit/ProfileEdit";
import ExpOrEdu from "../UI/MyProfileEdit/ExpOrEdu";
import AddProject from "../UI/MyProfileEdit/AddProject";
import AddSkill from "../UI/MyProfileEdit/AddSkill";
// import ModalContainer from "../UI/ModalContainer";
// import { getData } from "../../firebase/firebase";

const college =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx-PSpOutH_0cFU2I7mrEZNMxGoatf4o7BqA&usqp=CAU";

const MyProfile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [editEdu, setEditEdu] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [addSkill, setAddSkill] = useState(false);

  const allProjects = useSelector((state) => state.project.projects);
  const allSkills = useSelector((state) => state.skill.skills);

  const setOpenHandler = () => {
    setOpenEdit((prev) => !prev);
  };
  const setEditExpHandler = () => {
    setEditExp((prev) => !prev);
  };
  const setEditEduHandler = () => {
    setEditEdu((prev) => !prev);
  };
  const projectHandler = () => {
    setAddProject((prev) => !prev);
  };
  const skillHandler = () => {
    setAddSkill((prev) => !prev);
  };

  const location = useLocation().search;
  const userInfo = useSelector((state) => state.user);
  const education = useSelector((state) => state.education);
  const experience = useSelector((state) => state.experience);
  // console.log(useLocation());

  let component = (
    <div className="flex flex-col w-[100%] h-auto max-w-[550px]">
      <YourProfile
        openEdit={setOpenHandler}
        name={userInfo.name}
        pic={userInfo.pic}
        banner={userInfo.banner}
        bio={userInfo.bio}
        addrs={userInfo.address}
        education={userInfo.education}
        connections={userInfo.connections}
      />
      <Analytics />
      <ProfileCard
        openEdit={setEditExpHandler}
        heading={"Experience"}
        title={experience?.title}
        logo={building}
        text={experience?.about}
        timestamp={experience?.timespan}
      />
      <ProfileCard
        openEdit={setEditEduHandler}
        heading={"Education"}
        logo={college}
        title={education?.title}
        text={education?.about}
        timestamp={education?.timespan}
      />
      <Projects openEdit={projectHandler} allProjects={allProjects} />
      <Skills openEdit={skillHandler} allSkills={allSkills} />
    </div>
  );

  if (location === "?newuser=true") {
    component = <EditProfile />;
  } else if (openEdit) {
    component = <ProfileEdit openEdit={setOpenHandler} />;
  } else if (editExp) {
    component = <ExpOrEdu label={"Experience"} openEdit={setEditExpHandler} />;
  } else if (editEdu) {
    component = <ExpOrEdu label={"Education"} openEdit={setEditEduHandler} />;
  } else if (addProject) {
    component = <AddProject openEdit={projectHandler} />;
  } else if (addSkill) {
    component = <AddSkill openEdit={skillHandler} />;
  }

  return component;
};

export default MyProfile;
