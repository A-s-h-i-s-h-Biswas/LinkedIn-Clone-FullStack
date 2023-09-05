import React, { useState, useEffect, useCallback } from "react";
import JobCard from "./JobCard";
import { getAllChildData } from "../../../firebase/firebase";
import { GET_READABLE_TIME } from "../Utils/data";
import { useSelector } from "react-redux";
import SkeletonLoader from "../Utils/SkeletonLoader";
// const appliedJobs = [
//   {
//     id: 1,
//     img: "https://media.licdn.com/dms/image/C4D0BAQGoBqTRWTZ9_g/company-logo_100_100/0/1634119781021?e=1700697600&v=beta&t=jQFsx1Q-VYiedLSvP-Peppb8OlhBNWNYNC98OUyPn5E",
//     title: "Software Engineer",
//     company: "inxigo",
//     desc: "Gurugram, Haryana, India (Hybrid)",
//     timestamp: "2 hours ago",
//   },

//   {
//     id: 3,
//     img: "https://media.licdn.com/dms/image/D4D0BAQHLcJYw1tSh5g/company-logo_100_100/0/1687172095584?e=1700697600&v=beta&t=KuOlQt6mFrDtchf0QOpWgSuPQagNJrpyirH0q44Ny-E",
//     title: "SDET Mobile",
//     company: "Shaadi.com",
//     desc: "Mubmi, Maharastra, India (On-site)",
//     timestamp: "5 hours ago",
//   },
//   {
//     id: 4,
//     img: "https://media.licdn.com/dms/image/D560BAQGEU0_PAp08RQ/company-logo_100_100/0/1684425910323?e=1700697600&v=beta&t=hbtwqhrSFjOJ7DOLAzG8CqBy7O1DG7ugMbsbPGboXhY",
//     title: "Software Engineer",
//     company: "GE Aerospace",
//     desc: "Bengaluru, Karnataka, India (Romote)",
//     timestamp: "3 hours ago",
//   },
//   {
//     id: 2,
//     img: "https://media.licdn.com/dms/image/D4D0BAQH2K9hYyTEyQg/company-logo_100_100/0/1692191281006?e=1700697600&v=beta&t=8ULM3Pv2IPx99CrA1gzS5ULqsc8dK-eYOK9iQGLpzO0",
//     title: "Full Stack Developer",
//     company: "Pionto",
//     desc: "Kolkata, WB, India (Hybrid)",
//     timestamp: "10 hours ago",
//   },
// ];
// const archivedJobs = [
//   {
//     id: 1,
//     img: "https://media.licdn.com/dms/image/C4D0BAQGoBqTRWTZ9_g/company-logo_100_100/0/1634119781021?e=1700697600&v=beta&t=jQFsx1Q-VYiedLSvP-Peppb8OlhBNWNYNC98OUyPn5E",
//     title: "Software Engineer",
//     company: "inxigo",
//     desc: "Gurugram, Haryana, India (Hybrid)",
//     timestamp: "2 hours ago",
//   },

