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
            // Check if item is already on cartSlice, if true, increment the quantity, if not add to cart normally
            let hasItem = state.orders.filter((item) => {
                if (item.product === action.payload.id) {
                    return item
                }
                return null
            })

            if (hasItem.length > 0) {
                let newData = [...state.orders];
                let index = newData.findIndex(item => {
                    return item.product === action.payload.id
                });
                let item = {...newData[index]}
                item.quantity += parseInt(action.payload.quantity);
                newData[index] = item
                localStorage.setItem('cart', JSON.stringify(newData));
                return {orders: newData };
            // else = product has not yet been added to cart
            } else {
                let newData = [...state.orders, {product: action.payload.id, name: action.payload.name, price: action.payload.price, quantity: parseInt(action.payload.quantity) }];
                localStorage.setItem('cart', JSON.stringify(newData));
                return {orders: newData };
            }
        },
        incrementQuantity: (state, action) => {
            let newData = [...state.orders];
            let index = newData.findIndex(item => {
                return item.product === action.payload.id
            });
            let item = {...newData[index]};
            item.quantity += parseInt(action.payload.quantity);
            newData[index] = item;
            
            localStorage.setItem('cart', JSON.stringify(newData));
            return {orders: newData};
        },
        clearCart: (state) => {
            localStorage.clear();
            return state;
        }
    }
})

export const { addToCart, incrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer