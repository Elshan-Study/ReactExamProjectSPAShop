import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {Product} from '../../types.ts';
import { v4 as uuidv4 } from 'uuid';

export type ProductsState = {
    items: Product[];
};

const sample: Product[] = [
    {
        id: uuidv4(),
        title: 'Minimalist T-Shirt',
        price: 19.99,
        image: 'https://www.collinsdictionary.com/images/thumb/tshirt_204029461_250.jpg',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Wireless Headphones',
        price: 89.99,
        image: 'https://m.media-amazon.com/images/I/61RahTQtAqL._AC_UF894,1000_QL80_.jpg',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Mechanical Keyboard',
        price: 129.99,
        image: 'https://cdn.thewirecutter.com/wp-content/media/2025/12/BEST-MECHANICAL-KEYBOARDS-2048px-EVOWORKS-80-926.jpg?auto=webp&quality=75&width=1024',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Retro Game Controller',
        price: 34.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR10xCvC10Q--ggmlUafuVmBU4FYKIyEsACjw&s',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Smart LED Lamp',
        price: 49.99,
        image: 'https://xlyne.de/wp-content/uploads/2023/06/XCOAST_E27_LED_Leuchte_570467_1-3.jpg',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Reusable Water Bottle',
        price: 24.99,
        image: 'https://tappwater.co/cdn/shop/articles/top-10-best-reusable-water-bottles.jpg?v=1701695402',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Urban Backpack',
        price: 79.99,
        image: 'https://rivacase.com/images/5432/04r.jpg',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Desk Plant (Artificial)',
        price: 14.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRkiZ5bxy-zjZYQkr35cNQ4uxc74tkG-BLKA&s',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Noise-Canceling Earbuds',
        price: 59.99,
        image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1500_.jpg',
        ownerId: 'system',
    },
    {
        id: uuidv4(),
        title: 'Minimal Wall Clock',
        price: 39.99,
        image: 'https://m.media-amazon.com/images/I/71hKCWfJMAL.jpg',
        ownerId: 'system',
    },
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
