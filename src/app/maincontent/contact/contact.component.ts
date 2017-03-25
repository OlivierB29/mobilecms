import { OrderbyDescPipe } from '../../shared/filters/orderbydesc.pipe';
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title }  from '@angular/platform-browser';

import { Item }        from '../../shared/model/item';

import { ReadService } from '../../shared/services/read.service';
import { ConfService } from '../../shared/services/conf.service';

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
        private log: Log

    ) {



    }

    ngOnInit(): void {

      this.dataservice.getAll('contacts')
          .subscribe((data: Item[]) => this.items = data,
          error => this.log.debug('DocumentsComponent ' + error),
          () => this.log.debug('DocumentsComponent complete :' + this.items.length));




        this.dataservice.getLocale( 'maincontent/contact',
        this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
            error => this.log.debug('Locale' + error),
            () => this.log.debug('Locale complete'));

    }





}
