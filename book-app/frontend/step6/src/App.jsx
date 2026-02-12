import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import BookPage from "./pages/BookPage";
import EditBookPage from "./pages/EditBookPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/books/add-book" element={<AddBookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
