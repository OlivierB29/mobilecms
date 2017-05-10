
import { Component, OnInit, Input } from '@angular/core';



import { ReadService } from '../../shared/services/read.service';

@Component({
    moduleId: module.id,
    selector: 'app-my-newsdetail-component',
    templateUrl: 'newsdetail.component.html',
    styleUrls: ['newsdetail.component.css']
})
export class NewsDetailComponent implements OnInit {

    @Input() id: string;

    @Input() active: boolean;


    item: any = {};

    constructor(
        private readService: ReadService
    ) {
    }

    ngOnInit(): void {
        console.log('app-my-newsdetail-component '  +  this.id);
        if (this.id) {

            this.readService.get('news', this.id)
                .subscribe((data: any) => { this.item = data; this.item.state = this.active },
                error => console.log('get'  +  error),
                () => { console.log('get complete'); });
        } else {
            console.error('app-my-newsdetail-component empty id');
        }


    }



    showArticle(): void {
        this.active = !this.active;
    }



}
