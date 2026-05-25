# CyberNotes System

A secure, full-stack notes management application built with Spring Boot, React, MySQL, and Docker.

## Features

✅ **User Authentication**
- Secure registration and login
- BCrypt password encryption
- HTTP Basic Authentication

✅ **Notes Management**
- Create, read, update, and delete notes
- Notes associated with user accounts
- Real-time synchronization

✅ **Security**
- Spring Security for API protection
- Password encryption with BCrypt
- Secure user data isolation

✅ **Full-Stack Architecture**
- Backend: Spring Boot 4.0.6 (Java 21)
- Frontend: React 18
- Database: MySQL 8.0
- Container: Docker

## Project Structure

```
cybernotes-system/
├── backend/
│   └── backend/
│       └── backend/              (Spring Boot Application)
├── frontend/                     (React Application)
├── Dockerfile                    (Multi-stage build)
├── docker-compose.yml           (Docker Compose setup)
└── README.md
```

## Prerequisites

- Java 21
- Node.js 18+
- MySQL 8.0
- Docker & Docker Compose

## Setup & Run

### Option 1: Local Development

**Backend:**
```bash
cd backend/backend/backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Database:**
- Create database: `securenotesdb`
- Update `application.properties` with MySQL credentials

### Option 2: Docker Compose

```bash
docker-compose up -d
```

Access the application at `http://localhost:8081`

## API Endpoints

### Public Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /` - Home page

### Protected Endpoints (Requires Authentication)
- `POST /api/notes/create` - Create note
- `GET /api/notes/all` - Get all notes
- `PUT /api/notes/update/{id}` - Update note
- `DELETE /api/notes/{id}` - Delete note

## Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.6
- **Language**: Java 21
- **Database**: MySQL 8.0
- **ORM**: Hibernate/JPA
- **Security**: Spring Security
- **Build**: Maven

### Frontend
- **Library**: React 18
- **Router**: React Router v6
- **HTTP**: Axios
- **UI**: React Bootstrap
- **Styling**: Bootstrap 5

### DevOps
- **Container**: Docker
- **Orchestration**: Docker Compose

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);
```

### Notes Table
```sql
CREATE TABLE notes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    note_title VARCHAR(255),
    note_content TEXT,
    created_date DATETIME,
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Authentication

The application uses HTTP Basic Authentication:
- Credentials: `email:password`
- Encoding: Base64
- Header: `Authorization: Basic {base64(email:password)}`

## Running Tests

```bash
cd backend/backend/backend
./mvnw clean test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- JWT Token Authentication
- OAuth 2.0 Integration
- Note Categories/Tags
- Advanced Search
- File Upload Support
- Dark Mode UI
- Mobile App (React Native)
- CI/CD Pipeline (GitHub Actions)
- Kubernetes Deployment

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: May 25, 2026  
**Status**: Production Ready ✅

<!-- Developer Note: Documented environment variables for production -->
