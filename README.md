# Resume Scorer MERN Stack Application


## Overview

This is a web application built with the MERN stack (MongoDB, Express, React, Node.js) designed to score and evaluate resumes based on specific criteria. The application enables users to upload resumes, which are then analyzed and scored based on various factors, such as keywords, structure, and formatting.

## Screenshots - 
<img width="1008" height="588" alt="image" src="https://github.com/user-attachments/assets/c1fc1228-e354-4bb7-a084-d91b08930284" />

---
<img width="999" height="601" alt="image" src="https://github.com/user-attachments/assets/3779f42d-7012-464a-987e-a8930a084e99" />

---
<img width="880" height="272" alt="image" src="https://github.com/user-attachments/assets/ee60e9cb-0dc1-4588-878d-20e2589b1e06" />


## Features

- **User Authentication**: Secure login and registration system.
- **Resume Upload**: Users can upload their resumes for analysis.
- **Resume Scoring**: The application evaluates resumes and provides a score based on predefined criteria.
- **Frontend**: A React-based interface for interacting with the app.
- **Backend**: A Node.js and Express server to handle authentication, file uploads, and scoring logic.

## Technologies

- **MongoDB**: For storing user data and resume information.
- **Express**: Server-side framework for handling requests.
- **React**: Frontend framework for building the user interface.
- **Node.js**: JavaScript runtime for building the backend.
- **Tailwind CSS**: Utility-first CSS framework for styling the frontend.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or using a cloud service like MongoDB Atlas)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArjunJagdale/MERN-STACK-RESUME-SCORE.git
   cd MERN-STACK-RESUME-SCORE
   ```

2. **Backend Setup:**

   * Navigate to the backend folder:

     ```bash
     cd backend
     ```
   * Install the required dependencies:

     ```bash
     npm install
     ```
   * Create a `.env` file for environment variables (e.g., MongoDB URI, JWT secrets):

     ```bash
     touch .env
     ```
   * Run the server:

     ```bash
     npm start
     ```

3. **Frontend Setup:**

   * Navigate to the frontend folder:

     ```bash
     cd frontend
     ```
   * Install the required dependencies:

     ```bash
     npm install
     ```
   * Run the frontend development server:

     ```bash
     npm start
     ```

4. Open the app in your browser at `http://localhost:3000`.

## Folder Structure

### Backend

* **models/**: Contains MongoDB models, such as `User.js`.
* **routes/**: API routes for handling authentication, resume uploads, and scoring.
* **server.js**: Main entry point for the Express server.

### Frontend

* **src/**: Contains the main React code, including components and pages.
* **public/**: Public assets like images and the HTML template.
* **App.js**: Main React component.
* **api.js**: Utility for making API calls to the backend.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and create a pull request with your improvements or bug fixes.

## License

This project is licensed under the MIT License.

This `README.md` provides a detailed guide for setting up and running the MERN stack resume scorer app. If you need additional details or modifications, let me know!
