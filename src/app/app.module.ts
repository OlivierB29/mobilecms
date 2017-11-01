import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './widget/footer/footer.component';

import { FeaturedComponent } from './widget/featured/featured.component';

import { BrPipe, OrderbyPipe,  ActivityFilterPipe, DepartmentFilterPipe } from 'app/shared/filters';

// Tools
import { Log, ReadService } from 'app/shared/services';
import { MenuService } from 'app/sidenav/menu.service';
import { ActivityModule } from 'app/maincontent/activity/activity.module';
import { ArticleModule } from 'app/maincontent/article/article.module';
import { CalendarModule } from 'app/maincontent/calendar/calendar.module';
import { NewsModule } from 'app/maincontent/news/news.module';
import { MainModule } from 'app/sidenav/main.module';
// maincontent

import { ClubListComponent, ClubDetailComponent, ClubActivitiesComponent } from './maincontent/club';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LazyLoadImageModule,

    SharedModule,
    ActivityModule,
    ArticleModule,
    CalendarModule,
    NewsModule,
    MainModule
],
  declarations: [
    AppComponent,

    FeaturedComponent,
    FooterComponent,


    ClubListComponent,
    ClubActivitiesComponent,
    ClubDetailComponent,


  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    MenuService,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
