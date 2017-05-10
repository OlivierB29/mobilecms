
import { Component, OnInit } from '@angular/core';


import { Event } from '../../shared/model/event';


/**
* same timing animations
*/
@Component({
    moduleId: module.id,
    selector: 'my-featured-widget',
    templateUrl: 'featured.component.html',
    styleUrls: ['featured.component.css']

})

export class FeaturedComponent implements OnInit {

    items: Event[] = [];


    ngOnInit(): void {
/*
      let e: Event = new Event();
      e.title = '';

      this.items.push(e);
      */
    }

    gotoDetail(item: Event): void {
          console.log('gotoDetail...' );

    }


}
