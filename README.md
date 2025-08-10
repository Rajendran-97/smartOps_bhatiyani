# SmartOps – Business Metrics & Insights Dashboard

Overview:
SmartOps is a full-stack web application designed to help businesses track key metrics, visualize performance trends, and receive insights for better decision-making.

This project is developed as part of the Bhatiyani Astute Intelligence Full Stack Developer Assessment.

It includes:

- Dashboard – Displays charts and summary data(From JSON server)
- Metrics Management – Add, edit, delete, and view business metrics
- Insights Page – Displays business insights from a JSON server
- FastAPI Backend – Handles metrics CRUD operations
- JSON Server – Provides mock dashboard and insights data

---

Tech Stack

Frontend:

- React (JavaScript)
- Material UI (MUI) for components and styling
- Chart.js for visualizations

Backend:

- FastAPI (Python)
- SQLite (via SQLAlchemy ORM)

Other Tools:

- JSON Server (for mock data)
- Fetch API for frontend-backend communication

---

Project Structure

smartOps_bhatiyani/
│
├── smartOps_bhatiyani_frontend/
│ ├── src/
│ │ ├── components/ #charts and kpiCards
│ │ ├── pages/ # Page components (Dashboard, Metrics, Insights)
│ │ ├── App.js # Main app routing
│ │ └── index.js # React entry point
│ ├── package.json # Frontend dependencies
│
├── smartOps_bhatiyani_backend/ # FastAPI backend
│ ├── main.py # Main API entry point
│ ├── database.py # Database connection
│ ├── models.py # SQLAlchemy models
│ ├── routes/metrics.py # Metrics CRUD endpoints
│
├── db.json # Mock data for JSON server
├── prompts.md # AI prompts used in development
├── README.md # Project documentation

Installation & Setup Instructions

1. Clone the Repository
2. Start the Backend (FastAPI)
3. Start the Mock Data Server (JSON Server)
4. Start the Frontend (React + MUI)

Using the Application

    Dashboard – View monthly revenue chart & summary stats

    Metrics – Add, edit, delete business metrics (CRUD)

    Insights – View business tips, growth notices, and warnings

Recommended Order to Start Services

    Backend (FastAPI) → Port 8000

    Mock Server (JSON Server) → Port 3001

    Frontend (React) → Port 3000
