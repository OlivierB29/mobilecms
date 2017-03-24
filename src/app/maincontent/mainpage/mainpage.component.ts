
import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';

import '../../rxjs-extensions';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';
import { Activity } from '../../shared/model/activity';

import { LocaleService } from '../../shared/services/locale.service';

import { MenuItem } from '../../shared/model/menuitem';

@Component({
    moduleId: module.id,
    selector: 'my-mainpage',
    templateUrl: 'mainpage.component.html',
    styleUrls: ['mainpage.component.css']
})
export class MainPageComponent {

    activityObjectList: Activity[] = [];

    menuItems: MenuItem[] = [];

    activity: string;

    //Localization
    i18n = {};

    lang: string;



    constructor(private conf: ConfService,
        private log: Log, private locale: LocaleService) {

    }


    ngOnInit(): void {

        this.lang = this.conf.getDefaultLocale();

  this.locale.getLocale(this.conf.getI18n() + '/maincontent/mainpage/i18n',
  this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
                error => this.log.debug('Locale' + error),
                () => this.log.debug('Locale complete'));


        // Load the menu items
        this.log.debug('loading menu ' + this.conf.getDefaultLocale());
        this.locale.getMenu(this.conf.getI18n() + '/i18n', this.conf.getDefaultLocale())
            .subscribe((data: MenuItem[]) => this.menuItems = data,
            error => this.log.debug('getMenu ' + error),
            () => this.log.debug('getMenu complete'));


    }

}
