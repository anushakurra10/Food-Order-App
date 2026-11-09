# Food Order

A React food-ordering app with a Vite frontend and a small Express API. Browse meals, add them to a cart, and submit an order with customer details.

## Requirements

- Node.js and npm

## Run locally

Install the frontend dependencies from the project root:

```sh
npm install
```

In a first terminal, install and start the backend:

```sh
cd backend
npm install
npm start
```

The API listens on `http://localhost:3000`.

In a second terminal, from the project root, start the frontend:

```sh
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

The frontend uses `http://localhost:3000` as its default API URL. To use a different API host, create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

Restart the Vite server after changing environment variables.

## Features

- Loads meals and images from the backend.
- Adds and removes meals in a reducer-managed cart shared through React Context.
- Validates checkout details and submits orders to the API.
- Stores submitted orders in `backend/data/orders.json`.

Cart contents are held in memory and reset when the page is reloaded.

## API

- `GET /meals` — returns the meals in `backend/data/available-meals.json`.
- `POST /orders` — validates and saves an order. The request body has the form `{ "order": { "items": [...], "customer": {...}, "totalAmount": 0 } }`.

## Checks

Run these commands from the project root:

```sh
npm run lint
npm run build
```
