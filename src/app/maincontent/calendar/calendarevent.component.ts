
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouteUtilService, ReadService, Log } from 'app/shared/services';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { MediaComponent } from 'app/maincontent/article';

@Component({
    moduleId: module.id,
    selector: 'app-my-calendar-event',
    templateUrl: 'calendarevent.component.html',
    styleUrls: ['calendarevent.component.css']
})
export class CalendarEventComponent extends MediaComponent implements OnInit {

    id= '';

    type = 'calendar';

    item: any;

    media = 'media';

    activity = '';

    parentUrl = '';


    constructor(
        private log: Log,
        private route: ActivatedRoute,
        private readService: ReadService,
        private http: HttpClient,
        private routeUtil: RouteUtilService
    ) {
      super();
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                this.id = params['id'];
            }
            this.fetchData();
        });


    }



    fetchData() {

      if (this.type && this.id) {

        this.http.get<any>(this.readService.getUrl(this.type, this.id))
            .subscribe((data: any) => {
              this.item = data;

              this.activity = this.item.activity;

              this.parentUrl = '/' + this.routeUtil.getCalendarRoute(environment.defaultlocale) + '/' + this.item.activity ;
              this.item.media = this.initMediaUrl(this.type, this.id, this.item.media, this.media);
            });

      } else {
        if (!this.type) {
          this.log.error('empty type');
        }

        if (!this.id) {
          this.log.error('empty id');
        }
      }



    }

    getItem(): any {
      return this.item;
    }

}
