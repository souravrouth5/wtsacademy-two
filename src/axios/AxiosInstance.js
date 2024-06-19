import axios from 'axios'

export const REACT_APP_BASEURL = 'https://wtsacademy.dedicateddevelopers.us/api/'

export const AxiosInstance = axios.create({
    baseURL: REACT_APP_BASEURL
})

AxiosInstance.interceptors.request.use(
    async function (config){
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if(token !== null || token !== undefined){
            config.headers['x-access-token'] = token
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)