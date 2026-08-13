# Student Attendance Management System API

## Project Description

This project is a Student Attendance Management System REST API.
It is developed using Node.js, Express.js, MySQL and Docker.
The project follows MVC (Model-View-Controller) architecture.

## Technologies Used

- Node.js
- Express.js
- MySQL 8.0
- Docker
- Docker Compose
- Postman
- MVC Architecture

## Base URL

http://localhost:5000

---

# API Endpoints

## 1. Create Student

### Method
POST

### Endpoint
/api/students

### Full URL
http://localhost:5000/api/students

### Sample Request

```json
{
    "name": "Nandini",
    "student_id": "20220655006",
    "email": "nandini@gmail.com",
    "department": "CSE",
    "attendance": 85
}