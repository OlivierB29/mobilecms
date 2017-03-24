import { Component } from '@angular/core';


import { ConfService } from '../../../shared/services/conf.service';
import { Log } from '../../../shared/services/log.service';
import { ReadService } from '../../../shared/services/read.service';

@Component({
  moduleId: module.id,
  selector: 'my-contact-component',
  templateUrl: '../items.component.html',
  styleUrls: ['../items.component.css']
})
export class ContactComponent {




  constructor(

    private dataservice: ReadService,
    private conf : ConfService,
    private log : Log
  ) {
  }



}
