# Phase 2 Commit Script

# Commit 1: Phase 2 Backend API - Reviews, Campaigns, Weather, Sentiment
git add backend/src/routes/reviews.routes.ts backend/src/routes/campaigns.routes.ts backend/src/routes/weather.routes.ts backend/src/services/sentiment.service.ts backend/src/app.ts
git commit -m "feat(api): add Phase 2 endpoints for reviews, campaigns, weather, and AI sentiment analysis"

# Commit 2: Phase 2 Frontend - Reviews and Infrastructure Reporting
git add "apps/web/app/(public)/reviews/" "apps/web/app/(public)/report-issue/"
git commit -m "feat(web): implement tourist reviews page and infrastructure issue reporting"

# Commit 3: Phase 2 Frontend - Trip Planning Tools
git add "apps/web/app/(public)/compare/" "apps/web/app/(public)/weather/" "apps/web/app/(public)/photo-spots/"
git commit -m "feat(web): add destination comparison, weather dashboard, and photo spots guide"

# Commit 4: Phase 2 - Enhanced Tourist Dashboard
git add "apps/web/app/(dashboard)/tourist/page.tsx"
git commit -m "feat(web): upgrade tourist dashboard with itineraries, reviews, and favorites tabs"

# Commit 5: Phase 2 - Navigation & Dependencies Update
git add apps/web/components/layout/Navbar.tsx apps/web/components/layout/Footer.tsx apps/web/package.json apps/web/package-lock.json
git commit -m "feat(web): update navigation with Phase 2 links and install new dependencies"

# Commit 6: Cleanup
git add .
git commit -m "chore: remove temporary scripts and finalize Phase 2 integration" --allow-empty

# Push
git push origin main
