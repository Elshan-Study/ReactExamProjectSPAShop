import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type {User} from "../../types.ts";

export type AuthState = {
    users: User[];
    currentUser: User | null;
};

const initialState: AuthState = {
    users: [],
    currentUser: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register(state, action: PayloadAction<{ name: string; email: string; password: string }>) {
            const { name, email, password } = action.payload;
            const exists = state.users.find(u => u.email === email);
            if (exists) return; // можно добавить ошибку
            const user: User = { id: uuidv4(), name, email, password };
            state.users.push(user);
            state.currentUser = user;
        },
        login(state, action: PayloadAction<{ email: string; password: string }>) {
            const { email, password } = action.payload;
            const user = state.users.find(u => u.email === email && u.password === password);
            if (user) state.currentUser = user;
        },
        logout(state) {
            state.currentUser = null;
        }
    }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
