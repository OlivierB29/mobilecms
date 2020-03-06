import { Component, AfterViewInit, Input, OnInit, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { MediaComponent } from './media.component';
import { ReadService, MediaService } from 'src/app/shared/services';

import { Log } from 'src/app/shared/services/log.service';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpResponse } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';

@Component({

  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.css', 'article.component.css']
})
export class ArticleComponent  implements OnInit {

  /**
  * type data
  */
  @Input() public type: string;

  /**
  * item id
  */
  @Input() public id: string;

  /**
  * if data is preloaded
  */
  @Input() public itemparam: any;

  public item: any;

  @Input() public media = 'media';


  @Input() public lazyload = true;

  fetched = false;



  constructor(
    private titleService: Title,
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

    this.fetchData();
  }


  fetchData() {

    if (this.isRouteInit()) {
      this.log.debug('ArticleComponent init ' + this.type + ' ' + this.id);

      this.http.get<any>(this.readService.getUrl(this.type, this.id))
        .subscribe((data: any) => {
          this.item = data;
          this.item.media = this.mediaService.initMediaUrl(this.type, this.id, this.item.media, this.media);
          //this.item.description = this.item.description.replace(new RegExp("\\\\n", "g"), "<br />");
          this.item.descriptionsplit = this.item.description.split('\n');

          this.fetched = true;
        });

    } else if (this.isItemInit()) {
      this.log.debug('ArticleComponent item ' + this.item.id);
      let tmpItem = this.itemparam;
      
      tmpItem.media = this.mediaService.initMediaUrl(this.type, tmpItem.id, tmpItem.media, this.media);
      this.item.descriptionsplit = this.item.description.split('\n');

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
    let result = null;
    if (this.type && this.id) {
      result = this.id;
    } else  if (this.isItemInit()) {
      result = this.item.id;
    }
    return result;
  }

  public isMultilines(): boolean {
    return this.item.description && this.item.description.indexOf('\n') !== -1;
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

  /**
  * eg media/news/3/thumbnails
  */
  getRecordUri(): string {
    return this.type + '/' + this.getId();
  }

}
