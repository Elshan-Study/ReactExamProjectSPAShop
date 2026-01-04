import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {toggleFavorite} from "../store/slices/favoritesSlice.ts";

const FavoriteItem: React.FC<{ productId: string }> = ({ productId }) => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(s => s.products.items.find(p => p.id === productId)) as Product | undefined;
    if (!product) return null;

    return (
        <div className="flex items-center gap-4 border-b py-3 hover:bg-white/60 transition rounded-md px-2">
            <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
            <div className="flex-1">
                <Link to={`/edit/${product.id}`} className="font-semibold text-gray-800 hover:underline">{product.title}</Link>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>

            <div className="flex gap-2">
                <button
                    className="px-3 py-1 rounded-md border hover:bg-gray-100 transition"
                    onClick={() => dispatch(toggleFavorite({ id: productId }))}
                    aria-label={`Remove ${product.title} from favorites`}
                >
                    Remove
                </button>
                <button
                    className="px-3 py-1 rounded-md text-white shadow"
                    style={{ background: `linear-gradient(90deg, var(--accent), #fb7185)` }}
                    onClick={() => dispatch(toggleFavorite({ id: productId }))} // optional quick toggle
                    aria-label="Toggle favorite"
                >
                    ♥
                </button>
            </div>
        </div>
    );
};

export default FavoriteItem;
