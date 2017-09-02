import { Component, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { ReadService } from 'app/shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-sidenav-container',
  templateUrl: 'sidenavcontainer.component.html',
  styleUrls: ['sidenavcontainer.component.css']
})
export class SidenavcontainerComponent implements AfterViewInit {

  title = '';

  /**
  * desktop | mobile
  */
  layout: string;

  /**
  * https://material.angular.io/components/component/sidenav
  */
  menuMode = 'over';

  /*
  opened  https://www.npmjs.com/package/@angular2-material/sidenav
  */
  menuOpened = false;

  constructor(private titleService: Title, private meta: Meta, private readService: ReadService) {

    this.initLayout();

  }


  ngAfterViewInit() {
    this.fetchData();

  }


  fetchData() {

    this.readService.get('description', 'head')
      .subscribe((data: any) => {
        const item = data;
        this.titleService.setTitle(item.title);

        if (this.layout === 'desktop') {
          this.title = item.fulltitle;
        } else {
          this.title = item.title;
        }

        this.meta.addTag({ name: 'keywords', content: item.keywords });
        this.meta.addTag({ name: 'description', content: item.description });

      },
      error => console.error('get ' + error));

  }

  initLayout() {
    this.layout = this.getLayout();
    this.menuOpened = false;
    this.menuMode = 'over';
    if (this.layout === 'desktop') {
      this.menuMode = 'side';
      this.menuOpened = true;
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
    let layout = 'mobile';

    if (window.matchMedia('(min-width: 55em)').matches) {
      layout = 'desktop';
    }

    return layout;
  }

}
