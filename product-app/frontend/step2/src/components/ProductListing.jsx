const ProductListing = ({ product }) => {
  return (
    <div className="product-preview">
      <h2>{product.title}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>In Stock: {product.stockQuantity}</p>
    </div>
  );
};

export default ProductListing;
