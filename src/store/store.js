import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";
import experienceSlice from "./experience-slice";
import educationSlice from "./education-slice";
import projectSlice from "./project-slice";
import skillSlice from "./skill-slice";
import connectionSlice from "./connection-slice";
import notificationSlice from "./notification-slice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    experience: experienceSlice,
    education: educationSlice,
    project: projectSlice,
    skill: skillSlice,
    connection: connectionSlice,
    notification: notificationSlice,
  },
});
export default store;
