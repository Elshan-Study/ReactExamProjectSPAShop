import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {logout} from "../store/slices/authSlice.ts";

const Layout: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(s => s.auth.currentUser);
    const cartCount = useAppSelector(s => s.cart.items.reduce((a, i) => a + i.quantity, 0));
    const favCount = useAppSelector(s => s.favorites.ids.length);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                        MyShop
                    </Link>

                    <nav className="flex items-center gap-3">
                        <NavLink to="/" className="px-3 py-2 rounded hover:bg-gray-100">Catalog</NavLink>
                        <NavLink to="/favorites" className="px-3 py-2 rounded hover:bg-gray-100">
                            Favorites {favCount > 0 && <span className="ml-1 text-sm text-gray-600">({favCount})</span>}
                        </NavLink>
                        <NavLink to="/cart" className="px-3 py-2 rounded hover:bg-gray-100">
                            Cart {cartCount > 0 && <span className="ml-1 text-sm text-gray-600">({cartCount})</span>}
                        </NavLink>
                        {currentUser ? (
                            <>
                                <span className="px-3 py-2 text-sm text-gray-700">Hi, {currentUser.name}</span>
                                <button
                                    onClick={() => dispatch(logout())}
                                    className="px-3 py-2 rounded text-white"
                                    style={{ backgroundColor: 'var(--accent)' }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="px-3 py-2 rounded hover:bg-gray-100">Login</NavLink>
                                <NavLink to="/register" className="px-3 py-2 rounded" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
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
                    © {new Date().getFullYear()} MyShop — demo project
                </div>
            </footer>
        </div>
    );
};

export default Layout;
