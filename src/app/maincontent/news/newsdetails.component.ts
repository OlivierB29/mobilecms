
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';



import { ReadService } from 'src/app/shared/services/read.service';
import { Log } from 'src/app/shared/services/log.service';


import { Event } from 'src/app/shared/model/event';


@Component({
  
    selector: 'app-my-newsdetails-component',

    templateUrl: 'newsdetails.component.html',
    styleUrls: ['newsdetails.component.css']
})
export class NewsDetailsComponent implements OnInit {

    id= '';

    type= 'news';



    constructor(

        private log: Log,
        private dataService: ReadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                this.id = params['id'];
            }

        });
    }

}
