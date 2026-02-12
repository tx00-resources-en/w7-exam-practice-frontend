import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [borrower, setBorrower] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

  const addBook = async (newBook) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) {
        throw new Error("Failed to add book");
      }
      return true;
    } catch (error) {
      console.error("Error adding book:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      isbn,
      availability: {
        isAvailable: isAvailable === "true",
        borrower,
      },
    };

    const success = await addBook(newBook);
    if (success) {
      console.log("Book Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the book");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>ISBN:</label>
        <input
          type="text"
          required
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <label>Available:</label>
        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Borrower:</label>
        <input
          type="text"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
