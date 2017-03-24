import { Component, OnInit } from '@angular/core';


import { ConfService } from '../../shared/services/conf.service';

/**
* same timing animations
*/
@Component({
  moduleId: module.id,
  selector: 'my-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['banner.component.css']

})

export  class BannerComponent implements OnInit {


  resourcesUrl: string = '';


  layout: string = 'desktop';


  constructor(private conf: ConfService) {
  }

ngOnInit(): void {

          this.resourcesUrl = this.conf.getResources() + '/public/resources';
}

}
