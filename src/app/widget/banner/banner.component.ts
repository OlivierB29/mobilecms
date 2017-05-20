import { Component, OnInit, Input } from '@angular/core';


import { ConfService } from '../../shared/services/conf.service';
import { environment } from '../../environment';

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
