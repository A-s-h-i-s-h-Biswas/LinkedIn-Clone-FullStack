import React from "react";
import UserCard from "./UserCard";
const FollowCard = ({ name, pic, banner, bio }) => {
  return (
    <UserCard
      wt={"100%"}
      ht={"250px"}
      label={"Follow"}
      follow={true}
      name={name}
      pic={pic}
      banner={banner}
      bio={bio}
    />
  );
};

export default FollowCard;
