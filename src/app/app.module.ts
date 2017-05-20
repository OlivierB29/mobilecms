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



import { ActivityFilterPipe } from './shared/filters/activityfilter.pipe';
import { DepartmentFilterPipe } from './shared/filters/departmentfilter.pipe';

import { OrderbyAscPipe } from './shared/filters/orderbyasc.pipe';
import { OrderbyDescPipe } from './shared/filters/orderbydesc.pipe';
import { PrettyUrlPipe } from './shared/filters/prettyurl.pipe';
import { BrPipe } from './shared/filters/br.pipe';

// translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

// Tools
import { ConfService } from './shared/services/conf.service';
import { Log } from './shared/services/log.service';


import { RouterModule } from '@angular/router';
import { ReadService } from './shared/services/read.service';

// Material Theme
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { LazyLoadImageModule } from 'ng-lazyload-image';

// maincontent
import { NewsComponent } from './maincontent/news/news.component';
import { CalendarListComponent } from './maincontent/calendarlist/calendarlist.component';
import { CalendarEventComponent } from './maincontent/calendarevent/calendarevent.component';
import { ClubListComponent } from './maincontent/clublist/clublist.component';

import { CalendarDetailComponent } from './maincontent/calendardetail/calendardetail.component';
import { ClubDetailComponent } from './maincontent/clubdetail/clubdetail.component';
import { ClubActivitiesComponent } from './maincontent/clubactivities/clubactivities.component';
import { CalendarActivitiesComponent } from './maincontent/calendaractivities/calendaractivities.component';
import { MainPageComponent } from './maincontent/mainpage/mainpage.component';



import { ActivityButtonComponent } from './maincontent/activitybutton/activitybutton.component';
import { ArticleComponent } from './maincontent/article/article.component';
import { ArticlelistComponent } from './maincontent/articlelist/articlelist.component';
import { ItemsComponent } from './maincontent/items/items.component';
import { MenubuttonComponent } from './maincontent/menubutton/menubutton.component';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        MaterialModule,
        LazyLoadImageModule,
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
        ClubListComponent,
        ClubActivitiesComponent,
        ClubDetailComponent,
        ActivityButtonComponent,
        ArticleComponent,
        ArticlelistComponent,
        ItemsComponent,
        MenubuttonComponent
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
