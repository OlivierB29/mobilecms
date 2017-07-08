
import { Component, OnInit, Input } from '@angular/core';
import { OrderbyPipe } from '../../shared/filters';
import { Log } from '../../shared/services/log.service';
import { ReadService2 } from '../../shared/services/read.service2';


@Component({
  moduleId: module.id,
  selector: 'app-my-news-component',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit {

  items: any[] = [];

  errorMessage: any;

  maxElements = 4;

  @Input() max = 0;

  type = 'news';


    constructor(
        
        private dataService: ReadService2,
        private log: Log,
        private orderby: OrderbyPipe
    ) {
    }
    ngOnInit(): void {
      this.dataService.getAllPromise(this.type)
    .then(
        beers => this.items = beers,
        error => this.errorMessage = <any>error);

/*
        this.dataService.getAll(this.type)
                                  .subscribe((data: any[]) => this.items = data,
                                      error => this.log.debug(this.type + ' ' + error),
                                      () =>  {
                                        console.log("!!!!");

                                        if (this.max > 0 && this.items.length > this.max) {
                                           this.items = this.items.slice(this.items.length - this.max, this.items.length);

                                        }
                                        this.log.debug(this.type + ' '  +  this.items.length);

                                        this.orderby.transform(this.items, 'date', 'desc');

                                    });

*/


    }



}
