
import { Component, OnInit, Input } from '@angular/core';
import { ReadService } from '../../shared/services/read.service';




@Component({
    moduleId: module.id,
    selector: 'my-clubdetail-component',
    templateUrl: 'clubdetail.component.html',
    styleUrls: ['clubdetail.component.css']
})
export class ClubDetailComponent implements OnInit {

    @Input() id: string;

    item: any = {};

    constructor(
        private readService: ReadService
    ) {
    }

    ngOnInit(): void {
        console.log('my-clubdetail-component ' + this.id);

        if (this.id) {

            this.readService.get('clubs', this.id)
                .subscribe((data: any) => this.item = data,
                error => console.log('get' + error),
                () => { console.log('get complete'); });
        } else {
            console.error("my-clubdetail-component empty id");
        }


    }



}
