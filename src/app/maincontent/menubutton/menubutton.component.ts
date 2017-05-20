import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../shared/model/menuitem';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-menubutton',
  templateUrl: 'menubutton.component.html',
  styleUrls: ['menubutton.component.css']
})
export class MenubuttonComponent implements OnInit {

  @Input() item: MenuItem  ;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("!!!!!!!!!!!!!!!!!! ngOnInit " + this.item.routerLink);
  }

  open(): void {
    console.log("!!!!!!!!!!!!!!!!!! open " + this.item.routerLink);

    this.router.navigate([this.item.routerLink]);
  }

}
