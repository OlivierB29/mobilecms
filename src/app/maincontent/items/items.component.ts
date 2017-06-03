import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';

import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';
import { Item } from '../../shared/model/item';
import { OrderbyPipe } from '../../shared/filters';


@Component({
  moduleId: module.id,
  selector: 'app-items',
  templateUrl: 'items.component.html',
  styleUrls: ['items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = null;

  type: string = null;

  orderby: string = null;

  direction = 'asc';


  constructor(private log: Log, private dataService: ReadService,
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


    this.dataService.getAll(this.type)
      .subscribe((data: any[]) => this.items = data,
      error => this.log.debug(this.type + ' ' + error),
      () => {
        this.log.debug(this.type + ' ' + this.items.length);
        if (this.orderby) {
          // this.orderbyPipe.transform(this.items, this.orderby, this.direction);
          this.orderbyPipe.transform(this.items, this.orderby, this.direction);
        }


      });

    this.type = this.type;
  }



}
