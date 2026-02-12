const BookListing = ({ book }) => {
  return (
    <div className="book-preview">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Available: {book.availability.isAvailable ? "Yes" : "No"}</p>
    </div>
  );
};

export default BookListing;
