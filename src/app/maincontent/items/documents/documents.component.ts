import { Component, OnInit } from '@angular/core';


import { Item }        from '../../../shared/model/item';


import { ConfService } from '../../../shared/services/conf.service';
import { Log } from '../../../shared/services/log.service';
import { ReadService } from '../../../shared/services/read.service';

@Component({
  moduleId: module.id,
  selector: 'my-documents',
  templateUrl: '../items.component.html',
  styleUrls: ['../items.component.css']
})
export class DocumentsComponent implements OnInit {


    items: Item[] = [];


  constructor(
    private dataservice: ReadService,
    private conf : ConfService,
    private log : Log
  ) {
  }

  ngOnInit(): void {



        this.dataservice.getAll('documents')
            .subscribe((data: Item[]) => this.items = data,
            error => this.log.debug('DocumentsComponent ' + error),
            () => this.log.debug('DocumentsComponent complete :' + this.items.length));



  }

}