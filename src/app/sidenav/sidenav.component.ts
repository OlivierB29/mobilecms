import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { MenuService } from './menu.service';

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

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    // Load the menu items
    this.lang = environment.defaultlocale;

    this.menuItems = this.menuService.getMenuData(this.lang);
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

}
