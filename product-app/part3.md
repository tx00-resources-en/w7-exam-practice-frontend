# Frontend Activity — Part 3 (Refactoring with Custom Hooks)

## Overview

In Part 2 you added user registration, login, and route protection. The Signup and Login components use inline `useState` for each form field and inline `fetch` calls for the API requests.

In Part 3 you will **refactor** the Signup and Login pages by extracting reusable logic into **custom hooks**:

- `useField` — manages a single form input's state (`type`, `value`, `onChange`).
- `useSignup` — encapsulates the POST request to the signup endpoint.
- `useLogin` — encapsulates the POST request to the login endpoint.

**How to use this project:**

| Folder | Purpose |
|---|---|
| `product-app/backend-protect/` | Same Express API from Part 2 (signup, login, protected routes). |
| `product-app/frontend/step7/` | Your **starting point** for Iteration 8. Copy this folder and work inside the copy. |
| `product-app/frontend/step8/` | Sample solution for Iteration 8. Only look at it **after** you have tried on your own. |

### What You Will Learn

- What a **custom hook** is and how it differs from a regular function.
- How to create `useField` to eliminate repetitive `useState` + `onChange` pairs.
- How to create `useSignup` and `useLogin` to extract API call logic from components.
- How the **spread operator** (`{...field}`) simplifies `<input>` bindings.

### Activity Structure

| Iteration | Feature | Backend Used | New / Changed Files |
|---|---|---|---|
| 8 | Custom hooks for forms & auth | `backend-protect/` | `useField.jsx`, `useSignup.jsx`, `useLogin.jsx`, `Signup.jsx`, `Login.jsx` |

> **Important:** Commit your work after completing the iteration.

---

## Iteration 8: Refactor with Custom Hooks

**Goal:** Extract repeated logic from `Signup.jsx` and `Login.jsx` into three custom hooks. The app behaviour stays exactly the same — this is a pure refactoring exercise.

**Backend to use:** Keep using `backend-protect/` from Part 2:

```bash
cd product-app/backend-protect
npm run dev
```

**New files to create:** `src/hooks/useField.jsx`, `src/hooks/useSignup.jsx`, `src/hooks/useLogin.jsx`

**Files to update:** `src/pages/Signup.jsx`, `src/pages/Login.jsx`

---

### Step A — Create the `useField` custom hook

Create a new file `src/hooks/useField.jsx`. This hook manages a single form input's state so you don't have to repeat `useState` + `onChange` for every field:

```jsx
import { useState } from "react";

export default function useField(type) {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return { type, value, onChange };
}
```

> **Why a custom hook?** In step 7 you wrote a separate `useState` + `onChange` for every form field. `useField` bundles that logic into one line per field. You can spread the returned object directly onto an `<input>`: `<input {...email} />` — this sets `type`, `value`, and `onChange` all at once.

---

### Step B — Create the `useSignup` custom hook

Create `src/hooks/useSignup.jsx`. This hook sends a POST request to the signup endpoint and stores the returned user (email + token) in `localStorage`:

```jsx
import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  return { signup, isLoading, error };
}
```

> **What changed compared to step 7?** The `fetch` call, error state, and `localStorage` write that were inside `Signup.jsx` are now inside this hook. The component just calls `await signup({...})` and reads `error` from the hook's return value.

---

### Step C — Create the `useLogin` custom hook

Create `src/hooks/useLogin.jsx`. This is almost identical to `useSignup`:

```jsx
import { useState } from "react";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  return { login, isLoading, error };
}
```

---

### Step D — Refactor `Signup.jsx` to use the custom hooks

Replace the contents of `src/pages/Signup.jsx`. Instead of multiple `useState` calls and an inline `fetch`, use `useField` and `useSignup`:

```jsx
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const name = useField("text");
  const email = useField("email");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const membershipStatus = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
      email: email.value,
      password: password.value,
      name: name.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      membership_status: membershipStatus.value,
    });
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>Phone Number:</label>
        <input {...phoneNumber} />
        <label>Gender:</label>
        <input {...gender} />
        <label>Date of Birth:</label>
        <input {...dateOfBirth} />
        <label>Membership Status:</label>
        <input {...membershipStatus} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
```

> **What changed?**
>
> | Step 7 (before) | Step 8 (after) |
> |---|---|
> | `const [email, setEmail] = useState("")` | `const email = useField("email")` |
> | `<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />` | `<input {...email} />` |
> | Inline `fetch("/api/users/signup", ...)` | `const { signup, error } = useSignup("/api/users/signup")` then `await signup({...})` |
> | `const [error, setError] = useState(null)` | `error` comes from the hook |

---

### Step E — Refactor `Login.jsx` to use the custom hooks

Replace the contents of `src/pages/Login.jsx`:

```jsx
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({ email: email.value, password: password.value });
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
```

---

> **Sample solution (after trying yourself):** [Iteration 8](./frontend/step8/)

**You are done with Iteration 8 when:**

- The app behaves exactly the same as step 7 — signup, login, logout, and all protected routes still work.
- You have three new files in `src/hooks/`: `useField.jsx`, `useSignup.jsx`, `useLogin.jsx`.
- `Signup.jsx` and `Login.jsx` no longer contain any `useState` calls or inline `fetch` calls.
- Each form input uses the spread syntax: `<input {...fieldName} />`.

**Discussion Questions:**

- What is a **custom hook**? How is it different from a regular function?
- Why must custom hook names start with `use`?
- What does the spread operator (`{...email}`) do when applied to an `<input>` element?
- What are the **advantages** of extracting `useSignup` and `useLogin` into hooks instead of keeping the `fetch` logic inside each component?
