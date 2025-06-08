import { createSlice } from "@reduxjs/toolkit";
const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: null,
    followingTweets: null,
    refresh: false,
    isActive: true,
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    getFollowingTweets: (state, action) => {
      state.followingTweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
export const { getAllTweets, getRefresh, getIsActive,getFollowingTweets } = tweetSlice.actions;
export default tweetSlice.reducer;
