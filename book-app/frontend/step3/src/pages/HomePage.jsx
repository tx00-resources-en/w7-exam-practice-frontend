import { useEffect, useState } from "react";
import BookListings from "../components/BookListings";

const Home = () => {
  const [books, setBooks] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setBooks(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {books && <BookListings books={books} />}
    </div>
  );
};

export default Home;
