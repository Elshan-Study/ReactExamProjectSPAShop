import React from 'react';
import type { CartItem as CartItemType, Product } from "../types.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {changeQuantity, removeFromCart} from "../store/slices/cartSlice.ts";

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(s => s.products.items.find(p => p.id === item.productId)) as Product | undefined;
    if (!product) return null;

    return (
        <div className="flex items-center gap-4 border-b py-3">
            <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
                <h4 className="font-semibold">{product.title}</h4>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => dispatch(changeQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}>
                    −
                </button>

                <div className="px-3 py-1 border rounded min-w-[48px] text-center">{item.quantity}</div>

                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => dispatch(changeQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}>
                    +
                </button>

                <button
                    className="ml-4 px-3 py-1 rounded text-sm"
                    onClick={() => dispatch(removeFromCart({ productId: item.productId }))}
                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
