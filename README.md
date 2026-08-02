# Job Application Tracker - Frontend

React frontend for the **Group 9 TTP Summer 2026 Capstone II** Job Application Tracker.

## Features

- View all job applications
- View one job application
- Create a new job application
- Edit an existing job application
- Delete a job application
- Track company, position, status, location, application date, job link, and notes
- Display loading, empty, and error states
- Validate required fields before submitting
- Navigate with React Router
- Use responsive styling

## Project Links

- Frontend Repository: Add frontend repository URL
- Backend Repository: Add backend repository URL
- GitHub Organization: Add GitHub organization URL
- Project Board: Add GitHub Project Board URL

### Local Links

These links work only while both servers are running:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Live Links

- Frontend: Add Vercel URL after deployment
- Backend: Add Render URL after deployment

## Planning Documents

The shared planning documents live in this repository:

- [`JOB-APPLICATION-TABLE-DESIGN.md`](JOB-APPLICATION-TABLE-DESIGN.md) — database design and naming standard
- [`PROJECT-BOARD.md`](PROJECT-BOARD.md) — issues, priorities, and definitions of done
- [`TEAM-NORMS.md`](TEAM-NORMS.md) — team working agreements

## Team

| Name | Role |
|---|---|
| Dhimy Jean | Add role |
| Daniel | Add role |

**TA:** Nevin

## Technologies

- React
- Vite
- React Router
- JavaScript
- HTML
- CSS
- Fetch API

## Application Architecture

```text
User
  │
  ▼
React Frontend
  │
  │ HTTP requests using Fetch API
  ▼
Express REST API
  │
  ▼
Sequelize
  │
  ▼
PostgreSQL Database
```

## Full Project Structure

The frontend and backend are **separate repositories**. They can be stored inside one local parent folder:

```text
job-application-tracker/
│
├── job-application-tracker-backend/
│   ├── models/
│   │   ├── index.js
│   │   └── JobApplication.js
│   ├── routes/
│   │   └── applications.js
│   ├── app.js
│   ├── db.js
│   ├── seed.js
│   ├── .env                  (not committed)
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
└── job-application-tracker-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── ApplicationCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── ApplicationPage.jsx
    │   │   ├── CreateApplicationPage.jsx
    │   │   ├── EditApplicationPage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── .env                  (not committed)
    ├── .env.example
    ├── .gitignore
    ├── eslint.config.js
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── JOB-APPLICATION-TABLE-DESIGN.md
    ├── PROJECT-BOARD.md
    ├── TEAM-NORMS.md
    ├── vercel.json
    └── vite.config.js
```

The parent folder is only a convenience for local development. Each subfolder is its own Git repository with its own remote. Do not run `git init` in the parent folder.

## Frontend Structure

```text
job-application-tracker-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ApplicationCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ApplicationPage.jsx
│   │   ├── CreateApplicationPage.jsx
│   │   ├── EditApplicationPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── .env                  (not committed)
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── README.md
├── JOB-APPLICATION-TABLE-DESIGN.md
├── PROJECT-BOARD.md
├── TEAM-NORMS.md
├── vercel.json
└── vite.config.js
```

`index.html` and `eslint.config.js` are created by the Vite React template and stay at the project root.

`Navbar.jsx` and `Footer.jsx` are reusable components rendered from `App.jsx` so they appear consistently throughout the application.

API requests are made inside the page or component that uses the data, following the TTP project structure. There is no shared API helper file in the MVP.

## File Responsibilities

| File | Responsibility |
|---|---|
| `Navbar.jsx` | Displays the main navigation links |
| `Footer.jsx` | Displays the shared footer |
| `ApplicationCard.jsx` | Displays a summary of one job application and links to its detail page |
| `Home.jsx` | Fetches and displays all job applications |
| `ApplicationPage.jsx` | Fetches and displays one job application, and handles delete |
| `CreateApplicationPage.jsx` | Creates a new job application |
| `EditApplicationPage.jsx` | Loads and updates an existing job application |
| `NotFoundPage.jsx` | Handles invalid frontend routes |
| `App.jsx` | Defines routes and the shared page layout |
| `main.jsx` | Starts the React application and wraps `App` in `BrowserRouter` |
| `index.css` | Contains the application styles |
| `vercel.json` | Tells Vercel to serve `index.html` for all routes |

`BrowserRouter` lives in `main.jsx`. `Routes` and `Route` live in `App.jsx`. Keeping them separate lets `App.jsx` render `Navbar` and `Footer` around the routed pages.

## Frontend Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | `Home.jsx` | Display all job applications |
| `/applications/new` | `CreateApplicationPage.jsx` | Create a job application |
| `/applications/:id` | `ApplicationPage.jsx` | Display one job application |
| `/applications/:id/edit` | `EditApplicationPage.jsx` | Edit a job application |
| `*` | `NotFoundPage.jsx` | Handle invalid routes |

`/applications/new` must be declared **before** `/applications/:id` so that `new` is not matched as an ID.

## Backend API

