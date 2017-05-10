import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ConfService } from '../../../shared/services/conf.service';
import { Log } from '../../../shared/services/log.service';
import { ReadService } from '../../../shared/services/read.service';

import { Item } from '../../../shared/model/item';



@Component({
  moduleId: module.id,
  selector: 'my-structure',
  templateUrl: '../items.component.html',
  styleUrls: ['../items.component.css']
})
export class StructureComponent implements OnInit {

  items: Item[] = [];


  constructor(

    private dataservice: ReadService,
    private conf: ConfService,
    private log: Log
  ) {

  }

  ngOnInit(): void {



    this.dataservice.getAll('structure')
        .subscribe((data: Item[]) => this.items = data,
        error => this.log.debug('StructureComponent '  +  error),
        () => this.log.debug('StructureComponent complete : '  +  this.items.length));



  }

}
