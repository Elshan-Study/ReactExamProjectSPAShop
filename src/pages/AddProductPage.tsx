import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {addProduct} from "../store/slices/productsSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";

const AddProductPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUser = useAppSelector(s => s.auth.currentUser);

    const [title, setTitle] = useState('');
    const [priceStr, setPriceStr] = useState('');
    const [image, setImage] = useState('');

    if (!currentUser) {
        return <div className="text-center py-12 text-gray-600">You must be logged in to add products.</div>;
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(priceStr);
        if (!title || isNaN(price) || !image) return;

        dispatch(addProduct({ title, price, image, ownerId: currentUser.id }));
        navigate('/');
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
                <h1 className="text-xl font-semibold">Add product</h1>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <input
                    className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <input
                    className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                    placeholder="Price"
                    value={priceStr}
                    onChange={e => setPriceStr(e.target.value)}
                />

                <input
                    className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                    placeholder="Image URL"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 rounded-lg text-white font-semibold shadow-md transform transition hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(90deg, var(--accent), #fb7185)' }}
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-3 rounded-lg border hover:shadow-sm transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;
