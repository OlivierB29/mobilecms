import { Component, OnInit, Input } from '@angular/core';

import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';
import { environment } from '../../environment';


@Component({
  moduleId: module.id,
  selector: 'app-articlepreview',
  templateUrl: 'articlepreview.component.html',
  styleUrls: ['articlepreview.component.css']
})
export class ArticlePreviewComponent implements OnInit {

  @Input() type: string;


  @Input() id: string;

  @Input() item: any;

  maxPreviewLength = 240;

  offset = 100;

  image: any ;

  url = '';

  defaultImage = environment.server + '/' + environment.public +  '/resources/ring-alt-32.svg';



  constructor(private log: Log, private readService: ReadService) { }


  ngOnInit() {
    this.log.debug('ArticlePreviewComponent ' + this.id);



    if (!this.type) {
      throw new Error('empty type');
    }

    if (!this.id) {
      throw new Error('empty id');
    }


    this.readService.get(this.type, this.id)
      .subscribe((data: any) => {

         this.item = data;

         if (this.item.images && this.item.images.length > 0) {
           this.image = this.item.images[0];
         }

          // news/1
         this.url =  this.item.id;


       },
      error => console.error('get ' + error),
      () => {
         this.log.debug('get complete');

       });

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
