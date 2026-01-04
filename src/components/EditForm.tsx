import type {Product} from "../types.ts";
import React, {useState} from "react";

type EditFormProps = {
    product: Product;
    onSave: (p: Product) => void;
    onDelete: () => void;
};

const EditForm: React.FC<EditFormProps> = ({ product, onSave, onDelete }) => {
    const [title, setTitle] = useState(product.title);
    const [priceStr, setPriceStr] = useState(String(product.price));
    const [image, setImage] = useState(product.image);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(priceStr);
        if (!title || isNaN(price) || !image) return;
        onSave({ ...product, title, price, image });
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold mb-4">Edit product</h1>
            <form onSubmit={submit} className="space-y-3">
                <input
                    className="w-full border rounded p-2"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    className="w-full border rounded p-2"
                    placeholder="Price"
                    value={priceStr}
                    onChange={e => setPriceStr(e.target.value)}
                />
                <input
                    className="w-full border rounded p-2"
                    placeholder="Image URL"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded text-white" style={{ backgroundColor: 'var(--accent)' }}>
                        Save
                    </button>
                    <button type="button" onClick={() => history.back()} className="px-4 py-2 rounded border">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="px-4 py-2 rounded text-white ml-auto"
                        style={{ backgroundColor: 'rgb(220,38,38)' }}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;