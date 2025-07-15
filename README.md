# 🎓 TrackStudy - Course Notes Monitoring System
**TrackStudy** is a modern, full-stack web application designed to manage and monitor educational course materials with ease.  
It enables **role-based access** for Students, Teachers, and Admins, along with **analytics**, **file upload/download**, and **Firebase OAuth integration**.

---

## 📌 Table of Contents
- [✨ Features](#-features)
- [🧠 Project Overview](#-project-overview)
- [📐 Architecture](#-architecture)
- [🛠️ Tech Stack](#-tech-stack)
- [🧭 Folder Structure](#-folder-structure)
- [📸 Screenshots](#-screenshots)
- [🧰 Local Setup Guide](#-local-setup-guide)
- [🔐 Firebase OAuth Setup](#-firebase-oauth-setup)
- [🧑‍💻 Contributors](#-contributors)
- [🚀 Deployment Suggestions](#-deployment-suggestions)
- [📄 License](#-license)

---
## 👨‍💻 Contributors

| Name         | Role                | GitHub Profile                             |
|--------------|---------------------|---------------------------------------------|
| Manushree N  | Full Stack Developer | [@manushree10](https://github.com/manushree10) |

---
## ✨ Features

- 🔐 **Role-Based Login**: Admin, Teacher, and Student dashboards
- 🧾 **Course Upload/Download** with file handling via Spring Boot
- ✅ **Google/GitHub Authentication** using Firebase OAuth
- 📊 **Admin Analytics Dashboard** with dynamic charts (Recharts)
- 💾 **MySQL integration** for persistent data
- 🌐 Fully responsive UI built with React.js

---

## 🧠 Project Overview

> A smart course note tracking platform ideal for institutions and e-learning environments.

- Admin can manage users and view system analytics
- Teachers can upload notes, materials, or resources
- Students can view/download resources
- Authenticated access ensures data security

---
## 📐 Architecture

React (Frontend) ---> Spring Boot (Backend) ---> MySQL (Database)
|
Firebase Auth (OAuth)


---

## 🛠️ Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Frontend     | React, Tailwind/Bootstrap |
| Backend      | Java, Spring Boot         |
| Database     | MySQL                     |
| Charts       | Recharts                  |
| Auth         | Firebase (Google, GitHub) |
| Tools        | Git, GitHub, Postman      |

---

## 🧭 Folder Structure

```bash
.
├── backend/
│   └── src/             # Spring Boot controllers, models
│   └── uploads/         # File storage
├── frontend/
│   └── src/             # React Components, Routes
│   └── public/
├── screenshots1/        # README images
├── README.md
├── package.json
├── pom.xml
└── .gitignore






## 📸 Screenshots

### 🔑 Login & Signup
<img src="./screenshots1/signinlogin.png" width="800"/>

### ⚙️ Admin Dashboard
<img src="./screenshots1/users.png" width="80%"/>
<img src="./screenshots1/courses.png" width="80%"/>
<img src="./screenshots1/graph.png" width="80%"/>

### 👨‍🏫 Teacher Dashboard
<img src="./screenshots1/teacher.png" width="80%"/>

### 🎓 Student Dashboard
<img src="./screenshots1/student.png" width="80%"/>

---

## 🔧 Local Setup

### 🖥️ 1. Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run


    🖥️ 2. Frontend (React)
    cd frontend
    npm install
    npm start

👤 Author
Developed and maintained by **Manushree N**

---
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
