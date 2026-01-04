import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {Product} from '../../types.ts';
import { v4 as uuidv4 } from 'uuid';

export type ProductsState = {
    items: Product[];
};

const sample: Product[] = [
    { id: uuidv4(), title: 'T-Shirt', price: 19.99, image: 'https://www.collinsdictionary.com/images/thumb/tshirt_204029461_250.jpg', ownerId: 'system' },
];

const initialState: ProductsState = { items: sample };

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<{ title: string; price: number; image: string; ownerId: string }>) {
            const { title, price, image, ownerId } = action.payload;
            state.items.push({ id: uuidv4(), title, price, image, ownerId });
        },
        editProduct(state, action: PayloadAction<Product>) {
            const idx = state.items.findIndex(p => p.id === action.payload.id);
            if (idx !== -1) state.items[idx] = action.payload;
        },
        deleteProduct(state, action: PayloadAction<{ id: string }>) {
            state.items = state.items.filter(p => p.id !== action.payload.id);
        }
    }
});

export const { addProduct, editProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
