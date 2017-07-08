import { Component, OnInit } from '@angular/core';




import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    constructor() {

    }

    ngOnInit(): void {
    }

}
