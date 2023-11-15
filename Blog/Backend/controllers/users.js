const bcrypt= require('bcrypt')
const usersRouter= require('express').Router()
const User=require('../models/user')
require('express-async-errors')
usersRouter.post('/', async(request,response)=>{
   
    const {username, name, password}=request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
   if(password.length<3)
   {
    return response.status(400).json({error: 'password is too short'})
   }
   console.log('backend api post')
    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser= await user.save()
    console.log('user created')
    response.status(201).json(savedUser)
     
})

usersRouter.get('/',async(request,response)=>
{
    const users = await User.find({}).populate('blogs')

    response.status(200).json(users)
})
module.exports=usersRouter