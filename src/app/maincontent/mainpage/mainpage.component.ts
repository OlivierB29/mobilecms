
import { Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef } from '@angular/core';

import '../../rxjs-extensions';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';
import { Activity } from '../../shared/model/activity';


import { ReadService } from '../../shared/services/read.service';
import { MenuItem } from '../../shared/model/menuitem';

@Component({
  moduleId: module.id,
  selector: 'app-my-mainpage',
  templateUrl: 'mainpage.component.html',
  styleUrls: ['mainpage.component.css']
})
export class MainPageComponent {


  activityObjectList: Activity[] = [];

  menuItems: MenuItem[] = [];

  activity: string;

  // Localization
  i18n = <any>{};

  lang: string;

  /*

  https: // material.angular.io/components/component/sidenav
  */
  menuMode: string;

  /*
  opened
  https: // www.npmjs.com/package/@angular2-material/sidenav
  */
  menuOpened: boolean;


  mobileLayout: boolean;

  constructor(private conf: ConfService,
    private dataService: ReadService,
    private log: Log) {

  }


  ngOnInit(): void {

    this.lang = this.conf.getDefaultLocale();

    this.dataService.getLocale('maincontent/mainpage',
      this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
      error => this.log.debug('Locale' + error),
      () => this.log.debug('Locale complete'));


    // Load the menu items
    this.log.debug('loading menu ' + this.conf.getDefaultLocale());
    this.dataService.getMenu('menu', this.conf.getDefaultLocale())
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
