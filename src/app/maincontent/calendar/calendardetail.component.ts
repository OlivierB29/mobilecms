
import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';
import { MediaComponent } from '../article';

@Component({
    moduleId: module.id,
    selector: 'app-my-calendardetail-component',
    templateUrl: 'calendardetail.component.html',
    styleUrls: ['calendardetail.component.css']
})
export class CalendarDetailComponent extends MediaComponent implements OnInit {

    @Input() id: string;

    @Input() media = 'media';

    @Input() type = 'calendar';

    item: any = {};

    /**
    * offset for LazyLoadImageModule
    */
    offset = 100;

    /**
    * default image displayed by  for LazyLoadImageModule
    */
    defaultImage = environment.server + '/' + environment.public + '/resources/ring-alt-32.svg';


    constructor(
        private readService: ReadService,
        private log: Log
    ) {
      super();
    }

    ngOnInit(): void {
        this.log.debug('app-my-calendardetail-component '  +  this.id);


        if (this.id) {

            this.readService.get('calendar', this.id)
                .subscribe((data: any) => {
                  this.item = data;
                  this.item.media = this.initMediaUrl(this.type, this.id, this.item.media, this.media);
                },
                error => this.log.debug('get'  +  error),
                () => { this.log.debug('get complete'); });
        } else {
            console.error('app-my-calendardetail-component empty id');
        }


    }


    getItem(): any {
      return this.item;
    }

    getImages(): any[] {
      return super.getImages();
    }

    getAttachments(): any[] {
      return super.getAttachments();
    }

}
