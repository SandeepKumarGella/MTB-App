# MTB-App (Movie Ticket Booking)

A complete Full-Stack Movie Ticket Booking application built with the MERN stack.

## 🚀 Features

### **User Side**
- **Authentication**: Secure registration and login with real-time password validation.
- **Movie Selection**: Browse "Now Showing" movies with dynamic availability status.
- **Search**: Fast search functionality to find movies by name.
- **Seat Selection**: Interactive seat map (5x20 grid) with real-time booked seat detection.
- **Booking**: Validate ticket quantities and seat selection before confirmation.
- **My Tickets**: View personal booking history with "Confirmed" ticket status.
- **Security**: Forgot/Change password flows implemented.

### **Admin Side**
- **Dashboard**: Secure dashboard for managing the movie library.
- **Movie Management**: Add new movies or delete existing ones.
- **Manual Overrides**: Directly mark movies as **SOLD OUT** or **BOOK ASAP**.
- **Real-time Sync**: Refresh button to update availability stats instantly.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Axios, React Router, CSS3 (Vanilla).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT (JSON Web Token), Bcryptjs.

---

## 📦 Getting Started

### **1. Prerequisites**
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### **2. Backend Setup**
1. Navigate to `MTB_Backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file with:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server: `npm run dev`.

### **3. Frontend Setup**
1. Navigate to `MTB_Frontend`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.

---

## 🛠️ Utility Scripts (Backend)

We've provided scripts to quickly get you started:

- **Seed Movies**: `node seedMovies.js` (Populates the DB with 20 mock movies).
- **Reset Admin**: `node resetAdmin.js` (Resets admin account to `admin` / `admin123`).

---

## 📄 License
This project is for educational purposes.
