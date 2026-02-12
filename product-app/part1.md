# Frontend Pair Activity — Product Store (Beginner-Friendly)

## Overview

In this activity you will connect a **React** front-end to an **Express + MongoDB** back-end.  
By the end you will have a working app that can **Create, Read, Update and Delete** (CRUD) products — all through regular (non-protected) API routes. No authentication is involved.

**How to use this project:**

| Folder | Purpose |
|---|---|
| `product-app/backend/` | The fully working Express API. You do **not** need to change anything here. |
| `product-app/frontend/step0/` | Your **starting point**. Copy this folder and work inside the copy. |
| `product-app/frontend/step1/` – `step5/` | Sample solutions for each iteration. Only look at them **after** you have tried on your own. |

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
| 1 | Add a product | `POST` | `AddProductPage.jsx` |
| 2 | List all products | `GET` | `HomePage.jsx`, `ProductListings.jsx`, `ProductListing.jsx` |
| 3 | View one product | `GET` | `App.jsx`, `ProductListing.jsx`, `ProductPage.jsx` |
| 4 | Delete a product | `DELETE` | `ProductPage.jsx` |
| 5 | Edit a product | `PUT` | `App.jsx`, `ProductPage.jsx`, `EditProductPage.jsx` |

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
| 0:15 – 0:45 | Iteration 1 — Add a product (POST) |
| 0:45 – 1:15 | Iteration 2 — List all products (GET) |
| 1:15 – 1:45 | Iteration 3 — View one product (GET) |
| 1:45 – 2:15 | Iteration 4 — Delete a product (DELETE) |
| 2:15 – 3:00 | Iteration 5 — Edit a product (PUT) |

If you are behind: keep going in order, but do the minimum working version for each step before moving on. -->

### Commit Messages (Best Practice)

Use small commits that describe *what* changed. Recommended format:

- `feat(add-product): send POST request from AddProductPage form`
- `feat(list-products): fetch and display all products on HomePage`
- `refactor(product-listing): accept product prop and display data`
- `chore: install dependencies`

Rule of thumb: one commit = one idea you can explain in one sentence.

---

## The Backend API (Reference)

The backend is already built. Here is everything you need to know about it.

