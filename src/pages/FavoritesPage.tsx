import React from 'react';
import { useAppSelector } from '../store/hooks';
import FavoriteItem from "../components/FavoriteItem.tsx";

const FavoritesPage: React.FC = () => {
    const favs = useAppSelector(s => s.favorites.ids);

    if (favs.length === 0) {
        return <div className="text-center py-12 text-gray-600">You have no favorites yet.</div>;
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21s-6.716-4.35-9.262-7.293C.617 10.92 3.3 6 7.5 6c2.02 0 3.2 1.1 4.5 2.5C13.3 7.1 14.48 6 16.5 6 20.7 6 23.383 10.92 21.262 13.707 18.716 16.65 12 21 12 21z" />
                </svg>
                <h1 className="text-2xl font-bold">Favorites</h1>
            </div>

            <div className="space-y-3">
                {favs.map(id => <FavoriteItem key={id} productId={id} />)}
            </div>
        </div>
    );
};

export default FavoritesPage;
