import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import BookPage from "./pages/BookPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
