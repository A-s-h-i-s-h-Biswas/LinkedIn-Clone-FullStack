import { createSlice } from "@reduxjs/toolkit";

const initialState={
   isActive:false,
   allNotifications:[],
   postNotification:[],
   unreadNotification:0,
}

const notificationSlice=createSlice({
    name:"notification",
    initialState,
    reducers:{
        addAllNotification:(state,action)=>{
            state.unreadNotification=0;
            state.allNotifications=action.payload;
            const mypost = action.payload.filter((itm) => {
                if (itm.read === false) state.unreadNotification++;
                return itm.content;
            });
            state.postNotification=mypost;
            state.isActive=false;
            return state;
        },
        reduceUnreanNotification:(state)=>{
            state.unreadNotification--;
            return state;
        },
        setActiveState:(state,action)=>{
            state.isActive=action.payload;
            return state;
        }

    }
});
export const notificationActions=notificationSlice.actions;
export default notificationSlice.reducer;