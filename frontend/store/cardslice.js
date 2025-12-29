import { CreateSlice } from '@reduxjs/toolkit';
import { JsonWebTokenError } from 'jsonwebtoken';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cardsSlice = CreateSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(i => i.id !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        increaseQuantity: (state, action) => {
            const item = state .items.find(i => i.id === action.payload);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }                               
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cardsSlice.actions;
export default cardsSlice.reducer;  
