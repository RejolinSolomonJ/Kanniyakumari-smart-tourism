# 🌅 Kanyakumari Smart Tourism Ecosystem

Welcome to the **Kanyakumari Smart Tourism Ecosystem**, a next-generation platform built to revolutionize the tourism experience in Kanyakumari. This platform connects tourists, site managers, local businesses, and government officers into a single, unified digital experience.

## ✨ Key Features

### For Tourists
* **🎟️ Unified Digital Ticketing:** Book tickets for monuments, ferries, and wildlife reserves in one go.
* **🏨 Dynamic Hotel Bookings:** Instant integration with Google Places API to fetch official hotel booking links and contact info.
* **🗺️ Interactive Exploration:** A beautiful, parallax-driven discovery page with category filters and maps.
* **📱 Digital QR Passes:** Instant QR code generation for gate scanners.

### For Site Managers & Ticket Checkers
* **📸 High-Speed QR Gate Scanner:** Custom-built HTML5 QR scanner that instantly validates tickets directly from tourists' phones.
* **🔒 Single-Gate Mode:** Scanners are tightly restricted to specific destinations (e.g., Padmanabhapuram Palace checker cannot scan Ferry tickets).
* **📊 Live Analytics:** Real-time visitor counts and entry logging.

### For Tourism Officers & Administrators
* **📈 Global CRM Dashboard:** Monitor ticket sales, revenue, and footfall across all of Kanyakumari.
* **👥 Account Management:** Provision dedicated accounts for individual site checkers.

---

## 🛠️ Technology Stack

This project is structured as an advanced **Monorepo** separating the Web application and the API backend.

### Frontend (`apps/web`)
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Vanilla CSS (Custom Design System)
* **Animations:** Framer Motion
* **Hosting:** Vercel

### Backend (`backend`)
* **Framework:** Node.js / Express.js
* **Database ORM:** Prisma
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **QR Generation:** QRCode + Base64 encoding
* **Hosting:** Render

### External Integrations
* **Google Maps API:** Used for interactive map views and dynamically fetching official hotel contact details & booking links.
* **Cloudinary:** Cloud storage for uploaded assets.

---

## 🚀 Local Development Setup

### 1. Prerequisites
Ensure you have the following installed on your local machine:
* **Node.js** (v18+)
* **npm** or **yarn**

### 2. Clone and Install
```bash
# Clone the repository
git clone https://github.com/your-username/kanyakumari-smart-tourism.git
cd kanyakumari-smart-tourism

# Install root dependencies
npm install

# Install frontend dependencies
cd apps/web
npm install

# Install backend dependencies
cd ../../backend
npm install
```

### 3. Environment Variables
You will need `.env` files in both the frontend and backend directories.

**Backend (`backend/.env`)**
```env
DATABASE_URL="mongodb+srv://<user>:<password>@cluster0..."
JWT_SECRET="supersecretsecret"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

**Frontend (`apps/web/.env`)**
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSy..."
```

### 4. Database Setup
```bash
cd backend
npx prisma generate
npx prisma db push

# Optional: Seed the database with initial users and destinations
npx ts-node src/seed_crm.ts
```

### 5. Running the Application
**Start the Backend API:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Start the Frontend Web App:**
```bash
cd apps/web
npm run dev
# Runs on http://localhost:3000
```

---

## 📱 Default System Accounts

If you run the seed script, the following accounts will be created for testing the CRM:

* **Collector / Super Admin**
  * Email: `collector@kanyakumari.gov.in`
  * Password: `CRM@admin123`
  * Access: Full access to all sites, global analytics.

* **Site Manager / Gate Checker (e.g. Padmanabhapuram Palace)**
  * Email: `checker@kanyakumari.gov.in`
  * Password: `CRM@admin123`
  * Access: Specifically locked to scan tickets ONLY for the Palace.

---

## 🎨 Design Philosophy
The frontend uses a highly customized, premium design system. We avoided generic CSS frameworks in favor of rich aesthetics, deep ocean blues, gold accents, smooth micro-interactions, and glassmorphism to reflect the cultural richness and natural beauty of Kanyakumari.

## 📝 License
This project is proprietary and built for the Kanyakumari District Administration.
