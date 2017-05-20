import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { FooterComponent } from './widget/footer/footer.component';
import { HomeComponent } from './maincontent/home/home.component';
import { FeaturedComponent } from './widget/featured/featured.component';

import { FeedComponent } from './widget/feed/feed.component';
import { BannerComponent } from './widget/banner/banner.component';
import { ContactComponent } from './maincontent/contact/contact.component';


import { ActivityFilterPipe } from './shared/filters/activityfilter.pipe';
import { DepartmentFilterPipe } from './shared/filters/departmentfilter.pipe';

import { OrderbyAscPipe } from './shared/filters/orderbyasc.pipe';
import { OrderbyDescPipe } from './shared/filters/orderbydesc.pipe';
import { PrettyUrlPipe } from './shared/filters/prettyurl.pipe';
import { BrPipe } from './shared/filters/br.pipe';


// Tools
import { ConfService } from './shared/services/conf.service';
import { Log } from './shared/services/log.service';


import { RouterModule } from '@angular/router';
import { ReadService } from './shared/services/read.service';

// Material Theme
import { MaterialModule } from '@angular/material';
import 'hammerjs';


// maincontent
import { NewsComponent } from './maincontent/news/news.component';
import { CalendarListComponent } from './maincontent/calendarlist/calendarlist.component';
import { CalendarEventComponent } from './maincontent/calendarevent/calendarevent.component';
import { ClubListComponent } from './maincontent/clublist/clublist.component';



import { StructureComponent } from './maincontent/items/structure/structure.component';
import { DocumentsComponent } from './maincontent/items/documents/documents.component';
import { LinksComponent } from './maincontent/items/links/links.component';
import { ReportsComponent } from './maincontent/items/reports/reports.component';
import { NewsDetailComponent } from './maincontent/newsdetail/newsdetail.component';
import { CalendarDetailComponent } from './maincontent/calendardetail/calendardetail.component';
import { ClubDetailComponent } from './maincontent/clubdetail/clubdetail.component';
import { ClubActivitiesComponent } from './maincontent/clubactivities/clubactivities.component';
import { CalendarActivitiesComponent } from './maincontent/calendaractivities/calendaractivities.component';
import { MainPageComponent } from './maincontent/mainpage/mainpage.component';


// translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ActivityButtonComponent } from './maincontent/activitybutton/activitybutton.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        MaterialModule,
        SharedModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })],

    declarations: [

        ActivityFilterPipe,
        OrderbyAscPipe,
        OrderbyDescPipe,
        DepartmentFilterPipe,
        PrettyUrlPipe,
        BrPipe,

        AppComponent,
        BannerComponent,
        FeedComponent,
        FeaturedComponent,
        FooterComponent,

        MainPageComponent,
        HomeComponent,
        CalendarListComponent,
        CalendarActivitiesComponent,
        CalendarEventComponent,
        CalendarDetailComponent,
        NewsComponent,
        NewsDetailComponent,
        ClubListComponent,
        ClubActivitiesComponent,
        ClubDetailComponent,
        ReportsComponent,
        StructureComponent,
        DocumentsComponent,
        LinksComponent,
        ContactComponent,
        ActivityButtonComponent
    ],
    providers: [
        ConfService,
        Log,
        ReadService,
        OrderbyDescPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
