import { Component, OnInit } from '@angular/core';

import { Log } from 'src/app/shared/services/log.service';
import { Item } from 'src/app/shared/model/item';
import { ReadService } from 'src/app/shared/services/read.service';
import { HttpClient } from '@angular/common/http';



/**
* same timing animations
*/
@Component({

    selector: 'app-my-footer-widget',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css']
 })

export class FooterComponent implements OnInit {

  items: any[] = <any>[];
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
