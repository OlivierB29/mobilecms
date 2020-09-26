
import { Component, OnInit, Input } from '@angular/core';
import { ReadService } from 'src/app/shared/services/read.service';

import { Log } from 'src/app/shared/services/log.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';


@Component({

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
        private route: ActivatedRoute,
        private log: Log
    ) {
          // path parameters
      this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];
      }
    });
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
