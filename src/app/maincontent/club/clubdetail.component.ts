
import { Component, OnInit, Input } from '@angular/core';
import { ReadService } from 'app/shared/services/read.service';

import { Log } from 'app/shared/services/log.service';
import { HttpClient } from '@angular/common/http';


@Component({
    moduleId: module.id,
    selector: 'app-my-clubdetail-component',
    templateUrl: 'clubdetail.component.html',
    styleUrls: ['clubdetail.component.css']
})
export class ClubDetailComponent implements OnInit {

    @Input() id: string;

    item: any = {};

    constructor(
        private readService: ReadService,
        private http: HttpClient,
        private log: Log
    ) {
    }

    ngOnInit(): void {
        this.log.debug('app-my-clubdetail-component '  +  this.id);

        if (this.id) {

            this.http.get<any>(this.readService.getUrl('clubs', this.id))
                .subscribe((data: any) => {
                  this.item = data;
            });
        } else {
            console.error('app-my-clubdetail-component empty id');
        }


    }



}
