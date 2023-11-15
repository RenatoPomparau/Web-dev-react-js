import { useState,useEffect } from "react"
import blogService from '../services/blogs'
const Blog = ({ blog, handleLikedButton, setBlogs, blogs }) => {
  const [displayAll, setDisplayAll] = useState('short')
  const [currentUser,setCurrentUser]=useState(null)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      console.log("auto-login")
      console.log(JSON.parse(loggedUserJSON).name)
      setCurrentUser(JSON.parse(loggedUserJSON).name)
    }
  }, [])
  const handleDeleteButton = async (blog) => {
    confirm('Are you sure')
    const response = await blogService.remove(blog)
    setBlogs(blogs.filter(item => (item.id !== blog.id)))
  }

  const buttonDesign = {
    backgroundColor: 'red'
  }
  const onClickLike = () => {
    handleLikedButton(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => { setDisplayAll(displayAll === 'short' ? 'extend' : 'short') }}>show</button>
      <div>
        {displayAll === 'extend' &&
          <div>
            {blog.title} <br />
            {blog.author} <br />
            <div id="likeField">
              {blog.likes}
              <button  onClick={() => handleLikedButton(blog)}>like</button><br />
            </div>
            <div data-testid='urlField'>
              {blog.url} <br />
            </div>

            {blog.user.name} <br />
            {/* might be error */}

            {
           
              (currentUser && blog.user.name === currentUser) &&
              <div>
              <button id="deleteButton" style={buttonDesign} onClick={() => handleDeleteButton(blog)}>remove</button>
              </div>
            }

          </div>


        }
      </div>

    </div>
  )
}
export default Blog