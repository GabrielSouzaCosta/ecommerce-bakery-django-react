import { createSlice } from "@reduxjs/toolkit";

function getLocalStorageData() {
    let data = localStorage.getItem('cart')
    if ( data !== null) {
        return JSON.parse(data)
    } else {
        return []
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {orders: getLocalStorageData() },
    reducers: {
        addToCart: (state, action) => {
            let newData = [...state.orders, {product: action.payload.product, price: action.payload.price, quantity: action.payload.quantity}]
            localStorage.setItem('cart', JSON.stringify(newData));
            return {orders: newData }
        }
    }
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer