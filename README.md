
# **Labs Overview**

This repository includes **three hands‑on labs**, each guiding you through building a React Frontend that connects to an API server and performs full **CRUD** operations (Create, Read, Update, Delete).

### **Available Labs**

Each lab is independent, so you can complete them in any sequence.

| App | Part 1 — CRUD (steps 0–5) | Part 2 — Auth & Protection (steps 6–7) | Part 3 — Custom Hooks (step 8) |
|---|---|---|---|
| **Book App** | [part1.md](./book-app/part1.md) | [part2.md](./book-app/part2.md) | [part3.md](./book-app/part3.md) |
| **Product App** | [part1.md](./product-app/part1.md) | [part2.md](./product-app/part2.md) | [part3.md](./product-app/part3.md) |
| **Job App** | [part1.md](./job-app/part1.md) | [part2.md](./job-app/part2.md) | [part3.md](./job-app/part3.md) |

### **What to Expect in Each Lab**

**Part 1 (Iterations 0–5)** — Build a full CRUD front-end:
- A clear, **step‑by‑step walkthrough** for building the app.
- Each iteration includes a **sample solution** so you can compare your work or get unstuck.
- By the end of Part 1, you will have a fully functional React Frontend connected to an API.

**Part 2 (Iterations 6–7)** — Add authentication and route protection:
- **Iteration 6:** User signup & login with inline `useState` and `fetch`, JWT stored in `localStorage`.
- **Iteration 7:** Protected routes using `<Navigate>`, `Authorization: Bearer <token>` headers on POST/PUT/DELETE, and conditional rendering based on authentication state.

**Part 3 (Iteration 8)** — Refactor with custom hooks:
- **Iteration 8:** Extract reusable logic into custom hooks (`useField`, `useSignup`, `useLogin`). Replace repetitive `useState` + `onChange` pairs with `useField` and inline `fetch` calls with `useSignup` / `useLogin`.


