import axios from "axios"

export const getdata = (query) =>{
    return axios.get(`http://localhost:8080/media?tags=${query}`)
}
export const getgenredata = (query) =>{
    return axios.get(`http://localhost:8080/media?genre=${query}`)
}
export const getTagsMediaTypedata = (query1,query2) =>{
    return axios.get(`http://localhost:8080/media?tags=${query1}&mediaType=${query2}`)
}
export const getgenreMediaTypedata = (query1,query2) =>{
    return axios.get(`http://localhost:8080/media?genre=${query1}&mediaType=${query2}`)
}