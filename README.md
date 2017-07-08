# MobileCms
This project is a frontend for reading content stored in JSON files.
It is initially intended to read content from a sport organization, with such content : News, calendar events, public pages, documents, ...

- Angular.io
- Hosted on a cheap server, with no database available (see explanation in FAQ)
- All the data is public, by default.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

ng build --prod


## FAQ
- Why not using a true CMS on a web hosting package ?
Value for money.

- And a hosted CMS ?
I prefer a domain name, instead of mysite.company.com

- Why JSON files VS database ?
Some entry level offers don't have any database, and <10MB of file storage, such as a domain name package.
In future plans, with the growing data, the database may become useful.
For now, we have 10-20 news per year, and roughly the same for calendar events.
