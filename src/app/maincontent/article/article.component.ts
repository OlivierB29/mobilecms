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

  /**
  * offset for LazyLoadImageModule
  */
  offset = 100;

  /**
  * default image displayed by  for LazyLoadImageModule
  */
  defaultImage = environment.server + '/' + environment.public + '/resources/ring-alt-32.svg';


  constructor(private log: Log, private readService: ReadService) { }


  ngAfterViewInit() {
    this.log.debug('ArticleComponent ' + this.id);

    // if input item is empty, fetch data from id
    if (!this.item) {
      this.fetchData();
    }

  }


  fetchData() {
    if (!this.type) {
      throw new Error('empty type');
    }

    if (!this.id) {
      throw new Error('empty id');
    }

    this.readService.get(this.type, this.id)
      .subscribe((data: any) => {
        this.item = data;
      },
      error => console.error('get ' + error));

  }



}
