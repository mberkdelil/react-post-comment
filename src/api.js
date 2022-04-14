import axios from "axios"

export const api=()=>{
    return axios.create({
        baseURL:"https://react-yazi-yorum.herokuapp.com"
    })
}