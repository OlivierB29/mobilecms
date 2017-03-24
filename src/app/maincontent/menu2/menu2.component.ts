import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocaleService } from '../../shared/services/locale.service';

import { MenuItem }        from '../../shared/model/menuitem';


import {

  trigger,
  state,
  style,
  transition,

  animate
} from '@angular/core';



import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';


/**
* same timing animations
*/
@Component({
  moduleId: module.id,
  selector: 'my-menupage2',
  templateUrl: 'menu2.component.html',
  styleUrls: ['menu2.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]

})

export  class Menu2Component implements OnInit {

//menu items
items: MenuItem[] = [];


  constructor(
    private router: Router,

    private conf : ConfService,
    private log : Log,
    private route: ActivatedRoute,
    private locale: LocaleService

  ) {

  }

  ngOnInit(): void {


// Load the menu items
this.locale.getMenu(this.conf.getI18n() + '/i18n',this.conf.getDefaultLocale())
    .subscribe((data: MenuItem[]) => this.items = data,
    error => this.log.debug('getCalendarEvents ' + error),
    () => this.log.debug('getCalendarEvents complete'));


}


}
