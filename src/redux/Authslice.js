import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from "../axios/AxiosInstance"
import { toast } from 'react-toastify';


export const userRegister = async (payload) => {
    try {
        const res = await AxiosInstance.post(`user/signup`, payload)
        console.log(res?.data);
        if(res?.data?.status === 200){
            toast.success(res?.data?.message)
            window.location.href = '/login'
        } else {
            toast.error(res?.data?.message)
        }
        return res?.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        return error?.response?.data
        
    }
}

export const userLogin = createAsyncThunk('userLogin', async(payload, { rejectWithValue }) => {
    try {
        const res = await AxiosInstance.post(`user/signin`, payload)
        console.log(res?.data);
        if(res?.data?.status === 200){
            toast.success(res?.data?.message)
            window.location.href = '/products'
        } else {
            toast.error(res?.data?.message)
        }
        return res?.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error?.response?.data)

    }
})

export const Authslice = createSlice({
    name: 'Authslice',
    initialState: {
        status: 'idle',
        loginResponse: [],
        isLoggedIn: false
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            if (localStorage.getItem('token') || localStorage.getItem('user')){
                toast.error('something went wrong')
                state.isLoggedIn = true
            } else {
                toast.success('Logged out successfully')
                state.isLoggedIn = false
            }
        },
        checkToken: (state) => {
            const token = localStorage.getItem('token')
            if(token){
                state.isLoggedIn = true
            } else {
                state.isLoggedIn = false
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'success'
                state.loginResponse = action.payload
                if(action.payload?.status === 200){
                    state.isLoggedIn = true
                    localStorage.setItem('token', action.payload?.token)
                    localStorage.setItem('user', JSON.stringify(action.payload?.data))
                }
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'rejected'
                state.loginResponse = action.payload
            })
    }
})

export const {logout, checkToken} = Authslice.actions