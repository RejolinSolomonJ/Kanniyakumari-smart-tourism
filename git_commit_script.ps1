git config --global user.email "veera.vaishnavik@example.com"
git config --global user.name "Veera Vaishnavi K"

git branch -m main
git remote add origin https://github.com/VeeraVaishnaviK/Kanniyakumari-smart-tourism.git

# Group 1: Project Scaffold
git add package.json .gitignore start*.ps1 start.bat
git commit -m "chore: initial project scaffolding and workspace configuration"

# Group 2: Backend Core
git add backend/package.json backend/tsconfig.json backend/.env backend/src/app.ts backend/src/middleware/ backend/src/services/
git commit -m "feat(backend): implement core express architecture and middleware"

# Group 3: Database
git add backend/prisma/
git commit -m "feat(db): define prisma schema and seed data for tourism ecosystem"

# Group 4: Backend Routes
git add backend/src/routes/
git commit -m "feat(api): implement REST API controllers for bookings, ai, and admin"

# Group 5: Web Foundation
git add apps/web/package.json apps/web/tsconfig.json apps/web/tailwind.config.ts apps/web/postcss.config.mjs apps/web/next.config.mjs apps/web/next-env.d.ts apps/web/app/globals.css apps/web/app/layout.tsx apps/web/components/layout/ apps/web/lib/ apps/web/messages/ apps/web/public/
git commit -m "feat(web): setup next.js frontend layout and design system"

# Group 6: Homepage & Explorer
git add "apps/web/app/(public)/page.tsx" "apps/web/app/(public)/explore/" apps/web/components/home/ apps/web/components/ui/
git commit -m "feat(web): build bilingual homepage and destination explorer"

# Group 7: Booking & AI Planner
git add "apps/web/app/(public)/bookings/" "apps/web/app/(public)/plan/" apps/web/components/booking/ apps/web/components/ai/
git commit -m "feat(web): implement unified booking flow and ai planner"

# Group 8: Content Pages
git add "apps/web/app/(public)/stay/" "apps/web/app/(public)/food/" "apps/web/app/(public)/events/" "apps/web/app/(public)/gallery/" "apps/web/app/(public)/blogs/" "apps/web/app/(public)/transport/" "apps/web/app/(public)/guides/" "apps/web/app/(public)/rentals/" "apps/web/app/(public)/religious/" "apps/web/app/(public)/emergency/" "apps/web/app/(public)/downloads/" "apps/web/app/(auth)/"
git commit -m "feat(web): add content pages for stays, events, gallery and emergency"

# Group 9: Admin Dashboard
git add "apps/web/app/(dashboard)/"
git commit -m "feat(web): develop advanced admin dashboard and CRM capabilities"

# Group 10: Scanner App
git add apps/scanner/
git commit -m "feat(scanner): build qr gate validator application"

# Group 11: Phase 2
git add "apps/web/app/(public)/ar-vr/" "apps/web/app/(public)/wildlife/"
git commit -m "feat: add phase 2 immersive ar/vr and wildlife modules"

# Group 12: Catch all remaining files (like README, etc.)
git add .
git commit -m "chore: final polish and documentation updates"

# Push to origin
git push -u origin main
