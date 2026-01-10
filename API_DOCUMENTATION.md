# JohnGr8 HRMS API Documentation

## Base URL
```
http://localhost:3000
```

## User Endpoints

All user endpoints are prefixed with `/api/users`

### 1. Get All Users
**Endpoint:** `GET /api/users`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 30,
      "createdAt": "2026-01-10T11:38:10.000Z",
      "updatedAt": "2026-01-10T11:38:10.000Z"
    }
  ]
}
```

### 2. Get User by ID
**Endpoint:** `GET /api/users/:id`

**Parameters:**
- `id` (path parameter) - User ID

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "createdAt": "2026-01-10T11:38:10.000Z",
    "updatedAt": "2026-01-10T11:38:10.000Z"
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "User with ID 999 not found"
}
```

### 3. Create User
**Endpoint:** `POST /api/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30
}
```

**Required Fields:**
- `name` (string)
- `email` (string)

**Optional Fields:**
- `age` (number)

**Response (Success):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "3",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "createdAt": "2026-01-10T11:38:10.000Z",
    "updatedAt": "2026-01-10T11:38:10.000Z"
  }
}
```

**Response (Duplicate Email):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

**Response (Validation Error):**
```json
{
  "success": false,
  "message": "Name and email are required"
}
```

### 4. Update User
**Endpoint:** `PUT /api/users/:id`

**Parameters:**
- `id` (path parameter) - User ID

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "age": 32
}
```

**All fields are optional** - only include the fields you want to update.

**Response (Success):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "1",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "age": 32,
    "createdAt": "2026-01-10T11:38:10.000Z",
    "updatedAt": "2026-01-10T11:45:10.000Z"
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "User with ID 999 not found"
}
```

### 5. Delete User
**Endpoint:** `DELETE /api/users/:id`

**Parameters:**
- `id` (path parameter) - User ID

**Response (Success):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "createdAt": "2026-01-10T11:38:10.000Z",
    "updatedAt": "2026-01-10T11:38:10.000Z"
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "User with ID 999 not found"
}
```

## Testing with cURL

### Get all users
```bash
curl http://localhost:3000/api/users
```

### Get user by ID
```bash
curl http://localhost:3000/api/users/1
```

### Create new user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com","age":25}'
```

### Update user
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated","age":31}'
```

### Delete user
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - User created successfully
- `400 Bad Request` - Invalid request body or validation error
- `404 Not Found` - User not found
- `409 Conflict` - Email already exists

## Notes

- The current implementation uses in-memory storage. Data will be reset when the server restarts.
- To persist data, integrate with a database (e.g., PostgreSQL, MongoDB).
- All timestamps are in ISO 8601 format.
