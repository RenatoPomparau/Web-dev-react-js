import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    cancelNotification(state, action) {
      return initialState;
    },
  },
});

export const { cancelNotification, displayNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
