import BookListing from "./BookListing";

const BookListings = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookListing key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookListings;
