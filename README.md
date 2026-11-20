# Manna Delight

Progressive, responsive web app for Manna Delight (React 18 + React Router).

## Getting started

    npm install
    npm start        # development
    npm run build    # production build (service worker is only registered in production)

## Pages

| Route                 | Page        | Wireframe            |
|-----------------------|-------------|----------------------|
| `/`                   | Landing     | Landing_Page.pdf     |
| `/menu`               | Menu        | Menu.pdf             |
| `/product/:productId` | Product     | Product_Details.pdf  |
| `/cart`               | Cart        | Cart.pdf             |
| `/checkout`           | Checkout    | Checkout.pdf         |

## Progressive Web App

- `public/manifest.json` makes the site installable (standalone display, theme colors).
- `public/service-worker.js` precaches the app shell and serves cached assets offline.
  Navigation requests fall back to the cached `index.html`.
- Replace `public/icons/icon.svg` with real PNG icons (192x192 and 512x512) for best install support on Android and iOS.

## Notes

- Product images are placeholders. Replace the `tone` color in `src/services/products.js` with an `image` path,
  and swap the `Media` component for an `<img>` when real photos are available.
- The cart runs on the frontend only and is saved to `localStorage`. Checkout is a demo; hook `handlePlaceOrder`
  in `src/pages/Checkout.jsx` up to a backend when one exists.
- Prices follow the Menu wireframe (Red Velvet Creamcheese and Bean Bliss are ₱44).
