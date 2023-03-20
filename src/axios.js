import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://prosperc40.pythonanywhere.com/',

    // headers: {
    //     "Content-Type": "FormData"
    // }
})

export { getAPI }
