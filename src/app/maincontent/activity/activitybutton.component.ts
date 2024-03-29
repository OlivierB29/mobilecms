import { Component, OnInit, Input } from '@angular/core';


import { environment } from 'src/environments/environment';
import { Activity } from './activity';

@Component({

  selector: 'app-activitybutton',
  templateUrl: 'activitybutton.component.html',
  styleUrls: ['activitybutton.component.css']
})
export class ActivityButtonComponent implements OnInit {


  @Input() public activity!: Activity ;

  @Input() public url = '';

  logo = '';


  offset = 100;
  defaultImage = environment.server + '/' + environment.public +  '/resources/ring-alt-32.svg';



  constructor() {

  }

  ngOnInit() {

    if (this.activity) {
      this.logo =  environment.public + '/activities/'  +  this.activity.name  +  '/'  +  this.activity.logo;

      if (!this.url) {
        // if the current page is /clubs/, then add 'tennis'
        // The resulting button will open /clubs/tennis
        this.url += this.activity.name;
      }
    }
  }

}
