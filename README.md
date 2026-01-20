# 📝 User-Based Notes API

A professional, secure, and scalable REST API for note-taking, built with NestJS.

## 🚀 Features

### 🔐 Authentication & Security

- **JWT Authentication**: Secure login and registration.
- **Global Guards**: All endpoints are protected by default.
- **Public Decorator**: Specific endpoints (login/register) marked as public.
- **Password Hashing**: Bcrypt integration for secure password storage.
- **Swagger Auth**: Bearer Token support in Swagger UI.

### 🏗️ Architecture

- **Modular Design**: Features separated into modules (Auth, Users, Notes, etc.).
- **TypeORM**: Database ORM with MySQL.
- **Docker**: Containerized database setup.
- **DTO Validation**: Global validation pipes using class-validator.

## 🛠️ Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: MySQL 5.7 (Dockerized)
- **ORM**: TypeORM
- **Auth**: Passport, JWT, Bcrypt
- **Documentation**: Swagger (OpenAPI)

## 🏃‍♂️ Getting Started

1.  **Clone the repo**

    ```bash
    git clone https://github.com/ahmetakaslan1/user-based-note.git
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start Database (Docker)**

    ```bash
    docker-compose up -d
    ```

4.  **Run Application**

    ```bash
    npm run start:dev
    ```

5.  **Explore API**
    Go to: `http://localhost:3000/doc`

## 🤝 Git Workflow

See [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for details on our development process.
