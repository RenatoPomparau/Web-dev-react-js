import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
const Message = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div>
      {message}
    </div>
  )
}
const App = () => {
  
  const [username, setUsername] = useState('')
  const [pass, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
const [blogs,setBlogs]=useState([])
  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      console.log("auto-login")
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLikedButton = async (blog) => {
    const increaseLikesObject = blog
    increaseLikesObject.likes = increaseLikesObject.likes + 1
    console.log(blog)
    const response = await blogService.put(increaseLikesObject)
    setBlogs(blogs.map(blog => (blog.id === increaseLikesObject.id ? increaseLikesObject : blog)))
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.post({
        username,
        pass
      })
      setUser(loggedUser)
      console.log(loggedUser)
      // const blogToDisplay=user.blogs
      // setBlogs(blogToDisplay)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)


      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
    console.log('clicked')
  }

  const addBlog= async (newObj) =>{
    blogFormRef.current.toggleVisibility()
    try {
      const blogCreated = await blogService.post(newObj)
      
      setBlogs(blogs.concat(blogCreated))

      if (blogCreated) {
        setErrorMessage('It was added with success');

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
    catch (error) {
      // Handle the error, if any, from the blogService
      console.error("Error:", error);
      // You might want to set an error message here as well
      setErrorMessage('An error occurred while adding the blog');
    }
  }
 


  return (
    <div>


      <Message message={errorMessage}></Message>
      {user === null &&
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          pass={pass}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        >

        </LoginForm>

      }

      {user !== null &&
        <div>
          <h1>
            Logged in as {user.name}
            <br></br>
            <button onClick={handleLogout}>
              Logout
            </button>
          </h1>
          <Togglable buttonLabel='add blog' ref={blogFormRef}>
            <BlogForm
              addBlog={addBlog}
       
              

                >
            </BlogForm>
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id}  handleLikedButton={handleLikedButton} blog={blog} setBlogs={setBlogs} blogs={blogs}/>
          
          )}
        </div>
      }
    </div>
  )

}

export default App