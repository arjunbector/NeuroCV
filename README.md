# NeuroCV: AI-Powered Resume Builder

Build a job-winning resume in minutes, powered by AI. NeuroCV helps you craft professional, tailored resumes with ease—no writing stress, no rigid templates, just results.

## Features

- **AI-Powered Resume Generation**: Let advanced AI write your professional summary, work experience, and project descriptions.
- **Step-by-Step Resume Editor**: Fill out sections for General Info, Personal Info, Work Experience, Education, Projects, Skills, and Summary.
- **Smart Fill (AI)**: Instantly generate optimized content for work experience, projects, and summary with a single click (Premium feature).
- **Live Resume Preview**: See your resume update in real time as you edit.
- **Drag-and-Drop Sections**: Easily reorder work experience, education, and projects.
- **Multiple Resumes**: Create and manage as many resumes as you like.
- **Customizable Design**: Personalize colors, borders, and add a profile photo.
- **Download or Print**: Export your resume as a PDF or print it directly from the app.
- **User Authentication**: Secure sign-in and user management with Clerk.
- **Responsive UI**: Beautiful, modern interface built with React, Next.js, and Tailwind CSS.

## How It Works

1. **Share Your Info**: Answer a few simple questions about your education, experience, and skills.
2. **Let AI Work Its Magic**: NeuroCV's AI writes tailored summaries, experience descriptions, and achievements that match your goals.
3. **Download or Print**: Get a polished, professional resume ready for job applications.

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **AI Integration**: Google Gemini API for content generation
- **Authentication**: Clerk
- **Payments**: Razorpay (for premium subscriptions)
- **State Management**: Zustand, React Hook Form



## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arjunbector/NeuroCV
   cd NeuroCV
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your database, Clerk, Gemini, and Razorpay credentials.
4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
6. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

- `app/` — Next.js app directory (routes, pages, API)
- `components/` — Reusable UI components
- `hooks/` — Custom React hooks
- `lib/` — Utility functions and API integrations
- `prisma/` — Prisma schema and migrations
- `public/` — Static assets

## Database Models

- **Resume**: title, description, photo, color, border, summary, personal info, skills, work experiences, education, projects
- **WorkExperience**: position, company, dates, description
- **Education**: degree, school, dates, marks
- **Project**: title, description, link, dates
- **UserSubscription**: plan (FREE, PREMIUM), order
- **Order**: payment info, status
