import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [borrower, setBorrower] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setAuthor(data.author);
        setIsbn(data.isbn);
        setIsAvailable(data.availability.isAvailable ? "true" : "false");
        setBorrower(data.availability.borrower || "");
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const updateBook = async (book) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (!res.ok) {
        throw new Error("Failed to update book");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      isbn,
      availability: {
        isAvailable: isAvailable === "true",
        borrower,
      },
    };

    updateBook(updatedBook);
    return navigate(`/books/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="create">
      <h2>Update Book</h2>
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
        <button>Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;
