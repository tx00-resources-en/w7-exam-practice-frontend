# Frontend Activity — Part 2 (Authentication & Route Protection)

## Overview

In Part 1 you built a full CRUD front-end for books using the **unprotected** `backend/` API.  
In Part 2 you will add **user registration & login** (Iteration 6) and then **protect routes** so that only logged-in users can create, edit, or delete books (Iteration 7).

**How to use this project:**

| Folder | Purpose |
|---|---|
| `book-app/backend-auth/` | Express API with user signup/login endpoints. No route protection. |
| `book-app/backend-protect/` | Express API with user signup/login **and** `requireAuth` middleware on POST/PUT/DELETE book routes. |
| `book-app/frontend/step5/` | Your **starting point** for Iteration 6. Copy this folder and work inside the copy. |
| `book-app/frontend/step6/` | Sample solution for Iteration 6. Only look at it **after** you have tried on your own. |
| `book-app/frontend/step7/` | Sample solution for Iteration 7. Only look at it **after** you have tried on your own. |

### What You Will Learn

- How to manage form state with `useState` and handle form submissions with `fetch`.
- How to store a JWT token in `localStorage` and read it back on page load.
- How to add `Authorization: Bearer <token>` headers to protected API requests.
- How to **conditionally render** UI elements (Navbar links, Edit/Delete buttons) based on authentication state.
- How to **protect client-side routes** using `<Navigate>` from React Router.

### Activity Structure

| Iteration | Feature | Backend Used | New / Changed Files |
|---|---|---|---|
| 6 | User signup & login | `backend-auth/` | `Signup.jsx`, `Login.jsx`, `Navbar.jsx`, `App.jsx` |
| 7 | Route protection & token headers | `backend-protect/` | `App.jsx`, `Navbar.jsx`, `Signup.jsx`, `Login.jsx`, `BookPage.jsx`, `AddBookPage.jsx`, `EditBookPage.jsx` |

> **Important:** Commit your work after each iteration.

---

## The Backend APIs (Reference)

### `backend-auth/` — Authentication Endpoints (Iteration 6)

This backend is identical to `backend/` but adds **user routes**. All book routes remain **unprotected**.

**Base URL:** `http://localhost:4000`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/users/signup` | Register a new user | JSON (see below) |
| `POST` | `/api/users/login` | Log in an existing user | JSON (see below) |
| `GET` | `/api/books` | Get all books | — |
| `GET` | `/api/books/:bookId` | Get a single book | — |
| `POST` | `/api/books` | Create a book | JSON |
| `PUT` | `/api/books/:bookId` | Update a book | JSON |
| `DELETE` | `/api/books/:bookId` | Delete a book | — |

**Signup body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123",
  "phone_number": "040-1234567",
  "gender": "Female",
  "date_of_birth": "1995-06-15",
  "membership_status": "Active"
}
```

**Login body:**

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Successful response (both signup and login):**

```json
{
  "email": "jane@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

The `token` is a JWT. You will store it in `localStorage` and send it in request headers in Iteration 7.

### `backend-protect/` — Protected Book Routes (Iteration 7)

This backend is identical to `backend-auth/` except that **creating, updating, and deleting** books requires a valid JWT in the `Authorization` header.

| Method | Endpoint | Protected? | Required Header |
|---|---|---|---|
| `GET` | `/api/books` | No | — |
| `GET` | `/api/books/:bookId` | No | — |
| `POST` | `/api/books` | **Yes** | `Authorization: Bearer <token>` |
| `PUT` | `/api/books/:bookId` | **Yes** | `Authorization: Bearer <token>` |
| `DELETE` | `/api/books/:bookId` | **Yes** | `Authorization: Bearer <token>` |
| `POST` | `/api/users/signup` | No | — |
| `POST` | `/api/users/login` | No | — |

If a protected route is called without a valid token, the API responds with:

```json
{ "error": "Authorization token required" }
```

---

## Instructions

### Iteration 6: User Signup & Login (`POST`)

**Goal:** Add signup, login, and logout functionality. After signing up or logging in, the user's email and JWT token are saved to `localStorage`. The Navbar shows links to Login and Signup pages and a Log out button.

**Backend to use:** Stop the old backend and start `backend-auth/`:

```bash
cd book-app/backend-auth
cp .env.example .env      # create your .env file (edit MONGO_URI / SECRET if needed)
npm install
npm run dev
```

**New files to create:** `src/pages/Signup.jsx`, `src/pages/Login.jsx`  
**Files to change:** `src/App.jsx`, `src/components/Navbar.jsx`

#### Step A — Create the Signup page

Create `src/pages/Signup.jsx`. This page uses `useState` for each form field and sends a POST request to the signup endpoint. On success, the returned user (email + token) is saved to `localStorage`:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
        phone_number: phoneNumber,
        gender,
        date_of_birth: dateOfBirth,
        membership_status: membershipStatus,
      }),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    console.log("success");
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <label>Gender:</label>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        <label>Date of Birth:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        <label>Membership Status:</label>
        <input type="text" value={membershipStatus} onChange={(e) => setMembershipStatus(e.target.value)} />
        <button>Sign up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
```

