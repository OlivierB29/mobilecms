import { Component, OnInit, Input } from '@angular/core';



import { environment } from 'src/environments/environment';

@Component({

  selector: 'app-my-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['banner.component.css']

})

export  class BannerComponent implements OnInit {

   @Input() layout: string = null;

    url= '';

  constructor() {
  }

ngOnInit(): void {

       this.url = environment.server + '/' + environment.public + '/resources/banner-' + this.layout + '.jpg';
}

}
