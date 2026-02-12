# Frontend Pair Activity — Book Library (Beginner-Friendly)

## Overview

In this activity you will connect a **React** front-end to an **Express + MongoDB** back-end.  
By the end you will have a working app that can **Create, Read, Update and Delete** (CRUD) books — all through regular (non-protected) API routes. No authentication is involved.

**How to use this project:**

| Folder | Purpose |
|---|---|
| `book-app/backend/` | The fully working Express API. You do **not** need to change anything here. |
| `book-app/frontend/step0/` | Your **starting point**. Copy this folder and work inside the copy. |
| `book-app/frontend/step1/` – `step5/` | Sample solutions for each iteration. Only look at them **after** you have tried on your own. |

### What You Will Learn

- How to send HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) from React to an Express API using `fetch`.
- How to use **controlled inputs** (form values stored in React state with `useState`).
- How to fetch data when a component mounts using `useEffect`.
- How to use React Router (`Routes`, `Route`, `Link`, `useParams`, `useNavigate`) for navigation.
- How to structure a React app with **pages** and **components**.

### Activity Structure

There are **5 iterations** (plus a setup step). Each iteration adds one CRUD feature:

| Iteration | Feature | HTTP Method | Files You Will Change |
|---|---|---|---|
| 0 | Setup | — | — |
| 1 | Add a book | `POST` | `AddBookPage.jsx` |
| 2 | List all books | `GET` | `HomePage.jsx`, `BookListings.jsx`, `BookListing.jsx` |
| 3 | View one book | `GET` | `App.jsx`, `BookListing.jsx`, `BookPage.jsx` |
| 4 | Delete a book | `DELETE` | `BookPage.jsx` |
| 5 | Edit a book | `PUT` | `App.jsx`, `BookPage.jsx`, `EditBookPage.jsx` |

> **Important:** Commit your work after each iteration.
<!-- 
---

## How You Will Work (Paired)

You work as **two problem-solvers** — you can both talk, think, and type. This is not strict pair-programming; it is collaborative problem-solving.

### Help Ladder (use in order)

When you get stuck:

1. Re-read the instruction and the code you are changing.
2. Ask your partner to explain their approach.
3. Try a tiny experiment (change one thing, test in the browser).
4. Open the sample solution for that iteration.
5. Ask the teacher.

### Discussion Checkpoints

After **every** iteration, before moving on:

- Partner A explains: "What did we change and why?"
- Partner B points to the exact file and line.
- Both test the feature in the browser.

If you cannot explain it, do not move on yet.

### Suggested Pacing (3-hour lab)

| Time | Step |
|---|---|
| 0:00 – 0:15 | Iteration 0 — Setup |
| 0:15 – 0:45 | Iteration 1 — Add a book (POST) |
| 0:45 – 1:15 | Iteration 2 — List all books (GET) |
| 1:15 – 1:45 | Iteration 3 — View one book (GET) |
| 1:45 – 2:15 | Iteration 4 — Delete a book (DELETE) |
| 2:15 – 3:00 | Iteration 5 — Edit a book (PUT) |

If you are behind: keep going in order, but do the minimum working version for each step before moving on. -->

### Commit Messages (Best Practice)

Use small commits that describe *what* changed. Recommended format:

- `feat(add-book): send POST request from AddBookPage form`
- `feat(list-books): fetch and display all books on HomePage`
- `refactor(book-listing): accept book prop and display data`
- `chore: install dependencies`

Rule of thumb: one commit = one idea you can explain in one sentence.

---

## The Backend API (Reference)

The backend is already built. Here is everything you need to know about it.

**Base URL:** `http://localhost:4000`  
(The Vite proxy in `vite.config.js` forwards any request starting with `/api` to this URL, so in your React code you only write `/api/books`.)

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/books` | Create a new book | JSON (see below) |
| `GET` | `/api/books` | Get all books | — |
| `GET` | `/api/books/:bookId` | Get a single book by ID | — |
| `PUT` | `/api/books/:bookId` | Update a book by ID | JSON (see below) |
| `DELETE` | `/api/books/:bookId` | Delete a book by ID | — |

**Book JSON shape** (what the API expects and returns):

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0-7432-7356-5",
  "availability": {
    "isAvailable": true,
    "borrower": ""
  }
}
```

> **Tip:** You can test the API with a tool such as VS Code REST Client, Postman, or `curl` before writing any React code. That way you will know exactly what the API returns.

---

## Instructions

### Iteration 0: Setup

