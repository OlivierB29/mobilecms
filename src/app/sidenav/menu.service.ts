import { Injectable } from '@angular/core';


import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';


// import issue
// const menufr = require('./menu.fr.json');
// const menuen = require('./menu.en.json');
@Injectable()
export class MenuService {


    /**
    * Explanations about this hard coded data, VS a JSON file like elsewhere.
    * - It seems to block the loading and display of the page ( test with Google Page Insight).
    * - Menu data is rarely modified
    */
    getMenuData(lang: string): Observable<any[]> {
    let result: any[];
    switch (lang) {
      case 'fr':
        result = [
          { 'id': 'news', 'routerLink': '/actualites', 'title': 'Actualités', 'icon': 'list', 'order': '1' },
          { 'id': 'clubs', 'routerLink': '/clubs', 'title': 'Clubs', 'icon': 'place', 'order': '2' },
          { 'id': 'googlecalendar', 'routerLink': '/calendriergoogle', 'title': 'Calendriers', 'icon': 'date_range', 'order': '3' },
          { 'id': 'structure', 'routerLink': '/structure', 'title': 'Organisation', 'icon': 'person', 'order': '4' },
          { 'id': 'documents', 'routerLink': '/documents', 'title': 'Documents', 'icon': 'folder_open', 'order': '5' },
          { 'id': 'reports', 'routerLink': '/comptesrendus', 'title': 'Comptes Rendus', 'icon': 'assignment', 'order': '6' },
          { 'id': 'links', 'routerLink': '/links', 'title': 'Liens', 'icon': 'bookmark', 'order': '7' },
          { 'id': 'contact', 'routerLink': '/contact', 'title': 'Contact', 'icon': 'mail', 'order': '8' },
          { "id": "calendar", "routerLink": "/calendar", "title": "Calendriers2", "icon": "date_range", "order": "9" }
        ];
        break;


      default: {
        result = [
          { 'id': 'news', 'routerLink': '/news', 'title': 'News', 'icon': 'list', 'order': '1' },
          { 'id': 'clubs', 'routerLink': '/clubs', 'title': 'Clubs', 'icon': 'place', 'order': '2' },
          { "id": "googlecalendar", "routerLink": "/googlecalendar", "title": "Calendar", "icon": "date_range", "order": "3" },
          { 'id': 'structure', 'routerLink': '/structure', 'title': 'Structure', 'icon': 'person', 'order': '4' },
          { 'id': 'documents', 'routerLink': '/documents', 'title': 'Documents', 'icon': 'folder_open', 'order': '5' },
          { 'id': 'reports', 'routerLink': '/reports', 'title': 'Reports', 'icon': 'assignment', 'order': '6' },
          { 'id': 'links', 'routerLink': '/links', 'title': 'Links', 'icon': 'bookmark', 'order': '7' },
          { 'id': 'contact', 'routerLink': '/contact', 'title': 'Contact', 'icon': 'mail', 'order': '8' },
          { "id": "calendar", "routerLink": "/calendar", "title": "Calendriers2", "icon": "date_range", "order": "9" }
        ];
      }
    }

    return of(result);
  }

}
