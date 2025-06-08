import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
  name: "active",
  initialState: {
    isActive: null,
  },
  reducers: {
    activeCase: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { activeCase } = activeSlice.actions;
export default activeSlice.reducer;
