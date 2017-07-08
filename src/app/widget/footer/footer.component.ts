
import { Log } from '../../shared/services/log.service';


import { Item } from '../../shared/model/item';
import { Component, OnInit } from '@angular/core';
import { ReadService } from '../../shared/services/read.service';

// import { MdIcon, MdIconRegistry } from '@angular/material/icon/icon';





/**
* same timing animations
*/
@Component({
    moduleId: module.id,
    selector: 'my-footer-widget',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css']
 })

export class FooterComponent implements OnInit {

  items: any[] = [];
  errorMessage: any = '';


    constructor(    private readService: ReadService,
        
        private log: Log
) {

     }

    ngOnInit(): void {


            this.readService.getAllItems('about')
                .subscribe((data: any[]) => this.items = data,
                error => this.log.debug('getActivities'  +  error),
                () => this.log.debug('getActivities complete'));


     }

 }
