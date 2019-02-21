# MobileCms
tl;dr : Small CMS with categories. Data is stored in JSON files.

- Angular 7
- HTML 5 images
- Hosted on a cheap server
- All data is public

It is initially intended to display content for a sport organization : News, calendar events, public pages, documents, ...

Visit the [demo](https://olivierb29.github.io/mobilecms-demo/) on github pages

[![Build Status](https://travis-ci.org/OlivierB29/mobilecms.svg?branch=master)](https://travis-ci.org/OlivierB29/mobilecms)

## Admin App
Since this project is the frontend, an admin app is necessary :
- [admin demo](https://olivierb29.github.io/mobilecms-demo/admin).
- source code : [mobilecms-admin](https://github.com/OlivierB29/mobilecms-admin)

## Development server
- Node JS
- `npm i -g @angular/cli`
- `npm i`
- `npm start` (without backend)
- `npm run dev` (with backend)
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `npm run dist` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy
Transfer files in `dist` directory to your server (such as `/var/www/html/`).

## FAQ
- Browser compatibility
Same as [Angular](https://angular.io/guide/browser-support) with polyfills. I tried some third party components, but it broke IE 11 and iOS 7 support.

- Why not using a true CMS on a web hosting package ?
Value for money.

- And a hosted CMS ?
I prefer a domain name, instead of mysite.company.com

- Why JSON files VS database ?
Some entry level offers don't have any database, and <10MB of file storage, such as a domain name package.
For now, we have 10-20 news per year, and roughly the same for calendar events.

- Server hardware requirements
It can be hosted on anything, even a Raspberry Pi.

## Passed audits
Passed audits from PageSpeed Insights (91 Mobile score)
- 1 Properly size images
- 2 Defer offscreen images
- 3 Minify CSS
- 4 Minify JavaScript
- 5 Defer unused CSS
- 6 Efficiently encode images
- 7 Serve images in next-gen formats
- 8 Enable text compression
- 9 Preconnect to required origins
- 10 Server response times are low (TTFB) Root document took 80 ms
- 11 Avoid multiple page redirects
- 12 Preload key requests
- 13 Use video formats for animated content
- 14 Avoids enormous network payloads Total size was 265 KB
- 15 Avoids an excessive DOM size 313 nodes
- 16 JavaScript execution time 1.3 s
- 17 Minimizes main-thread work 1.8 s
- 18 All text remains visible during webfont loads