1. Clone [the starter repository](https://github.com/tx00-resources-en/w5-exam-practice-frontend) into a separate folder.
   - After cloning, **delete** the `.git` directory so you can start your own Git history (`git init`).

2. **Start the backend:**
   ```bash
   cd book-app/backend
   cp .env.example .env      # create your .env file (edit MONGO_URI if needed)
   npm install
   npm run dev
   ```
   You should see `Server running on port 4000` and `MongoDB Connected`.

3. **Start the frontend:**
   ```bash
   cd book-app/frontend/step0
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

**You are done with Iteration 0 when:**

- The backend is running on `http://localhost:4000`.
- The frontend is running on `http://localhost:5173`.
- You can see the basic UI (Navbar with "Home" and "Add Book" links).

---

### Iteration 1: Add a Book (`POST`)

**Goal:** Make the "Add Book" form actually save a new book to the database.

**File to change:** `src/pages/AddBookPage.jsx`

Right now the form is there but nothing happens when you press "Add Book" — the `submitForm` function only logs to the console and the inputs are not connected to state.

**What to do:**

1. **Create state for each form field** using `useState`:
   ```jsx
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const [isbn, setIsbn] = useState("");
   const [isAvailable, setIsAvailable] = useState("true");
   const [borrower, setBorrower] = useState("");
   ```

2. **Connect each input to its state** (controlled inputs). For example:
   ```jsx
   <input
     type="text"
     required
     value={title}
     onChange={(e) => setTitle(e.target.value)}
   />
   ```
   Do the same for every `<input>` and `<select>` in the form.

3. **Write an `addBook` function** that sends a POST request:
   ```jsx
   const addBook = async (newBook) => {
     try {
       const res = await fetch("/api/books", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(newBook),
       });
       if (!res.ok) throw new Error("Failed to add book");
     } catch (error) {
       console.error(error);
     }
   };
   ```

4. **Update `submitForm`** to build a book object from the state and call `addBook`, then navigate home:
   ```jsx
   import { useNavigate } from "react-router-dom";
   // inside the component:
   const navigate = useNavigate();

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
     navigate("/");
   };
   ```

   > **Note:** The `isAvailable` state is a string (`"true"` or `"false"`) because HTML `<select>` values are always strings. We convert it to a boolean with `isAvailable === "true"` when building the request body.

> **Sample solution (after trying yourself):** [Iteration 1 – POST](./frontend/step1/src/pages/AddBookPage.jsx)

**You are done with Iteration 1 when:**

- You fill in the form and click "Add Book".
- The page navigates back to Home.
- If you check MongoDB (e.g., MongoDB Compass or the API with `GET /api/books`), the new book is there.

> **Note:** The home page does not show books yet — that is the next iteration.

---

### Iteration 2: Fetch and Display All Books (`GET`)

**Goal:** When the Home page loads, fetch all books from the API and display them as a list.

**Files to change:** `src/pages/HomePage.jsx`, `src/components/BookListings.jsx`, `src/components/BookListing.jsx`

#### Step A — Fetch books in `HomePage.jsx`

1. Import `useState` and `useEffect` from React.
2. Create three pieces of state:
   ```jsx
   const [books, setBooks] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   ```
3. Use `useEffect` to fetch books when the component mounts:
   ```jsx
   useEffect(() => {
     const fetchBooks = async () => {
       try {
         const res = await fetch("/api/books");
         if (!res.ok) throw new Error("Could not fetch books");
         const data = await res.json();
         setBooks(data);
         setIsPending(false);
       } catch (err) {
         setError(err.message);
         setIsPending(false);
       }
     };
     fetchBooks();
   }, []);
   ```
4. Render loading, error, and success states:
   ```jsx
   return (
     <div className="home">
       {error && <div>{error}</div>}
       {isPending && <div>Loading...</div>}
       {books && <BookListings books={books} />}
     </div>
   );
   ```

#### Step B — Accept and map books in `BookListings.jsx`

The component currently renders a single hard-coded `<BookListing />`. Change it to accept a `books` prop and map over the array:

```jsx
const BookListings = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookListing key={book.id} book={book} />
      ))}
    </div>
  );
};
```

#### Step C — Display book data in `BookListing.jsx`

Accept a `book` prop and display the actual values:

```jsx
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
```

> **Sample solution (after trying yourself):** [Iteration 2 – GET all](./frontend/step2/)

**Compare your solution with the sample:**

- Where is the books state stored?
- When does `fetch` run? (Hint: only once, on mount — because of the `[]` dependency array.)
- How do you handle loading and error states?

**You are done with Iteration 2 when:**

- The Home page shows all books from the database.
- When you add a new book (Iteration 1) and navigate back to Home, the new book appears in the list (the page re-fetches on mount).

---

### Iteration 3: View a Single Book (`GET` one)

**Goal:** Click a book in the list to open a detail page that shows all its information.

**Files to change:** `src/App.jsx`, `src/components/BookListing.jsx`, `src/pages/BookPage.jsx`

#### Step A — Add a new route in `App.jsx`

Import `BookPage` and add a route for it:

```jsx
import BookPage from "./pages/BookPage";
// inside <Routes>:
<Route path="/books/:id" element={<BookPage />} />
```

The `:id` is a **URL parameter**. React Router will match URLs like `/books/abc123` and make `abc123` available via the `useParams` hook.

#### Step B — Link each book to its detail page in `BookListing.jsx`

Import `Link` from `react-router-dom` and wrap the book title:

```jsx
import { Link } from "react-router-dom";

// inside the return:
<Link to={`/books/${book.id}`}>
  <h2>{book.title}</h2>
</Link>
```

> **Why `Link` instead of `<a href>`?** `<Link>` navigates without a full page reload, keeping React state alive. `<a href>` reloads the entire page.

#### Step C — Fetch and display the book in `BookPage.jsx`

1. Import `useParams`, `useNavigate`, `useEffect`, and `useState`.
2. Get the `id` from the URL and fetch the single book:
   ```jsx
   const { id } = useParams();
   const [book, setBook] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     const fetchBook = async () => {
       try {
         const res = await fetch(`/api/books/${id}`);
         if (!res.ok) throw new Error("Network response was not ok");
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
   ```
3. Display loading, error, and book data (including availability and borrower).
4. Add a "Back" button:
   ```jsx
   const navigate = useNavigate();
   // inside the return:
   <button onClick={() => navigate("/")}>Back</button>
   ```

> **Sample solution (after trying yourself):** [Iteration 3 – GET one](./frontend/step3/)

**You are done with Iteration 3 when:**

- You can click a book title on the Home page and see all its details on a dedicated page.
- The "Back" button returns you to the Home page.

**Discussion Questions:**

- What is the difference between a **page** and a **component** in this app?
- Why do we pass `[id]` as the dependency array in `useEffect`?

---

### Iteration 4: Delete a Book (`DELETE`)

**Goal:** Add a "Delete" button to the book detail page that removes the book from the database.

**File to change:** `src/pages/BookPage.jsx`

The route and the detail page already exist from Iteration 3. You only need to add delete functionality.

**What to do:**

1. **Write a `deleteBook` function:**
   ```jsx
   const deleteBook = async (bookId) => {
     try {
       const res = await fetch(`/api/books/${bookId}`, {
         method: "DELETE",
       });
       if (!res.ok) throw new Error("Failed to delete book");
     } catch (error) {
       console.error("Error deleting book:", error);
     }
   };
   ```

2. **Write a click handler** with a confirmation dialog:
   ```jsx
   const onDeleteClick = (bookId) => {
     const confirm = window.confirm("Are you sure you want to delete this book?");
     if (!confirm) return;
     deleteBook(bookId);
     navigate("/");
   };
   ```

3. **Add a "Delete" button** in the JSX (next to or instead of the "Back" button):
   ```jsx
   <button onClick={() => onDeleteClick(book._id)}>Delete</button>
   ```

> **Sample solution (after trying yourself):** [Iteration 4 – DELETE](./frontend/step4/)

**You are done with Iteration 4 when:**

- You click "Delete" on a book detail page.
- A confirmation dialog appears.
- After confirming, the app navigates to Home and the deleted book is no longer in the list.

---

### Iteration 5: Edit a Book (`PUT`)

**Goal:** Add an "Edit" button on the book detail page that opens a pre-filled form. Submitting the form updates the book in the database.

**Files to change:** `src/App.jsx`, `src/pages/BookPage.jsx`, `src/pages/EditBookPage.jsx`

#### Step A — Add a new route in `App.jsx`

Import `EditBookPage` and add a route:

```jsx
import EditBookPage from "./pages/EditBookPage";
// inside <Routes>:
<Route path="/edit-book/:id" element={<EditBookPage />} />
```

#### Step B — Add an "Edit" button in `BookPage.jsx`

Add a button that navigates to the edit page:

```jsx
<button onClick={() => navigate(`/edit-book/${book._id}`)}>Edit</button>
```

#### Step C — Build the edit form in `EditBookPage.jsx`

This is the most complex page. It combines patterns you already used in earlier iterations:

1. **Get the `id` from the URL** with `useParams` (same pattern as `BookPage`).
2. **Fetch the existing book** with `useEffect` (same pattern as `BookPage`).
3. **Create state for each form field** with `useState` (same pattern as `AddBookPage`).
4. **Pre-fill the form** — after fetching, set each state variable to the fetched value:
   ```jsx
   useEffect(() => {
     const fetchBook = async () => {
       const res = await fetch(`/api/books/${id}`);
       const data = await res.json();
       setTitle(data.title);
       setAuthor(data.author);
       setIsbn(data.isbn);
       setIsAvailable(data.availability.isAvailable ? "true" : "false");
       setBorrower(data.availability.borrower || "");
     };
     fetchBook();
   }, [id]);
   ```
5. **Write an `updateBook` function** that sends a PUT request:
   ```jsx
   const updateBook = async (updatedBook) => {
     try {
       const res = await fetch(`/api/books/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(updatedBook),
       });
       if (!res.ok) throw new Error("Failed to update book");
       return true;
     } catch (error) {
       console.error("Error updating book:", error);
       return false;
     }
   };
   ```
6. **Handle form submission:**
   ```jsx
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
     navigate(`/books/${id}`);
   };
   ```
7. **Render the form** — this is almost identical to `AddBookPage`, but with an "Update Book" button and a loading check before the form.

> **Sample solution (after trying yourself):** [Iteration 5 – PUT](./frontend/step5/)

**You are done with Iteration 5 when:**

- You can click "Edit" on a book detail page.
- The edit form opens with the current values pre-filled.
- After submitting, you are redirected to the detail page showing the updated data.
- The updated data also appears correctly in the books list on the Home page.
