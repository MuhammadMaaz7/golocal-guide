# GoLocal Guide

A local tourism management system built with the MERN stack.

## Setup

1. Clone the repository
2. Install dependencies: `npm install` in the root directory and `npm install` in the client directory
3. Create a `.env` file in the root directory and add your MongoDB URI: `MONGO_URI=your_mongodb_uri`
4. Run the development server: `npm run dev`

## Branching Strategy

- `main`: Production-ready code
- `development`: Integration branch
- `tourist-panel`: Tourist panel development
- `guide-panel`: Guide panel development
- `business-panel`: Business/Seller panel development

## Project Structure

- `client/`: React frontend
- `server/`: Express backend
- `shared/`: Shared utilities and constants

## Available Scripts

- `npm run dev`: Run the full-stack application in development mode
- `npm run server`: Run only the backend server
- `npm run client`: Run only the frontend client