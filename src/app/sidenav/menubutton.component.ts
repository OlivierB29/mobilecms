import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from './menuitem';

@Component({
  moduleId: module.id,
  selector: 'app-menubutton',
  templateUrl: 'menubutton.component.html',
  styleUrls: ['menubutton.component.css']
})
export class MenubuttonComponent {

  @Input() item: MenuItem;

  @Input() expanded: boolean;

  constructor() { }

}
