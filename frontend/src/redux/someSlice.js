import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  val: 0,
};

const createSlice = {
  name: "counter",
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      state.val += 1;
      
    },
    decreaseCount: (state, action) => {
      state.val -= 1;
    },
  },
};

export const { increaseCount, decreaseCount } = createSlice.action;
export default createSlice.reducers;
