
import { Component, OnInit } from '@angular/core';


import { Event } from 'app/shared/model/event';

import { Log } from 'app/shared/services/log.service';


/**
* same timing animations
*/
@Component({
    moduleId: module.id,
    selector: 'app-my-featured-widget',
    templateUrl: 'featured.component.html',
    styleUrls: ['featured.component.css']

})

export class FeaturedComponent implements OnInit {

    items: Event[] = [];

    constructor(private log: Log) {}

    ngOnInit(): void {

    }

    gotoDetail(item: Event): void {
          this.log.debug('gotoDetail...' );

    }


}
