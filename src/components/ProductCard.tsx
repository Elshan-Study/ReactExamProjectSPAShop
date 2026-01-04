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
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                <p className="text-gray-700 font-bold">${product.price.toFixed(2)}</p>

                <div className="mt-auto flex gap-2 items-center">
                    <button
                        onClick={() => dispatch(addToCart({ productId: product.id }))}
                        className="flex-1 px-4 py-2 rounded-md text-white font-medium shadow transition transform hover:scale-[1.02]"
                        style={{ background: `linear-gradient(90deg, var(--accent), #fb7185)` }}
                        aria-label={`Add ${product.title} to cart`}
                    >
                        Add to cart
                    </button>

                    <button
                        onClick={() => dispatch(toggleFavorite({ id: product.id }))}
                        className="px-3 py-2 rounded-md border hover:bg-gray-50 transition"
                        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        title={isFav ? 'Unfavorite' : 'Favorite'}
                    >
                        <span className="text-lg">{isFav ? '♥' : '♡'}</span>
                    </button>

                    {isOwner && (
                        <Link
                            to={`/edit/${product.id}`}
                            className="px-3 py-2 rounded-md border text-sm hover:shadow-sm transition"
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
