# MobileCms
This project is the frontend for a CMS with categories.
It is initially intended to display content for a sport organization : News, calendar events, public pages, documents, ...

Visit the [demo](https://olivierb29.github.io/mobilecms-demo/) on github pages

[![Build Status](https://travis-ci.org/OlivierB29/mobilecms.svg?branch=master)](https://travis-ci.org/OlivierB29/mobilecms)

Briefly :
- Angular 5
- [ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image)
- Hosted on a cheap server, with no database available (see explanation in FAQ)
- All the data is public, by default.

## Admin App
Since this project is the frontend, an admin app is necessary :
- [admin demo](https://olivierb29.github.io/mobilecms-demo/admin).
- source code : [mobilecms-admin](https://github.com/OlivierB29/mobilecms-admin)

## Development server
- Node JS
- `npm install -g @angular/cli`
- `npm install` or `yarn`
- Run `ng serve` for a dev server.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `npm run dist` to build the project. The build artifacts will be stored in the `dist/` directory.

Demo build for github pages : `ng build --env=demo --base-href /mobilecms-demo/ --aot --build-optimizer`

## Deploy
Transfer files in `dist` directory to your server (such as `/var/www/html/`).

## FAQ
- Why not using a true CMS on a web hosting package ?
Value for money.

- And a hosted CMS ?
I prefer a domain name, instead of mysite.company.com

- Why JSON files VS database ?
Some entry level offers don't have any database, and <10MB of file storage, such as a domain name package.
In future plans, with the growing data, the database may become useful.
For now, we have 10-20 news per year, and roughly the same for calendar events.
