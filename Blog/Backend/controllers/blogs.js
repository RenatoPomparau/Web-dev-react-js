const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)

})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  console.log(request.body)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
 // console.log('user id ', user.id)
 
  const blogData = { ...request.body, user: user }

  const blog = new Blog(blogData)
  const savedNBlog = await blog.save()
  user.blogs = user.blogs.concat(savedNBlog.id)
  await user.save()
  response.status(201).json(savedNBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blogToDelete=await Blog.findById(request.params.id)
  if(!blogToDelete)
  { return response.status(401).json({ error: 'there is no such id' })

  }
  if( decodedToken.id.toString()===blogToDelete.user.toString())
{
    console.log("Deleted")
    const deletedBlog= await Blog.findByIdAndRemove(request.params.id)
    const UserId=deletedBlog.user
    await Blog.findByIdAndDelete(UserId,{
      $pull:{blogs:deletedBlog.id},
    })
    response.status(204).end()
}
else{
  return response.status(401).json({ error: 'token invalid, you are not allowed to delete' })
}
})
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body 

  const user = await User.findById(body.user.id)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  }
 
  const updatedBlog= await Blog.findByIdAndUpdate(body.id, blog, { new: true })
  response.status(201).json(updatedBlog) 
})

module.exports = blogsRouter