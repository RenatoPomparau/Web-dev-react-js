import { createSlice } from "@reduxjs/toolkit";
const initialState=[]
const blogsReducer= createSlice({
    name:"blogs",
    initialState,
    reducers:{
        setBlogs(state,action){
            return action.payload
        },
        createBlog(state,action){
            console.log(action.payload)
            return state.concat(action.payload)
        },
        likeBlog(state,action){
            const blogToChange=action.payload
            console.log(blogToChange)
            return state.map((blog) =>
            blog.id === blogToChange.id ? blogToChange : blog
          )
        },
        deleteBlog(state,action){
            return state.filter(blog=>blog.id!==action.payload.id)
        },

    }
})
export const { setBlogs, createBlog,likeBlog,deleteBlog } =
  blogsReducer.actions;
export default blogsReducer.reducer;
