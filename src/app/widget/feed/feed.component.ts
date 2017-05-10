import { Log } from '../../shared/services/log.service';
import { Component, OnInit } from '@angular/core';

import { ReadService } from '../../shared/services/read.service';

import { ConfService } from '../../shared/services/conf.service';
import { Event } from '../../shared/model/event';

import { Router } from '@angular/router';

/**
* same timing animations
*/
@Component({
  moduleId: module.id,
  selector: 'app-my-feed-widget',
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.css']

})

export class FeedComponent implements OnInit {

  imageservice = '';


  items: Event[] = [];

  constructor(private dataService: ReadService,
    private conf: ConfService,
    private router: Router,
    private log: Log) {
  }

  ngOnInit(): void {
    // case: activity selected
    this.dataService.getAll('calendar')
      .subscribe((data: Event[]) => this.items = data,
      error => console.error('getCalendarEvents ' + error),
      () => this.log.debug('getCalendarEvents complete : ' + this.items.length));

  }

  gotoDetail(item: Event): void {
    this.log.debug('gotoDetail...' + item.id);


    const link = ['/calendar/detail/' + item.id];
    this.log.debug('navigate to ...' + link.toString());

    this.router.navigate(['/calendar/detail/' + item.id]);

  }


}
