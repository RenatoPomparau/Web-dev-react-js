import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialState= {
    title: "",
    author: "",
    url: "",
  }
// Create a slice for blog post data
const blogPostSlice = createSlice({
  name: "blogForm",
initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setAuthor(state, action) {
      state.author = action.payload;
    },
    setUrl(state, action) {
      state.url = action.payload;
    },
    setAll(state, action) {
      state.title = '';
      state.author = '';
      state.url = '';
    },
    // Additional reducers for other operations on this data could go here
  },
});

export const { setTitle, setAuthor, setUrl } = blogPostSlice.actions;
export default blogPostSlice.reducer;
