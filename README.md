# School Management API

A Node.js and MySQL based REST API for managing school data and listing schools based on proximity to a user’s location.

## Features

- Add new schools
- Store school details in MySQL
- Fetch schools sorted by nearest distance
- RESTful APIs
- MySQL database integration

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv

---

## Project Structure

```bash
school-management-api/
│
├── controllers/
│   └── schoolController.js
│
├── routes/
│   └── schoolRoutes.js
│
├── .env
├── .gitignore
├── db.js
├── server.js
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
```

### Navigate to Project

```bash
cd school-management-api
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

---

## Database Setup

Open MySQL Workbench and run:

```sql
CREATE DATABASE school_management;

USE school_management;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
);
```

---

## Run Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

# API Endpoints

## Add School

### POST `/addSchool`

### Request Body

```json
{
  "name": "SPR School",
  "address": "Narketpally",
  "latitude": 17.2041,
  "longitude": 79.1940
}
```

### Response

```json
{
  "message": "School added successfully",
  "success": true
}
```

---

## List Schools

### GET `/listSchools`

### Example

```bash
/listSchools?latitude=17.2041&longitude=79.1940
```

### Response

```json
[
  {
    "id": 1,
    "name": "SPR School",
    "address": "Narketpally",
    "latitude": 17.2041,
    "longitude": 79.1940,
    "distance": 0
  }
]
```

---

## Distance Calculation

The API calculates geographical distance between user coordinates and school coordinates using the Haversine Formula.

---

## Author

Pradeep