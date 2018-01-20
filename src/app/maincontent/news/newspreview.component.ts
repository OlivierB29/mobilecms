
import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderbyPipe } from 'app/shared/pipes';
import { Log } from 'app/shared/services/log.service';
import { ReadService } from 'app/shared/services/read.service';

import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  moduleId: module.id,
  selector: 'app-newspreview-component',
  templateUrl: 'newspreview.component.html',
  styleUrls: ['newspreview.component.css']
})
export class NewsPreviewComponent implements OnInit {


  items: any[] = [];

  maxElements = 4;

  @Input() max = 0;

  type = 'news';


  constructor(
    private titleService: Title,
    private dataService: ReadService,
    private log: Log,
    private orderby: OrderbyPipe,
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
    let dbItems = null;
    this.http.get<any>(this.dataService.getIndexUrl(this.type))
      .subscribe((data: any[]) => {
        dbItems = data;

        dbItems = this.orderby.transform(dbItems, 'date', 'desc');

        if (this.max > 0 && dbItems.length > this.max) {
          dbItems = dbItems.slice(dbItems.length - this.max, dbItems.length);
        }
        this.log.debug(this.type + ' ' + dbItems.length);

        this.items = dbItems;


      });


      // this.titleService.setTitle(this.type);

  }



}
