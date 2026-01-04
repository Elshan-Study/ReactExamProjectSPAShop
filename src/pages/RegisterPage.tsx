import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {register} from "../store/slices/authSlice.ts";

const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(s => s.auth.currentUser);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (currentUser) navigate('/');
    }, [currentUser, navigate]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        if (!name || !email || !password) {
            setError('Fill all fields');
            return;
        }
        dispatch(register({ name, email, password }));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold mb-4">Register</h1>
            {error && <div className="mb-3 text-red-600">{error}</div>}
            <form onSubmit={submit} className="space-y-3">
                <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input className="w-full border rounded p-2" placeholder="Repeat password" type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
                <button type="submit" className="w-full py-2 rounded text-white" style={{ backgroundColor: 'var(--accent)' }}>Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
