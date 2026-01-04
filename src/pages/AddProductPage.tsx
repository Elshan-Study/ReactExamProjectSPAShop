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
        return <div className="text-center py-12">You must be logged in to add products.</div>;
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(priceStr);
        if (!title || isNaN(price) || !image) {
            return;
        }
        dispatch(addProduct({ title, price, image, ownerId: currentUser.id }));
        navigate('/');
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold mb-4">Add product</h1>
            <form onSubmit={submit} className="space-y-3">
                <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input className="w-full border rounded p-2" placeholder="Price" value={priceStr} onChange={e => setPriceStr(e.target.value)} />
                <input className="w-full border rounded p-2" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded text-white" style={{ backgroundColor: 'var(--accent)' }}>Save</button>
                    <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded border">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;
