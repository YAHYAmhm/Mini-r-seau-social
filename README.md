# Mini-reseau-social
Mini réseau social  generé par deux etudiant en CMC {Yahya Mouhim,Alaa Amraoui}

# Mini Social Network - React & Redux

A simple social network application built with React, Redux Toolkit, and JSON Server.

## Features
- **Authentication Simulation**: "Log in" as any user from the database.
- **Post CRUD**: Create, read, update, and delete posts.
- **Interactions**: Like/unlike posts and add comments.
- **Filtering**: Filter feed by hashtags or view specific user profiles.
- **Dark Mode**: Toggle between light and dark themes.
- **Persistence**: Data is saved to a `db.json` file.

## Technologies Used
- **React**: Components, hooks, and routing.
- **Redux Toolkit**: Store, slices, and async thunks.
- **React Router**: Navigation and dynamic routes.
- **Axios**: API requests to JSON Server.
- **Lucide React**: Icons for a modern look.
- **Standard CSS**: Styled using the provided project designs.

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mini-social-network
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Mock API (JSON Server)**:
   ```bash
   npm run server
   ```
   *The server runs on http://localhost:3001*

4. **Start the React Application**:
   ```bash
   npm start
   ```
   *The app runs on http://localhost:3000*

## Project Structure
- `src/app`: Redux store configuration.
- `src/features`: State management divided by feature (Auth, Posts, Comments).
- `src/selectors`: Independent Redux selectors for clean state access.
- `src/components`: Reusable UI components (Shared layout, specific widgets).
- `src/pages`: Top-level page views and routing.
- `src/services`: API client and configuration (Axios).
- `src/assets`: Bundled static resources (Images, icons).

## Authors
- [Your Name/Team Member names]

## Course Information
- **Teacher**: ACHERRAT Imane
- **Academic Year**: 2025/2026
