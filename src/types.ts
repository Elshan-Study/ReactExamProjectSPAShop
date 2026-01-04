export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
    ownerId: string;
}

export type CartItem = {
    productId: string;
    quantity: number;
}