import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="book-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Available: {book.availability.isAvailable ? "Yes" : "No"}</p>
          <p>Borrower: {book.availability.borrower || "—"}</p>
          <button onClick={() => handleGoHome()}>Back</button>
        </>
      )}
    </div>
  );
};

export default BookPage;
