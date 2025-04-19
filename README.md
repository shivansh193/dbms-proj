# Multi-Vendor Marketplace Boilerplate

This is a Next.js 14 boilerplate for a multi-vendor marketplace with PostgreSQL (via Prisma).

## Setup
1. Copy `.env.example` to `.env` and set your PostgreSQL credentials.
2. Run `npm install` to install dependencies.
3. Use `npx prisma migrate dev` to initialize the database.
4. Start the dev server with `npm run dev`.

## Folder Structure
- `pages/` — Next.js routes for all required pages
- `prisma/` — Prisma schema for PostgreSQL
- `lib/` — Database and utility helpers
- `components/` — React components (empty)
- `app/` — App directory (Next.js 14)

## Pages
See `/pages` and `/app` for customer, vendor, and admin pages (boilerplate only).
