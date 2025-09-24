# Healthcare Backend Assignment

A robust Node.js backend for healthcare management, designed with best practices in authentication, data modeling, and API structure. Built using Express, PostgreSQL, Prisma ORM, JWT, and more.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

## About
This project provides a secure and scalable backend for managing patients, doctors, and their relationships. It demonstrates modern backend development skills, including RESTful API design, authentication, validation, and error handling.

## Features
- User authentication (register/login)
- Patient management (CRUD)
- Doctor management (CRUD)
- Patient-Doctor mapping (assign/remove/list)
- JWT-based protected routes
- MVC architecture
- Centralized error handling
- Input validation

## Tech Stack
- Node.js + Express.js
- PostgreSQL + Prisma ORM
- JWT (access & refresh tokens)
- bcrypt
- dotenv
- express-validator

## Folder Structure
```
src/
  config/        # DB & env config
  models/        # Prisma schema
  routes/        # API routes
  controllers/   # Business logic
  middlewares/   # Auth, validators
  utils/         # Error handler
index.js         # Server entry
```

## Getting Started

1. **Clone the repository and install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

| Variable              | Description                                        | Example Value                                       |
| --------------------- | -------------------------------------------------- | --------------------------------------------------- |
| `DATABASE_URL`        | The connection string for your PostgreSQL database. | `postgresql://user:password@localhost:5432/mydb`    |
| `JWT_SECRET`          | A strong, secret key for signing access tokens.    | `your-super-secret-key-for-jwt`                     |
| `JWT_REFRESH_SECRET`  | A strong, secret key for signing refresh tokens.   | `your-other-super-secret-key-for-refresh`           |
| `PORT`                | The port the server will run on.                   | `3000`                                              |

3. **Initialize Prisma and run migrations:**
   ```sh
   npx prisma init
   npx prisma migrate dev --name init
   ```

4. **Start the server:**
   ```sh
   npm start
   ```

## API Endpoints

See the included Postman collection (`postman_collection.json`) for sample requests and responses.

## API Endpoint Documentation

All protected routes require a Bearer Token in the Authorization header.

### Authentication

| Method | Endpoint             | Description                       | Auth Required | Request Body Example                       |
| ------ | -------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `POST` | `/api/auth/register` | Register a new user.              | No            | `{ "name": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/auth/login`    | Log in a user and get JWT tokens. | No            | `{ "email": "...", "password": "..." }`         |

### Patient Management

| Method   | Endpoint           | Description                         | Auth Required | Request Body Example                        |
| -------- | ------------------ | ----------------------------------- | ------------- | ------------------------------------------- |
| `POST`   | `/api/patients`    | Add a new patient.                  | Yes           | `{ "name": "...", "age": "...", "gender": "..." }` |
| `GET`    | `/api/patients`    | Get all patients for the user.      | Yes           | -                                           |
| `GET`    | `/api/patients/:id`| Get a specific patient by ID.       | Yes           | -                                           |
| `PUT`    | `/api/patients/:id`| Update a patient's details.         | Yes           | `{ "name": "...", "age": "..." }`              |
| `DELETE` | `/api/patients/:id`| Delete a patient.                   | Yes           | -                                           |

### Doctor Management

| Method   | Endpoint           | Description                         | Auth Required | Request Body Example                        |
| -------- | ------------------ | ----------------------------------- | ------------- | ------------------------------------------- |
| `POST`   | `/api/doctors`     | Add a new doctor.                   | Yes           | `{ "name": "...", "specialty": "..." }`         |
| `GET`    | `/api/doctors`     | Get all doctors.                    | Yes           | -                                           |
| `GET`    | `/api/doctors/:id` | Get a specific doctor by ID.        | Yes           | -                                           |
| `PUT`    | `/api/doctors/:id` | Update a doctor's details.          | Yes           | `{ "name": "...", "specialty": "..." }`         |
| `DELETE` | `/api/doctors/:id` | Delete a doctor.                    | Yes           | -                                           |

### Patient-Doctor Mapping

| Method   | Endpoint                | Description                                 | Auth Required | Request Body Example                        |
| -------- | ----------------------- | ------------------------------------------- | ------------- | ------------------------------------------- |
| `POST`   | `/api/mappings`         | Assign a doctor to a patient.               | Yes           | `{ "patientId": 1, "doctorId": 1 }`            |
| `GET`    | `/api/mappings`         | Get all patient-doctor mappings.            | Yes           | -                                           |
| `GET`    | `/api/mappings/:patientId` | Get all doctors assigned to a patient.   | Yes           | -                                           |
| `DELETE` | `/api/mappings/:id`     | Remove a doctor from a patient.             | Yes           | -                                           |

## Postman Collection

Import `postman_collection.json` into Postman for ready-to-use API tests.

## Database Schema

The application uses the following main models:

- **User**: Stores user information, including hashed passwords.
   - `id`, `name`, `email`, `password`, `role`
- **Patient**: Stores patient records, linked to a user.
   - `id`, `name`, `age`, `gender`, `userId`
- **Doctor**: Stores doctor information.
   - `id`, `name`, `specialty`
- **Mapping**: Manages the many-to-many relationship between patients and doctors.
   - `id`, `patientId`, `doctorId`

## Error Handling

The API uses a centralized error handler and provides consistent error responses in the following format:

**Example Error Response:**
```json
{
      "error": "Validation failed",
      "errors": [
            {
                  "msg": "Password must be at least 6 characters",
                  "param": "password",
                  "location": "body"
            }
      ]
}
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is for educational and recruitment purposes.

---

**Production Notes:**
- Use strong JWT secrets
- Set up HTTPS
- Use environment variables for sensitive data
- Review role-based access and validation
