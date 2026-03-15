# Frame My Screen

Responsive preview lab with a zoomable canvas, draggable tool panels, popup testing for iframe-blocked sites, and a local Electron + Playwright path for true device emulation.

## Features

- Paste a URL, including local dev URLs like `http://localhost:3000`
- Resize from the top-right and bottom-right corners
- Zoom out on a large canvas so the preview and floating panels can be arranged in context
- Type exact width and height values
- Filter devices by `Phone`, `Tablet`, and `Desktop`
- Search and sort a larger device catalog
- Toggle orientation
- Open blocked sites in popup preview mode and keep that popup sized to the selected device, with a reopen fallback when browsers block direct resize APIs
- Launch Playwright-powered device emulation locally with mobile UA, DPR, and touch behavior
- Trigger Playwright emulation from the browser UI when the app is run behind the included Node backend
- Drag floating control dialogs around the canvas
- Persist the last URL and screen size in `localStorage`

## Local Run

Open [index.html](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/index.html) directly in a browser, or serve this folder with any static file server.

## Browser Plus Backend Mode

If you want device emulation to be triggered from the browser UI instead of Electron, run the included backend:

1. Run `npm install`
2. Run `npm run serve`
3. Open `http://localhost:8788`
4. Use `Open Device Emulation`

This mode keeps the app browser-based, but the browser page calls the local Node service at [server.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/server.js), which launches Playwright on the host machine.

## Electron And Playwright Mode

Electron mode is the path for sites that do not allow iframe embedding and for true local device emulation.

1. Run `npm install`
2. Run `npm start`

This uses:

- [package.json](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/package.json)
- [main.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/main.js)
- [preload.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/preload.js)
- [scripts/playwright-emulate.mjs](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/scripts/playwright-emulate.mjs)

Electron loads the same UI locally, and the `Open Device Emulation` action launches a Playwright-controlled browser with device-aware settings like mobile viewport, touch behavior, and device pixel ratio. This is the path that more closely matches actual phone and tablet behavior.

## Cloudflare Pages Deploy

Use this project as a static Pages site.

1. Create a new Cloudflare Pages project.
2. Connect the project to this folder or upload the folder contents manually.
3. Set the build command to blank.
4. Set the output directory to `/`.
5. Deploy the site.
6. In Cloudflare Pages custom domains, attach `frame.getcentri.com`.
7. Add the DNS record Cloudflare requests for `frame.getcentri.com` if it is not created automatically.

Because the deployed site is plain static HTML, CSS, and JS, there is no build step and no server runtime.

## CentriPOS Embed Notes

If you want CentriPOS to work inside the embedded iframe on `frame.getcentri.com`, CentriPOS needs to explicitly allow it.

- Remove any `X-Frame-Options: DENY` or `X-Frame-Options: SAMEORIGIN`
- Set `Content-Security-Policy: frame-ancestors 'self' https://frame.getcentri.com`
- Make sure auth/session cookies are sent from iframes using `SameSite=None; Secure`

If those changes are not made, use popup mode or Electron + Playwright mode instead.

## Files For Deploy

- [index.html](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/index.html)
- [styles.css](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/styles.css)
- [app.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/app.js)
- [_headers](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/_headers)
- [package.json](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/package.json)
- [main.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/main.js)
- [preload.js](/Users/bryanclark/Documents/Codex%20Projects/Apps/Frame%20My%20Screen/preload.js)

## Notes

Some sites cannot be embedded in an iframe because of `X-Frame-Options` or CSP headers. Use the in-app popup mode first, and use Electron mode when you want a more app-like browser test harness. Some browsers also block `window.resizeTo()` for popup windows after navigation; when that happens, the app now falls back to reopening the named popup with the requested dimensions.

## Deployment Reality

`frame.getcentri.com` can host the responsive canvas, iframe preview, and popup workflow.

True device emulation is local-only in this project because Cloudflare Pages is static hosting and cannot run Playwright browsers directly. The deployed site is still useful for layout inspection, but mobile/tablet behavior accuracy comes from the Electron + Playwright path.

If you want browser-triggered device emulation on a hosted domain, this same backend pattern has to be deployed on a real server platform rather than Cloudflare Pages static hosting.
