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

## Contact Endpoints

All contact endpoints are prefixed with `/api/contact`

### 1. Submit Contact Message
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "subject": "Partnership Inquiry",
  "message": "I would like to discuss a potential partnership opportunity."
}
```

**Required Fields:**
- `name` (string)
- `email` (string - must be valid email format)
- `message` (string)

**Optional Fields:**
- `subject` (string)

**Response (Success):**
```json
{
  "success": true,
  "message": "Contact message submitted successfully",
  "data": {
    "id": "1",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a potential partnership opportunity.",
    "status": "new",
    "createdAt": "2026-01-14T04:44:42.000Z"
  }
}
```

### 2. Get All Contact Messages
**Endpoint:** `GET /api/contact`

**Query Parameters:**
- `status` (optional) - Filter by status: `new`, `read`, or `resolved`

**Example:** `GET /api/contact?status=new`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "1",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "subject": "Partnership Inquiry",
      "message": "I would like to discuss a potential partnership opportunity.",
      "status": "new",
      "createdAt": "2026-01-14T04:44:42.000Z"
    }
  ]
}
```

### 3. Get Contact Message by ID
**Endpoint:** `GET /api/contact/:id`

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a potential partnership opportunity.",
    "status": "new",
    "createdAt": "2026-01-14T04:44:42.000Z"
  }
}
```

### 4. Update Contact Message Status
**Endpoint:** `PUT /api/contact/:id`

**Request Body:**
```json
{
  "status": "read"
}
```

**Valid Status Values:** `new`, `read`, `resolved`

**Response (Success):**
```json
{
  "success": true,
  "message": "Contact message updated successfully",
  "data": {
    "id": "1",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a potential partnership opportunity.",
    "status": "read",
    "createdAt": "2026-01-14T04:44:42.000Z"
  }
}
```

### 5. Delete Contact Message
**Endpoint:** `DELETE /api/contact/:id`

**Response (Success):**
```json
{
  "success": true,
  "message": "Contact message deleted successfully",
  "data": {
    "id": "1",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a potential partnership opportunity.",
    "status": "new",
    "createdAt": "2026-01-14T04:44:42.000Z"
  }
}
```

## About Endpoints

All about endpoints are prefixed with `/api/about`

### 1. Get About Information
**Endpoint:** `GET /api/about`

**Response:**
```json
{
  "success": true,
  "data": {
    "companyName": "JohnGr8 HRMS",
    "mission": "To revolutionize human resource management with innovative technology solutions.",
    "vision": "To be the leading HRMS platform trusted by organizations worldwide.",
    "description": "JohnGr8 HRMS is a comprehensive human resource management system designed to streamline HR operations and improve workforce management.",
    "founded": "2026",
    "location": "Global",
    "updatedAt": "2026-01-14T04:44:42.000Z"
  }
}
```

### 2. Update About Information
**Endpoint:** `PUT /api/about`

**Request Body:** (all fields are optional)
```json
{
  "companyName": "JohnGr8 HRMS Inc.",
  "mission": "Updated mission statement",
  "vision": "Updated vision statement",
  "description": "Updated description",
  "founded": "2026",
  "location": "New York, USA"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "About information updated successfully",
  "data": {
    "companyName": "JohnGr8 HRMS Inc.",
    "mission": "Updated mission statement",
    "vision": "Updated vision statement",
    "description": "Updated description",
    "founded": "2026",
    "location": "New York, USA",
    "updatedAt": "2026-01-14T04:45:00.000Z"
  }
}
```

### 3. Get All Team Members
**Endpoint:** `GET /api/about/team`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "position": "CEO & Founder",
      "bio": "Visionary leader with 15+ years of experience in HR technology.",
      "email": "john@johngr8.com",
      "joinedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### 4. Get Team Member by ID
**Endpoint:** `GET /api/about/team/:id`

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "position": "CEO & Founder",
    "bio": "Visionary leader with 15+ years of experience in HR technology.",
    "email": "john@johngr8.com",
    "joinedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

### 5. Add Team Member
**Endpoint:** `POST /api/about/team`

**Request Body:**
```json
{
  "name": "Alice Brown",
  "position": "Head of Engineering",
  "bio": "Experienced engineer passionate about building scalable solutions.",
  "email": "alice@johngr8.com",
  "imageUrl": "https://example.com/alice.jpg"
}
```

**Required Fields:**
- `name` (string)
- `position` (string)

**Optional Fields:**
- `bio` (string)
- `email` (string)
- `imageUrl` (string)

**Response (Success):**
```json
{
  "success": true,
  "message": "Team member added successfully",
  "data": {
    "id": "3",
    "name": "Alice Brown",
    "position": "Head of Engineering",
    "bio": "Experienced engineer passionate about building scalable solutions.",
    "email": "alice@johngr8.com",
    "imageUrl": "https://example.com/alice.jpg",
    "joinedAt": "2026-01-14T04:44:42.000Z"
  }
}
```

### 6. Update Team Member
**Endpoint:** `PUT /api/about/team/:id`

**Request Body:** (all fields are optional)
```json
{
  "name": "Alice Brown-Smith",
  "position": "VP of Engineering",
  "bio": "Updated bio"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Team member updated successfully",
  "data": {
    "id": "3",
    "name": "Alice Brown-Smith",
    "position": "VP of Engineering",
    "bio": "Updated bio",
    "email": "alice@johngr8.com",
    "imageUrl": "https://example.com/alice.jpg",
    "joinedAt": "2026-01-14T04:44:42.000Z"
  }
}
```

### 7. Remove Team Member
**Endpoint:** `DELETE /api/about/team/:id`

**Response (Success):**
```json
{
  "success": true,
  "message": "Team member removed successfully",
  "data": {
    "id": "3",
    "name": "Alice Brown",
    "position": "Head of Engineering",
    "bio": "Experienced engineer passionate about building scalable solutions.",
    "email": "alice@johngr8.com",
    "imageUrl": "https://example.com/alice.jpg",
    "joinedAt": "2026-01-14T04:44:42.000Z"
  }
}
```

## Testing with cURL

### Contact Endpoints

#### Submit contact message
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a potential partnership."
  }'
```

#### Get all contact messages
```bash
curl http://localhost:3000/api/contact
```

#### Get contact messages by status
```bash
curl http://localhost:3000/api/contact?status=new
```

#### Update contact message status
```bash
curl -X PUT http://localhost:3000/api/contact/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "read"}'
```

#### Delete contact message
```bash
curl -X DELETE http://localhost:3000/api/contact/1
```

### About Endpoints

#### Get about information
```bash
curl http://localhost:3000/api/about
```

#### Update about information
```bash
curl -X PUT http://localhost:3000/api/about \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "JohnGr8 HRMS Inc.",
    "mission": "Updated mission",
    "vision": "Updated vision"
  }'
```

#### Get all team members
```bash
curl http://localhost:3000/api/about/team
```

#### Add team member
```bash
curl -X POST http://localhost:3000/api/about/team \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Brown",
    "position": "Head of Engineering",
    "bio": "Experienced engineer",
    "email": "alice@johngr8.com"
  }'
```

#### Update team member
```bash
curl -X PUT http://localhost:3000/api/about/team/1 \
  -H "Content-Type: application/json" \
  -d '{"position": "CEO & Co-Founder"}'
```

#### Remove team member
```bash
curl -X DELETE http://localhost:3000/api/about/team/1
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