> **Key concept:** `localStorage.setItem("user", JSON.stringify(user))` saves the object `{ email, token }` so it persists across page refreshes. You can read it back later with `JSON.parse(localStorage.getItem("user"))`.

#### Step B — Create the Login page

Create `src/pages/Login.jsx`:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    console.log("success");
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
```

#### Step C — Update `App.jsx` to add auth routes

Import the new pages and add routes for `/signup` and `/login`:

```jsx
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
```

> **What changed compared to step 5?**
> - Imported `Navigate`, `Login`, and `Signup`.
> - Added two new `<Route>` entries for `/signup` and `/login`.

#### Step D — Update `Navbar.jsx` with Login, Signup, and Logout links

Replace the old Navbar with one that shows Login/Signup links and a Log out button:

```jsx
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
```

> **What changed compared to step 5?**
> - Changed `<a>` tags to `<Link>` components (no full page reload).
> - Added Login and Signup links.
> - Added a Log out button that removes the user from `localStorage`.

> **Sample solution (after trying yourself):** [Iteration 6](./frontend/step6/)

**You are done with Iteration 6 when:**

- You can open the Signup page, fill in all fields, and click "Sign up".
- After signing up, you are redirected to the Home page.
- If you open your browser's DevTools → Application → Local Storage, you can see a `user` key containing `{ "email": "...", "token": "..." }`.
- You can open the Login page, enter the email and password, and log in successfully.
- Clicking "Log out" removes the `user` entry from Local Storage.
- All CRUD operations (add, list, view, edit, delete books) still work as before.

**Discussion Questions:**

- Why do we store the token in `localStorage` instead of React state?
- What happens if the API returns an error during signup? How does the component handle it?

---

### Iteration 7: Protect Routes (`Authorization` header + conditional rendering)

**Goal:** Only logged-in users can add, edit, or delete books. The Navbar adapts based on authentication state — showing the user's email and a Log out button when logged in, or Login/Signup links when logged out. Protected pages redirect unauthenticated users to the Signup page.

**Backend to use:** Stop `backend-auth/` and start `backend-protect/`:

```bash
cd book-app/backend-protect
cp .env.example .env      # create your .env file (edit MONGO_URI / SECRET if needed)
npm install
npm run dev
```

> **What is different in `backend-protect/`?** The book router now uses a `requireAuth` middleware on POST, PUT, and DELETE. Any request to these endpoints **must** include an `Authorization: Bearer <token>` header, or it will be rejected with a 401 error.

**Files to change:** `src/App.jsx`, `src/components/Navbar.jsx`, `src/pages/Signup.jsx`, `src/pages/Login.jsx`, `src/pages/BookPage.jsx`, `src/pages/AddBookPage.jsx`, `src/pages/EditBookPage.jsx`

#### Step A — Add `isAuthenticated` state to `App.jsx`

The app needs to know whether a user is logged in. We store this in a top-level state variable, initialized from `localStorage` so it survives page refreshes:

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/books/:id"
              element={<BookPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/books/add-book"
              element={
                isAuthenticated ? <AddBookPage /> : <Navigate to="/signup" />
              }
            />
            <Route
              path="/edit-book/:id"
              element={
                isAuthenticated ? <EditBookPage /> : <Navigate to="/signup" />
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```

> **What changed compared to step 6?**
> - Added `isAuthenticated` state initialized from `localStorage`.
> - `Navbar` receives `isAuthenticated` and `setIsAuthenticated` as props.
> - `BookPage` receives `isAuthenticated` to conditionally show Edit/Delete buttons.
> - `AddBookPage` and `EditBookPage` routes redirect to `/signup` if not authenticated.
> - `Signup` and `Login` routes redirect to `/` if already authenticated.
> - `Signup` and `Login` receive `setIsAuthenticated` so they can update it on success.

> **Why `<Navigate to="/signup" />`?** This is React Router's way of doing a redirect. If a non-authenticated user tries to visit `/books/add-book`, they are immediately taken to the Signup page instead.

#### Step B — Update `Navbar.jsx` for conditional rendering

The Navbar should show different links depending on whether the user is logged in:

```jsx
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Book Library</h1>
      </Link>
      <div className="links">
        {isAuthenticated && (
          <div>
            <Link to="/books/add-book">Add Book</Link>
            <span>{JSON.parse(localStorage.getItem("user")).email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
```

> **What changed compared to step 6?**
> - Accepts `isAuthenticated` and `setIsAuthenticated` props.
> - When authenticated: shows "Add Book" link, the user's email, and a "Log out" button.
> - When not authenticated: shows "Login" and "Signup" links only.
> - `handleClick` now also calls `setIsAuthenticated(false)` to re-render the entire app.

#### Step C — Update `Signup.jsx` to set authentication state

