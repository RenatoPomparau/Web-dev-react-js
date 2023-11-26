import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogFormReducer from "../reducers/blogFormReducer";
const BlogForm = ({ addBlog }) => {
  const dispatch=useDispatch()


  const title= useSelector((state)=>state.blogForm.title)
  const author= useSelector((state)=>state.blogForm.author)
  const url= useSelector((state)=>state.blogForm.url)

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    const newObj = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    };
    addBlog(newObj);
    dispatch({
      type:'blogForm/setAll',
      action:newObj
    })

  };
  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        title:
        <input
          id="input-title"
          type="text"
          value={title}
          onChange={({ target }) => { dispatch({
            type:'blogForm/setTitle',
            payload:target.value
          })
          }}
        ></input>
        <br />
      </div>
      <div>
        author:
        <input
          id="input-author"
          type="text"
          value={author}
          onChange={({ target }) => { dispatch({
            type:'blogForm/setAuthor',
            payload:target.value
          })
          }}
        ></input>
        <br />
      </div>
      <div>
        url:
        <input
          id="input-url"
          type="text"
          value={url}
          onChange={({ target }) => { dispatch({
            type:'blogForm/setUrl',
            payload:target.value
          })
          }}
        ></input>
        <br />
      </div>

      <button type="submit">Post</button>
    </form>
  );
};

export default BlogForm;
