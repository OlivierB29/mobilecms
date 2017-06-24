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
    console.log('loading menu ' + this.lang);
    this.dataService.getMenu(this.lang)
      .subscribe((data: MenuItem[]) => this.menuItems = data,
      error => console.log('getMenu ' + error),
      () => console.log('getMenu complete'));
  }

  open() {
      this.opened = !this.opened;
  }

  isOpened() {
      return this.opened;
  }

  close() {
    if (this.opened) {
      this.opened = false;

    }

  }

  getCssClass(): string {
    let result = 'slidemenu ';


    if (this.mode === 'over') {
      result += 'menu-over';
    } else if (this.mode === 'side') {
      result += 'menu-side';
    }

    return result;
  }

  getCssClass2(): string {
    let result = 'slidemenu ';


    if (this.mode === 'over') {
      result += 'menu-over ';

      if (this.opened) {
        result += 'menu-over-opened';
      }


    } else if (this.mode === 'side') {
      result += 'menu-side';
    }


    return result;
  }

}
