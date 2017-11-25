# MobileCms
This project is the frontend for a CMS with categories.
It is initially intended to display content for a sport organization : News, calendar events, public pages, documents, ...

Visit the [demo](https://olivierb29.github.io/mobilecms-demo/) on github pages

[![Build Status](https://travis-ci.org/OlivierB29/mobilecms.svg?branch=master)](https://travis-ci.org/OlivierB29/mobilecms)

Briefly :
- Angular 5
- HTML 5 images
- Hosted on a cheap server, with no database available (see explanation in FAQ)
- All data is public

## Admin App
Since this project is the frontend, an admin app is necessary :
- [admin demo](https://olivierb29.github.io/mobilecms-demo/admin).
- source code : [mobilecms-admin](https://github.com/OlivierB29/mobilecms-admin)

## Development server
- Node JS
- yarn (optional)
- `npm install -g @angular/cli`
- `npm install` or `yarn`
- Run `npm start` for a dev server.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `npm run dist` to build the project. The build artifacts will be stored in the `dist/` directory.

Demo build for github pages : `npm run demobuild`

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
In future plans, with the growing data, the database may become useful.
For now, we have 10-20 news per year, and roughly the same for calendar events.

- Server hardware requirements
Depending of simultaneous users, it can be hosted on anything, even a Raspberry Pi.
