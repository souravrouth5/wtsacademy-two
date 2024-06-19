import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosInstance } from "../axios/AxiosInstance"
import { toast } from "react-toastify";

export const createProduct = async (payload) => {
    try {
        const res = await AxiosInstance.post(`product/create`, payload)
        console.log(res?.data);
        if (res?.data?.status === 200) {
            toast.success(res?.data?.message)
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

export const removeProduct = async (id) => {
    try {
        const res = await AxiosInstance.post(`product/remove`, {id})
        console.log(res?.data);
        if (res?.data?.status === 200) {
            toast.success(res?.data?.message)
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

export const updateProduct = async (payload) => {
    try {
        const res = await AxiosInstance.post(`product/update`, payload)
        console.log(res?.data);
        if(res?.data?.status === 200) {
            toast.success(res?.data?.message)
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

export const fetchSingleProduct = createAsyncThunk('fetchSingleProduct', async (id, { rejectWithValue }) => {
    try {
        const res = await AxiosInstance.get(`product/detail/${id}`)
        console.log(res?.data);
        return res?.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data)
    }
})

// export const fetchSingleProduct = async (id) => {
//         try {
//             const res = await AxiosInstance.get(`product/detail/${id}`)
//             console.log(res?.data);
//             return res?.data
//         } catch (error) {
//             console.log(error);
//             return error?.response?.data
//         }
// }

export const fetchProductsList = createAsyncThunk('fetchProductsList', async (payload, { rejectWithValue }) => {
    try {
        const res = await AxiosInstance.post('product/list', payload)
        console.log(res?.data);
        return res?.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data)
    }
})


export const Productsslice = createSlice({
    name: 'Productsslice',
    initialState: {
        status: 'idle',
        allProductsResponse: [],
        signleProductResponse: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProductsList.fulfilled, (state, action) => {
                state.status = 'success'
                state.allProductsResponse = action.payload
            })
            .addCase(fetchProductsList.rejected, (state, action) => {
                state.status = 'rejected'
                state.allProductsResponse = action.payload
            })

            .addCase(fetchSingleProduct.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.status = 'success'
                state.signleProductResponse = action.payload
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.status = 'rejected'
                state.signleProductResponse = action.payload
            })
    }
})