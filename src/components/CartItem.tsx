import React from 'react';
import type { CartItem as CartItemType, Product } from "../types.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {changeQuantity, removeFromCart} from "../store/slices/cartSlice.ts";

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(s => s.products.items.find(p => p.id === item.productId)) as Product | undefined;
    if (!product) return null;

    return (
        <div className="flex items-center gap-4 border-b py-4 hover:bg-white/60 transition rounded-md px-2">
            <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
            />

            <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{product.title}</h4>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="px-3 py-1 border rounded-md hover:bg-gray-100 transition shadow-sm"
                    onClick={() => dispatch(changeQuantity({ productId: item.productId, quantity: Math.max(0, item.quantity - 1) }))}
                    aria-label={`Decrease quantity of ${product.title}`}
                >
                    −
                </button>

                <div className="px-3 py-1 border rounded-md min-w-[48px] text-center bg-gray-50">{item.quantity}</div>

                <button
                    className="px-3 py-1 border rounded-md hover:bg-gray-100 transition shadow-sm"
                    onClick={() => dispatch(changeQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}
                    aria-label={`Increase quantity of ${product.title}`}
                >
                    +
                </button>

                <button
                    className="ml-4 px-3 py-1 rounded-md text-white font-medium shadow hover:brightness-110 transition"
                    onClick={() => dispatch(removeFromCart({ productId: item.productId }))}
                    style={{ background: 'var(--accent)' }}
                    aria-label={`Remove ${product.title} from cart`}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
