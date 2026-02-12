import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{product.title}</h2>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>In Stock: {product.stockQuantity}</p>
          <p>Supplier: {product.supplier.name}</p>
          <p>Email: {product.supplier.contactEmail}</p>
          <p>Phone: {product.supplier.contactPhone}</p>
          <p>Supplier Rating: {product.supplier.rating || "—"}</p>
          <button onClick={() => navigate("/")}>Back</button>
        </>
      )}
    </div>
  );
};

export default ProductPage;
