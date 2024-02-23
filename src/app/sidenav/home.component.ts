import { Component, OnInit } from '@angular/core';


import { environment } from 'src/environments/environment';

import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { LayoutService, BrowserService } from 'src/app/shared/services';
import { ImageService } from '../maincontent/image';

@Component({
  
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    max = 5;

    bannerurl = '';

    bannerpicture : any;
  

    constructor(private layoutService: LayoutService, private browserService: BrowserService, 
      private imageService: ImageService) {
      this.bannerurl = environment.server + '/assets/banner-1900.jpg';


      let banner :any = {};
      banner.thumbnails = <any>[];
      banner.thumbnails.push({url : 'banner-672.jpg', width : '672'});
      banner.thumbnails.push({url : 'banner-768.jpg', width : '768'});
      banner.thumbnails.push({url : 'banner-1024.jpg', width : '1024'});
      banner.thumbnails.push({url : 'banner-1200.jpg', width : '1200'});
      banner.thumbnails.push({url : 'banner-1600.jpg', width : '1600'});
      banner.thumbnails.push({url : 'banner-1600.jpg', width : '1900'});
      this.bannerpicture = banner;
    }

    ngOnInit(): void {
      if (this.layoutService.getLayout() === 'desktop') {
        this.max = 15;
      }
      
    }

    public isModernBrowser() {
      return this.browserService.isModernBrowser();
    }

    public getBannerSrcSet() {
      return this.imageService.getSrcSet(environment.server + '/assets/', this.bannerpicture);
    }
  

}
