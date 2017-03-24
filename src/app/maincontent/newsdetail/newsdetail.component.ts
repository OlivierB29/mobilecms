
import { Component, OnInit, Input } from '@angular/core';



import { ReadService } from '../../shared/services/read.service';

@Component({
    moduleId: module.id,
    selector: 'my-newsdetail-component',
    templateUrl: 'newsdetail.component.html',
    styleUrls: ['newsdetail.component.css']
})
export class NewsDetailComponent implements OnInit {

    @Input() id: string;

    item: any = {};

    constructor(
        private readService: ReadService
    ) {
    }

    ngOnInit(): void {
        console.log('my-newsdetail-component ' + this.id);
        if (this.id) {

            this.readService.get('news', this.id)
                .subscribe((data: any) => this.item = data,
                error => console.log('get' + error),
                () => { console.log('get complete'); });
        } else {
            console.error("my-newsdetail-component empty id");
        }


    }



    showArticle(): void {

        if(this.item.state != 'active') {
          this.item.state = 'active';
        } else {
          this.item.state = 'inactive';
        }


    }



}
