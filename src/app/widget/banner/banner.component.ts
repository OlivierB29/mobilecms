import { Component, OnInit, Input } from '@angular/core';



import { environment } from '../../../environments/environment';

/**
* same timing animations
*/
@Component({
  moduleId: module.id,
  selector: 'app-my-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['banner.component.css']

})

export  class BannerComponent implements OnInit {


    bannerUrl= '';




  constructor() {
  }

ngOnInit(): void {

       this.bannerUrl = environment.server + '/' + environment.public + '/resources/banner.jpg';
}

}
