import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
