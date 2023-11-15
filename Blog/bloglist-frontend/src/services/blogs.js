import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token= null
const setToken= newToken =>{
  token=`Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const post= async request=>{
  const config = {
    headers: { Authorization: token },
  }

  const response=await axios.post(baseUrl,request,config)
  console.log(response.data)
  return response.data
}
const put= async request=>{
  const response= await axios.put(baseUrl+`/${request.id}`, request)
  console.log(response.data)
  return response.data
}
const remove = async (request)=>{
  const config = {
    headers: { Authorization: token },
  }
  const reponse= await axios.delete(baseUrl+`/${request.id}`,config)
}

export default { 
  getAll,
  setToken,
  post,
  put,
  remove,
 }