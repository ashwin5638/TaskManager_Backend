📌 TaskManager Backend (Node.js + Express + MongoDB)

A secure and scalable Task Management REST API with:

🔐 JWT Authentication

👥 Role-Based Access Control (User / Admin)

📝 CRUD for Tasks

👤 Users can manage only their tasks

🛠 Admin can manage all tasks

🌐 MongoDB Atlas support

🚀 Deploy-ready for Render

📁 Project Structure
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   ├── auth.js
│   └── admin.js
├── models/
│   └── index.js
├── routes/
│   ├── auth.js
│   └── tasks.js
├── .env (ignored)
├── .gitignore
├── server.js
└── package.json

🚀 Features
🔐 Authentication

Register new users

Login with email & password

Passwords hashed using bcrypt

JWT-based authentication

👥 Role-Based Access Control (RBAC)

User: can create, edit, delete ONLY their tasks

Admin: can view, edit, delete ALL tasks

📝 Task Management

Create task

Get all tasks (filtered by role)

Update task

Delete task

🌐 API ready for frontend (React)

Compatible with Vercel frontend deployment.

🧩 Technologies Used

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Bcrypt.js

CORS

Render Deployment

⚙️ Environment Variables (.env)

Create a .env file inside /backend:

PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d


⚠️ NEVER commit .env
Make sure .gitignore contains:

.env
node_modules/

▶️ Run Locally
1. Install dependencies
npm install

2. Start server
node server.js


OR (if you have a start script):

npm start


Server starts at:

http://localhost:5000

🔌 API Routes
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login & get JWT
Task Routes (Protected)
Method	Endpoint	Description
GET	/api/tasks	Get tasks (admin: all, user: own)
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task

Requires header:

Authorization: Bearer <token>

☁️ Deployment (Render)

Create a new Web Service in Render

Connect GitHub repo

Set:

Option	Value
Root Directory	backend
Build Command	npm install
Start Command	node server.js
Environment	Node 18+

Add all .env variables in Render dashboard

Deploy 🚀

🧪 Test API Using Postman
Example Login:
POST https://your-backend.onrender.com/api/auth/login


Body:

{
  "email": "test@example.com",
  "password": "123456"
}


Response:

{
  "token": "...",
  "user": {
    "id": "...",
    "name": "Test User",
    "role": "user"
  }
}
