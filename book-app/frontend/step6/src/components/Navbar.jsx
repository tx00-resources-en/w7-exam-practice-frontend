import { Link } from "react-router-dom";

const Navbar = () => {
  const handleClick = () => {
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Book Library</h1>
      </Link>
      <div className="links">
        <div>
          <Link to="/books/add-book">Add Book</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <button onClick={handleClick}>Log out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