//   {
//     id: 3,
//     img: "https://media.licdn.com/dms/image/D4D0BAQHLcJYw1tSh5g/company-logo_100_100/0/1687172095584?e=1700697600&v=beta&t=KuOlQt6mFrDtchf0QOpWgSuPQagNJrpyirH0q44Ny-E",
//     title: "SDET Mobile",
//     company: "Shaadi.com",
//     desc: "Mubmi, Maharastra, India (On-site)",
//     timestamp: "5 hours ago",
//   },
//   {
//     id: 4,
//     img: "https://media.licdn.com/dms/image/D560BAQGEU0_PAp08RQ/company-logo_100_100/0/1684425910323?e=1700697600&v=beta&t=hbtwqhrSFjOJ7DOLAzG8CqBy7O1DG7ugMbsbPGboXhY",
//     title: "Software Engineer",
//     company: "GE Aerospace",
//     desc: "Bengaluru, Karnataka, India (Romote)",
//     timestamp: "3 hours ago",
//   },
//   {
//     id: 2,
//     img: "https://media.licdn.com/dms/image/D4D0BAQH2K9hYyTEyQg/company-logo_100_100/0/1692191281006?e=1700697600&v=beta&t=8ULM3Pv2IPx99CrA1gzS5ULqsc8dK-eYOK9iQGLpzO0",
//     title: "Full Stack Developer",
//     company: "Pionto",
//     desc: "Kolkata, WB, India (Hybrid)",
//     timestamp: "10 hours ago",
//   },
// ];
const JobContainer = ({
  title,
  type,
  post,
  text,
  bookmark,
  label1,
  label2,
}) => {
  const [sortBtn, setSortBtn] = useState("label1");
  const [allJobs, setAllJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [archivedJobs, setArchivedJobs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const uid = useSelector((state) => state.user.uid);

  const setAllJobHandler = useCallback((payload) => {
    const sortedJobs=payload.sort((a,b)=>b.timestamp-a.timestamp);
    setAllJobs(sortedJobs);
  }, []);
  const setMyJobHandler = useCallback((payload) => {
    let arch = [];
    let ids = [];
    const applied = payload.filter((itm) => {
      ids.push(itm.id);
      const time = GET_READABLE_TIME(itm.timestamp);
      const valid = !time.includes("month" || "months" || "year" || "years");
      if (!valid) itm.status = "No longer accepting applications";
      arch.push(itm);
      return valid;
    });
    setArchivedJobs(arch);
    setAppliedJobIds(ids);
    setAppliedJobs(applied);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchAllJobs = async () => {
      await getAllChildData({ key: "jobs", setDataHandler: setAllJobHandler });
      await getAllChildData({
        key: `myjobs/${uid}`,
        setDataHandler: setMyJobHandler,
      });
    };
    fetchAllJobs();
  }, [setAllJobHandler, setMyJobHandler, uid]);

  const sortBtnHandler = (payload) => {
    setSortBtn(payload);
  };
  if (isLoading) return <SkeletonLoader />;
  return (
    <div className="w-[100%] bg-white mt-2 pl-3 pt-2 pr-3 flex flex-col rounded-md">
      <h3 className="font-bold opacity-70 text-xl">{title}</h3>
      {text && <p className="text-[14px] opacity-70">{text}</p>}
      {label1 && (
        <div className="flex items-center mt-1 h-[40px]">
          <div
            onClick={() => sortBtnHandler("label1")}
            className={`w-[80px] h-[80%] flex items-center justify-center rounded-3xl border-2 ${
              sortBtn === "label1" ? "bg-green-600" : ""
            } cursor-pointer mr-3 `}
          >
            <p className={` font-bold text-[14px] opacity-70 `}>{label1}</p>
          </div>
          <div
            onClick={() => sortBtnHandler("label2")}
            className={`w-[80px] h-[80%] flex items-center justify-center rounded-3xl border-2 ${
              sortBtn === "label2" ? "bg-green-600" : ""
            } cursor-pointer`}
          >
            <p className={` font-bold text-[14px] opacity-70 `}>{label2}</p>
          </div>
        </div>
      )}
      {type === "job" ? (
        <div className="pb-3">
          {sortBtn === "label1"
            ? appliedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  img={job.logo}
                  company={job.company}
                  desc={job.desc}
                  status={job.status}
                  timestamp={job.timestamp}
                  // bookmark={bookmark}
                />
              ))
            : archivedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  img={job.logo}
                  company={job.company}
                  desc={job.desc}
                  // timestamp={job.timestamp}
                  status={job.status}
                  // bookmark={bookmark}
                />
              ))}
        </div>
      ) : type === "all" ? (
        allJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            uid={uid}
            appliedJobIds={appliedJobIds}
            title={job.title}
            img={job.logo}
            company={job.company}
            desc={job.desc}
            timestamp={job.timestamp}
            status={"No longer accepting applications"}
            bookmark={bookmark}
          />
        ))
      ) : (
        <div className="h-[200px] flex items-center justify-center">
          <p className="font-bold opacity-30">Empty</p>
        </div>
      )}
    </div>
  );
};

export default JobContainer;
