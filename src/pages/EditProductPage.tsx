import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteProduct, editProduct } from '../store/slices/productsSlice';
import EditForm from "../components/EditForm.tsx";

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const products = useAppSelector(s => s.products.items);
    const product = products.find(p => p.id === id);
    const currentUser = useAppSelector(s => s.auth.currentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!product) {
        return <div className="text-center py-12 text-gray-600">Product not found</div>;
    }

    if (!currentUser || product.ownerId !== currentUser.id) {
        return <div className="text-center py-12 text-gray-600">You are not allowed to edit this product.</div>;
    }

    return (
        <div>
            <EditForm
                key={product.id}
                product={product}
                onSave={(updatedProduct) => {
                    dispatch(editProduct(updatedProduct));
                    navigate('/');
                }}
                onDelete={() => {
                    dispatch(deleteProduct({ id: product.id }));
                    navigate('/');
                }}
            />
        </div>
    );
};

export default EditProductPage;