import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookmarkOutline from "../../Assets/bookmark-outlined.svg";
import bookmark from "../../Assets/bookmark-filled.svg";
import alert from "../../Assets/notify-f.svg";
import skill from "../../Assets/skill-assessment.svg";
import resume from "../../Assets/resume-builder.svg";
import setting from "../../Assets/setting.svg";
import post from "../../Assets/job-create.svg";
import guidence from "../../Assets/video-icon.svg";
import interview from "../../Assets/interview.svg";
import down from "../../Assets/down-arrow.svg";
import Line from "../UI/Utils/Line";
import JobContainer from "../UI/JobHelper/JobContainer";
import CreateJob from "../UI/MyProfileEdit/CreateJob";
const MoreItem = ({ icon, text, onClick }) => {
  return (
    <div
      onClick={() => onClick(true)}
      className="w-[100%] h-[40px] flex items-center cursor-pointer "
    >
      <img className="w-[30px] h-[30px] object-cover" src={icon} alt="" />
      <p className="font-bold opacity-70 text-[15px] pl-2">{text}</p>
    </div>
  );
};
const Jobs = () => {
  const [openMore, setopenMore] = useState(false);
  const [openJobCreater, setOpenJobCreater] = useState(false);
  // const [isLoading, setIsloading]=useState(true);

  const navigate = useNavigate();

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setIsloading(false)
  //   },1000);

  // },[]);

  const openCreateJobHandler = (payload) => {
    closeMoreModal();
    setOpenJobCreater(payload);
  };
  const goToMyJobs = () => {
    navigate("/my-jobs");
  };
  const moreClickHandler = () => {
    setopenMore((prev) => !prev);
  };
  const closeMoreModal = () => {
    setopenMore(false);
  };
  // if(isLoading) return <div className="w-[100%] h-screen flex items-center justify-center"> <p>Loading...</p></div>
  return openJobCreater ? (
    <CreateJob openEdit={() => openCreateJobHandler(false)} />
  ) : (
    <div div className="w-[100%] h-auto  max-w-[550px]">
      <div className="w-[100%] h-[60px] relative bg-white mt-[2px] p-3 flex items-center justify-between rounded-md">
        <div
          onClick={goToMyJobs}
          className="w-[95px] h-[30px] flex items-center justify-between cursor-pointer"
        >
          <img
            className="w-[30px] h-[30px] object-cover"
            src={bookmark}
            alt=""
          />
          <p className="font-bold opacity-70 text-[15px]">My jobs</p>
        </div>
        <div
          onClick={moreClickHandler}
          className="h-[100%] flex items-center justify-center cursor-pointer rounded-md hover:bg-gray-200  w-[80px]"
        >
          <button className="font-bold opacity-60 pr-1 ">More</button>
          <img
            className="w-[12px] h-[12px] pt-1 object-cover"
            src={down}
            alt=""
          />
        </div>
        {openMore && (
          <div
            onMouseLeave={closeMoreModal}
            className="absolute top-[60px] right-2 z-10 flex flex-col p-3 bg-white shadow-sm shadow-gray-900/80 w-[220px] h-[320px] rounded-md"
          >
            <MoreItem icon={alert} text={"Job alert"} />
            <MoreItem icon={skill} text={"Skill Assessments"} />
            <MoreItem icon={interview} text={"Interview prep"} />
            <MoreItem icon={resume} text={"Resume Builder"} />
            <MoreItem icon={guidence} text={"Job seeker guidence"} />
            <MoreItem icon={setting} text={"Application settings"} />
            <Line />
            <MoreItem
              icon={post}
              onClick={openCreateJobHandler}
              text={"Post a free job"}
            />
          </div>
        )}
      </div>
      <JobContainer
        type={"all"}
        bookmark={bookmarkOutline}
        title={"Recommended for you"}
        text={"Based on your profile and search history"}
      />
    </div>
  );
};

export default Jobs;
