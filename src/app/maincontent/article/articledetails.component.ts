

import { Log } from 'src/app/shared/services/log.service';

import { Component, AfterViewInit, Input, OnInit, ElementRef } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';


import { ReadService, MediaService } from 'src/app/shared/services';


import { environment } from 'src/environments/environment';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { Event } from 'src/app/shared/model/event';

@Component({
  
    selector: 'app-my-articledetails-component',

    templateUrl: 'articledetails.component.html',
    styleUrls: ['articledetails.component.css']
})


export class ArticleDetailsComponent  implements OnInit {

  /**
  * type data
  */
  @Input() public type: string ='';

  /**
  * item id
  */
  @Input() public id: string ='';

  /**
  * if data is preloaded
  */
  @Input() public itemparam: any;

  public item: any;

  @Input() public media = 'media';


  @Input() public lazyload = true;

  fetched = false;

  locationhref = '';

  constructor(
    private titleService: Title,
    private meta: Meta,
    private log: Log,
    private readService: ReadService,
    private mediaService: MediaService,
    private http: HttpClient,
    private element: ElementRef) {
    if (!this.item) {
      this.item = {
        id: '', title: this.getEmptyTitle(),
        description: this.getEmptyDescription()
      };

    }

    // TODO  [ngClass]='{"emptytext": !fetched}'
  }

  private getEmptyTitle(): string {
    const result = '............ ...... .... ............';
    // return this.convertToEmptyCharacters(result);
    return result;
  }

  private getEmptyDescription(): string {
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += '...... .... ........... .. .... .. ..... ...... .... ....... ............ ....... .....';
      result += '... .. ............ .... ..... .... ..... ..... ... .......... ........... .......... \n';
    }
    // return this.convertToEmptyCharacters(result);
    return result;
  }


  // private convertToEmptyCharacters(str: string): string {
  //   return str.replace(/\./g, '&nbsp;');
  // }


  ngOnInit() {
    this.locationhref = document.URL;

   // this.locationhref = "http://localhost";
    this.fetchData();
    this.meta.addTag({ name: 'keywords', content: this.item.keywords });
    /**<meta property="og:url"           content="https://www.your-domain.com/your-page.html" />
<meta property="og:type"          content="website" />
<meta property="og:title"         content="Your Website Title" />
<meta property="og:description"   content="Your description" />
<meta property="og:image"         content="https://www.your-domain.com/path/image.jpg" />
 */

this.meta.addTag({ name: 'og:url', content: this.getArticleUrl() });
this.meta.addTag({ name: 'og:type', content: this.locationhref });
this.meta.addTag({ name: 'og:title', content: this.item.title });
this.meta.addTag({ name: 'og:description', content: this.item.description });

if(this.getImages() && this.getImages().length > 0) {

}

  }


  fetchData() {

    if (this.isRouteInit()) {
      this.log.debug('ArticleComponent init ' + this.type + ' ' + this.id);

      this.http.get<any>(this.readService.getUrl(this.type, this.id))
        .subscribe((data: any) => {
          this.item = data;
          this.item.media = this.mediaService.initMediaUrl(this.type, this.id, this.item.media, this.media);
          this.fetched = true;
        });

    } else if (this.isItemInit()) {
      this.log.debug('ArticleComponent item ' + this.item.id);
      let tmpItem = this.itemparam;

      tmpItem.media = this.mediaService.initMediaUrl(this.type, tmpItem.id, tmpItem.media, this.media);
      this.item = tmpItem;
      this.fetched = true;
    } else {
      if (!this.type) {
        this.log.debug('ArticleComponent empty type');
      }

      if (!this.id) {
        this.log.debug('ArticleComponent empty id');
      }
    }


  }

  private isItemInit() {
    return this.itemparam && this.itemparam.id  ;
  }

  private isRouteInit() {
    return this.type && this.id;
  }

  public getId() {
    let result;
    if (this.type && this.id) {
      result = this.id;
    } else  if (this.isItemInit()) {
      result = this.item.id;
    }
    return result;
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

  getVideos(): any[] {
    return this.mediaService.getVideos(this.getItem());
  }



  getArticleUrl(): string {
    return document.URL ;
  }


  /**
  * eg media/news/3/thumbnails
  */
   getRecordUri(): string {
    return this.type + '/' + this.getId();
  }



}
