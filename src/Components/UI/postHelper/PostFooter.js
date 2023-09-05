import React, { Fragment, useState } from "react";
import funny from "../../../Assets/funny-icon.svg";
import like from "../../../Assets/like-icon.svg";
import celebrate from "../../../Assets/celebrate.svg";
import heart from "../../../Assets/heart-icon.svg";
import support from "../../../Assets/support.svg";
import CommentCard from "./CommentCard";
import {
  addComment,
  addRepost,
  toggleReaction,
  writeData,
} from "../../../firebase/firebase";
import { useSelector } from "react-redux";
import { GET_READABLE_TIME, SEND_NOTIFICATION } from "../Utils/data";
import ToggleDisplay from "../Utils/ToggleDisplay";
import { RWebShare } from "react-web-share";
// import repost from "../../Assets/repost.svg";
// import { serverTimestamp } from "firebase/database";

export const ImgData = ({ icon, bg, last }) => {
  return (
    <img
      className={`w-[18px] h-[18px] rounded-full ${
        last ? "" : "-mr-1"
      }  ${bg} transition-all`}
      src={icon}
      alt=""
    />
  );
};
export const ImgIcon = ({ icon, onClick }) => {
  return (
    <img
      onClick={onClick}
      className="w-[32px] h-[32px] transition-all hover:scale-150 hover:-translate-y-3"
      src={icon}
      alt=""
    />
  );
};
const SortComments = (comments) => {
  // console.log(comments);
  const sortedComments = [];
  Object.keys(comments)
    .sort((a, b) => b - a)
    .forEach((childKey) => {
      const timestamp = GET_READABLE_TIME(childKey);
      comments[childKey].timestamp = timestamp;
      // console.log(timestamp);
      sortedComments.push(comments[childKey]);
    });
  return sortedComments;
};
const SentNotification = ({ user, myData, ownerId, status }) => {
  const content = {
    title: myData.desc,
    file: myData.img || myData.vdo || myData.doc || null,
    type: myData.img
      ? "img"
      : myData.vdo
      ? "vdo"
      : myData.doc
      ? "doc"
      : "others",
  };
  SEND_NOTIFICATION({ sender: user, receiverId: ownerId, status, content });
};

