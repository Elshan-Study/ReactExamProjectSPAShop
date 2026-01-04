import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import CartItem from './CartItem';
import { clearCart } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
    const items = useAppSelector(s => s.cart.items);
    const products = useAppSelector(s => s.products.items);
    const dispatch = useAppDispatch();

    const total = items.reduce((sum, it) => {
        const p = products.find(x => x.id === it.productId);
        return sum + (p ? p.price * it.quantity : 0);
    }, 0);

    if (items.length === 0) {
        return <div className="text-center py-12">Your cart is empty</div>;
    }

    return (
        <div>
            <div className="space-y-2">
                {items.map(it => <CartItem key={it.productId} item={it} />)}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 rounded"
                        onClick={() => dispatch(clearCart())}
                    >
                        Clear
                    </button>
                    <button
                        className="px-4 py-2 rounded text-white"
                        style={{ backgroundColor: 'var(--accent)' }}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
