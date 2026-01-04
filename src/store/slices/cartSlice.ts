import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {CartItem} from '../../types.ts';

export  type CartState = {
    items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{ productId: string }>) {
            const item = state.items.find(i => i.productId === action.payload.productId);
            if (item) item.quantity += 1;
            else state.items.push({ productId: action.payload.productId, quantity: 1 });
        },
        changeQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
            const item = state.items.find(i => i.productId === action.payload.productId);
            if (item) item.quantity = action.payload.quantity;
            state.items = state.items.filter(i => i.quantity > 0);
        },
        removeFromCart(state, action: PayloadAction<{ productId: string }>) {
            state.items = state.items.filter(i => i.productId !== action.payload.productId);
        },
        clearCart(state) {
            state.items = [];
        }
    }
});

export const { addToCart, changeQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
