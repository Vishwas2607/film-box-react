🎬 FilmBox

📌 Project Description

FilmBox is a learning-focused movie discovery application built with React, TypeScript, and TailwindCSS.
The project explores working with multiple APIs, advanced UI patterns (sliders, infinite scroll), and real-world data fetching using React Query.

The goal of this project was to experiment, integrate features, and ship, while documenting tradeoffs instead of prematurely refactoring.

🛠️ Tech Stack

Frontend: React, TypeScript

Styling: TailwindCSS

APIs:

OMDb API

RapidAPI (movies data)

Data Fetching: React Query (useQuery)

State & Persistence: Local Storage

UI Utilities: Swiper, React Icons, Toast notifications

✨ Features

Search movies by name or keyword using OMDb API

Paginated search results (10 movies per page)

Save / remove movies using bookmark toggle

Persistent watchlist stored in local storage

Movie details view

### 🏠 Homepage Dynamic Sections (hidden on search)
The homepage features 4 dynamic horizontal carousels powered by **Swiper.js**, which are automatically hidden during active searches to prioritize results.

* Watchlist Highlights – Displays random movies from your saved `LocalStorage` watchlist.
* Recent & Upcoming – Fetches the latest 10 cinematic releases via `RapidAPI`.
* Top-Rated English – Lists the top 10 highest-rated English-language films from `RapidAPI`.
* Random Discovery – A "fun experiment" section generating 10 random movies using the `OMDb API`.


Infinite scroll on saved watchlist page

Responsive UI with Sidebar and Navbar

Light / Dark theme support

Toast notifications on save / remove actions

🗂️ Project Structure (High Level)
src/
 ├─ components/
 ├─ pages/
 ├─ toast/
 └─ App.tsx


Note: File and folder organization can be improved and is documented under limitations.

⚠️ Known Limitations & Tradeoffs

File and folder structure is not fully optimized

Some logic and UI patterns are repeated across components

DRY principles are applied but can be improved further

Some components handle multiple responsibilities

Minor UI bugs are present

Error handling and loading states can be refined

These decisions reflect a focus on feature building and learning, rather than architectural perfection.

🚀 Future Improvements

Refactor component structure and improve separation of concerns

Improve code reuse and abstraction

Resolve existing UI bugs

Enhance accessibility and keyboard navigation

Improve error handling and loading UX

Further optimize performance and caching strategies

This project is a candidate for a future refactor as a flagship portfolio piece.

🌍 Live Demo

👉 [Live Demo Link Here]

🔐 Environment Variables

Create a .env file in the root directory and add:

VITE_OMDB_API_KEY=your_key
VITE_OMDB_API_URL=your_url

VITE_RAPIDAPI_KEY=your_key
VITE_RAPIDAPI_HOST=your_host
VITE_RAPID_API_URL=your_url


The .env file is excluded via .gitignore.

📚 Learning Outcomes

Integrating multiple third-party APIs

Managing async data with React Query

Implementing pagination and infinite scroll

Building complex, responsive UIs

Using Swiper for dynamic content presentation

Persisting user data with local storage

Structuring a mid-sized React + TypeScript application

📎 Disclaimer

This is a learning project built during my MERN stack journey.
The codebase reflects my understanding at the time of development and is intentionally left unrefactored to document real learning progress.