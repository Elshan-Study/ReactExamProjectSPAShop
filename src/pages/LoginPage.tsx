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
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-xl font-semibold mb-4">Login</h1>
            {error && <div className="mb-3 text-red-600">{error}</div>}
            <form onSubmit={submit} className="space-y-3">
                <input
                    className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-white font-semibold shadow-md transform transition hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(90deg, var(--accent), #fb7185)' }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
