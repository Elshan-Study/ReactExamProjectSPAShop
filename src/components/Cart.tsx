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
        return <div className="text-center py-12 text-gray-600">Your cart is empty</div>;
    }

    return (
        <div>
            <div className="space-y-3">
                {items.map(it => (
                    <CartItem key={it.productId} item={it} />
                ))}
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex-1">
                    <div className="text-lg text-gray-700">Total:</div>
                    <div className="text-2xl font-bold">${total.toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="px-4 py-2 rounded-md border hover:shadow-md transition transform hover:-translate-y-0.5"
                        aria-label="Clear cart"
                    >
                        Clear
                    </button>

                    <button
                        className="px-5 py-2 rounded-md text-white font-medium shadow-md transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                            background: `linear-gradient(90deg, var(--accent) 0%, #7c3aed 100%)`,
                            boxShadow: '0 6px 18px rgba(124,58,237,0.18)',
                        }}
                        aria-label="Checkout"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
