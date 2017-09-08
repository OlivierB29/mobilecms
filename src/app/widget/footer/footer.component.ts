import { Component, OnInit } from '@angular/core';

import { Log } from '../../shared/services/log.service';
import { Item } from '../../shared/model/item';
import { ReadService } from '../../shared/services/read.service';
import { HttpClient } from '@angular/common/http';



/**
* same timing animations
*/
@Component({
    moduleId: module.id,
    selector: 'app-my-footer-widget',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css']
 })

export class FooterComponent implements OnInit {

  items: any[] = [];
  errorMessage: any = '';


    constructor(    private readService: ReadService,

        private log: Log, private http: HttpClient
) {

     }

    ngOnInit(): void {


    this.http.get<any>(this.readService.getIndexUrl('about'))
    .subscribe((data: any[]) => this.items = data);



     }

 }
