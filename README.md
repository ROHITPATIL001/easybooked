# Mobile Phone Repair Booking Website

A college-level React + Vite web app where customers choose a phone brand and problem, see an estimated price, and submit a repair booking. Bookings are stored in the browser's LocalStorage. No backend, login or payment is involved. All prices and contact details are dummy demo data.

## Tech Stack

- React.js + Vite
- JavaScript
- CSS
- React Router
- Browser LocalStorage
- Netlify (hosting)

## Run Locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

The production files are generated in the `dist` folder.

## Deploy on Netlify

1. Push this project to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Use these settings (already included in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy**. The `netlify.toml` redirect rule keeps React Router pages working on refresh.

## Project Structure

```
src/
├── components/   Navbar, Footer, ProblemCard
├── pages/        Home, BookRepair, About, Contact
├── utils/        prices.js (brands, problems, prices), bookingStorage.js (LocalStorage)
├── App.jsx       Routes and page layout
├── main.jsx      App entry point
└── index.css     Styling
```

## Notes

- Booking status is always **Pending**.
- Bookings exist only in the browser where they were made. Clearing site data removes them.
- This is a demonstration project. No real repair service is provided.
