# 🏠 EstateInsight – Real Estate Data Analysis Platform

EstateInsight is a full-stack web application designed for analyzing and visualizing real estate price data.
Built with **Laravel (backend)** and **Angular (frontend)**, the platform provides powerful tools for exploring housing market trends through interactive charts and data comparison.

---

## 🚀 Overview

This project focuses on transforming raw real estate data into meaningful insights through:

* Interactive data visualization
* Dynamic filtering and comparison
* Secure user authentication
* Scalable full-stack architecture

---

## 🏗️ Architecture

```
EstateInsight/
├── backend-service/   # Laravel API (data & authentication)
└── frontend-app/      # Angular SPA (UI & visualization)
```

---

## ⚙️ Tech Stack

### Backend

* PHP 8+
* Laravel
* MySQL
* REST API
* Laravel Sanctum (Authentication)

### Frontend

* Angular
* TypeScript
* ApexCharts (Data visualization)
* Bootstrap

### DevOps

* Docker
* Docker Compose
* Nginx

---

## ✨ Key Features

* 📊 Interactive charts for real estate prices
* 🏙️ Multi-city data analysis and comparison
* 📈 Market segmentation (primary / secondary)
* 🔐 User authentication system (JWT / Sanctum)
* 🔍 Advanced filtering (city, date range, data type)
* 📥 Data export (JSON / XML)
* ⚡ Real-time UI updates

---

## 📊 Data Insights

* Analysis of housing prices over time
* Comparison between cities
* Visualization of market trends
* Integration of interest rate data

---

## 🐳 Docker Setup

```bash
docker compose up -d --build
```

Application доступна:

* Frontend: http://localhost:4200
* Backend: http://localhost:8000/api

---

## 🛠️ Local Setup

### Backend

```bash
cd backend-service
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

---

### Frontend

```bash
cd frontend-app
npm install
ng serve
```

---

## 🔐 Authentication

* User registration & login
* Token-based authentication (Sanctum)
* Protected API routes

---

## 📈 Project Highlights

* Full-stack architecture (Angular + Laravel)
* Data visualization using ApexCharts
* REST API integration
* Dockerized environment
* Clean and modular structure

---

## 🚀 Future Improvements

* AI-based price prediction
* Interactive maps
* Advanced analytics dashboard
* Real-time data updates
* Dark mode UI

---

## 👩‍💻 Author

**Salima Baccour**
Software Engineering Student | Full-Stack Developer

---

## ⭐ Conclusion

EstateInsight is a powerful data-driven web platform that demonstrates modern full-stack development and data visualization techniques applied to real-world scenarios.
