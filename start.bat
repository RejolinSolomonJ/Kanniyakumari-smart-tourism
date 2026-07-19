@echo off
echo Starting Kanyakumari Smart Tourism Ecosystem...

echo Starting Backend API (Port 5000)...
start cmd /k "cd backend && npm run dev"

echo Starting Web Portal (Port 3000)...
start cmd /k "cd apps\web && npm run dev"

echo Starting Scanner App (Port 3001)...
start cmd /k "cd apps\scanner && npm run dev -- -p 3001"

echo All services are starting up!
echo --------------------------------------------------
echo Web Portal: http://localhost:3000
echo Scanner App: http://localhost:3001
echo Backend API: http://localhost:5000
echo --------------------------------------------------
echo Note: Connected to MongoDB Atlas Cloud database.
pause
