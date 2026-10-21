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

The footer's **Install app** button opens the native install prompt where supported. On iPhone and iPad, the button shows short Safari Add to Home Screen instructions when tapped. Instructions also appear if a native prompt fails to open; dismissing the native prompt is respected. Home Screen launches are detected as installed. Installation and service workers require HTTPS or localhost. An HTTP LAN address used from a phone is not equivalent to localhost on that phone. Service worker registration is disabled in development to keep hot reloads fresh.

The build generates `dist/sw.js` with a versioned cache of the app, images, icons, and resume. Once the first cache completes, those files work offline. External project and social websites still need an internet connection. New versions activate after existing portfolio tabs are closed, so an open session keeps a matching set of HTML and assets.

App icons use the navbar logo's split Z with a magenta (#F508CF), cyan (#04DAFE), and blue (#4B9CF4) gradient. The PNGs are committed; on Windows, `scripts/generate-icons.ps1` regenerates them from the same vector geometry as `public/icons/z.svg`.

Run `npm test` to build and check offline navigation, cache isolation and updates, installation states, and icon/manifest requirements.
