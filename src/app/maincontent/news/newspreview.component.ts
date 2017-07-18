
import { Component, OnInit, Input } from '@angular/core';
import { OrderbyPipe } from '../../shared/filters';
import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';




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
    private dataService: ReadService,
    private log: Log,
    private orderby: OrderbyPipe
  ) {
  }
  ngOnInit(): void {
    let dbItems = null;
    this.dataService.getAll(this.type)
      .subscribe((data: any[]) => dbItems = data,
      error => this.log.debug(this.type + ' ' + error),
      () => {
        dbItems = this.orderby.transform(dbItems, 'date', 'desc');

        if (this.max > 0 && dbItems.length > this.max) {
          dbItems = dbItems.slice(dbItems.length - this.max, dbItems.length);
        }
        this.log.debug(this.type + ' ' + dbItems.length);

        this.items = dbItems;


      });




  }



}
