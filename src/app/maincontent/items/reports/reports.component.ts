import { Component, OnInit } from '@angular/core';


import { Item } from '../../../shared/model/item';

import { ConfService } from '../../../shared/services/conf.service';
import { Log } from '../../../shared/services/log.service';
import { ReadService } from '../../../shared/services/read.service';





@Component({
  moduleId: module.id,
  templateUrl: '../items.component.html',
  styleUrls: ['../items.component.css']

})
export class ReportsComponent implements OnInit {


  items: Item[] = [];



  constructor(
    private dataService: ReadService,
    private conf: ConfService,  private log: Log
  ) {



  }

  ngOnInit(): void {



  this.dataService.getAll('reports')
                                .subscribe((data: Item[]) => this.items = data,
                                    error => this.log.debug('ReportsComponent ' + error),
                                    () => this.log.debug('ReportsComponent complete'));




  }



}
