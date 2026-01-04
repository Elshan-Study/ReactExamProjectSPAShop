import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { store } from '../store/store';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(s => s.auth.currentUser);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (currentUser) navigate('/');
    }, [currentUser, navigate]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        dispatch(login({ email, password }));

        const cur = store.getState().auth.currentUser;
        if (!cur) {
            setError('Invalid credentials');
        } else {
            setError(null);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            {error && <div className="mb-3 text-red-600">{error}</div>}
            <form onSubmit={submit} className="space-y-3">
                <input
                    className="w-full border rounded p-2"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="w-full border rounded p-2"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full py-2 rounded text-white" style={{ backgroundColor: 'var(--accent)' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
