import React from "react";
import Post from "./Post";

const PostBody = ({ repost = false, content, repostData }) => {
  // console.log("content: ", content);
  const isImg = content.type === "img";
  const isDoc = content.type === "doc";
  // console.log(repostData);
  return (
    <div className="w-[100%]  h-[100%]  mt-3 rounded-sm overflow-hidden">
      {!repost ? (
        isImg ? (
          <img
            className="w-[100%] h-[100%] object-cover"
            src={content.url}
            alt=""
          />
        ) : isDoc ? (
          <iframe
            title={Math.random()}
            className="w-[100%] h-[500px] object-cover"
            src={content.url}
            frameborder="0"
          />
        ) : (
          <iframe
            title={Math.random()}
            className="w-[100%] h-[400px] object-cover"
            src={content.url}
            frameborder="0"
          />
        )
      ) : (
        <Post
          key={repostData?.timestamppostData}
          postId={repostData?.postId}
          ownerId={repostData?.ownerId}
          name={repostData?.ownerName}
          about={repostData?.ownerBio}
          logo={repostData?.ownerPic}
          time={repostData?.timestamp}
          desc={repostData?.desc}
          img={repostData?.img}
          vdo={repostData?.vdo}
          docs={repostData?.doc}
          reactionCount={repostData?.reactionCount}
          commentCount={repostData?.commentCount}
          repostCount={repostData?.repostCount}
          comments={repostData?.comments}
          reactions={repostData?.reactions}
        />
      )}
    </div>
  );
};

export default PostBody;
