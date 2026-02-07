# 📝 Blog API

A simple Blog REST API built with Node.js, Express.js, MongoDB, and Mongoose.  
This project was developed as part of the Nobzo Backend Technical Assessment.

 Project Overview
The Blog API allows users to:
- Register and log in with JWT authentication
- Create, update, and soft delete posts (author only)
- View published posts publicly
- Filter posts by search, tag, author, and status
- Paginate results with page and limit
- Access single posts via a unique slug

Setup Instructions
1. Clone the repository:
   git clone https://github.com/wizleriq/Nobzo.git
   cd Nobzo
2. Install dependencies
npm install
3. Create a .env file in the root directory
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-api
JWT_SECRET=supersecretkey
4. Run the server
Npm run dev: The API will run at http://localhost:500

SAMPLE API REQEST AND RESPONSES
Authentication
Register: http://localhost:5000/api/auth/register/
Content-Type: application/json
{"name":"Wisdom","email":"wisdom@example.com","password":"password123"}

Login: http://localhost:5000/api/auth/login/
Content-Type: application/json
{"email":"wisdom@example.com","password":"password123"}
{
  "token": "your.jwt.token"
}

POST
Creat Post: http://localhost:5000/api/posts
Authorization: Bearer <your_jwt_token>
 Content-Type: application/json
 {"title":"My First Post","content":"Hello world!","tags":["intro"],"status":"published"}
Response: 
{
  "total": 25,
  "page": 1,
  "limit": 5,
  "totalPages": 5,
  "posts": [
    {
      "_id": "6790abcd1234ef5678901234",
      "title": "My First Post",
      "slug": "my-first-post",
      "content": "Hello world!",
      "author": { "name": "Wisdom" },
      "status": "published",
      "tags": ["intro"],
      "createdAt": "2026-02-07T10:40:00.000Z",
      "updatedAt": "2026-02-07T10:40:00.000Z"
    }
  ]
}

Get Post: http://localhost:5000/api/posts/

Update Post: http://localhost:5000/api/posts/6987114ac361f52314428060
   "Authorization: Bearer <your_jwt_token>" 
   "Content-Type: application/json" 

Delete Post:
DELETE http://localhost:5000/api/posts/6790abcd1234ef5678901234 
 "Authorization: Bearer <your_jwt_token>"
