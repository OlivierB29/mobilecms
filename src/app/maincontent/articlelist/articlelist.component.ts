import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-articlelist',
  templateUrl: 'articlelist.component.html',
  styleUrls: ['articlelist.component.css']
})
export class ArticlelistComponent implements OnInit {

  @Input() type: string;

  @Input() max = 0;

  constructor() { }

  ngOnInit() {


  }

}
