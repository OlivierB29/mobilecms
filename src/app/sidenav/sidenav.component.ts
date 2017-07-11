import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReadService } from '../shared/services/read.service';

@Component({
  moduleId: module.id,
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() mode = 'side';
  @Input() opened: boolean;

  lang: string;

  menuItems: any[] = [];

  constructor(private dataService: ReadService) { }

  ngOnInit() {
    // Load the menu items
    this.lang = environment.defaultlocale;
    console.log('loading menu mode:' + this.mode + ' ' + this.opened);

    this.menuItems = this.getMenu(this.lang);
  }

  open() {

    this.opened = !this.opened;
  }


  isOpen() {
    return this.opened;
  }

  isOverMenuOpened() {
    return this.mode === 'over' && this.opened;
  }


  close() {
    if (this.opened) {
      this.opened = false;

    }

  }


  getCssClass(): string {
    let result = 'slidemenu ';

    if (this.mode === 'over') {
      // mobile mode : menu is over content
      result += 'menu-over ';

    } else if (this.mode === 'side') {
      // desktop mode
      result += 'menu-side';
    }


    return result;
  }


  getMenu(lang: string): any[] {
  let result: any[];
  switch (lang) {
    case 'fr':
      result = [
        { 'id': 'news', 'routerLink': '/actualites', 'title': 'Actualités', 'icon': 'list', 'order': '1' },
        { 'id': 'clubs', 'routerLink': '/clubs', 'title': 'Clubs', 'icon': 'place', 'order': '2' },
        { 'id': 'calendar', 'routerLink': '/calendrier', 'title': 'Calendriers', 'icon': 'event', 'order': '3' },
        { 'id': 'structure', 'routerLink': '/structure', 'title': 'Organisation', 'icon': 'person', 'order': '4' },
        { 'id': 'documents', 'routerLink': '/documents', 'title': 'Documents', 'icon': 'folder', 'order': '5' },
        { 'id': 'reports', 'routerLink': '/comptesrendus', 'title': 'Comptes Rendus', 'icon': 'folder', 'order': '6' },
        { 'id': 'links', 'routerLink': '/links', 'title': 'Liens', 'icon': 'bookmark', 'order': '7' },
        { 'id': 'contact', 'routerLink': '/contact', 'title': 'Contact', 'icon': 'mail', 'order': '8' }
      ];
      break;


    default: {
      result = [{ 'id': 'news', 'routerLink': '/news', 'title': 'News', 'icon': 'list', 'order': '1' },
        { 'id': 'clubs', 'routerLink': '/clubs', 'title': 'Clubs', 'icon': 'place', 'order': '2' },
        { 'id': 'calendar', 'routerLink': '/calendar', 'title': 'Calendar', 'icon': 'event', 'order': '3' },
        { 'id': 'structure', 'routerLink': '/structure', 'title': 'Structure', 'icon': 'person', 'order': '4' },
        { 'id': 'documents', 'routerLink': '/documents', 'title': 'Documents', 'icon': 'folder', 'order': '5' },
        { 'id': 'reports', 'routerLink': '/reports', 'title': 'Reports', 'icon': 'folder', 'order': '6' },
        { 'id': 'links', 'routerLink': '/links', 'title': 'Links', 'icon': 'bookmark', 'order': '7' },
        { 'id': 'contact', 'routerLink': '/contact', 'title': 'Contact', 'icon': 'mail', 'order': '8' }];
    };
  }


  return result;
}

}
