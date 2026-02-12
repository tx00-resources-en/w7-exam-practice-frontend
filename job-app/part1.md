# Frontend Activity (Beginner-Friendly)

## Overview

In this activity you will connect a **React** front-end to an **Express + MongoDB** back-end.  
By the end you will have a working app that can **Create, Read, Update and Delete** (CRUD) jobs — all through regular (non-protected) API routes. No authentication is involved.

**How to use this project:**

| Folder | Purpose |
|---|---|
| `job-app/backend/` | The fully working Express API. You do **not** need to change anything here. |
| `job-app/frontend/step0/` | Your **starting point**. Copy this folder and work inside the copy. |
| `job-app/frontend/step1/` – `step5/` | Sample solutions for each iteration. Only look at them **after** you have tried on your own. |

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
| 1 | Add a job | `POST` | `AddJobPage.jsx` |
| 2 | List all jobs | `GET` | `HomePage.jsx`, `JobListings.jsx`, `JobListing.jsx` |
| 3 | View one job | `GET` | `App.jsx`, `JobListing.jsx`, `JobPage.jsx` |
| 4 | Delete a job | `DELETE` | `JobPage.jsx` |
| 5 | Edit a job | `PUT` | `App.jsx`, `JobPage.jsx`, `EditJobPage.jsx` |

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
| 0:15 – 0:45 | Iteration 1 — Add a job (POST) |
| 0:45 – 1:15 | Iteration 2 — List all jobs (GET) |
| 1:15 – 1:45 | Iteration 3 — View one job (GET) |
| 1:45 – 2:15 | Iteration 4 — Delete a job (DELETE) |
| 2:15 – 3:00 | Iteration 5 — Edit a job (PUT) |

If you are behind: keep going in order, but do the minimum working version for each step before moving on. -->

### Commit Messages (Best Practice)

Use small commits that describe *what* changed. Recommended format:

- `feat(add-job): send POST request from AddJobPage form`
- `feat(list-jobs): fetch and display all jobs on HomePage`
- `refactor(job-listing): accept job prop and display data`
- `chore: install dependencies`

Rule of thumb: one commit = one idea you can explain in one sentence.

---

## The Backend API (Reference)

The backend is already built. Here is everything you need to know about it.

**Base URL:** `http://localhost:4000`  
(The Vite proxy in `vite.config.js` forwards any request starting with `/api` to this URL, so in your React code you only write `/api/jobs`.)

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/jobs` | Create a new job | JSON (see below) |
| `GET` | `/api/jobs` | Get all jobs | — |
| `GET` | `/api/jobs/:jobId` | Get a single job by ID | — |
| `PUT` | `/api/jobs/:jobId` | Update a job by ID | JSON (see below) |
| `DELETE` | `/api/jobs/:jobId` | Delete a job by ID | — |

**Job JSON shape** (what the API expects and returns):

```json
{
  "title": "Frontend Developer",
  "type": "Full-Time",
  "description": "Build React apps",
  "company": {
    "name": "Acme Inc.",
    "contactEmail": "hr@acme.com",
    "contactPhone": "123-456-7890"
  }
}
```

> **Tip:** You can test the API with a tool such as VS Code REST Client, Postman, or `curl` before writing any React code. That way you will know exactly what the API returns.

---

## Instructions

### Iteration 0: Setup

1. Clone [the starter repository](https://github.com/tx00-resources-en/w7-exam-practice-frontend) into a separate folder.
   - After cloning, **delete** the `.git` directory so you can start your own Git history (`git init`).

2. **Start the backend:**
   ```bash
   cd job-app/backend
   cp .env.example .env      # create your .env file (edit MONGO_URI if needed)
   npm install
   npm run dev
   ```
   You should see `Server running on port 4000` and `MongoDB Connected`.

3. **Start the frontend:**
   ```bash
   cd job-app/frontend/step0
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

**You are done with Iteration 0 when:**

- The backend is running on `http://localhost:4000`.
- The frontend is running on `http://localhost:5173`.
- You can see the basic UI (Navbar with "Home" and "Add Job" links).

---

### Iteration 1: Add a Job (`POST`)

**Goal:** Make the "Add Job" form actually save a new job to the database.

**File to change:** `src/pages/AddJobPage.jsx`

Right now the form is there but nothing happens when you press "Add Job" — the `submitForm` function only logs to the console and the inputs are not connected to state.

**What to do:**

