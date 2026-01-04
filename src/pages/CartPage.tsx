import React from 'react';
import Cart from '../components/Cart';

const CartPage: React.FC = () => {
    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h12" />
                </svg>
                <h1 className="text-2xl font-bold">Cart</h1>
            </div>

            <Cart />
        </div>
    );
};

export default CartPage;
