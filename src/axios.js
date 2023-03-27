import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://smc-blog-backend.herokuapp.com/',

    // headers: {
    //     "Content-Type": "FormData"
    // }
})

export { getAPI }
