import { Component, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ReadService, LayoutService } from 'src/app/shared/services';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/maincontent/image';

@Component({

  selector: 'app-sidenav-container',
  templateUrl: 'sidenavcontainer.component.html',
  styleUrls: ['sidenavcontainer.component.css']
})
export class SidenavcontainerComponent implements AfterViewInit {

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

  item: any;

  socialnetworks = <any>[];

  constructor(private titleService: Title,
     private meta: Meta,
     private readService: ReadService,
     private http: HttpClient,
     private imageService: ImageService,
     private layoutService: LayoutService) {

    this.initLayout();

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


  ngAfterViewInit() {
    this.fetchData();

  }



  getBannerSrcSet() {
    return this.imageService.getSrcSet(environment.server + '/assets/', this.bannerpicture);
  }


  fetchData() {

    this.http.get<any>(this.readService.getUrl('description', 'head'))
              .subscribe((data: any) => {
                this.item = data;


                if (this.layoutService.getLayout() === 'desktop') {
                  this.title = this.item.fulltitle;
                } else {
                  this.title = this.item.title;
                }

                this.meta.addTag({ name: 'keywords', content: this.item.keywords });
                this.meta.addTag({ name: 'description', content: this.item.description });
//                this.titleService.setTitle(this.title);

                this.socialnetworks = this.item.socialnetworks;
              });


  }

  initLayout() {
    const layout = this.layoutService.getLayout();
    this.menuOpened = false;
    this.menuMode = 'over';
    if (layout === 'desktop') {
      this.menuMode = 'side';
      this.menuOpened = true;
    }

  }





}
