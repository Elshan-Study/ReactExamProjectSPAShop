import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {deleteProduct, editProduct} from "../store/slices/productsSlice.ts";

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const products = useAppSelector(s => s.products.items);
    const product = products.find(p => p.id === id);
    const currentUser = useAppSelector(s => s.auth.currentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState(product?.title ?? '');
    const [priceStr, setPriceStr] = useState(product ? String(product.price) : '');
    const [image, setImage] = useState(product?.image ?? '');

    useEffect(() => {
        if (!product) return;

        setTitle(prev => (prev === product.title ? prev : product.title));
        setPriceStr(prev => (prev === String(product.price) ? prev : String(product.price)));
        setImage(prev => (prev === product.image ? prev : product.image));
    }, [product]);

    if (!product) {
        return <div className="text-center py-12">Product not found</div>;
    }

    if (!currentUser || product.ownerId !== currentUser.id) {
        return <div className="text-center py-12">You are not allowed to edit this product.</div>;
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(priceStr);
        if (!title || isNaN(price) || !image) return;

        dispatch(editProduct({ ...product, title, price, image }));
        navigate('/');
    };

    const onDelete = () => {
        dispatch(deleteProduct({ id: product.id }));
        navigate('/');
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold mb-4">Edit product</h1>
            <form onSubmit={submit} className="space-y-3">
                <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input className="w-full border rounded p-2" placeholder="Price" value={priceStr} onChange={e => setPriceStr(e.target.value)} />
                <input className="w-full border rounded p-2" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded text-white" style={{ backgroundColor: 'var(--accent)' }}>Save</button>
                    <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded border">Cancel</button>
                    <button type="button" onClick={onDelete} className="px-4 py-2 rounded text-white ml-auto" style={{ backgroundColor: 'rgb(220,38,38)' }}>
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;
