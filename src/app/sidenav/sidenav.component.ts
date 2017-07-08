import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReadService } from '../shared/services/read.service';
import { MenuItem } from '../shared/model/menuitem';

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

  menuItems: MenuItem[] = [];


  constructor(private dataService: ReadService) { }

  ngOnInit() {
    // Load the menu items
    this.lang = environment.defaultlocale;
    console.log('loading menu mode:' + this.mode + ' ' + this.opened);
    this.dataService.getMenu(this.lang)
      .subscribe((data: MenuItem[]) => this.menuItems = data,
      error => console.log('getMenu ' + error),
      () => console.log('getMenu complete'));
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

}
