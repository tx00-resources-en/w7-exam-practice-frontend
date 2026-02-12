import { Link } from "react-router-dom";

const ProductListing = ({ product }) => {
  return (
    <div className="product-preview">
      <Link to={`/products/${product.id}`}>
        <h2>{product.title}</h2>
      </Link>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>In Stock: {product.stockQuantity}</p>
    </div>
  );
};

export default ProductListing;
