import React, { useState, useEffect } from 'react';

const sampleProducts = [
  {
    productName: "Laptop 1",
    price: 2236,
    rating: 4.7,
    discount: 63,
    availability: "yes"
  },
  {
    productName: "Laptop 13",
    price: 1244,
    rating: 4.5,
    discount: 45,
    availability: "out-of-stock"
  },
  {
    productName: "Laptop 3",
    price: 9102,
    rating: 4.44,
    discount: 98,
    availability: "out-of-stock"
  },
  {
    productName: "Laptop 11",
    price: 2652,
    rating: 4.12,
    discount: 70,
    availability: "yes"
  },
  {
    productName: "Laptop 4",
    price: 1258,
    rating: 3.8,
    discount: 33,
    availability: "yes"
  },
  {
    productName: "Laptop 13",
    price: 8686,
    rating: 3.22,
    discount: 24,
    availability: "out-of-stock"
  },
  {
    productName: "Laptop 14",
    price: 9254,
    rating: 3,
    discount: 56,
    availability: "yes"
  },
  {
    productName: "Laptop 1",
    price: 1059,
    rating: 2.77,
    discount: 21,
    availability: "yes"
  },
  {
    productName: "Laptop 10",
    price: 7145,
    rating: 2.74,
    discount: 15,
    availability: "yes"
  },
  {
    productName: "Laptop 10",
    price: 4101,
    rating: 2.67,
    discount: 37,
    availability: "out-of-stock"
  }
];

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null); // 'rating', 'price', 'company', 'discount'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to simulate fetching top products
  const fetchProducts = async () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000); // Simulating 1 second delay
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle sorting change
  const handleSortChange = (event) => {
    const value = event.target.value;
    const [sortByField, sortOrderField] = value.split('_');
    setSortBy(sortByField);
    setSortOrder(sortOrderField);
  };

  // Function to sort products based on sortBy and sortOrder
  const sortProducts = (products) => {
    if (sortBy && sortOrder) {
      const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
      return sortedProducts;
    }
    return products;
  };

  // Function to handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Implement pagination logic here if needed
  };

  return (
    <div className="App">
      <h1>Top 10 Laptops</h1>
      <div className="controls">
        <label>
          Sort By:
          <select value={sortBy ? `${sortBy}_${sortOrder}` : ''} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="rating_asc">Rating (Low to High)</option>
            <option value="rating_desc">Rating (High to Low)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="discount_asc">Discount (Low to High)</option>
            <option value="discount_desc">Discount (High to Low)</option>
          </select>
        </label>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {sortProducts(products).map((product, index) => (
            <div key={index} className="product-item">
              <h2>{product.productName}</h2>
              <p>Price: {product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}%</p>
              <p>Availability: {product.availability}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
