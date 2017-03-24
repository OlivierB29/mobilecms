import { Component, OnInit } from '@angular/core';


import { ConfService } from '../../../shared/services/conf.service';
import { Log } from '../../../shared/services/log.service';
import { ReadService } from '../../../shared/services/read.service';

import { Item }        from '../../../shared/model/item';



@Component({
  moduleId: module.id,
  selector: 'my-links',
  templateUrl: '../items.component.html',
  styleUrls: ['../items.component.css']
})
export class LinksComponent implements OnInit {

  items: Item[] = [];


  constructor(

    private dataservice: ReadService,
    private conf : ConfService,
    private log : Log
  ) {

  }

  ngOnInit(): void {



    this.dataservice.getAll('links')
        .subscribe((data: Item[]) => this.items = data,
        error => this.log.debug('LinksComponent ' + error),
        () => this.log.debug('LinksComponent complete :' + this.items.length));



  }

}
