# 📝 Blog Application Backend

This is a **Dockerized Node.js backend** for a blog application. It uses **MongoDB** for data persistence, **Redis** for session storage, and **Nginx** for load balancing. The app is structured using **Express.js** and **Mongoose** as the ORM for MongoDB.

---

## 🚀 Features

- RESTful API for user authentication and blog posts
- Session-based authentication with Redis
- MongoDB integration via Mongoose
- Dockerized setup for development and deployment
- Nginx as a reverse proxy and load balancer

---

## 🛠️ Tech Stack

| Technology  | Purpose                        |
|-------------|--------------------------------|
| Node.js     | Backend runtime environment    |
| Express.js  | Web framework                  |
| MongoDB     | NoSQL database                 |
| Mongoose    | MongoDB object modeling (ORM)  |
| Redis       | Session storage                |
| Docker      | Containerization               |
| Nginx       | Load balancing & reverse proxy |

---

## 🐳 Dockerized Services

The application is fully containerized using Docker. Here's a breakdown of the services:

- **App Service**: Runs the Node.js application.
- **MongoDB**: Stores blog posts and user data.
- **Redis**: Manages session data.
- **Nginx**: Acts as a reverse proxy/load balancer for the Node.js app.



