import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';

import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';
import { Item } from '../../shared/model/item';


@Component({
  moduleId: module.id,
  selector: 'app-items',
  templateUrl: 'items.component.html',
  styleUrls: ['items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = null;

  type: string = null;

  constructor(private log: Log, private dataService: ReadService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    // Example of route for opening documents
    // { path: 'documents',  component: ItemsComponent, data: { type: 'documents' }  }

    this.route.data.forEach((data: Data) => {
      if (data['type'] !== undefined) {
        this.type = data['type'];
      }
    });


    this.dataService.getAll(this.type)
      .subscribe((data: any[]) => this.items = data,
      error => this.log.debug(this.type + ' ' + error),
      () => {
        this.log.debug(this.type + ' ' + this.items.length);
      });

    this.type = this.type;
  }



}
