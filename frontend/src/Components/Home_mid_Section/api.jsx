import axios from "axios"

export const getdata = (query) =>{
    return axios.get(`http://localhost:8080/media?tags=${query}`)
}
