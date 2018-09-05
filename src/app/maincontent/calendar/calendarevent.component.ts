import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouteUtilService, ReadService, Log, MediaService } from 'app/shared/services';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { MediaComponent } from 'app/maincontent/article';

@Component({
  
    selector: 'app-my-calendar-event',
    templateUrl: 'calendarevent.component.html',
    styleUrls: ['calendarevent.component.css', '../article/article.css']
})
export class CalendarEventComponent  implements OnInit {

    @Input() public id: string;

    type = 'calendar';

    item: any;

    media = 'media';

    activity = '';

    parentUrl = '';


    constructor(
        private log: Log,
        private route: ActivatedRoute,
        private readService: ReadService,
        private mediaService: MediaService,
        private http: HttpClient,
        private routeUtil: RouteUtilService
    ) {
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
              this.item.media = this.mediaService.initMediaUrl(this.type, this.id, this.item.media, this.media);
            });

      } else {
        if (!this.type) {
          this.log.error('CalendarEventComponent empty type');
        }

        if (!this.id) {
          this.log.error('CalendarEventComponent empty id');
        }
      }



    }

    getItem(): any {
      return this.item;
    }

    getImages(): any[] {
      return this.mediaService.getImages(this.getItem());
    }

    getAttachments(): any[] {
      return this.mediaService.getAttachments(this.getItem());
    }

    /**
    * eg media/news/3/thumbnails
    */
    getRecordUri(): string {
      return this.type + '/' + this.id;
    }

}
