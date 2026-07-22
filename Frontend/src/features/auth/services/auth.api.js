import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

function getErrorMessage(err, fallbackMessage) {
    return err?.response?.data?.message || err?.message || fallbackMessage;
}
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
        throw new Error(getErrorMessage(err, "Email already exists"))
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
        throw new Error(getErrorMessage(err, "Invalid email or password"))
    }
}

export async function logout(){
    try{

        const response = await api.get("/api/auth/logout") 

        return response.data
    }
    catch(err){
        throw new Error(getErrorMessage(err, "Unable to log out"))
    }
}

export async function getMe(){
    try{
        const response = await api.get("/api/auth/get-me")

        return response.data
    }
    catch(err){
        throw new Error(getErrorMessage(err, "Unable to fetch user"))
    }
}