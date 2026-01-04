import React from 'react';
import { useAppSelector } from '../store/hooks';
import FavoriteItem from "../components/FavoriteItem.tsx";

const FavoritesPage: React.FC = () => {
    const favs = useAppSelector(s => s.favorites.ids);

    if (favs.length === 0) {
        return <div className="text-center py-12">You have no favorites yet.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Favorites</h1>
            <div className="space-y-2">
                {favs.map(id => <FavoriteItem key={id} productId={id} />)}
            </div>
        </div>
    );
};

export default FavoritesPage;
