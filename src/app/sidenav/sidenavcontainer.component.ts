import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

import { ImageService } from 'src/app/maincontent/image';

@Component({

  selector: 'app-sidenav-container',
  templateUrl: 'sidenavcontainer.component.html',
  styleUrls: ['sidenavcontainer.component.css']
})
export class SidenavcontainerComponent {

  title = '';


  /**
  * https://material.angular.io/components/component/sidenav
  */
  menuMode = 'over';

  /*
  opened  https://www.npmjs.com/package/@angular2-material/sidenav
  */
  menuOpened = false;

  bannerurl = '';

  bannerpicture : any;


  constructor(
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





  getBannerSrcSet() {
    return this.imageService.getSrcSet(environment.server + '/assets/', this.bannerpicture);
  }









}
