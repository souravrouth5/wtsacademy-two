import { configureStore } from "@reduxjs/toolkit";
import { Authslice } from "../Authslice";
import { Productsslice } from "../Productsslice";

export const Store = configureStore({
    reducer: {
        auth: Authslice.reducer,
        products: Productsslice.reducer,
        
    }
})