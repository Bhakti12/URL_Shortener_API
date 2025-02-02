# URL Shortener API

A **Custom URL Shortener API** that shortens long URLs into user-defined aliases while categorizing links into topics like marketing, finance, healthcare, and social media. This scalable API also provides **advanced analytics** to track link usage.

## Features
- **Create Short URLs**: Generate a short URL from a long URL with a custom alias.
- **Redirect to Original URL**: Automatically redirect users to the original URL while logging analytics.
- **Get URL Analytics**: Retrieve analytics data based on alias, topic, or overall usage.

---

## Prerequisites
### 1. MongoDB
This project requires **MongoDB** as the primary database.

#### MongoDB Installation
- **Download & Install MongoDB**: Follow the official [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/).
- **Default Port**: MongoDB runs on port **`27017`** by default.

### 2. Node.js
Ensure you have **Node.js v20.11.1** installed.

#### Node.js Installation
- **Download & Install Node.js**: Follow the [official Node.js guide](https://nodejs.org/en/download/package-manager).
- **Install dependencies**:
  ```sh
  npm install
  ```
- **Start the application**:
  ```sh
  npm start
  ```

---

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### URL Management
| Endpoint                          | Method | Description                          |
|-----------------------------------|--------|--------------------------------------|
| `/url/`                           | `POST` | Create a short URL                  |
| `/url/:alias`                     | `GET`  | Redirect to the original URL        |

### Analytics
| Endpoint                          | Method | Description                          |
|-----------------------------------|--------|--------------------------------------|
| `/analytics/`                     | `GET`  | Get overall analytics               |
| `/analytics/topic/:topic`         | `GET`  | Get analytics by topic              |
| `/analytics/alias/:alias`         | `GET`  | Get analytics for a specific alias  |

### API Documentation (Swagger UI)
To access Swagger UI and explore API endpoints in your local environment:
```
http://localhost:3000/api-docs/
```

---

## Additional Notes
- The server runs on **port 3000** by default.
- Make sure MongoDB is running before starting the server.

---

Happy Coding! 🚀