The frontend sends requests to these backend routes:

| Method | Route | Purpose | Expected Status |
|---|---|---|---|
| `GET` | `/api/applications` | Get all job applications | `200` |
| `GET` | `/api/applications/:id` | Get one job application | `200` or `404` |
| `POST` | `/api/applications` | Create a job application | `201` or `400` |
| `PATCH` | `/api/applications/:id` | Update a job application | `200`, `400`, or `404` |
| `DELETE` | `/api/applications/:id` | Delete a job application | `204` or `404` |

`fetch` does not throw on `4xx` or `5xx` responses. Every request must check `response.ok` and read the `error` field from the JSON body before updating state.

`DELETE` returns `204` with no body, so do not call `response.json()` on a successful delete.

## Page Requirements

Every page that fetches data must handle four states:

| State | Requirement |
|---|---|
| Loading | Show a loading message while the request is in flight |
| Error | Show the message from the API and a way to retry or go back |
| Empty | On `Home.jsx`, show a friendly message and a link to create the first application |
| Success | Render the data |

Additional requirements:

- Both forms mark `company`, `position`, and `status` as required, and block submission when they are blank.
- `status` is a `<select>` limited to the six allowed values, so an invalid status can never be sent.
- `EditApplicationPage.jsx` pre-fills the form with the existing record before allowing edits.
- Delete asks for confirmation before sending the request, then navigates back to `/`.
- Every form input has a matching `<label>`, and every button has readable text. This is an MVP requirement, not a stretch goal.

## Styling

`index.css` holds all styles for the MVP. There is no CSS framework and no per-component stylesheet.

- The layout must work on a narrow phone screen and on a desktop screen.
- Use a simple mobile-first approach with one or two media query breakpoints.
- The application list should stack in a single column on small screens.
- Do not use fixed pixel widths that cause horizontal scrolling on mobile.

## Run Locally

Both servers must be running. Start the backend first.

### Backend

```bash
cd ~/TTPR/job-application-tracker/job-application-tracker-backend
npm install
npm run dev
```

Run seed data when needed:

```bash
npm run seed
```

### Frontend

Open another terminal:

```bash
cd ~/TTPR/job-application-tracker/job-application-tracker-frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:3000
```

Update the paths if the project is stored in a different location.

## Environment Variable

Create a `.env` file in the frontend repository:

```env
VITE_API_URL=http://localhost:3000
```

Create a `.env.example` file:

```env
VITE_API_URL=http://localhost:3000
```

Rules for this value:

- It is the **origin only**. Do not include `/api` and do not add a trailing slash.
- Fetch calls build the full path themselves, for example `${import.meta.env.VITE_API_URL}/api/applications`.
- The variable must start with `VITE_`, or Vite will not expose it to the browser.
- Vite replaces this value at **build time**, not at runtime. Changing it on Vercel requires a redeploy before the change takes effect.

Do not commit the real `.env` file. The frontend `.gitignore` must include `node_modules`, `.env`, and `dist`.

## Vercel Configuration

React Router handles `/applications/3` in the browser, but a direct visit or a refresh sends that path to Vercel, which has no such file and returns 404. `vercel.json` fixes this by serving `index.html` for every path:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This file must be committed before the first deployment, or refreshing on any page except `/` will break.

## Testing

Run:

```bash
npm run lint
npm run build
```

Both must pass with no errors before opening a pull request. `npm run build` catches import and syntax problems that the dev server tolerates.

Verify manually:

- All applications load on `/`
- The empty state appears when the database has no records
- One application opens from a card link
- The create form works and redirects to the new application
- The create form blocks submission when a required field is blank
- The edit form loads existing data into every field
- The edit form saves changes and they persist after refresh
- Delete asks for confirmation and removes the record
- An unknown ID such as `/applications/9999` shows an error, not a blank page
- An unknown path such as `/nonsense` shows `NotFoundPage`
- Loading, empty, and error states appear correctly
- Direct URLs work when pasted into a fresh tab
- Pages still work after refresh
- The API error message is shown when the backend is stopped
- Layout works on desktop and mobile widths

## Deployment

| Layer | Service |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |

### Deployment Order

Deploy in this order, because each service needs the other's URL:

1. Create the Neon database.
2. Deploy the backend to Render with a temporary `CLIENT_URL`.
3. Deploy this frontend to Vercel with `VITE_API_URL` set to the live Render URL.
4. Return to Render, set `CLIENT_URL` to the live Vercel URL, and redeploy.

### Vercel Settings

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable, set in the Vercel dashboard rather than a committed file:

```env
VITE_API_URL=https://your-render-backend-url
```

The backend CORS settings must allow the deployed Vercel frontend URL, or every request will fail in the browser while still working in Postman.

### After Deployment

- Test all five CRUD flows against the live site
- Refresh on a detail page to confirm the `vercel.json` rewrite works
- Confirm the first load may be slow, because the Render free tier sleeps after inactivity and can take roughly 50 seconds to wake
- Add the live Vercel URL to this README and to the backend README