Accept `setIsAuthenticated` as a prop and call it after a successful signup:

```jsx
const Signup = ({ setIsAuthenticated }) => {
  // ... same as step 6, but add this line after saving the user to localStorage:
```

Inside `handleFormSubmit`, after `localStorage.setItem(...)`, add:

```jsx
    localStorage.setItem("user", JSON.stringify(user));
    console.log("success");
    setIsAuthenticated(true);   // <-- ADD THIS LINE
    navigate("/");
```

#### Step D — Update `Login.jsx` to set authentication state

Same pattern — accept `setIsAuthenticated` as a prop:

```jsx
const Login = ({ setIsAuthenticated }) => {
  // ... same as step 6, but add this line after saving the user to localStorage:
```

Inside `handleFormSubmit`, after `localStorage.setItem(...)`, add:

```jsx
    localStorage.setItem("user", JSON.stringify(user));
    console.log("success");
    setIsAuthenticated(true);   // <-- ADD THIS LINE
    navigate("/");
```

#### Step E — Send the token when adding a book (`AddBookPage.jsx`)

The `backend-protect/` API requires a JWT in the `Authorization` header for POST requests. Read the token from `localStorage` and include it in the `fetch` call:

1. **Read the token** at the top of the component:
   ```jsx
   const user = JSON.parse(localStorage.getItem("user"));
   const token = user ? user.token : null;
   ```

2. **Add the `Authorization` header** to the `addBook` function:
   ```jsx
   const addBook = async (newBook) => {
     try {
       const res = await fetch("/api/books", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,    // <-- ADD THIS
         },
         body: JSON.stringify(newBook),
       });
       if (!res.ok) throw new Error("Failed to add book");
       return true;
     } catch (error) {
       console.error("Error adding book:", error);
       return false;
     }
   };
   ```

#### Step F — Send the token when deleting a book and conditionally show buttons (`BookPage.jsx`)

1. **Accept the `isAuthenticated` prop:**
   ```jsx
   const BookPage = ({ isAuthenticated }) => {
   ```

2. **Read the token** at the top of the component:
   ```jsx
   const user = JSON.parse(localStorage.getItem("user"));
   const token = user ? user.token : null;
   ```

3. **Add the `Authorization` header** to the `deleteBook` function:
   ```jsx
   const deleteBook = async (bookId) => {
     try {
       const res = await fetch(`/api/books/${bookId}`, {
         method: "DELETE",
         headers: {
           Authorization: `Bearer ${token}`,    // <-- ADD THIS
         },
       });
       if (!res.ok) throw new Error("Failed to delete book");
       navigate("/");
     } catch (error) {
       console.error("Error deleting book:", error);
     }
   };
   ```

4. **Conditionally render** the Edit and Delete buttons — only show them when authenticated:
   ```jsx
   {isAuthenticated && (
     <>
       <button onClick={() => navigate(`/edit-book/${book._id}`)}>Edit</button>
       <button onClick={() => onDeleteClick(book._id)}>Delete</button>
     </>
   )}
   ```

#### Step G — Send the token when updating a book (`EditBookPage.jsx`)

Same pattern as AddBookPage:

1. **Read the token:**
   ```jsx
   const user = JSON.parse(localStorage.getItem("user"));
   const token = user ? user.token : null;
   ```

2. **Add the `Authorization` header** to the `updateBook` function:
   ```jsx
   const updateBook = async (book) => {
     try {
       const res = await fetch(`/api/books/${id}`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,    // <-- ADD THIS
         },
         body: JSON.stringify(book),
       });
       if (!res.ok) throw new Error("Failed to update book");
       return true;
     } catch (error) {
       console.error("Error updating book:", error);
       return false;
     }
   };
   ```

> **Sample solution (after trying yourself):** [Iteration 7](./frontend/step7/)

**You are done with Iteration 7 when:**

- **Logged out:** The Navbar shows only "Login" and "Signup" links.
- **Logged out:** Visiting `/books/add-book` or `/edit-book/:id` redirects to `/signup`.
- **Logged out:** The book detail page does **not** show Edit or Delete buttons.
- **Logged out:** Already-authenticated users visiting `/signup` or `/login` are redirected to `/`.
- **Logged in:** The Navbar shows "Add Book", the user's email, and "Log out".
- **Logged in:** You can add, edit, and delete books (the API accepts the token).
- **Logged in:** Clicking "Log out" clears the user from `localStorage`, updates the Navbar, and re-applies route protection.
- Viewing and listing books (GET) still works for everyone — no token needed.

**Discussion Questions:**

- What does the `Authorization: Bearer <token>` header do? Why doesn't the GET endpoint need it?
- What is the difference between **client-side route protection** (`<Navigate>`) and **server-side route protection** (`requireAuth` middleware)? Do you need both?
- Why do we initialize `isAuthenticated` with a function (`useState(() => { ... })`) instead of just `useState(false)`?
- What happens if a user manually deletes the token from `localStorage` while the app is open?
