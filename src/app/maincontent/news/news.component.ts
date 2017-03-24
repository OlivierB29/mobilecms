
import { Component, OnInit } from '@angular/core';
import { StandardPageService } from "../../shared/services/standardpage.service";
import { OrderbyDescPipe } from "../../shared/filters/orderbydesc.pipe";

@Component({
    moduleId: module.id,
    selector: 'my-news-component',
    templateUrl: 'news.component.html',
    styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit {


    constructor(
        private page: StandardPageService,
        private orderbydesc: OrderbyDescPipe
    ) {
    }
    ngOnInit(): void {
        this.page.initialize('news', 'app/maincontent/news/i18n');
        this.page.getAllItems();
    }


 
}
