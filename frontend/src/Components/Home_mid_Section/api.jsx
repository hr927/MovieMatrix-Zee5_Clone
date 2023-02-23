import axios from "axios"

export const getdata = () =>{
    return axios.get(`http://localhost:8080/media?tags=Trending`)
}
