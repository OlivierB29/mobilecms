import { Component, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { ReadService } from 'app/shared/services';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'app/maincontent/image';

@Component({
  moduleId: module.id,
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

  bannerpicture = null;

  constructor(private titleService: Title,
     private meta: Meta,
     private readService: ReadService,
     private http: HttpClient,
     private imageService: ImageService) {

    this.initLayout();

    this.bannerurl = environment.server + '/assets/banner-1900.jpg';


    this.bannerpicture = {};
    this.bannerpicture.thumbnails = [];
    this.bannerpicture.thumbnails.push({url : 'banner-672.jpg', width : '672'});
    this.bannerpicture.thumbnails.push({url : 'banner-768.jpg', width : '768'});
    this.bannerpicture.thumbnails.push({url : 'banner-1024.jpg', width : '1024'});
    this.bannerpicture.thumbnails.push({url : 'banner-1200.jpg', width : '1200'});
    this.bannerpicture.thumbnails.push({url : 'banner-1600.jpg', width : '1600'});
    this.bannerpicture.thumbnails.push({url : 'banner-1600.jpg', width : '1900'});
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
                const item = data;
                this.titleService.setTitle(item.title);

                if (this.getLayout() === 'desktop') {
                  this.title = item.fulltitle;
                } else {
                  this.title = item.title;
                }

                this.meta.addTag({ name: 'keywords', content: item.keywords });
                this.meta.addTag({ name: 'description', content: item.description });

              });


  }

  initLayout() {
    const layout = this.getLayout();
    this.menuOpened = false;
    this.menuMode = 'over';
    if (layout === 'desktop') {
      this.menuMode = 'side';
      this.menuOpened = true;
    }

  }



  getLayout(): string {
    let layout = 'mobile';

    if (window.matchMedia('(min-width: 55em)').matches) {
      layout = 'desktop';
    }

    return layout;
  }

}
