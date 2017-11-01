import { Component, OnInit, Input } from '@angular/core';
import { MediaComponent } from './media.component';
import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  moduleId: module.id,
  selector: 'app-articlepreview',
  templateUrl: 'articlepreview.component.html',
  styleUrls: ['article.css', 'articlepreview.css', 'articlepreview.component.css']
})
export class ArticlePreviewComponent  extends MediaComponent implements OnInit {

  @Input() type: string;


  @Input() id: string;

  @Input() item: any;

  @Input() media = 'media';

  maxPreviewLength = 240;

  offset = 100;
  defaultImage = environment.server + '/' + environment.public +  '/resources/ring-alt-32.svg';

  image: any ;
  url = '';

  constructor(private log: Log, private readService: ReadService, private http: HttpClient) {
  super();
 }


  ngOnInit() {
    this.log.debug('ArticlePreviewComponent ' + this.id);



    if (!this.type) {
      throw new Error('empty type');
    }

    if (!this.id) {
      throw new Error('empty id');
    }

    this.http.get<any>(this.readService.getUrl(this.type, this.id))
              .subscribe((data: any) => {
                this.item = data;
                this.item.media = this.initMediaUrl(this.type, this.id, this.item.media, this.media);

                 if (this.getImages() && this.getImages().length > 0) {
                   this.image = this.getImages()[0];
                 }

                  // TODO : news/1 vs calendar/detail/1
                  if ('calendar' === this.type) {
                    this.url = '/' + this.type + '/detail/' + this.item.id;
                    } else {
                    this.url = '/' + this.type + '/' + this.item.id;
                  }

              });


  }

  getItem(): any {
    return this.item;
  }

  getPreviewDescription(): string {
    let result = '';
    if (this.item.description.length > this.maxPreviewLength) {
      result = this.item.description.substring(0, this.maxPreviewLength) + ' ...';
    } else {
      result = this.item.description;
    }
    return result;

  }



}
