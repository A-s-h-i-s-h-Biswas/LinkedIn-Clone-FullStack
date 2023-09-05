import React from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

const Post = ({
  postData,
  repostData,
  repost,
  postId,
  ownerId,
  name,
  about,
  gender,
  logo,
  time,
  desc,
  img,
  vdo,
  docs,
  reactions,
  comments,
  reactionCount,
  repostCount,
  commentCount,
}) => {
  const content = {
    type: null,
    url: null,
  };
  if (img) {
    content.type = "img";
    content.url = img;
  } else if (vdo) {
    content.type = "video";
    content.url = vdo;
  } else if (docs) {
    content.type = "doc";
    content.url = docs;
  }

  return (
    <div className="w-[100%] pl-3 pr-3 h-auto   bg-white mt-2  flex flex-col rounded-md shadow-md shadow-gray-500/80">
      <PostHeader
        name={name}
        about={about}
        time={time}
        desc={desc}
        logo={logo}
        ownerId={ownerId}
        gender={gender}
      />
      {(content.type || repost) && (
        <div className="max-h-[500px] overflow-hidden">
          <PostBody repost={repost} repostData={repostData} content={content} />
        </div>
      )}
      <PostFooter
        postId={postId}
        ownerId={ownerId}
        myData={postData}
        reactions={reactions}
        comments={comments}
        reactionCount={reactionCount}
        commentCount={commentCount}
        repostCount={repostCount}
        profilePic={logo}
      />
    </div>
  );
};

export default Post;
