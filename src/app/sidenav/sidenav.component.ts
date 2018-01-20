import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { MenuService } from './menu.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';


import { LayoutService } from 'app/shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  @Input() mode = 'side';
  @Input() opened: boolean;

  @Input() expanded = false;

  @Input() lang: string;

  menuItems: any[] = [];


  constructor(private menuService: MenuService,
  private layoutService: LayoutService
  ) {
    this.setLayout();

     const $resizeEvent = Observable.fromEvent(window, 'resize').map(() => {
       return document.documentElement.clientWidth;
     }).debounceTime(200);

    $resizeEvent.subscribe(data => {
      this.setLayout();
    });

   }

  ngOnInit() {
    this.lang = environment.defaultlocale;
    this.menuService.getMenuData(this.lang)
        .subscribe((data: any[]) => {
          data.forEach(item => this.menuItems.push(item));
        });
  }

  ngAfterViewInit() {

  }

  open() {
    this.opened = !this.opened;
  }

  setLayout() {
    const newmode = this.getMenuLayout();

    if (newmode !== this.mode) {
      if (newmode === 'over') {
        this.setOver();
      } else {
        this.setSide();
      }
    }

  }

  setOver() {

    this.opened = false;
    this.expanded = true;
    this.mode = 'over';
  }

  setSide() {

    this.mode = 'side';
    this.expanded = false;
    this.opened = true;
  }

  initLayout() {
    const layout = this.layoutService.getLayout();

    if (layout === 'desktop') {
      this.setSide();
    } else {
      this.setOver();
    }

  }

  expand() {
    this.expanded = !this.expanded;
  }

  expandMenuContent() {
    if (this.getMode() === 'side') {
      this.expanded = true;
    }
  }

  expandMenu() {
    if (this.getMode() === 'over') {
      this.open(); //
    } else {
      this.expand();
    }

  }

  getMode(): string {
    return this.mode;
  }

  isExpanded() {
    return this.expanded;
  }


  isOpen() {
    return this.opened;
  }

  isOverMenuOpened() {
    return this.mode === 'over' && this.opened;
  }


  close() {
    if (this.isOverMenuOpened()) {
      this.opened = false;
    }
  }

  expandClose() {
    if (this.isOverMenuOpened()) {
      this.opened = false;
    }
    if (!this.expanded) {
      this.expanded = true;
    }
  }

  getMenuLayout(): string {
    return this.layoutService.getLayout() === 'mobile' ? 'over' : 'side';
  }



}
