# Portfolio

React, Vite, and Tailwind CSS portfolio with an installable offline app.

```sh
npm install
npm run dev
```

For the production app, including the service worker:

```sh
npm run build
npm run preview
```

The footer's **Install app** button opens the browser's native install prompt when available. Other browsers show platform-specific instructions. Installation and service workers require HTTPS or localhost. Service worker registration is disabled in development to keep hot reloads fresh.

The build generates `dist/sw.js` with a versioned cache of the app, images, icons, and resume. Once the first cache completes, those files work offline. External project and social websites still need an internet connection. New versions activate after existing portfolio tabs are closed, so an open session keeps a matching set of HTML and assets.

Run `npm test` to build and check offline navigation, cache isolation and updates, installation states, and icon/manifest requirements.
