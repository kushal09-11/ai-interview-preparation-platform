import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
// To reduce the repetitive code like below we use axios.create() like above
// export async function register({ username, email, password}){

//     try{
//         const response = await axios.post('http://localhost:3000/api/auth/register', {
//             username, email, password
//         },{
//             withCredentials: true
//         })

//         return response.data
//     }
//     catch(err){
//         console.log(err)
//     }
// }
export async function register({ username, email, password}){

    try{
        const response = await api.post("/api/auth/register", {
            username, email, password
        })

        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function login({ email, password}){

    try{
        const response = await api.post("/api/auth/login",{
            email, password
        })

        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{

        const response = await api.get("/api/auth/logout") 

        return response.data
    }
    catch(err){

    }
}

export async function getMe(){
    try{
        const response = await api.get("/api/auth/get-me")

        return response.data
    }
    catch(err){
        console.log(err)
    }
}