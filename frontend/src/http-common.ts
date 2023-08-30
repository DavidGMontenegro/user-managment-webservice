import axios from 'axios'

const ENDPOINT_PATH = "http://localhost:2809"

export default axios.create({
    baseURL: ENDPOINT_PATH,
    headers: {
        'Content-type': 'application/json'
    }
})