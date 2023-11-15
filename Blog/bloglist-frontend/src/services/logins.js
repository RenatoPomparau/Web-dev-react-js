import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const post= async credentials=>
{
    const response= await axios.post(baseUrl, credentials)
    console.log(response.data)
    return response.data
}
export default {
    post
}
