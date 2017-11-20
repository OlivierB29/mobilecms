import { Component, AfterViewInit, Input } from '@angular/core';
import { MediaComponent } from './media.component';
import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';
import { environment } from 'environments/environment';

import { HttpClient, HttpResponse } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.css', 'article.component.css']
})
export class ArticleComponent extends MediaComponent implements AfterViewInit {

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
  @Input() public item: any;

  @Input() public media = 'media';


  @Input() public lazyload = true;

  fetched = false;




  constructor(private log: Log, private readService: ReadService, private http: HttpClient) {
    super();
    if (!this.item) {
      this.item = {
        id: '', title: this.getEmptyTitle(),
        description: this.getEmptyDescription()
      };

    }
   }

   private getEmptyTitle(): string {
     const result = '............ ...... .... ............';
     // return this.convertToEmptyCharacters(result);
     return result;
   }

   private getEmptyDescription(): string {
     let result = '';
     for (let i = 0;  i < 5; i++) {
       result += '...... .... ........... .. .... .. ..... ...... .... ....... ............ ....... .....';
       result += '... .. ............ .... ..... .... ..... ..... ... .......... ........... .......... \n';
     }
     // return this.convertToEmptyCharacters(result);
     return result;
   }

   // private convertToEmptyCharacters(str: string): string {
   //   return str.replace(/\./g, '&nbsp;');
   // }


  ngAfterViewInit() {



    if (this.isRouteInit()) {
      this.log.debug('ArticleComponent init ' + this.type + ' ' + this.id);
      this.fetchData();
    } else if (this.isItemInit()) {
      this.log.debug('ArticleComponent item ' + this.item.id);
      this.fetched = true;
    }

  }


  fetchData() {

    if (this.isRouteInit()) {

      this.http.get<any>(this.readService.getUrl(this.type, this.id))
          .subscribe((data: any) => {
            this.item = data;
            this.item.media = this.initMediaUrl(this.type, this.id, this.item.media, this.media);
            this.fetched = true;
          });

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
    return this.item && this.item.id;
  }

  private isRouteInit() {
    return this.type && this.id;
  }

  public getId() {
      let result = null;
        if (this.type && this.id) {
          result = this.id;
        } else if (this.isItemInit()) {
            result = this.item.id;
        }
    return result;
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

  /**
  * eg media/news/3/thumbnails
  */
  getRecordUri(): string {
    return  this.type + '/' + this.getId() ;
  }

}
