# Task Manager

## Overview

Task Manager is a web-based application built with Next.js that allows users to efficiently create, organize, prioritize, and manage daily tasks. The application provides a clean, responsive interface for tracking work while demonstrating modern React and Next.js development practices.

The project was developed using the Next.js App Router architecture and focuses on maintainable code structure, reusable components, and responsive UI design.

---

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Organize tasks by status
- Responsive layout for desktop and mobile
- Modern UI using Tailwind CSS
- Client-side state management
- Fast page rendering with Next.js

---

## Technologies Used

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- ESLint
- npm

---

# Project Structure

```
task-manager/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   └── Header.tsx
│   │
│   ├── types/
│   │
│   ├── lib/
│   │
│   └── utils/
│
├── package.json
├── tsconfig.json
├── README.md
└── next.config.ts
```

---

# Setup Instructions

## 1. Clone the repository

```bash
git clone https://github.com/Ivelisse-Feliciano/task-manager.git
```

## 2. Navigate into the project

```bash
cd task-manager
```

## 3. Install dependencies

```bash
npm install
```

## 4. Run the development server

```bash
npm run dev
```

## 5. Open the application

Visit:

```
http://localhost:3000
```

---

# Build for Production

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

# Design Decisions

Several design decisions were made to improve readability, maintainability, and user experience.

### Next.js App Router

The project uses the App Router because it represents the current recommended architecture for Next.js applications and provides better routing, layouts, and server rendering support.

### TypeScript

TypeScript was selected to improve code reliability through static typing and to reduce runtime errors.

### Tailwind CSS

Tailwind CSS was chosen for styling because it allows rapid UI development while keeping styles consistent and minimizing custom CSS.

### Component-Based Architecture

The application is divided into reusable components rather than placing all logic inside a single page. This improves:

- Maintainability
- Code reuse
- Scalability
- Readability

### Responsive Design

Layouts were designed using responsive Tailwind utilities so the application functions well on desktops, tablets, and mobile devices.

### State Management

React state hooks are used for task management because the application size does not currently require Redux or Context API.

---

# Assumptions

- Users manage tasks within a single browser session.
- Authentication is not required.
- Data persistence is local unless a backend is later implemented.
- Modern browsers are used.

---

# Future Improvements

Potential enhancements include:

- User authentication
- Database integration
- Cloud synchronization
- Drag-and-drop task organization
- Due dates and reminders
- Search and filtering
- Categories and tags
- Dark mode
- Unit testing
- Backend API integration

---

# AI Usage Log

Artificial Intelligence tools were used as a development assistant throughout this project.

### AI Assistance Included

- Troubleshooting React hydration errors
- Refactoring code for readability
- Improving TypeScript typing
- Suggesting project structure
- Debugging component logic
- Generating documentation
- Providing Tailwind CSS recommendations
- Reviewing code organization
- Assisting with README creation

### Human Contributions

All project planning, code structure, implementation decisions, debugging validation, testing, and final code integration were completed by the developer. AI-generated suggestions were reviewed, modified when necessary, and incorporated only after verification.

---

# Lessons Learned

During this project I gained experience with:

- Next.js App Router
- React component architecture
- TypeScript
- Tailwind CSS
- State management
- Debugging hydration issues
- Building reusable UI components
- Organizing scalable project structures
- Creating technical documentation

---

# Author

**Ivelisse Feliciano**

Business Analytics & Information Systems Student

University of South Florida

Expected Graduation: 2027

---

