import { Log } from '../../shared/services/log.service';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../shared/services/calendar.service';


import { ConfService } from '../../shared/services/conf.service';
import { Event }        from '../../shared/model/event';

import { Router }            from '@angular/router';

/**
* same timing animations
*/
@Component({
    moduleId: module.id,
    selector: 'my-feed-widget',
    templateUrl: 'feed.component.html',
    styleUrls: ['feed.component.css']

})

export class FeedComponent implements OnInit {

    imageservice: string = '';

    layout: string = 'desktop';

    items: Event[] = [];

    constructor(private dataservice: CalendarService,
      private conf: ConfService,
      private router: Router,
          private log: Log) {
    }

    ngOnInit(): void {
      //case : activity selected
        this.dataservice.getCalendarFeed('')
            .subscribe((data: Event[]) => this.items = data,
            error => this.log.debug('getCalendarEvents ' + error),
            () => this.log.debug('getCalendarEvents complete :' + this.items.length));

    }

    gotoDetail(item: Event): void {
          console.log('gotoDetail...' + item.id);

          //let link = ['/calendar/detail/', item.id];
          let link = ['/calendar/detail/' + item.id];
          console.log('navigate to ...' + link.toString());

          this.router.navigate(link);

    }


}