1. **Create state for each form field** using `useState`:
   ```jsx
   const [title, setTitle] = useState("");
   const [type, setType] = useState("Full-Time");
   const [description, setDescription] = useState("");
   const [companyName, setCompanyName] = useState("");
   const [contactEmail, setContactEmail] = useState("");
   const [contactPhone, setContactPhone] = useState("");
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

3. **Write an `addJob` function** that sends a POST request:
   ```jsx
   const addJob = async (newJob) => {
     try {
       const res = await fetch("/api/jobs", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(newJob),
       });
       if (!res.ok) throw new Error("Failed to add job");
     } catch (error) {
       console.error(error);
     }
   };
   ```

4. **Update `submitForm`** to build a job object from the state and call `addJob`, then navigate home:
   ```jsx
   import { useNavigate } from "react-router-dom";
   // inside the component:
   const navigate = useNavigate();

   const submitForm = (e) => {
     e.preventDefault();
     const newJob = {
       title,
       type,
       description,
       company: { name: companyName, contactEmail, contactPhone },
     };
     addJob(newJob);
     navigate("/");
   };
   ```

> **Sample solution (after trying yourself):** [Iteration 1 – POST](./frontend/step1/src/pages/AddJobPage.jsx)

**You are done with Iteration 1 when:**

- You fill in the form and click "Add Job".
- The page navigates back to Home.
- If you check MongoDB (e.g., MongoDB Compass or the API with `GET /api/jobs`), the new job is there.

> **Note:** The home page does not show jobs yet — that is the next iteration.

---

### Iteration 2: Fetch and Display All Jobs (`GET`)

**Goal:** When the Home page loads, fetch all jobs from the API and display them as a list.

**Files to change:** `src/pages/HomePage.jsx`, `src/components/JobListings.jsx`, `src/components/JobListing.jsx`

#### Step A — Fetch jobs in `HomePage.jsx`

1. Import `useState` and `useEffect` from React.
2. Create three pieces of state:
   ```jsx
   const [jobs, setJobs] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   ```
3. Use `useEffect` to fetch jobs when the component mounts:
   ```jsx
   useEffect(() => {
     const fetchJobs = async () => {
       try {
         const res = await fetch("/api/jobs");
         if (!res.ok) throw new Error("Could not fetch jobs");
         const data = await res.json();
         setJobs(data);
         setIsPending(false);
       } catch (err) {
         setError(err.message);
         setIsPending(false);
       }
     };
     fetchJobs();
   }, []);
   ```
4. Render loading, error, and success states:
   ```jsx
   return (
     <div className="home">
       {error && <div>{error}</div>}
       {isPending && <div>Loading...</div>}
       {jobs && <JobListings jobs={jobs} />}
     </div>
   );
   ```

#### Step B — Accept and map jobs in `JobListings.jsx`

The component currently renders a single hard-coded `<JobListing />`. Change it to accept a `jobs` prop and map over the array:

```jsx
const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobListing key={job.id} job={job} />
      ))}
    </div>
  );
};
```

#### Step C — Display job data in `JobListing.jsx`

Accept a `job` prop and display the actual values:

```jsx
const JobListing = ({ job }) => {
  return (
    <div className="job-preview">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
    </div>
  );
};
```

> **Sample solution (after trying yourself):** [Iteration 2 – GET all](./frontend/step2/)

**Compare your solution with the sample:**

- Where is the jobs state stored?
- When does `fetch` run? (Hint: only once, on mount — because of the `[]` dependency array.)
- How do you handle loading and error states?

**You are done with Iteration 2 when:**

- The Home page shows all jobs from the database.
- When you add a new job (Iteration 1) and navigate back to Home, the new job appears in the list (the page re-fetches on mount).

---

### Iteration 3: View a Single Job (`GET` one)

**Goal:** Click a job in the list to open a detail page that shows all its information.

**Files to change:** `src/App.jsx`, `src/components/JobListing.jsx`, `src/pages/JobPage.jsx`

#### Step A — Add a new route in `App.jsx`

Import `JobPage` and add a route for it:

```jsx
import JobPage from "./pages/JobPage";
// inside <Routes>:
<Route path="/jobs/:id" element={<JobPage />} />
```

The `:id` is a **URL parameter**. React Router will match URLs like `/jobs/abc123` and make `abc123` available via the `useParams` hook.

#### Step B — Link each job to its detail page in `JobListing.jsx`

Import `Link` from `react-router-dom` and wrap the job title:

```jsx
import { Link } from "react-router-dom";

// inside the return:
<Link to={`/jobs/${job.id}`}>
  <h2>{job.title}</h2>
