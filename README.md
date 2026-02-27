# Task Management System (MERN)

A production-ready task management system built with the MERN stack.

## Features
- User registration and login
- JWT authentication
- Secure password hashing
- CRUD tasks (create, read, update, delete)
- Pagination and filtering
- Responsive, minimal UI
- Centralized error handling
- Deployment-ready configuration

## Folder Structure

```
backend/
	config/
	controllers/
	models/
	routes/
	middleware/
	services/
	utils/
	app.js
	server.js
	package.json
	.env.example
	render.yaml
frontend/
	src/
		pages/
		components/
		context/
		utils/
		styles/
		App.jsx
		main.jsx
	package.json
	vite.config.js
	.env.example
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com
```

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create a new web service on Render
3. Add environment variables from `.env.example`
4. Use `render.yaml` for configuration
5. Set build command: `npm install`
6. Set start command: `npm run start:prod`

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable `VITE_API_URL`
4. Deploy

## Usage
- Register and login
- Manage your tasks
- Filter and paginate tasks
- Logout securely

## API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Tasks
- POST `/api/tasks`
- GET `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## Best Practices
- Clean code, no comments
- Professional UI, neutral palette
- Secure authentication
- Proper folder structure
- Centralized error handling