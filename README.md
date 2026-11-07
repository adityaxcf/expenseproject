# Expense Tracker (Full Stack)

Live App: https://expensetracker-96fq.onrender.com

## Features
- User registration and login with JWT authentication
- Add, edit and delete expenses
- User-specific expense records
- Category summaries and spending chart
- MongoDB Atlas database
- Deployed on Render

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Authentication: bcryptjs and JWT
- Deployment: Render

## Local setup
1. Use Node.js 20.19 or newer (the current Mongoose 9 dependency requires a modern Node runtime).
2. Run npm install.
3. Copy .env.example to .env.
4. Set MONGO_URI and a unique, random JWT_SECRET of at least 32 characters.
5. Run npm start.

Never commit .env files. If a real JWT secret or database credential was previously committed, rotate it. Removing a secret from the latest version does not erase it from Git history.

## Security
Expense records are queried and updated using the authenticated user's ID. Keep this ownership filter in place for every future expense endpoint.
