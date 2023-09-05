import React, { useState, useEffect } from "react";
import Profile from "../UI/ProfileHelper/Profile";
import CreatePost from "../UI/postHelper/CreatePost";
import Post from "../UI/postHelper/Post";
import PostModal from "../UI/postHelper/postModal";
import { getAllData } from "../../firebase/firebase";
import SkeletonLoader from "../UI/Utils/SkeletonLoader";

const Home = () => {
  const [postmodal, setPostmodal] = useState();
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const postDataHandlerA = (payload) => {
    const sortedPosts = payload.sort((a, b) => b.timestamp - a.timestamp);
    setPostData(sortedPosts);
  };

  const postModalHandler = (payload) => {
    if (!payload) {
      document.body.style.overflow = "unset";
    } else if (payload) {
      console.log("here");
      document.body.style.overflow = "hidden";
    }
    setPostmodal(payload);
  };
  // fetch all the posts here for every load
  useEffect(() => {
    const getDataFromDB = async () => {
      await getAllData({ key: "posts", setDataHandler: postDataHandlerA });
    };
    getDataFromDB();
  }, []);

  return loading ? (
    <SkeletonLoader />
  ) : (
    <div className="w-[100%] max-w-[550px]">
      {postmodal && <PostModal postModalHandler={postModalHandler} />}
      <Profile />
      <CreatePost postModalHandler={postModalHandler} />
      {postData.map((post, indx) => (
        <Post
          key={indx}
          postId={post.postId}
          ownerId={post.ownerId}
          name={post.ownerName}
          about={post.ownerBio}
          logo={post.ownerPic}
          gender={post.gender}
          time={post.timestamp}
          desc={post.desc}
          img={post.img}
          vdo={post.vdo}
          docs={post.doc}
          reactionCount={post.reactionCount}
          commentCount={post.commentCount}
          repostCount={post.repostCount}
          comments={post.comments}
          reactions={post.reactions}
          postData={post}
          repostData={post.repostData}
          repost={post.repost}
        />
      ))}
    </div>
  );
};

export default Home;
