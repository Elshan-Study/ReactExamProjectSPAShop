import React from 'react';
import {useSelector} from "react-redux";
import type {RootState} from "./store/store.ts";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Layout from "./components/Layout.tsx";
import CartPage from "./pages/CartPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AddProductPage from "./pages/AddProductPage.tsx";
import EditProductPage from "./pages/EditProductPage.tsx";

//я проверяю залогинился пользователь или нет
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const currentUser = useSelector((s: RootState) => s.auth.currentUser);
    if (!currentUser) return <Navigate to="/login" replace />;
    return children;
};

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/favorites" element={<FavoritesPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/add-product" element={<RequireAuth><AddProductPage/></RequireAuth>}/>
                <Route path="/edit/:id" element={<RequireAuth><EditProductPage/></RequireAuth>}/>
            </Route>
        </Routes>
    );
}

export default App