const PostFooter = ({
  postId,
  ownerId,
  profilePic,
  reactions,
  reactionCount,
  comments,
  commentCount,
  repostCount,
  myData,
}) => {
  const [postReaction, setPostReaction] = useState(false);
  const [showLess, setShowLess] = useState(true);
  const user = useSelector((state) => state.user);
  const [countRepost, setCountRepost] = useState(repostCount);

  const allComments = comments ? SortComments(comments) : [];

  const [validComment, setValidComment] = useState(false);
  const [inputComment, setInputComment] = useState();
  const [comment, setComment] = useState(false);
  const [commentData, setCommentData] = useState(allComments);
  const [countComment, setCountComment] = useState(commentCount);

  const myReaction = reactions ? reactions[user.uid] : null;

  const [reaction, setReaction] = useState(myReaction);
  const [countReaction, setReactionCount] = useState(reactionCount);

  const showLessHandler = () => {
    setShowLess((prev) => !prev);
  };
  const setRepostHandler = (payload) => {
    setCountRepost(payload);
    // -------------Send Notification to Owner---------------
    const status = ` reposted your posted. View ${user.name}'s profile`;
    SentNotification({ ownerId, myData, user, payload, status });
  };
  const repostHandler = async () => {
    // send post data to database
    const newpostId = Date.now();
    const postData = {
      postId: newpostId,
      ownerId: user.uid,
      ownerName: user.name,
      ownerPic: user.pic,
      ownerBio: user.bio,
      gender: user.gender,
      timestamp: newpostId,
      // need to take desc input
      desc: `REPOSTED by ${user.name}`,
      repostData: myData,
      repost: true,
      reactionCount: 0,
      commentCount: 0,
      repostCount: 0,
      reactions: [],
      comments: [],
    };
    const updatedRepost = await addRepost({
      uid: user.uid,
      key: `${ownerId}/${postId}`,
      setRepostHandler,
    });
    console.log(updatedRepost);
    writeData({
      key: "posts",
      id: `${user.uid}/${newpostId}`,
      payload: postData,
    });
    window.location.reload();
  };
  const setReactionHandler = (payload) => {
    // console.log("im called: ", payload);
    setReactionCount(payload.count);
    setReaction(payload.value);
    // ----------send notification to owner of the post --------------
    if (payload.value) {
      const status = ` reacted(${payload.value.text}) on your post.`;
      SentNotification({ ownerId, myData, user, payload, status });
    }
  };
  const changeInputHandler = (e) => {
    setInputComment(e.target.value);
    if (e.target.value) setValidComment(true);
    else setValidComment(false);
  };
  const setCommentHandler = (payload) => {
    if (!payload) return;
    // console.log("im called: ", payload);
    setCountComment(payload.count);
    const sortedComments = SortComments(payload.value);
    setCommentData(sortedComments);
    //  ----------------Send Notification to owner----------------
    const status = ` commented on your post.`;
    SentNotification({ ownerId, myData, user, payload, status });
  };
  const submitCommentHandler = async () => {
    if (!validComment) return;
    // Send data to database
    const value = {
      uid: user.uid,
      name: user.name,
      pic: user.pic,
      timestamp: Date.now(),
      msg: inputComment,
    };
    const updatedComment = await addComment({
      uid: user.uid,
      key: `${ownerId}/${postId}`,
      value,
      setCommentHandler,
    });
    console.log(updatedComment);
    setValidComment(false);
    setInputComment("");
  };
  const toggleReactionHandler = async (payload) => {
    // start ->>>>>>> call ToggleReaction from database to update Reaction
    const updatedPost = await toggleReaction({
      uid: user.uid,
      key: `${ownerId}/${postId}`,
      value: payload,
      setReactionHandler,
    });
    console.log(updatedPost);
    // end ->>>>>>> call ToggleReaction from database to update Reaction
  };
  const commentHandler = () => {
    setComment((prev) => !prev);
  };
  const postReactionOpen = () => {
    setPostReaction(true);
  };
  const postReactionClose = () => {
    setPostReaction(false);
  };
  return (
    <Fragment>
      <div className="w-[100%] h-[100px] bg-white flex items-center justify-center flex-col">
        <div className="w-[100%] h-[40%] flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="flex  overflow-hidden
          "
            >
              <ImgData icon={like} bg={"bg-sky-400"} />
              <ImgData icon={celebrate} bg={"bg-green-400"} />
              <ImgData icon={support} bg={"bg-gray-400"} />
              <ImgData icon={heart} bg={"bg-rose-400"} />
              <ImgData icon={funny} bg={"bg-cyan-400"} last={true} />
            </div>
            <div className="flex items-center justify-center pl-2">
              <p className="text-[14px] opacity-80 ">{countReaction}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="flex items-center justify-center text-[14px] opacity-80">
              {countComment} comments
              <div className="w-[3px] h-[3px] opacity-80 flex items-center justify-center mt-1 ml-1 mr-1 bg-black rounded-full"></div>{" "}
              {countRepost} repost
            </p>
          </div>
        </div>
        <div className="w-[100%] h-[.1px] opacity-50 bg-gray-400 flex items-center justify-center" />
        <div className="w-[100%] h-[60%] flex items-center justify-between">
          <div
            onMouseOverCapture={postReactionOpen}
            onMouseOutCapture={postReactionClose}
            className=" relative flex items-center gap-1 cursor-pointer h-[80%] pl-2 pr-2 hover:rounded-md hover:bg-gray-200"
          >
            {!reaction ? (
              <svg
                onClick={() =>
                  toggleReactionHandler({ logo: like, text: "Like" })
                }
                className={`stroke-gray-500 fill-white`}
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill=""
                stroke="1.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  stroke="1"
                  clip-rule="evenodd"
                  d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z"
                  // fill="#ffff"
                />
              </svg>
            ) : (
              <img
                onClick={() =>
                  toggleReactionHandler({
                    logo: reaction.logo,
                    text: reaction.text,
                  })
                }
                className="w-[32px] h-[32px]"
                src={reaction.logo}
                alt=""
              />
            )}
            {postReaction && (
              <div
                onMouseOverCapture={postReactionOpen}
                onMouseOutCapture={postReactionClose}
                className={`absolute -top-[40px]  left-0 p-[5px] rounded-md bg-white w-[200px] shadow-md shadow-gray-500/100 flex items-center justify-between`}
              >
                <ImgIcon
                  icon={like}
                  onClick={() =>
                    toggleReactionHandler({ logo: like, text: "Like" })
                  }
                />

                <ImgIcon
                  icon={celebrate}
                  onClick={() =>
                    toggleReactionHandler({
                      logo: celebrate,
                      text: "Celebrate",
                    })
                  }
                />

                <ImgIcon
                  icon={support}
                  onClick={() =>
                    toggleReactionHandler({ logo: support, text: "Support" })
                  }
                />

                <ImgIcon
                  icon={heart}
                  onClick={() =>
                    toggleReactionHandler({ logo: heart, text: "Heart" })
                  }
                />

                <ImgIcon
                  icon={funny}
                  onClick={() =>
                    toggleReactionHandler({ logo: funny, text: "Funny" })
                  }
                />
              </div>
            )}
            <p className="opacity-90">{reaction?.text ?? "Like"}</p>
          </div>
          <div
            onClick={commentHandler}
            className="flex items-center gap-1 cursor-pointer h-[80%] pl-2 pr-2 hover:rounded-md hover:bg-gray-200"
          >
            <svg
              className="stroke-gray-500"
              width="32px"
              height="32px"
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.5 12.9543C5.51239 14.0398 5.95555 15.076 6.73197 15.8348C7.50838 16.5936 8.55445 17.0128 9.64 17.0003H11.646C12.1915 17.0007 12.7131 17.224 13.09 17.6183L14.159 18.7363C14.3281 18.9076 14.5588 19.004 14.7995 19.004C15.0402 19.004 15.2709 18.9076 15.44 18.7363L17.1 17.0003L17.645 16.3923C17.7454 16.2833 17.8548 16.1829 17.972 16.0923C18.9349 15.3354 19.4979 14.179 19.5 12.9543V8.04428C19.4731 5.7845 17.6198 3.97417 15.36 4.00028H9.64C7.38021 3.97417 5.5269 5.7845 5.5 8.04428V12.9543Z"
                // stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.5 10.5002C7.5 9.94796 7.94772 9.50024 8.5 9.50024C9.05228 9.50024 9.5 9.94796 9.5 10.5002C9.5 11.0525 9.05228 11.5002 8.5 11.5002C8.23478 11.5002 7.98043 11.3949 7.79289 11.2074C7.60536 11.0198 7.5 10.7655 7.5 10.5002Z"
                // stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.5 10.5002C11.5 9.94796 11.9477 9.50024 12.5 9.50024C13.0523 9.50024 13.5 9.94796 13.5 10.5002C13.5 11.0525 13.0523 11.5002 12.5 11.5002C11.9477 11.5002 11.5 11.0525 11.5 10.5002Z"
                // stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.5 10.5002C15.5 9.94796 15.9477 9.50024 16.5 9.50024C17.0523 9.50024 17.5 9.94796 17.5 10.5002C17.5 11.0525 17.0523 11.5002 16.5 11.5002C15.9477 11.5002 15.5 11.0525 15.5 10.5002Z"
                // stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="opacity-90">Comment</p>
          </div>
          <div
            onClick={repostHandler}
            className="flex items-center gap-1 cursor-pointer h-[80%] pl-2 pr-2 hover:rounded-md hover:bg-gray-200"
          >
            <svg
              className="stroke-gray-500"
              // fill="#000000"
              stroke="1.5"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              id="retweet"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
              class="icon flat-line"
            >
              <path
                opacity=".5"
                d="M14,6H4A1,1,0,0,0,3,7V17a1"
                // style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
              ></path>
              <path
                opacity=".5"
                d="M10,18H20a1,1,0,0,0,1-1V7a"
                // style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
              ></path>
            </svg>
            <p className="opacity-90">Repost</p>
          </div>
          {/* <div className="flex items-center gap-1 cursor-pointer h-[80%] pl-2 pr-2 hover:rounded-md hover:bg-gray-200">
            <svg
              className="stroke-gray-500"
              width="30px"
              height="30px"
              viewBox="0 0 192 192"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                // stroke="#000000"
                stroke-width="12"
                d="M23.073 88.132s65.458-26.782 88.16-36.212c8.702-3.772 38.215-15.843 38.215-15.843s13.621-5.28 12.486 7.544c-.379 5.281-3.406 23.764-6.433 43.756-4.54 28.291-9.459 59.221-9.459 59.221s-.756 8.676-7.188 10.185c-6.433 1.509-17.027-5.281-18.919-6.79-1.513-1.132-28.377-18.106-38.214-26.404-2.649-2.263-5.676-6.79.378-12.071 13.621-12.447 29.891-27.913 39.728-37.72 4.54-4.527 9.081-15.089-9.837-2.264-26.864 18.483-53.35 35.835-53.35 35.835s-6.053 3.772-17.404.377c-11.351-3.395-24.594-7.921-24.594-7.921s-9.08-5.659 6.433-11.693Z"
              />
            </svg>
            <p className="opacity-90">share</p>
          </div> */}
          {/* Share code */}
          <RWebShare
            data={{
              text: "Web Share - GfG",
              url: "http://localhost:3000",
              title: "Select to share",
            }}
          >
            <button className="flex items-center gap-1 cursor-pointer h-[80%] pl-2 pr-2 hover:rounded-md hover:bg-gray-200">
              <div className="flex items-center gap-1 cursor-pointer h-[80%] pl-2 pr-2 hover:rounded-md hover:bg-gray-200">
                <svg
                  className="stroke-gray-500"
                  width="28px"
                  height="28px"
                  viewBox="0 0 192 192"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    // stroke="#000000"
                    stroke-width="12"
                    d="M23.073 88.132s65.458-26.782 88.16-36.212c8.702-3.772 38.215-15.843 38.215-15.843s13.621-5.28 12.486 7.544c-.379 5.281-3.406 23.764-6.433 43.756-4.54 28.291-9.459 59.221-9.459 59.221s-.756 8.676-7.188 10.185c-6.433 1.509-17.027-5.281-18.919-6.79-1.513-1.132-28.377-18.106-38.214-26.404-2.649-2.263-5.676-6.79.378-12.071 13.621-12.447 29.891-27.913 39.728-37.72 4.54-4.527 9.081-15.089-9.837-2.264-26.864 18.483-53.35 35.835-53.35 35.835s-6.053 3.772-17.404.377c-11.351-3.395-24.594-7.921-24.594-7.921s-9.08-5.659 6.433-11.693Z"
                  />
                </svg>
                <p className="opacity-90">share</p>
              </div>
            </button>
          </RWebShare>
        </div>
      </div>
      {comment && (
        <div className="flex flex-col h-auto pb-3">
          <div className="pt-3 pb-1">
            <div className="w-[100%]  flex items-center">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <img
                  className="w-[100%] h-[100%] object-cover "
                  src={user.pic}
                  alt=""
                />
              </div>
              <div className="h-[40px] w-[calc(80%)] ml-5 border-stone-400 border-[2px] rounded-3xl overflow-hidden">
                <input
                  className=" h-[100%] w-[100%] outline-none text-md pl-3 pr-3"
                  placeholder="Add a comment"
                  value={inputComment}
                  onChange={changeInputHandler}
                />
              </div>
              {validComment && (
                <div className="pl-1">
                  <button
                    onClick={submitCommentHandler}
                    className="w-[60px] h-[38px] border-[1.5px] border-blue-600 rounded-3xl  hover:bg-blue-600"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
          {commentData.length > 0 && (
            <div className="w-[100%] bg-gray-200 pb-2 rounded-md flex flex-col items-center justify-center h-auto overflow-hidden">
              {commentData.map((data, indx) => {
                if (showLess && indx > 2) return <></>;
                return (
                  <CommentCard
                    key={indx}
                    profileName={data.name}
                    profilePic={data.pic}
                    comment={data.msg}
                    timestamp={data.timestamp}
                  />
                );
              })}
              {commentData.length > 3 && (
                <ToggleDisplay
                  state={showLess}
                  stateChanger={showLessHandler}
                  label={"comments"}
                />
              )}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default PostFooter;
