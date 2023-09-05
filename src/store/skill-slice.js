import { createSlice } from "@reduxjs/toolkit";

const initialState={
    skills:[],
    count:0,
}

const skillSlice=createSlice({
    name:"skill",
    initialState,
    reducers:{
        addSkill:(state,action)=>{
            state.skills.push(action.payload);
            state.count++;
            return state;
        },
        addAllSkill:(state,action)=>{
            state.skills=action.payload
            state.count=action.payload.length;
            return state;
        },
    }
});
export const skillAction=skillSlice.actions;
export default skillSlice.reducer;