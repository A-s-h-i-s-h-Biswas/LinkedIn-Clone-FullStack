import { createSlice } from "@reduxjs/toolkit";

const initialState={
    projects:[],
    count:0,
}

const projectSlice=createSlice({
    name:"project",
    initialState,
    reducers:{
        addProject:(state,action)=>{
            state.projects.push(action.payload);
            state.count++;
            return state;
        },
        addAllProject:(state,action)=>{
            state.projects=action.payload;
            state.count=action.payload.length;
            return state;
        },
    }
});
export const projectActions=projectSlice.actions;
export default projectSlice.reducer;