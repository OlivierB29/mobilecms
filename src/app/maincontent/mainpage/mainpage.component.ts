
import { Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef } from '@angular/core';

import '../../rxjs-extensions';


import { Log } from '../../shared/services/log.service';
import { Activity } from '../../shared/model/activity';




@Component({
  moduleId: module.id,
  selector: 'app-my-mainpage',
  templateUrl: 'mainpage.component.html',
  styleUrls: ['mainpage.component.css']
})
export class MainPageComponent  implements OnInit  {


  activityObjectList: Activity[] = [];




  constructor() {

  }


  ngOnInit(): void {

  }



}
