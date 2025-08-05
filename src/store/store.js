import { configureStore } from "@reduxjs/toolkit";

import userDetailReducer from "./UserDetails";

export default configureStore({
  reducer: {
    userDetails: userDetailReducer,
  },
});
