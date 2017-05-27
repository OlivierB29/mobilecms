
import { Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef } from '@angular/core';

import '../../rxjs-extensions';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';
import { Activity } from '../../shared/model/activity';


import { ReadService } from '../../shared/services/read.service';
import { MenuItem } from '../../shared/model/menuitem';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'app-my-mainpage',
  templateUrl: 'mainpage.component.html',
  styleUrls: ['mainpage.component.css']
})
export class MainPageComponent  implements OnInit  {


  activityObjectList: Activity[] = [];

  menuItems: MenuItem[] = [];

  title = '';

  lang: string;

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

  constructor(
    private translate: TranslateService,
    private conf: ConfService,
    private dataService: ReadService,
    private log: Log) {

  }


  ngOnInit(): void {

    this.title = environment.title;

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(environment.defaultlocale);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(environment.defaultlocale);

    this.lang = environment.defaultlocale;


    // Load the menu items
    this.log.debug('loading menu ' + this.lang);
    this.dataService.getMenu(this.lang)
      .subscribe((data: MenuItem[]) => this.menuItems = data,
      error => this.log.debug('getMenu ' + error),
      () => this.log.debug('getMenu complete'));

    const layout = this.conf.getLayout();

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




  }



}
