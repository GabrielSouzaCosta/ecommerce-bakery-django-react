import { createSlice } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {orders: []},
    reducers: {
        addToCart: (state, action) => {
            return {orders: [...state.orders, {product: action.payload.product, price: action.payload.price, quantity: action.payload.quantity} ]}
        }
    }
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer