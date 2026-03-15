# Frame My Screen

Lightweight responsive preview tool for loading a URL into a resizable iframe, with device presets, a searchable device library, draggable control panels, popup preview mode, and an Electron shell for full desktop testing.

## Features

- Paste a URL, including local dev URLs like `http://localhost:3000`
- Resize from the top-right and bottom-right corners
- Type exact width and height values
- Filter devices by `Phone`, `Tablet`, and `Desktop`
- Search and sort a larger device catalog
- Toggle orientation
- Open blocked sites in popup preview mode and keep that popup sized to the selected device
- Drag floating control dialogs around the canvas
- Persist the last URL and screen size in `localStorage`

## Local Run

Open [index.html](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/index.html) directly in a browser, or serve this folder with any static file server.

## Electron Mode

Electron mode is the path for sites that do not allow iframe embedding and for more realistic browser-window testing.

1. Run `npm install`
2. Run `npm start`

This uses:

- [package.json](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/package.json)
- [main.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/main.js)
- [preload.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/preload.js)

Electron will load the same UI locally, but popup previews open as real desktop windows under the app shell instead of depending on a Cloudflare-hosted page.

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

## CentriPOS Embed Notes

If you want CentriPOS to work inside the embedded iframe on `frame.getcentri.com`, CentriPOS needs to explicitly allow it.

- Remove any `X-Frame-Options: DENY` or `X-Frame-Options: SAMEORIGIN`
- Set `Content-Security-Policy: frame-ancestors 'self' https://frame.getcentri.com`
- Make sure auth/session cookies are sent from iframes using `SameSite=None; Secure`

If those changes are not made, use popup mode or Electron mode instead.

## Files For Deploy

- [index.html](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/index.html)
- [styles.css](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/styles.css)
- [app.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/app.js)
- [_headers](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/_headers)
- [package.json](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/package.json)
- [main.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/main.js)
- [preload.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/preload.js)

## Notes

Some sites cannot be embedded in an iframe because of `X-Frame-Options` or CSP headers. Use the in-app popup mode first, and use Electron mode when you want a more app-like browser test harness.
