import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isConnected:false,
    connections:[],
    count:0,
}

const connectionSlice=createSlice({
    name:"connection",
    initialState,
    reducers:{
        addAllConnection:(state,action)=>{
            state.connections=action.payload;
            state.count=action.payload?.length;
            return state;
        },
        addConnection:(state,action)=>{
            state.connections.push(action.payload);
            state.count++;
            return state;
        },
        isConnectedWith:(state,action)=>{
            if(state.count===0){
                state.isConnected=false;
                return state;
            }
            const isfound=state.connections.find(st=>st.uid === action.payload);
            if(isfound)state.isConnected=true;
            else state.isConnected= false;
            // console.log(action.payload, " ---> ", state.isConnected);
            return state;
        },
        removeConnection:(state,action)=>{
            state.connections=state.connections.filter(connection=> connection.id !== action.payload);
            state.count--;
            return state;
        },
    }
});
export const connectionActions=connectionSlice.actions;
export default connectionSlice.reducer;