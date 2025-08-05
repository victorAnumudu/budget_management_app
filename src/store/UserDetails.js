import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
};

export const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.userDetails = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
