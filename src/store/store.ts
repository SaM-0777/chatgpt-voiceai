import { configureStore } from "@reduxjs/toolkit";

import userMessageSlice from "./userMessageSlice";


export default configureStore({
  reducer: userMessageSlice,
  
});

