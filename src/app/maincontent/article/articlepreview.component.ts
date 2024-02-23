import { Component, OnInit, Input } from '@angular/core';
import { MediaComponent } from './media.component';
import { ReadService, MediaService } from 'src/app/shared/services';
import { Log } from 'src/app/shared/services/log.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { ImageService } from 'src/app/maincontent/image';


@Component({

  selector: 'app-articlepreview',
  templateUrl: 'articlepreview.component.html',
  styleUrls: ['article.css', 'articlepreview.css', 'articlepreview.component.css']
})
export class ArticlePreviewComponent   implements OnInit {

  @Input() type: string ='';


  @Input() id: string ='';

  @Input() item: any;

  @Input() media = 'media';

  maxPreviewLength = 240;

  offset = 100;
  defaultImage = environment.server + '/' + environment.public +  '/resources/ring-alt-32.svg';

  image: any ;
  url = '';

  constructor(private log: Log, private readService: ReadService,
      private mediaService: MediaService, private http: HttpClient,
      private imageService: ImageService) {
 }

  ngOnInit() {
    this.log.debug('ArticlePreviewComponent ' + this.id);

    if (this.type && this.id) {
      this.http.get<any>(this.readService.getUrl(this.type, this.id))
      .subscribe((data: any) => {
        this.item = data;
        this.item.media = this.mediaService.initMediaUrl(this.type, this.id, this.item.media, this.media);

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



  }

  getItem(): any {
    return this.item;
  }

  getPreviewDescription(): string {
    let result = '';
    // TODO remove all BBCode in preview, or regex to avoid cut between tags

    // regex to remove tags and text
    //str = str.replace(/\[(\w+)[^\]]*](.*?)\[\/\1]/g, '');
    let desc = this.item.description;
    if (desc.length > this.maxPreviewLength) {

      // temporary code
      let lastBBCode = desc.lastIndexOf(']');
      if (lastBBCode !== -1 ) {
        result = desc.substring(0, lastBBCode + 1) + ' ...';
      } else {
        result = desc.substring(0, this.maxPreviewLength) + ' ...';
      }

    } else {
      result = desc;
    }
    return result;

  }

  public getThumbnail(picture: any): string {

    return this.imageService.getThumbnail(environment.server, this.type + '/' + this.item.id, picture);
  }
  getImages(): any[] {
    return this.mediaService.getImages(this.getItem());
  }

  getAttachments(): any[] {
    return this.mediaService.getAttachments(this.getItem());
  }
}
