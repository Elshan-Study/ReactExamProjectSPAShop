import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FavoritesState = {
    ids: string[];
}

const initialState: FavoritesState = { ids: [] };

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<{ id: string }>) {
            const i = state.ids.indexOf(action.payload.id);
            if (i === -1) state.ids.push(action.payload.id);
            else state.ids.splice(i, 1);
        },
        removeFavorite(state, action: PayloadAction<{ id: string }>) {
            state.ids = state.ids.filter(x => x !== action.payload.id);
        }
    }
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
