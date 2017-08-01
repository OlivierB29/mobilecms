import { Component, AfterViewInit, Input } from '@angular/core';

import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';
import { environment } from '../../../environments/environment';


@Component({
  moduleId: module.id,
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css']
})
export class ArticleComponent implements AfterViewInit {

  /**
  * type data
  */
  @Input() type: string;

  /**
  * item id
  */
  @Input() id: string;

  /**
  * if data is preloaded
  */
  @Input() item: any;

  @Input() media = 'media';


  constructor(private log: Log, private readService: ReadService) {
    this.item = {
      id: '', title: '...... .... ...........',
      description: this.getEmptyDescription()
    };

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
    this.log.debug('ArticleComponent ' + this.id);
    this.fetchData();
  }


  fetchData() {

    // const itemid = this.id != null ? this.id : this.item.id;
    const itemid = this.id;
    if (this.type && itemid) {
      this.readService.get(this.type, itemid)
        .subscribe((data: any) => {
          this.item = data;
          this.initMediaUrl();


        },
        error => console.error('get ' + error));
    } else {
      if (!this.type) {
        this.log.debug('ArticleComponent empty type');
      }

      if (!this.id) {
        this.log.debug('ArticleComponent empty id');
      }
    }


  }

  private initMediaUrl() {
    if (this.item.media) {
      this.item.media.forEach((media: any) => {
        media.url = this.media + '/' + this.type + '/' + this.id + '/' + media.url;
      });
    }
  }

  isImage(element: any): boolean {
    return element.mimetype && element.mimetype.indexOf('image') > -1;
  }

  getImages(): any[] {
    let result = [];

    if (this.item.images) {
      result = result.concat(this.item.images);
    }

    if (this.item.media) {

      result = result.concat(this.item.media.filter(element => this.isImage(element)));
    }

    return result;
  }

  getAttachments(): any[] {
    let result = [];

    if (this.item && this.item.attachments) {
      result = result.concat(this.item.attachments);
    }

    if (this.item && this.item.media) {
      result = result.concat(this.item.media.filter(element => !this.isImage(element)));
    }

    return result;
  }



}
