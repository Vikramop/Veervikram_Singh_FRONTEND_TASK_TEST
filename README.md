# Project Setup Guide

This document provides detailed instructions to clone, install, and run both the **backend** and **frontend** projects for your application. Follow the steps carefully to get the development environment up and running.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
  - [Clone Repository](#clone-repository)
  - [Install Dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables-backend)
  - [Run Backend Server](#run-backend-server)
- [Frontend Setup](#frontend-setup)
  - [Clone Repository](#clone-repository-1)
  - [Install Dependencies](#install-dependencies-1)
  - [Environment Variables](#environment-variables-frontend)
  - [Run Frontend Development Server](#run-frontend-development-server)
- [Additional Notes](#additional-notes)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Make sure you have these installed on your machine:

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- (Optional) MongoDB or your configured database accessible by backend
- (Optional) WalletConnect Project ID (for frontend wallet connection)

---

## Backend Setup

### Clone Repository

```
git clone https://github.com/Vikramop/Veervikram_Singh_FRONTEND_TASK_TEST
cd backend
```

### Install Dependencies

```
npm install

or
yarn install
```

### Environment Variables (Backend)

Create a `.env` file in the root folder with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

- `PORT`: Port for backend server (default 5000)
- `MONGODB_URI`: MongoDB connection URI
- `JWT_SECRET`: Secret key for JWT token signing & verification

Make sure your database (MongoDB) is running and accessible.

### Run Backend Server

```
npm run dev
or
yarn dev
```

The backend server will start on `http://localhost:5000` (or your configured port).

---

## Frontend Setup

```
cd frontend
```

### Install Dependencies

```
npm install
or
yarn install
```

### Environment Variables (Frontend)

Create `.env.local` file in the root of your Next.js project with:

```
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/auth
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

- `NEXT_PUBLIC_BASE_URL`: URL of your backend auth API
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect Cloud Project ID (for wallet connections)

### Run Frontend Development Server

```
npm run dev
or
yarn dev
```

The frontend app will start on `http://localhost:3000`.

---

## Additional Notes

- **Authentication:** The backend uses JWT tokens for authentication. Tokens should be stored safely in the frontend (e.g., `localStorage`) and sent via `Authorization` header.
- **Wallet Connection:** The frontend uses RainbowKit and wagmi for Ethereum wallet connection. Make sure you have your WalletConnect project ID configured.
- **Profile Updates:** The KYC flow sends images (photos) as base64 strings over JSON to the backend for storage.
- **Database:** MongoDB is used for storing user profiles. Ensure your connection string is correct.

---

## Troubleshooting

- **No QueryClient set error**: Make sure your frontend wraps the app with `QueryClientProvider` from `@tanstack/react-query`.
- **WalletConnect errors**: Verify that your `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is correctly set from https://cloud.walletconnect.com.
- **CORS issues**: Make sure the backend allows requests from your frontend origin.
- **Environment Variables Unavailable**: Restart your development server after adding `.env` or `.env.local` files.

---

## Useful Commands Summary

| Command                         | Description                     | Run in              |
| ------------------------------- | ------------------------------- | ------------------- |
| `git clone <url>`               | Clone project repository        | Terminal            |
| `npm install` or `yarn install` | Install dependencies            | Backend & Frontend  |
| `npm run dev` or `yarn dev`     | Start development server        | Backend or Frontend |
| `npm run build`                 | Build production frontend       | Frontend            |
| `npm start`                     | Start production backend/server | Backend             |

---

If you have questions or face any issues setting up the projects, feel free to reach out! Happy coding 🚀
