import { OrderbyDescPipe } from '../../shared/filters/orderbydesc.pipe';
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title }  from '@angular/platform-browser';

import { Item }        from '../../shared/model/item';

import { ReadService } from '../../shared/services/read.service';
import { ConfService } from '../../shared/services/conf.service';
import { LocaleService } from '../../shared/services/locale.service';
import { Log } from '../../shared/services/log.service';

@Component({
    moduleId: module.id,
    selector: 'my-contact-component',
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.css']
})
export class ContactComponent implements OnInit {


    items: Item[] = [];

    i18n = {};



    constructor(

        private dataservice: ReadService,
        private conf: ConfService,
        private log: Log,

        private locale: LocaleService,

    ) {



    }

    ngOnInit(): void {

      this.dataservice.getAll('contacts')
          .subscribe((data: Item[]) => this.items = data,
          error => this.log.debug('DocumentsComponent ' + error),
          () => this.log.debug('DocumentsComponent complete :' + this.items.length));




        this.locale.getLocale(this.conf.getI18n() + '/maincontent/contact/i18n',
        this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
            error => this.log.debug('Locale' + error),
            () => this.log.debug('Locale complete'));

    }





}
