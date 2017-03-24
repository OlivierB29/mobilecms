import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';



import { Event }        from '../../shared/model/event';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';


/**
* same timing animations
*/
@Component({
  moduleId: module.id,
  selector: 'my-menupage',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  animations: [
  trigger('eventState', [
    state('inactive', style({
      backgroundColor: '#eee',
      transform: 'scale(1)'
    })),
    state('active',   style({
      backgroundColor: '#cfd8dc',
      transform: 'scale(1.1)'
    })),

transition('inactive <=> active', animate('100ms ease-out'))
  ])
]




})
export class MenuComponent implements OnInit {

//testing
items: Event[] = [];


  constructor(
    private router: Router,

    private conf : ConfService,
    private log : Log
  ) {

  }

  ngOnInit(): void {
/*
var e : Event = new Event();
e.title = 'test';


var e2 : Event = new Event();
e2.title = 'test2';

this.items.push(e);
this.items.push(e2);
*/
}





}
