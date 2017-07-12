
import { Component, AfterViewInit } from '@angular/core';

import { OrderbyPipe } from '../../shared/filters';
import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';



@Component({
  moduleId: module.id,
  selector: 'app-my-news-component',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements AfterViewInit {

  index: any[] = [];

  items: any[] = [];

  errorMessage: any;

  max = 4;

  type = 'news';


  constructor(
    private dataService: ReadService,
    private log: Log,
    private orderby: OrderbyPipe
  ) {
    // at this time 'max' has its default value
    if (this.max > 0) {
      const emptyItem = { id: '' };

      while (this.items.length < this.max) {

        this.items.push(emptyItem);
      }

    }
  }

  ngAfterViewInit(): void {

    let localItems = null;
    this.dataService.getAll(this.type)
      .subscribe((data: any[]) => localItems = data,
      error => this.log.debug(this.type + ' ' + error),
      () => {
        // About 20 news per season.
        // https://angular.io/guide/pipes#!#no-filter-pipe

        // in case of an unsorted index
          localItems = this.orderby.transform(localItems, 'date', 'desc');

        if (this.max > 0 && localItems.length > this.max) {
          localItems = localItems.slice(0, this.max);

        }

        this.log.debug(this.type + ' ' + localItems.length);

        // replace or add new items

        for (let i = 0; i < localItems.length; i++) {
          if (this.items.length > i) {
            this.items[i] = localItems[i];
          } else {
            this.items.push(localItems[i]);
          }
        }

      });




    this.log.debug('NewsComponent ' + this.type + ' ' + this.items.length);


  }


}
