import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';
import type { AuthState } from './slices/authSlice';
import type { ProductsState } from './slices/productsSlice';
import type { CartState } from './slices/cartSlice';
import type { FavoritesState } from './slices/favoritesSlice';
import { loadFromLocal, saveToLocal } from '../localStorage';


const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

//Здесь я подгружаю из локалсторейдж, а не иницилизирую заново
const preloadedState = {
    auth: loadFromLocal<AuthState>('auth'),
    products: loadFromLocal<ProductsState>('products'),
    cart: loadFromLocal<CartState>('cart'),
    favorites: loadFromLocal<FavoritesState>('favorites'),
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState,
});

//Каждый раз, когда что-то меняется в Redux — z сохраняю всё состояние в localStorage
store.subscribe(() => {
    const state = store.getState();
    saveToLocal('auth', state.auth);
    saveToLocal('products', state.products);
    saveToLocal('cart', state.cart);
    saveToLocal('favorites', state.favorites);
});

export type AppDispatch = typeof store.dispatch;