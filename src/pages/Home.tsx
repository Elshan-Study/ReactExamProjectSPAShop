import React from 'react';
import { useAppSelector } from '../store/hooks';
import ProductCard from "../components/ProductCard.tsx";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    const products = useAppSelector(s => s.products.items);
    const currentUser = useAppSelector(s => s.auth.currentUser);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">Catalog</h1>
                </div>

                {currentUser && (
                    <Link
                        to="/add-product"
                        className="px-4 py-2 rounded-md text-white font-semibold shadow transition transform hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(90deg, var(--accent), #7c3aed)' }}
                    >
                        Add product
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
};

export default Home;
