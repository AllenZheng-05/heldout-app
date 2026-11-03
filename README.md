# Loopline Bikes

A small front-end demo of a bike-rental shop with three pickup stations. You can:

- browse and filter the fleet (city, road, mountain, electric, cargo, kids),
- open a bike's detail page and pick a frame size,
- book it in a three-step checkout (dates & station → rider & extras → review & pay),
- see the booking confirmation,
- manage rentals and saved bikes under **My rentals**,
- edit your profile and notification preferences under **Settings**.

There is no backend. Bike data is mocked in `src/data.ts`; profile, favourites, bookings and the
in-progress booking are kept in `localStorage`. Payment is simulated, so any well-formed card
number works (e.g. `4242 4242 4242 4242`, any future expiry, any 3-digit CVC).

Built with Vite, React 18, TypeScript and React Router.

## Run it

```sh
npm install
npm run dev        # http://localhost:5180
```

Other scripts: `npm run build` (type-check and production build), `npm run preview`.

To reset the demo data, clear the site's local storage or use **Settings → Delete account**.

## Screens

| Route | Screen |
|-------|--------|
| `/` | Browse bikes |
| `/bikes/:id` | Bike detail |
| `/book/dates` | Checkout step 1 — dates and pickup station |
| `/book/rider` | Checkout step 2 — rider details and extras |
| `/book/review` | Checkout step 3 — review and pay |
| `/confirmation/:id` | Booking confirmation |
| `/rentals` | My rentals and saved bikes |
| `/settings` | Profile, notifications, account deletion |

## Answer key (sealed)

SHA-256 of the sealed answer key file:

```
61376c3a5dc6ec4dd8c6b097d35dac7231e425affbda8c8bb4d39f510ab33469
```
