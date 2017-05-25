
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


import { ConfService } from '../../shared/services/conf.service';
import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';


import { Event } from '../../shared/model/event';


@Component({
    moduleId: module.id,
    selector: 'app-my-newsdetails-component',

    templateUrl: 'newsdetails.component.html',
    styleUrls: ['newsdetails.component.css']
})
export class NewsDetailsComponent implements OnInit {


    item: any = null;
    id= '';

    type= 'news';

    routerLink = '';


    constructor(
        private router: Router,
        private conf: ConfService,
        private log: Log,
        private dataService: ReadService,
        private route: ActivatedRoute
    ) {



    }

    ngOnInit(): void {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!") ;




        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                this.id = params['id'];
            }

        });

        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.id) ;


        if (this.id) {

            this.dataService.get(this.type, this.id)
                .subscribe((data: any) => this.item = data,
                error => this.log.error('get'  +  error),
                () => { this.log.debug('get complete'); });
        } else {
            console.error('app-my-newsdetail-component empty id');
        }



    }

}
