import {useState} from 'react'
const BlogForm = ({addBlog}) => {

        const [title, setTitle] = useState('')
        const [author, setAuthor] = useState('')
        const [url, setUrl] = useState('')
    const handleBlogSubmit = async (event) => {
        event.preventDefault()
       
        const newObj = {
            title: title,
            author: author,
            url: url,
            likes: 0
          }
          addBlog(newObj)
          setAuthor('')
          setUrl('')
          setTitle('')
       
      }
    return (
        <form onSubmit={handleBlogSubmit}>
            <div>
                title:
                <input
                id='input-title'
                    type='text'
                    value={title}
                    onChange={({ target }) => { setTitle(target.value) }}
                ></input>
                <br />
            </div>
            <div>
                author:
                <input id='input-author' type='text'
                    value={author}
                    onChange={({ target }) => { setAuthor(target.value) }}>
                </input>
                <br />
            </div>
            <div>
                url:
                <input id='input-url' type='text'
                    value={url}
                    onChange={({ target }) => { setUrl(target.value) }}>
                </input>
                <br />
            </div>

            <button type='submit'>Post</button>
        </form>
    )
}

export default BlogForm