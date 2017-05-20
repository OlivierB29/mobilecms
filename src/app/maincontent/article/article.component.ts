import { Component, OnInit, Input } from '@angular/core';

import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';


@Component({
  moduleId: module.id,
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() active = true;

  @Input() type: string;

  @Input() id: string;

  @Input() item: any ;


  constructor(private log: Log, private readService: ReadService) { }

  ngOnInit() {
    this.log.debug('ArticleComponent ' + this.id);
    if (this.type && this.id) {

      this.readService.get(this.type, this.id)
        .subscribe((data: any) => { this.item = data; this.item.state = this.active },
        error => console.error('get' + error),
        () => { this.log.debug('get complete'); });
    } else {
      console.error('ArticleComponent empty type-id');
    }
  }

      showArticle(): void {
        this.active = !this.active;
    }

}