</Link>
```

> **Why `Link` instead of `<a href>`?** `<Link>` navigates without a full page reload, keeping React state alive. `<a href>` reloads the entire page.

#### Step C — Fetch and display the job in `JobPage.jsx`

1. Import `useParams`, `useNavigate`, `useEffect`, and `useState`.
2. Get the `id` from the URL and fetch the single job:
   ```jsx
   const { id } = useParams();
   const [job, setJob] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     const fetchJob = async () => {
       try {
         const res = await fetch(`/api/jobs/${id}`);
         if (!res.ok) throw new Error("Network response was not ok");
         const data = await res.json();
         setJob(data);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
     fetchJob();
   }, [id]);
   ```
3. Display loading, error, and job data (including company email and phone).
4. Add a "Back" button:
   ```jsx
   const navigate = useNavigate();
   // inside the return:
   <button onClick={() => navigate("/")}>Back</button>
   ```

> **Sample solution (after trying yourself):** [Iteration 3 – GET one](./frontend/step3/)

**You are done with Iteration 3 when:**

- You can click a job title on the Home page and see all its details on a dedicated page.
- The "Back" button returns you to the Home page.

**Discussion Questions:**

- What is the difference between a **page** and a **component** in this app?
- Why do we pass `[id]` as the dependency array in `useEffect`?

---

### Iteration 4: Delete a Job (`DELETE`)

**Goal:** Add a "Delete" button to the job detail page that removes the job from the database.

**File to change:** `src/pages/JobPage.jsx`

The route and the detail page already exist from Iteration 3. You only need to add delete functionality.

**What to do:**

1. **Write a `deleteJob` function:**
   ```jsx
   const deleteJob = async (jobId) => {
     try {
       const res = await fetch(`/api/jobs/${jobId}`, {
         method: "DELETE",
       });
       if (!res.ok) throw new Error("Failed to delete job");
     } catch (error) {
       console.error("Error deleting job:", error);
     }
   };
   ```

2. **Write a click handler** with a confirmation dialog:
   ```jsx
   const onDeleteClick = (jobId) => {
     const confirm = window.confirm("Are you sure you want to delete this job?");
     if (!confirm) return;
     deleteJob(jobId);
     navigate("/");
   };
   ```

3. **Add a "Delete" button** in the JSX (next to or instead of the "Back" button):
   ```jsx
   <button onClick={() => onDeleteClick(job._id)}>Delete</button>
   ```

> **Sample solution (after trying yourself):** [Iteration 4 – DELETE](./frontend/step4/)

**You are done with Iteration 4 when:**

- You click "Delete" on a job detail page.
- A confirmation dialog appears.
- After confirming, the app navigates to Home and the deleted job is no longer in the list.

---

### Iteration 5: Edit a Job (`PUT`)

**Goal:** Add an "Edit" button on the job detail page that opens a pre-filled form. Submitting the form updates the job in the database.

**Files to change:** `src/App.jsx`, `src/pages/JobPage.jsx`, `src/pages/EditJobPage.jsx`

#### Step A — Add a new route in `App.jsx`

Import `EditJobPage` and add a route:

```jsx
import EditJobPage from "./pages/EditJobPage";
// inside <Routes>:
<Route path="/edit-job/:id" element={<EditJobPage />} />
```

#### Step B — Add an "Edit" button in `JobPage.jsx`

Add a button that navigates to the edit page:

```jsx
<button onClick={() => navigate(`/edit-job/${job._id}`)}>Edit</button>
```

#### Step C — Build the edit form in `EditJobPage.jsx`

This is the most complex page. It combines patterns you already used in earlier iterations:

1. **Get the `id` from the URL** with `useParams` (same pattern as `JobPage`).
2. **Fetch the existing job** with `useEffect` (same pattern as `JobPage`).
3. **Create state for each form field** with `useState` (same pattern as `AddJobPage`).
4. **Pre-fill the form** — after fetching, set each state variable to the fetched value:
   ```jsx
   useEffect(() => {
     const fetchJob = async () => {
       const res = await fetch(`/api/jobs/${id}`);
       const data = await res.json();
       setJob(data);
       setTitle(data.title);
       setType(data.type);
       setDescription(data.description);
       setCompanyName(data.company.name);
       setContactEmail(data.company.contactEmail);
       setContactPhone(data.company.contactPhone);
     };
     fetchJob();
   }, [id]);
   ```
5. **Write an `updateJob` function** that sends a PUT request:
   ```jsx
   const updateJob = async (updatedJob) => {
     try {
       const res = await fetch(`/api/jobs/${updatedJob.id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(updatedJob),
       });
       if (!res.ok) throw new Error("Failed to update job");
       return true;
     } catch (error) {
       console.error("Error updating job:", error);
       return false;
     }
   };
   ```
6. **Handle form submission:**
   ```jsx
   const submitForm = async (e) => {
     e.preventDefault();
     const updatedJob = {
       id,
       title,
       type,
       description,
       company: { name: companyName, contactEmail, contactPhone },
     };
     const success = await updateJob(updatedJob);
     if (success) navigate(`/jobs/${id}`);
   };
   ```
7. **Render the form** — this is almost identical to `AddJobPage`, but with an "Update Job" button and a loading/error check before the form.

> **Sample solution (after trying yourself):** [Iteration 5 – PUT](./frontend/step5/)

**You are done with Iteration 5 when:**

- You can click "Edit" on a job detail page.
- The edit form opens with the current values pre-filled.
- After submitting, you are redirected to the detail page showing the updated data.
- The updated data also appears correctly in the jobs list on the Home page.
