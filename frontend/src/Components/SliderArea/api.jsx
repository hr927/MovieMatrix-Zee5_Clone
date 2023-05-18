import axios from "axios"

export const getdata = (query) =>{
    return axios.get(`https://bronze-salamander-cuff.cyclic.app/media?tags=${query}`)
}
export const getgenredata = (query) =>{
    return axios.get(`https://bronze-salamander-cuff.cyclic.app/media?genre=${query}`)
}
export const getTagsMediaTypedata = (query1,query2) =>{
    return axios.get(`https://bronze-salamander-cuff.cyclic.app/media?tags=${query1}&mediaType=${query2}`)
}
export const getgenreMediaTypedata = (query1,query2) =>{
    return axios.get(`https://bronze-salamander-cuff.cyclic.app/media?genre=${query1}&mediaType=${query2}`)
}