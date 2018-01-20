import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'app/shared/model/item';
@Component({
  moduleId: module.id,
  selector: 'app-articlelist',
  templateUrl: 'articlelist.component.html',
  styleUrls: ['articlelist.component.css']
})
export class ArticlelistComponent implements OnInit {

  @Input() type: string;

  @Input() max = 0;


  items: Item[] = null;

  constructor() { }

  ngOnInit() {


  }

}
