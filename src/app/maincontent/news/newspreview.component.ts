
import { Component, OnInit, Input } from '@angular/core';
import { OrderbyPipe } from '../../shared/filters';
import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';
import { ConfService } from '../../shared/services/conf.service';



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

  progressvalue = 20;


    constructor(
        private conf: ConfService,
        private dataService: ReadService,
        private log: Log,
        private orderby: OrderbyPipe
    ) {
    }
    ngOnInit(): void {
        this.progressvalue = 40;
        this.dataService.getAll(this.type)
                                  .subscribe((data: any[]) => this.items = data,
                                      error => this.log.debug(this.type + ' ' + error),
                                      () =>  {
                                        this.progressvalue = 60;
                                        if (this.max > 0 && this.items.length > this.max) {
                                           this.items = this.items.slice(this.items.length - this.max, this.items.length);
                                        }
                                        this.log.debug(this.type + ' '  +  this.items.length);
                                        this.progressvalue = 80;
                                        this.orderby.transform(this.items, 'date', 'desc');
                                        this.progressvalue = 100;
                                    });




    }



}
