import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ReadService } from 'src/app/shared/services/read.service';
import { Log } from 'src/app/shared/services/log.service';
import { Item } from 'src/app/shared/model/item';
import { OrderbyPipe } from 'src/app/shared/pipes';
import { HttpClient } from '@angular/common/http';


@Component({

  selector: 'app-items',
  templateUrl: 'items.component.html',
  styleUrls: ['items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = null;

  type: string = null;

  orderby: string = null;

  direction = 'asc';


  constructor(private titleService: Title, private log: Log, private dataService: ReadService, private http: HttpClient,
    private route: ActivatedRoute, private orderbyPipe: OrderbyPipe) {
  }

  ngOnInit() {
    // Example of route for opening documents
    // { path: 'documents',  component: ItemsComponent, data: { type: 'documents' }  }

    this.route.data.forEach((data: Data) => {

      if (data['type'] !== undefined) {
        this.type = data['type'];
      }


      if (data['orderby'] !== undefined) {
        this.orderby = data['orderby'];
      }
      if (data['direction'] !== undefined) {
        this.direction = data['direction'];

      }



    });

    this.http.get<any>(this.dataService.getIndexUrl(this.type))
    .subscribe((data: any[]) => {
      this.items = data;
      this.log.debug(this.type + ' ' + this.items.length);
      if (this.orderby) {
        // this.orderbyPipe.transform(this.items, this.orderby, this.direction);
        this.orderbyPipe.transform(this.items, this.orderby, this.direction);
      }
    });

 // this.titleService.setTitle(this.type);
  }



}
