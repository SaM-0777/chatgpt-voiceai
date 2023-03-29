import { createSlice } from "@reduxjs/toolkit";


export const userResponceSlice = createSlice({
  name: 'user-message',
  initialState: {
    message: ""
  },
  reducers: {
    setMessage: function (state, action) {
      state.message = action.payload
    },
    deleteMessage: function (state, action) {
      state.message = ""
    }
  },
});


export const { setMessage, deleteMessage } = userResponceSlice.actions;
export const selectUserMessage = (state: { userResponceMessage: any }) => state.userResponceMessage
export default userResponceSlice.reducer;

