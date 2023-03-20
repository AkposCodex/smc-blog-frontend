import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://prosperc40.pythonanywhere.com/',
    timeout: 6000,
    // headers: {
    //     "Content-Type": "FormData"
    // }
})

export { getAPI }
