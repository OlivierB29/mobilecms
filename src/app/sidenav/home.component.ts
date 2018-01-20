import { Component, OnInit } from '@angular/core';




import { Log } from 'app/shared/services/log.service';
import { ReadService } from 'app/shared/services/read.service';
import { LayoutService } from 'app/shared/services';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    max = 2;

    constructor(private layoutService: LayoutService) {

    }

    ngOnInit(): void {
      if (this.layoutService.getLayout() === 'desktop') {
        this.max = 4;
      }

    }

}