**Base URL:** `http://localhost:4000`  
(The Vite proxy in `vite.config.js` forwards any request starting with `/api` to this URL, so in your React code you only write `/api/products`.)

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/products` | Create a new product | JSON (see below) |
| `GET` | `/api/products` | Get all products | — |
| `GET` | `/api/products/:productId` | Get a single product by ID | — |
| `PUT` | `/api/products/:productId` | Update a product by ID | JSON (see below) |
| `DELETE` | `/api/products/:productId` | Delete a product by ID | — |

**Product JSON shape** (what the API expects and returns):

```json
{
  "title": "Wireless Headphones",
  "category": "Electronics",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 149.99,
  "stockQuantity": 50,
  "supplier": {
    "name": "TechSupplies Inc.",
    "contactEmail": "sales@techsupplies.com",
    "contactPhone": "555-123-4567",
    "rating": 4
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
   cd product-app/backend
   cp .env.example .env      # create your .env file (edit MONGO_URI if needed)
   npm install
   npm run dev
   ```
   You should see `Server running on port 4000` and `MongoDB Connected`.

3. **Start the frontend:**
   ```bash
   cd product-app/frontend/step0
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

**You are done with Iteration 0 when:**

- The backend is running on `http://localhost:4000`.
- The frontend is running on `http://localhost:5173`.
- You can see the basic UI (Navbar with "Home" and "Add Product" links).

---

### Iteration 1: Add a Product (`POST`)

**Goal:** Make the "Add Product" form actually save a new product to the database.

**File to change:** `src/pages/AddProductPage.jsx`

Right now the form is there but nothing happens when you press "Add Product" — the `submitForm` function only logs to the console and the inputs are not connected to state.

**What to do:**

1. **Create state for each form field** using `useState`:
   ```jsx
   const [title, setTitle] = useState("");
   const [category, setCategory] = useState("Electronics");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [stockQuantity, setStockQuantity] = useState("");
   const [supplierName, setSupplierName] = useState("");
   const [contactEmail, setContactEmail] = useState("");
   const [contactPhone, setContactPhone] = useState("");
   const [rating, setRating] = useState("");
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
   Do the same for every `<input>`, `<select>`, and `<textarea>` in the form.

3. **Write an `addProduct` function** that sends a POST request:
   ```jsx
   const addProduct = async (newProduct) => {
     try {
       const res = await fetch("/api/products", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(newProduct),
       });
       if (!res.ok) throw new Error("Failed to add product");
     } catch (error) {
       console.error(error);
     }
   };
   ```

4. **Update `submitForm`** to build a product object from the state and call `addProduct`, then navigate home:
   ```jsx
   import { useNavigate } from "react-router-dom";
   // inside the component:
   const navigate = useNavigate();

   const submitForm = (e) => {
     e.preventDefault();
     const newProduct = {
       title,
       category,
       description,
       price: parseFloat(price),
       stockQuantity: parseInt(stockQuantity, 10),
       supplier: {
         name: supplierName,
         contactEmail,
         contactPhone,
         rating: rating ? parseInt(rating, 10) : undefined,
       },
     };
     addProduct(newProduct);
     navigate("/");
   };
   ```

   > **Note:** The `price` and `stockQuantity` state are strings because HTML input values are always strings. We convert them to numbers with `parseFloat()` and `parseInt()` when building the request body. The `rating` field is optional — we only include it if the user entered a value.

> **Sample solution (after trying yourself):** [Iteration 1 – POST](./frontend/step1/src/pages/AddProductPage.jsx)

**You are done with Iteration 1 when:**

- You fill in the form and click "Add Product".
- The page navigates back to Home.
- If you check MongoDB (e.g., MongoDB Compass or the API with `GET /api/products`), the new product is there.

> **Note:** The home page does not show products yet — that is the next iteration.

---

### Iteration 2: Fetch and Display All Products (`GET`)

**Goal:** When the Home page loads, fetch all products from the API and display them as a list.

**Files to change:** `src/pages/HomePage.jsx`, `src/components/ProductListings.jsx`, `src/components/ProductListing.jsx`

#### Step A — Fetch products in `HomePage.jsx`

1. Import `useState` and `useEffect` from React.
2. Create three pieces of state:
   ```jsx
   const [products, setProducts] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   ```
3. Use `useEffect` to fetch products when the component mounts:
   ```jsx
   useEffect(() => {
     const fetchProducts = async () => {
       try {
         const res = await fetch("/api/products");
         if (!res.ok) throw new Error("Could not fetch products");
         const data = await res.json();
         setProducts(data);
         setIsPending(false);
       } catch (err) {
         setError(err.message);
         setIsPending(false);
       }
     };
     fetchProducts();
   }, []);
   ```
4. Render loading, error, and success states:
   ```jsx
   return (
     <div className="home">
       {error && <div>{error}</div>}
       {isPending && <div>Loading...</div>}
       {products && <ProductListings products={products} />}
     </div>
   );
   ```

#### Step B — Accept and map products in `ProductListings.jsx`

The component currently renders a single hard-coded `<ProductListing />`. Change it to accept a `products` prop and map over the array:

```jsx
const ProductListings = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductListing key={product.id} product={product} />
      ))}
    </div>
  );
};
```

#### Step C — Display product data in `ProductListing.jsx`

Accept a `product` prop and display the actual values:

```jsx
const ProductListing = ({ product }) => {
  return (
    <div className="product-preview">
      <h2>{product.title}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>In Stock: {product.stockQuantity}</p>
    </div>
  );
};
```

> **Sample solution (after trying yourself):** [Iteration 2 – GET all](./frontend/step2/)

**Compare your solution with the sample:**

- Where is the products state stored?
- When does `fetch` run? (Hint: only once, on mount — because of the `[]` dependency array.)
- How do you handle loading and error states?

**You are done with Iteration 2 when:**

- The Home page shows all products from the database.
- When you add a new product (Iteration 1) and navigate back to Home, the new product appears in the list (the page re-fetches on mount).

---

### Iteration 3: View a Single Product (`GET` one)

**Goal:** Click a product in the list to open a detail page that shows all its information.

**Files to change:** `src/App.jsx`, `src/components/ProductListing.jsx`, `src/pages/ProductPage.jsx`

#### Step A — Add a new route in `App.jsx`

Import `ProductPage` and add a route for it:

```jsx
import ProductPage from "./pages/ProductPage";
// inside <Routes>:
<Route path="/products/:id" element={<ProductPage />} />
```

The `:id` is a **URL parameter**. React Router will match URLs like `/products/abc123` and make `abc123` available via the `useParams` hook.

#### Step B — Link each product to its detail page in `ProductListing.jsx`

Import `Link` from `react-router-dom` and wrap the product title:

```jsx
import { Link } from "react-router-dom";

// inside the return:
<Link to={`/products/${product.id}`}>
  <h2>{product.title}</h2>
