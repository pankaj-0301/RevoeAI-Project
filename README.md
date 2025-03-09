# Next.js Dashboard with Node.js Backend

## Overview
This is a full-stack web application built with Next.js (frontend) and Node.js (backend). The application provides a dashboard with authentication, dynamic tables, Google Sheets integration, and real-time updates.

## Features
1. **Authentication (JWT-based)**
   - Users can sign up and log in.
   - Protected routes ensure only logged-in users can access the dashboard.
   - Automatic logout when the JWT token expires.

2. **Dashboard with Table (Google Sheets Integration)**
   - Users can create a table by clicking the "Create Table" button.
   - Specify column headers and data types (Text/Date).
   - Fetches data from a Google Sheet and displays it in a table.
   - Rows dynamically increase as data is added.
   - Real-time updates without excessive API calls.

3. **Dynamic Column Addition**
   - Users can add new columns dynamically (only on the dashboard, not in Google Sheets).
   - New columns appear at the end of the existing ones.
   - Column types: Text (default input), Date (date picker input).
   - Persistently stores dynamically added columns.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS, ShadcnUI
- **Backend**: Node.js (Express), MongoDB
- **Authentication**: JWT-based authentication
- **Real-time updates**: WebSockets or polling
- **Google Sheets API**: Fetch and update data from Google Sheets

---

## Installation & Setup

### Prerequisites
- Node.js (>= 16.x)
- MongoDB
- Google Sheets API credentials

### 1. Clone the Repository
```sh
git clone https://github.com/pankaj-0301/RevoeAI-Project

cd server
npm install

# Create a .env file in the backend directory and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
SHEET_ID=your_google_sheet_id


Start the Backend Server
npm start

Start the Frontend
npm run dev
