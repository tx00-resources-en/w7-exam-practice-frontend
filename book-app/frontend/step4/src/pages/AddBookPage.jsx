import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [borrower, setBorrower] = useState("");

  const navigate = useNavigate();

  const addBook = async (newBook) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) {
        throw new Error("Failed to add book");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
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

    addBook(newBook);
    console.log(newBook);

    return navigate("/");
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
        <button>Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
