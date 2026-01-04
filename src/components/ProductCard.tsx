import React from 'react';
import { Link } from 'react-router-dom';
import type {Product} from "../types.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {addToCart} from "../store/slices/cartSlice.ts";
import {toggleFavorite} from "../store/slices/favoritesSlice.ts";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const dispatch = useAppDispatch();
    const favs = useAppSelector(s => s.favorites.ids);
    const currentUser = useAppSelector(s => s.auth.currentUser);

    const isFav = favs.includes(product.id);
    const isOwner = currentUser && currentUser.id === product.ownerId;

    return (
        <div className="border rounded-lg shadow-sm overflow-hidden flex flex-col">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-700 font-bold">${product.price.toFixed(2)}</p>

                <div className="mt-auto flex gap-2">
                    <button
                        onClick={() => dispatch(addToCart({ productId: product.id }))}
                        className="flex-1 px-4 py-2 rounded-md text-white font-medium"
                        style={{ backgroundColor: 'var(--accent)' }}
                    >
                        Add to cart
                    </button>

                    <button
                        onClick={() => dispatch(toggleFavorite({ id: product.id }))}
                        className="px-3 py-2 rounded-md border"
                    >
                        {isFav ? '♥' : '♡'}
                    </button>

                    {isOwner && (
                        <Link
                            to={`/edit/${product.id}`}
                            className="px-3 py-2 rounded-md border text-sm"
                        >
                            Edit
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
