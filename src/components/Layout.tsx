import React, {useEffect} from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {logout} from "../store/slices/authSlice.ts";
import { clearPulse } from '../store/slices/cartSlice';
import type { JSX } from "react/jsx-runtime";

const Icon = {
    Home: (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
        <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M9 21V9h6v12" />
        </svg>
    ),
    Cart: (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
        <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h12" />
        </svg>
    ),
    Heart: (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
        <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 21s-6.716-4.35-9.262-7.293C.617 10.92 3.3 6 7.5 6c2.02 0 3.2 1.1 4.5 2.5C13.3 7.1 14.48 6 16.5 6 20.7 6 23.383 10.92 21.262 13.707 18.716 16.65 12 21 12 21z" /></svg>
    )
};

const Layout: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(s => s.auth.currentUser);
    const cartCount = useAppSelector(s => s.cart.items.reduce((a, i) => a + i.quantity, 0));
    const favCount = useAppSelector(s => s.favorites.ids.length);
    const pulse = useAppSelector(s => s.cart.pulse);

    useEffect(() => {
        if (!pulse) return;

        const t = setTimeout(() => {
            dispatch(clearPulse());
        }, 350);

        return () => clearTimeout(t);
    }, [pulse, dispatch]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-30">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold flex items-center" style={{ color: 'var(--accent)' }}>
                        <span className="mr-2 text-xl" aria-hidden>🛍️</span>
                        MyShop
                    </Link>

                    <nav className="flex items-center gap-3">
                        <NavLink to="/" className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 transition">
                            <Icon.Home /> Catalog
                        </NavLink>

                        <NavLink to="/favorites" className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 transition">
                            <Icon.Heart /> Favorites {favCount > 0 && <span className="ml-1 text-sm text-gray-600">({favCount})</span>}
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className={`px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 transition ${
                                pulse ? 'animate-pulse scale-110' : ''
                            }`}
                        >                            <Icon.Cart /> Cart
                            {cartCount > 0 && (
                                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-red-500 text-white shadow">
                  {cartCount}
                </span>
                            )}
                        </NavLink>

                        {currentUser ? (
                            <>
                                <span className="px-3 py-2 text-sm text-gray-700">Hi, {currentUser.name}</span>
                                <button
                                    onClick={() => dispatch(logout())}
                                    className="px-3 py-2 rounded text-white ml-2 shadow-md"
                                    style={{ background: 'var(--accent)' }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="px-3 py-2 rounded hover:bg-gray-100">Login</NavLink>
                                <NavLink to="/register" className="px-3 py-2 rounded" style={{ background: 'var(--accent)', color: 'white' }}>
                                    Register
                                </NavLink>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 flex-1">
                <Outlet />
            </main>

            <footer className="bg-white border-t">
                <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
                    © {new Date().getFullYear()} SPA Shop — Elshan Isayev' project
                </div>
            </footer>
        </div>
    );
};

export default Layout;
