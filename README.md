# 🚀 Fyrre Magazine Backend
A professional, high-performance **Full-Stack Magazine Management API** built with the **MERN Stack**. This backend handles everything from role-based access control to secure content management and automated workflows.
---
## 🛠 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **Validation:** Zod / Joi
* **File Handling:** Multer & Cloudinary
* **Security:** Express Rate Limit & Bcrypt
---
## ✨ Key Features
* **Role-Based Access Control (RBAC):** Custom middlewares to manage `Admin` and `User` permissions effectively.
* **Secure Authentication:** Implementation of JWT for stateless authentication and `bcrypt` for secure password storage.
* **Professional File Management:** Integrated with **Cloudinary** for optimized image hosting and **Multer** for handling multipart/form-data.
* **API Security:** * Global rate limiting to prevent DDoS.
    * Specific limiters for authentication and file upload routes.
* **Standardized API Architecture:** Clean separation of concerns with dedicated Controllers, Routes, and Models.
* **Uniform Responses:** Custom `ApiError` and `ApiResponse` classes for consistent error handling across the app.
---
## 🚦 Getting Started
### Prerequisites
* Node.js (v16+ recommended)
* npm or yarn
* MongoDB Atlas account or local MongoDB instance
### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/fyrre-magazine-backend.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd magazine-backend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
### Environment Setup
Create a `.env` file in the root directory and add the following:
```env
# Server Config
PORT=5000
NODE_ENV=development
# Database
MONGODB_URI=your_mongodb_connection_string
# JWT Secret
JWT_ACCESS_SECRET=your_super_secret_key
# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Mail Config (Nodemailer)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USER=your_username
MAIL_PASS=your_password
```
### Running the App
```bash
# Run in development mode (with nodemon)
npm run dev
# Start in production
npm start
```
---
## 📂 Project Structure

```text
src/
├── config/          # Database connection and third-party service configs
├── controllers/     # Business logic and request handlers
├── middlewares/     # Authentication, Role checks, and Rate limiting
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── utilis/          # Global helper classes (ApiError, ApiResponse)
└── app.js           # Express app configuration & entry point
```
---
## 🛡 Security & Optimization
* **Rate Limiting:** Prevents brute force on login and spamming on file uploads.
* **Validation Middleware:** Validates request body/params before reaching the controllers.
* **Clean Code:** Follows a modular approach for better maintainability.
---
## 🤝 Contributing
Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
