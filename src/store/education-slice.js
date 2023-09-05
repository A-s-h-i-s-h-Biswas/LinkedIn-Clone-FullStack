import { createSlice } from "@reduxjs/toolkit";

const initialState={
    title:null,
    about:null,
    timespan:null,
}

const educationSlice=createSlice({
    name:"education",
    initialState,
    reducers:{
        updateEducation:(state,action)=>{
            state.title=action.payload.title;
            state.about=action.payload.about;
            state.timespan=action.payload.timespan;
            return state;
        },
    }
});
export const educationAction=educationSlice.actions;
export default educationSlice.reducer;