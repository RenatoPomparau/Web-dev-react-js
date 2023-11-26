import { useState, useEffect, useRef, useReducer } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/logins";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import notificationReducer, {
  displayNotification,
  cancelNotification,
} from "./reducers/notificationReducer";
import blogsReducer, {
  setBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import UserContext from "./reducers/userReducer";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Users from "./components/Users";

const Message = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div>{message}</div>;
};
const App = () => {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  //const [errorMessage, setErrorMessage] = useState(null); // replace this with redux
  // const [user, setUser] = useState(null);
  // const [blogs, setBlogs] = useState([]);
  const [user,userDispatch]=useContext(UserContext)
  const notification = useSelector((state) => state.notification);
  const blogs=useSelector((state=>state.blogs))
  const dispatch = useDispatch();

  const blogFormRef = useRef();
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch({
      type:"blogs/setBlogs",
      payload:blogs
    }))
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      console.log("auto-login");
      const user = JSON.parse(loggedUserJSON);
      userDispatch({type:'setUser',payload:user}) 
      // setUser(user)
      blogService.setToken(user.token);
    }
  }, []);
  const handleLikedButton = async (blog) => {

    const updateLikes = blog.likes + 1;
    const increaseLikesObject={...blog,likes:updateLikes}
    const response = await blogService.put(increaseLikesObject);
    dispatch({
      type:'blogs/likeBlog',
      payload:response
    })
    dispatch({
      type: "notification/displayNotification",
      payload: `You votes for ${blog.title} `,
    });
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.post({
        username,
        pass,
      });
      userDispatch({type:'setUser',payload:loggedUser}) 
      console.log(loggedUser);
      // const blogToDisplay=user.blogs
      // setBlogs(blogToDisplay)
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);

      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch({
        type: "notification/displayNotification",
        payload: "Wrong credentials",
      });
      setTimeout(() => {
        dispatch({ type: "notification/cancelNotification" });
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
    console.log("clicked");
  };

  const addBlog = async (newObj) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blogCreated = await blogService.post(newObj);

      dispatch({
        type:"blogs/createBlog",
        payload:blogCreated
      })
      if (blogCreated) {
        dispatch({
          type: "notification/displayNotification",
          payload: "It was added with success",
        });
        setTimeout(() => {
          dispatch({ type: "notification/cancelNotification" });
        }, 5000);
      }
    } catch (error) {
      // Handle the error, if any, from the blogService
      console.error("Error:", error);
      // You might want to set an error message here as well
      dispatch({
        type: "notification/displayNotification",
        payload: "An error occurred while adding the blog",
      });
    }
  };
  const padding = {
    padding: 5
  }

  return (
    // <CounterContext.Provider value={}
    <div>
      <Router>
        <div>
        <Link style={padding} to="/users">Users</Link>
        </div>
      
      <Routes>
      <Route path="/users" element={<Users />} />
      </Routes>
      </Router>
      <Message message={notification}></Message>
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          pass={pass}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        ></LoginForm>
      )}

      {user !== null && (
        <div>
          <h1>
            Logged in as {user.name}
            <br></br>
            <button onClick={handleLogout}>Logout</button>
          </h1>
          <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog}></BlogForm>
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              handleLikedButton={handleLikedButton}
              blog={blog}
              setBlogs={setBlogs}
              blogs={blogs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
