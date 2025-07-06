# 📚 Fullstack Todo & Vocabulary App

Ứng dụng giúp bạn **quản lý công việc hàng ngày (Todo)** và **học từ vựng theo chủ đề**.  
Giao diện hiển thị dạng **Google Calendar**, hỗ trợ đăng nhập, thêm/sửa/xoá todo, học từ mới, đánh dấu đã học,...

---

## 🧱 Kiến trúc hệ thống

DigitalOcean Droplet
├── Nginx (Reverse Proxy)
├── Frontend (React + Vite + TailwindCSS)
├── Backend (Node.js + Express + Sequelize + Swagger)
└── PostgreSQL (Database)

---

## 🧰 Công nghệ sử dụng

| Layer      | Tech Stack                                  |
| ---------- | ------------------------------------------- |
| Backend    | Node.js, Express, TypeScript, Sequelize     |
| Database   | PostgreSQL                                  |
| Frontend   | ReactJS, Vite, TailwindCSS, React Router    |
| Auth       | JWT                                         |
| API Docs   | Swagger UI                                  |
| Deployment | Docker, Docker Compose, Nginx, DigitalOcean |

---

## 📁 Cấu trúc thư mục repo

project-root/
├── backend/ # API + Swagger + DB connection
│ ├── Dockerfile
│ └── .env
│
├── frontend/ # UI React
│ ├── Dockerfile
│ └── .env
│
├── nginx/ # Reverse proxy config
│ └── default.conf
│
├── docker-compose.yml # Orchestrates all services
└── README.md

---

## 🐳 Triển khai bằng Docker

### 1️⃣ Cấu hình môi trường

#### `frontend/.env`

```env
VITE_API_URL=http://your-domain.com
backend/.env:
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=todoapp
PORT=4000
2️⃣ Chạy hệ thống
docker compose up -d --build
```
