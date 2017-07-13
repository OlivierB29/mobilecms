import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
@Component({
  moduleId: module.id,
  selector: 'app-sidenav-container',
  templateUrl: 'sidenavcontainer.component.html',
  styleUrls: ['sidenavcontainer.component.css']
})
export class SidenavcontainerComponent implements OnInit {

  title = '';

  /**
  * desktop | mobile
  */
  layout: string;

  /*

  https://material.angular.io/components/component/sidenav
  */
  menuMode: string;

  /*
  opened
  https://www.npmjs.com/package/@angular2-material/sidenav
  */
  menuOpened: boolean;


  mobileLayout: boolean;

  constructor() { }

  ngOnInit() {

    this.layout = this.getLayout();

    if (this.layout === 'desktop') {
      this.title = environment.fulltitle;
      this.menuMode = 'side';
      this.menuOpened = true;

    } else {
      this.title = environment.title;
      this.menuMode = 'over';
      this.menuOpened = false;
    }

  }



  /**
  * conditionnal CSS for displaying backdrop
  */
  getBackdropCss(mobileMenuOpened: boolean): string {
    let result = ' ';
    if (mobileMenuOpened) {
      result += 'my-mat-sidenav-shown';
    }

    return result;
  }

  getLayout(): string {
    let layout = 'desktop';

    if (window.matchMedia('(min-width: 55em)').matches) {
      layout = 'desktop';
    } else {
      layout = 'mobile';
    }

    return layout;
  }


}
