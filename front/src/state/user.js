import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = { id: null, name: null, email: null, lastName: null };

const reducerUser = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return action.payload;
  });
});

export default reducerUser;