</Link>
```

> **Why `Link` instead of `<a href>`?** `<Link>` navigates without a full page reload, keeping React state alive. `<a href>` reloads the entire page.

#### Step C — Fetch and display the product in `ProductPage.jsx`

1. Import `useParams`, `useNavigate`, `useEffect`, and `useState`.
2. Get the `id` from the URL and fetch the single product:
   ```jsx
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     const fetchProduct = async () => {
       try {
         const res = await fetch(`/api/products/${id}`);
         if (!res.ok) throw new Error("Network response was not ok");
         const data = await res.json();
         setProduct(data);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
     fetchProduct();
   }, [id]);
   ```
3. Display loading, error, and product data (including supplier details).
4. Add a "Back" button:
   ```jsx
   const navigate = useNavigate();
   // inside the return:
   <button onClick={() => navigate("/")}>Back</button>
   ```

> **Sample solution (after trying yourself):** [Iteration 3 – GET one](./frontend/step3/)

**You are done with Iteration 3 when:**

- You can click a product title on the Home page and see all its details on a dedicated page.
- The "Back" button returns you to the Home page.

**Discussion Questions:**

- What is the difference between a **page** and a **component** in this app?
- Why do we pass `[id]` as the dependency array in `useEffect`?

---

### Iteration 4: Delete a Product (`DELETE`)

**Goal:** Add a "Delete" button to the product detail page that removes the product from the database.

**File to change:** `src/pages/ProductPage.jsx`

The route and the detail page already exist from Iteration 3. You only need to add delete functionality.

**What to do:**

1. **Write a `deleteProduct` function:**
   ```jsx
   const deleteProduct = async (productId) => {
     try {
       const res = await fetch(`/api/products/${productId}`, {
         method: "DELETE",
       });
       if (!res.ok) throw new Error("Failed to delete product");
     } catch (error) {
       console.error("Error deleting product:", error);
     }
   };
   ```

2. **Write a click handler** with a confirmation dialog:
   ```jsx
   const onDeleteClick = (productId) => {
     const confirm = window.confirm("Are you sure you want to delete this product?");
     if (!confirm) return;
     deleteProduct(productId);
     navigate("/");
   };
   ```

3. **Add a "Delete" button** in the JSX (next to or instead of the "Back" button):
   ```jsx
   <button onClick={() => onDeleteClick(product._id)}>Delete</button>
   ```

> **Sample solution (after trying yourself):** [Iteration 4 – DELETE](./frontend/step4/)

**You are done with Iteration 4 when:**

- You click "Delete" on a product detail page.
- A confirmation dialog appears.
- After confirming, the app navigates to Home and the deleted product is no longer in the list.

---

### Iteration 5: Edit a Product (`PUT`)

**Goal:** Add an "Edit" button on the product detail page that opens a pre-filled form. Submitting the form updates the product in the database.

**Files to change:** `src/App.jsx`, `src/pages/ProductPage.jsx`, `src/pages/EditProductPage.jsx`

#### Step A — Add a new route in `App.jsx`

Import `EditProductPage` and add a route:

```jsx
import EditProductPage from "./pages/EditProductPage";
// inside <Routes>:
<Route path="/edit-product/:id" element={<EditProductPage />} />
```

#### Step B — Add an "Edit" button in `ProductPage.jsx`

Add a button that navigates to the edit page:

```jsx
<button onClick={() => navigate(`/edit-product/${product._id}`)}>Edit</button>
```

#### Step C — Build the edit form in `EditProductPage.jsx`

This is the most complex page. It combines patterns you already used in earlier iterations:

1. **Get the `id` from the URL** with `useParams` (same pattern as `ProductPage`).
2. **Fetch the existing product** with `useEffect` (same pattern as `ProductPage`).
3. **Create state for each form field** with `useState` (same pattern as `AddProductPage`).
4. **Pre-fill the form** — after fetching, set each state variable to the fetched value:
   ```jsx
   useEffect(() => {
     const fetchProduct = async () => {
       const res = await fetch(`/api/products/${id}`);
       const data = await res.json();
       setTitle(data.title);
       setCategory(data.category);
       setDescription(data.description);
       setPrice(data.price.toString());
       setStockQuantity(data.stockQuantity.toString());
       setSupplierName(data.supplier.name);
       setContactEmail(data.supplier.contactEmail);
       setContactPhone(data.supplier.contactPhone);
       setRating(data.supplier.rating ? data.supplier.rating.toString() : "");
     };
     fetchProduct();
   }, [id]);
   ```
5. **Write an `updateProduct` function** that sends a PUT request:
   ```jsx
   const updateProduct = async (updatedProduct) => {
     try {
       const res = await fetch(`/api/products/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(updatedProduct),
       });
       if (!res.ok) throw new Error("Failed to update product");
       return true;
     } catch (error) {
       console.error("Error updating product:", error);
       return false;
     }
   };
   ```
6. **Handle form submission:**
   ```jsx
   const submitForm = (e) => {
     e.preventDefault();
     const updatedProduct = {
       title,
       category,
       description,
       price: parseFloat(price),
       stockQuantity: parseInt(stockQuantity, 10),
       supplier: {
         name: supplierName,
         contactEmail,
         contactPhone,
         rating: rating ? parseInt(rating, 10) : undefined,
       },
     };
     updateProduct(updatedProduct);
     navigate(`/products/${id}`);
   };
   ```
7. **Render the form** — this is almost identical to `AddProductPage`, but with an "Update Product" button and a loading check before the form.

> **Sample solution (after trying yourself):** [Iteration 5 – PUT](./frontend/step5/)

**You are done with Iteration 5 when:**

- You can click "Edit" on a product detail page.
- The edit form opens with the current values pre-filled.
- After submitting, you are redirected to the detail page showing the updated data.
- The updated data also appears correctly in the products list on the Home page.
