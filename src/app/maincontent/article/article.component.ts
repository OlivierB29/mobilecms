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


  constructor(private log: Log, private readService: ReadService, private http: HttpClient) {
    super();
    if (!this.item) {
      this.item = {
        id: '', title: '...... .... ............',
        description: this.getEmptyDescription()
      };
    }


   }

   private getEmptyDescription(): string {
     let result = '';
     for (let i = 0;  i < 5; i++) {
       result += '...... .... ........... .. .... .. ..... ...... .... ....... ............ ....... .....';
       result += '... .. ............ .... ..... .... ..... ..... ... .......... ........... .......... \n';
     }

     return result;
   }

  ngAfterViewInit() {

    if (this.item && this.item.id) {
      this.log.debug('ArticleComponent ' + this.item.id);
    } else {
      this.log.debug('ArticleComponent ' + this.id);
      this.fetchData();
    }

  }


  fetchData() {

    if (this.type && this.id) {

      this.http.get<any>(this.readService.getUrl(this.type, this.id))
          .subscribe((data: any) => {
            this.item = data;
            this.item.media = this.initMediaUrl(this.type, this.id, this.item.media, this.media);
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
