import { createSlice } from "@reduxjs/toolkit";

const initialState={
    uid:null,
    name:null,
    email:null,
    pic:null,
    banner:null,
    gender:null,
    bio:null,
    education:null,
    address:null,
    connections:0,
    followers:0,
    following:0,
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        updateProfile:(state,action)=>{
            // console.log(action.payload);
            state.pic=action.payload.pic;
            state.gender=action.payload.gender;
            state.banner=action.payload.banner;
            state.name=action.payload.name;
            state.uid=action.payload.uid;
            state.email=action.payload.email;
            state.bio=action.payload.bio;
            state.education=action.payload.education;
            state.address=action.payload.address;
            state.connections=action.payload.connections;
            state.followers=action.payload.followers;
            state.following=action.payload.following;
            return state;
        },
        changeBio:(state,action)=>{
            state.bio=action.payload;
            return state;
        },
        addConnection:(state,action)=>{
            state.connections+=action.payload;
            return state;
        },
        addFollower:(state)=>{
            state.followers++;
            return state;
        },
        addFollowing:(state)=>{
            state.following++;
            return state;
        },
        changeBanner:(state,action)=>{
            state.banner=action.payload;
            return state;
        },
        changePic:(state,action)=>{
            state.pic=action.payload;
            return state;
        },
    }
});
export const userAction=userSlice.actions;
export default userSlice.reducer;