# MobileCms
tl;dr : Small CMS with categories. Data is stored in JSON files.

- Angular 9
- HTML 5 images
- Hosted on a cheap server
- All data is public
- BBCode support

It is initially intended to display content for a sport organization : News, calendar events, public pages, documents, ...

[![Build Status](https://travis-ci.org/OlivierB29/mobilecms.svg?branch=master)](https://travis-ci.org/OlivierB29/mobilecms)

## Admin App
Since this project is the frontend, an admin app is necessary :
- [admin demo](https://olivierb29.github.io/mobilecms-demo/admin).
- source code : [mobilecms-admin](https://github.com/OlivierB29/mobilecms-admin)

## Development server
- Node JS
- `npm i -g @angular/cli`
- `npm i`
- `npm start`
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `npm run dist` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy
Transfer files in `dist` directory to your server (such as `/var/www/html/`).

## FAQ
- Browser compatibility
Same as [Angular](https://angular.io/guide/browser-support) with polyfills. I tried some third party components, but it broke IE 11 and iOS support.

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
Passed audits with Lighthouse

Scores 
- Performance : 99
- Accessibility : 100
- Best practices : 93
- SEO : 100

