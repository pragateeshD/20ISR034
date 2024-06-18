import React, { useEffect, useState } from 'react';
import { getProducts } from './api';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ company: 'AMZ', category: 'Laptop', top: 10, minPrice: 1, maxPrice: 10000 });

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts(filters.company, filters.category, filters.top, filters.minPrice, filters.maxPrice);
            setProducts(products);
        };
        fetchProducts();
    }, [filters]);

    return (
        <div>
            <h1>Product List</h1>
            <div>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
