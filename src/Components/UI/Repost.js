import React from 'react'
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import { dp } from './data';

const Repost = ({ logo, name, about, time,desc,Post }) => {
  return (
    <div>
        <PostHeader logo={logo} name={name} about={about} time={time} desc={desc}/>
        <PostBody Post={Post}/>
        <PostFooter profilePic={dp[0]}/>
    </div>
  )
}

export default Repost;