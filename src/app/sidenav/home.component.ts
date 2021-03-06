import { Component, OnInit } from '@angular/core';




import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { LayoutService, BrowserService } from 'src/app/shared/services';

@Component({
  
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    max = 5;

    constructor(private layoutService: LayoutService, private browserService: BrowserService) {

    }

    ngOnInit(): void {
      if (this.layoutService.getLayout() === 'desktop') {
        this.max = 15;
      }
      
    }

    public isModernBrowser() {
      return this.browserService.isModernBrowser();
    }

}
