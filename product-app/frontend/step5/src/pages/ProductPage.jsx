import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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

  const onDeleteClick = (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    deleteProduct(productId);
    navigate("/");
  };

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
          <button onClick={() => navigate(`/edit-product/${product._id}`)}>Edit</button>
          <button onClick={() => onDeleteClick(product._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ProductPage;
