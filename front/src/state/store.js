import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./user";

const store = configureStore({
  reducer: {
    user: reducerUser,
  },
});

export default store;
