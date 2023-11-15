const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// test('notes are returned as json', async () => {
  
//   const response = await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   expect(response.body).toHaveLength(2)
 
// })

// test('check if id is defined', async ()=>{
//   const response= await api.get('/api/blogs')
//   expect(response.body[0].id).toBeDefined()
// })

// test('check if i can post', async ()=>{
//   const previousSize=  (await api.get('/api/blogs')).body.length
//   console.log(previousSize)
//   const response=  await api.post('/api/blogs').send({    
//     title: "String",
//     author: "String",
//     url: "String",
//     likes: 100})
//     console.log(response.data)
//     const actualSize=  await (await api.get('/api/blogs'))

//    expect(actualSize.body).toHaveLength(previousSize+1)
//  // expect(response.body[0].id).toBeDefined()
// })
test('check if i can delete', async ()=>{
  const previousSize=  (await api.get('/api/blogs')).body.length
  const blogs=await api.get('/api/blogs')
  console.log(blogs.body[0].id)
  const response=  await api.delete(`/api/blogs/${blogs.body[0].id}`)

  const actualSize=   await api.get('/api/blogs')

  expect(actualSize.body).toHaveLength(previousSize-1)
 // expect(response.body[0].id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})