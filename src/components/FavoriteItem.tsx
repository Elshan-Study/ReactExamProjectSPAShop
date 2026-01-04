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
        <div className="flex items-center gap-4 border-b py-3">
            <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
                <Link to={`/edit/${product.id}`} className="font-semibold">{product.title}</Link>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>

            <div className="flex gap-2">
                <button
                    className="px-3 py-1 rounded"
                    onClick={() => dispatch(toggleFavorite({ id: productId }))}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default FavoriteItem;
