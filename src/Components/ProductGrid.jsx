import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

const ProductGrid = ({ onQuickView }) => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    let skip = (currentPage - 1) * 20;
    let data = await fetch(
      `https://dummyjson.com/products?limit=20&skip=${skip}`
    );
    let jsonData = await data.json();
    setProductData(jsonData.products);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [currentPage]);

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const activePageClass = "page-btn active";
  const pageClass = "page-btn";

  return (
    <div>
      <div className="product-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          productData.map((pData) => (
            <ProductCard 
              key={pData.id} 
              data={pData} 
              onQuickView={onQuickView}
            />
          ))
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          className={currentPage === 1 ? activePageClass : pageClass}
        >
          1
        </button>
        <button
          onClick={() => handlePageChange(2)}
          className={currentPage === 2 ? activePageClass : pageClass}
        >
          2
        </button>
        <button
          onClick={() => handlePageChange(3)}
          className={currentPage === 3 ? activePageClass : pageClass}
        >
          3
        </button>
        <button
          onClick={() => handlePageChange(4)}
          className={currentPage === 4 ? activePageClass : pageClass}
        >
          4
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;