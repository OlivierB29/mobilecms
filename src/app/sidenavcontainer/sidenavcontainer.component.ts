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

        const layout = this.getLayout();


        this.mobileLayout = layout !== 'desktop';

        switch (layout) {
          case 'desktop':
            this.menuMode = 'side';
            this.menuOpened = true;

            break;
          default:
            this.menuMode = 'over';
            this.menuOpened = false;

        }

        if (this.mobileLayout) {
          this.title = environment.title;
        } else {
          this.title = environment.fulltitle;
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
      } else if (window.matchMedia('(min-width: 29em)').matches) {
        layout = 'medium';
      } else {
        layout = 'mobile';
      }

      return layout;
    }


}
