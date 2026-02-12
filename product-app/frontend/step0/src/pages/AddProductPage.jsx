const AddProductPage = () => {
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
      <form onSubmit={submitForm}>
        <label>Product Title:</label>
        <input type="text" required />
        <label>Category:</label>
        <select>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>
        <label>Description:</label>
        <textarea required></textarea>
        <label>Price:</label>
        <input type="number" step="0.01" min="0" required />
        <label>Stock Quantity:</label>
        <input type="number" min="0" required />
        <label>Supplier Name:</label>
        <input type="text" required />
        <label>Supplier Email:</label>
        <input type="email" required />
        <label>Supplier Phone:</label>
        <input type="text" required />
        <label>Supplier Rating (1-5):</label>
        <input type="number" min="1" max="5" />
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
