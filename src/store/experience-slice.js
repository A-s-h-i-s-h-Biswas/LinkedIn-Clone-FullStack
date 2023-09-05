import { createSlice } from "@reduxjs/toolkit";

const initialState={
    title:null,
    about:null,
    timespan:null,
}

const experienceSlice=createSlice({
    name:"experience",
    initialState,
    reducers:{
        updateExperience:(state,action)=>{
            state.title=action.payload.title;
            state.about=action.payload.about;
            state.timespan=action.payload.timespan;
            return state;
        },
    }
});
export const experienceAction=experienceSlice.actions;
export default experienceSlice.reducer;