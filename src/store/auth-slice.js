import { createSlice } from "@reduxjs/toolkit";

const initialState={
    uid:null,
    token:null,
    email:null,
    isLogin:false,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            // console.log(action.payload);
            state.isLogin=true;
            state.uid=action.payload.uid;
            state.token=action.payload.token;
            state.email=action.payload.email;
            return state;
        },
        logout:(state)=>{
            state.isLogin=false;
            state.uid=null;
            state.token=null;
            state.email=null;
            return state;
        }
    }
});
export const authAction=authSlice.actions;
export default authSlice.reducer;