import React, { useState } from "react";
import { useSelector } from "react-redux";
import photo from "../../../Assets/img-icon.svg";
import viodeo from "../../../Assets/video-icon.svg";
import docs from "../../../Assets/article.svg";
import { UploadFile, writeData } from "../../../firebase/firebase";
import { serverTimestamp } from "firebase/database";
import ImgLoader from "../Utils/ImgLoader";
import VideoLoader from "../../UI/Utils/VideoLoader";
import DocLoader from "../../UI/Utils/DocLoader";
const PostModal = ({postModalHandler}) => {
  const [inputText, setInputText] = useState(false);
  const [fileType, setFileType]=useState();
  const [imgfile,setimgFile]=useState(null);
  const [videofile,setvideoFile]=useState(null);
  const [docfile,setdocFile]=useState(null);
  const [valid, setValid]=useState(false);
  const user = useSelector((state) => state.user);

  const setImgFile=(payload)=>{
    setimgFile(payload);
    setValid(true);
  }
  const setVideoFile=(payload)=>{
    setvideoFile(payload);
    setValid(true);
  }
  const setDocFile=(payload)=>{
    setdocFile(payload);
    setValid(true);
  }
  const onFileChange=async(e,payload)=>{
    setimgFile(null);
    setdocFile(null);
    setvideoFile(null);
    setValid(false);
    setFileType(payload)
    const setUrlHandler = payload === "img"? setImgFile : (payload === "video"? setVideoFile:setDocFile);
    await UploadFile({file:e.target.files[0], id: user.uid, setUrlHandler})
  }
  console.log(user.gender);
  const onInputChange=(e)=>{
    const value=e.target.value?.trim();
    setInputText(value);
    if(value) setValid(true);
    else{
      setValid(false);
    }
  }
  const postHandler=()=>{
    if(!valid)return;
    const postId=Date.now();
    const postData={
      postId,
      ownerId:user.uid,
      ownerName:user.name,
      ownerPic:user.pic,
      ownerBio:user.bio,
      gender:user.gender ?? null,
      timestamp:serverTimestamp(),
      desc:inputText,
      // content:file,
      img:imgfile?? null,
      vdo:videofile ?? null,
      doc:docfile ?? null,
      reactionCount:0,
      commentCount:0,
      repostCount:0,
      comments:[],
      reactions:[]
    }
    // send post data to database
    writeData({key:"posts", id:`${user.uid}/${postId}`, payload:postData});
    window.location.reload();
    // postModalHandler(false);
  }
 
  return  (
    <div className="relative w-[100%] h-[100%] ">
      <div
        onClick={()=>postModalHandler(false)}
        className="w-[100%] h-[100%] overflow-hidden z-20 fixed top-0 left-0 bg-[rgba(0,0,0,.75)]"
      />
      <div className="absolute w-[380px] h-[580px] p-10 flex flex-col justify-between rounded-md overflow-hidden max-w-[450px] z-40 bg-white top-1 left-[calc(50%-190px)] ">
        <div className="flex  items-center ">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
            <img
              className="w-[100%] h-[100%] object-cover"
              src={user.pic}
              alt=""
            />
          </div>
          <div className="flex flex-col pl-2">
            <h1 className="text-[18px] font-bold opacity-70">{user.name}</h1>
            <p className="text-[14px] font-bold opacity-50">Post to Anyone</p>
          </div>
        </div>
        <div className="h-[80%] mt-5">
          <textarea
            className="text-black w-[100%] h-[80px] text-lg outline-none"
             maxLength="150"
             onChange={onInputChange}
             rows="8"
            placeholder="What do you want to talk about?"
          />
          {(imgfile || videofile || docfile) ? <div className="w-[100%] h-[300px] rounded-md overflow-hidden">
            {imgfile && <img className="w-[100%] h-[100%] object-cover" src={imgfile} alt=""/> }
            {docfile && <iframe title={Math.random()} className="w-[100%] h-[100%] object-cover" src={docfile} alt=""/> }
            {videofile && <video className="w-[100%] h-[100%] object-cover" src={videofile} muted />}
          </div>: fileType && (fileType === "img" ? <ImgLoader/> : (fileType === "video" ? <VideoLoader/> : <DocLoader/>))
          }
        </div>
        <div className={`w-[${valid? "100%" : "60%"}] mt-5 mb-2 flex items-center justify-between`}>
          <button  className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <img
              className="w-[20px] h-[20px] absolute object-cover"
              src={photo}
              alt=""
            />
            <input onChange={(e)=>onFileChange(e,"img")} className="bg-none z-10 cursor-pointer" style={{"width":"100px", "height":"150px"}} type="file"/>
          </button>
          <button className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <img
              className="w-[20px] h-[20px] absolute object-cover"
              src={viodeo}
              alt=""
            />
            <input onChange={(e)=>onFileChange(e,"video")} className="bg-none z-10 cursor-pointer" style={{"width":"100px", "height":"150px"}} type="file"/>
          </button>
          <button className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <img
              className="w-[20px] h-[20px] absolute object-cover"
              src={docs}
              alt=""
            />
            <input onChange={(e)=>onFileChange(e, "doc")} className="bg-none z-10 cursor-pointer" style={{"width":"100px", "height":"150px"}} type="file"/>
          </button>
          {valid && <button onClick={postHandler} className=" bg-blue-600 ml-8 text-white font-bold font-mono w-[80px] h-[40px] rounded-3xl">Post</button>}
        </div>
      </div>
    </div>
  ) ;
}

export default PostModal;
