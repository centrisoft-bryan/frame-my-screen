# Frame My Screen

Lightweight responsive preview tool for loading a URL into a resizable iframe, with device presets, a searchable device library, and draggable control panels.

## Features

- Paste a URL, including local dev URLs like `http://localhost:3000`
- Resize from the top-right and bottom-right corners
- Type exact width and height values
- Filter devices by `Phone`, `Tablet`, and `Desktop`
- Search and sort a larger device catalog
- Toggle orientation
- Drag floating control dialogs around the canvas
- Persist the last URL and screen size in `localStorage`

## Local Run

Open [index.html](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/index.html) directly in a browser, or serve this folder with any static file server.

## Cloudflare Pages Deploy

Use this project as a static Pages site.

1. Create a new Cloudflare Pages project.
2. Connect the project to this folder or upload the folder contents manually.
3. Set the build command to blank.
4. Set the output directory to `/`.
5. Deploy the site.
6. In Cloudflare Pages custom domains, attach `frame.getcentri.com`.
7. Add the DNS record Cloudflare requests for `frame.getcentri.com` if it is not created automatically.

Because this app is plain static HTML, CSS, and JS, there is no build step and no server runtime.

## Files For Deploy

- [index.html](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/index.html)
- [styles.css](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/styles.css)
- [app.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/app.js)
- [_headers](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/_headers)

## Notes

Some sites cannot be embedded in an iframe because of `X-Frame-Options` or CSP headers. In those cases, use the in-app `Open in new tab` button.
