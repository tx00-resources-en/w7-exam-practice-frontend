import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
        setPrice(data.price.toString());
        setStockQuantity(data.stockQuantity.toString());
        setSupplierName(data.supplier.name);
        setContactEmail(data.supplier.contactEmail);
        setContactPhone(data.supplier.contactPhone);
        setRating(data.supplier.rating ? data.supplier.rating.toString() : "");
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const updateProduct = async (product) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      category,
      description,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity, 10),
      supplier: {
        name: supplierName,
        contactEmail,
        contactPhone,
        rating: rating ? parseInt(rating, 10) : undefined,
      },
    };

    updateProduct(updatedProduct);
    return navigate(`/products/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="create">
      <h2>Update Product</h2>
      <form onSubmit={submitForm}>
        <label>Product Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Stock Quantity:</label>
        <input
          type="number"
          min="0"
          required
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
        <label>Supplier Name:</label>
        <input
          type="text"
          required
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <label>Supplier Email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Supplier Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <label>Supplier Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
