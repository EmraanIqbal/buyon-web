// npx json-server -w data/products.json -p 3500 
// command to run the json server on port 3500

import { createContext, ReactElement, useEffect, useState } from "react";

export type ProductType = {
    sku: string;
    name: string;
    price: number;
};
const initialState: ProductType[] = [];
// const initialState: ProductType[] = [
//     {
//         "sku": "item0001",
//         "name": "Widget",
//         "price": 9.99
//     },
//     {
//         "sku": "item0002",
//         "name": "Premium Widget",
//         "price": 19.99
//     },
//     {
//         "sku": "item0003",
//         "name": "Deluxe Widget",
//         "price": 29.99
//     }
// ]

export type UserProductsContextType = { products: ProductType[] };

const initContextState: UserProductsContextType = { products: [] };

const ProductsContext =
    createContext<UserProductsContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initialState);

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch("http://localhost:3500/products")
                .then((res) => {
                    return res.json();
                })
                .catch((err) => {
                    if (err instanceof Error) console.log(err.message);
                });
            return data
        };

        fetchProducts().then(products => setProducts(products))
    }, []);
    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;
