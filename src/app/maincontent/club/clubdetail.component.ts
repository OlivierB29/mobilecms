
import { Component, OnInit, Input } from '@angular/core';
import { ReadService } from '../../shared/services/read.service';

import { Log } from '../../shared/services/log.service';


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
        private log: Log
    ) {
    }

    ngOnInit(): void {
        this.log.debug('app-my-clubdetail-component '  +  this.id);

        if (this.id) {

            this.readService.get('clubs', this.id)
                .subscribe((data: any) => this.item = data,
                error => console.error('get'  +  error),
                () => { this.log.debug('get clubs complete'); });
        } else {
            console.error('app-my-clubdetail-component empty id');
        }


    }



}
