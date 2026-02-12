import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [rating, setRating] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newProduct = {
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

    const success = await addProduct(newProduct);
    if (success) {
      console.log("Product Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the product");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
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
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
