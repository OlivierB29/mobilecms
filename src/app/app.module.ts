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


import { BrPipe, OrderbyPipe, PrettyUrlPipe } from './shared/filters';



// Tools

import { Log } from './shared/services/log.service';


import { ReadService } from './shared/services/read.service';
import { ReadService2 } from './shared/services/read.service2';


// maincontent
import { NewsComponent, NewsPreviewComponent, NewsDetailsComponent } from './maincontent/news';
import {
  CalendarListComponent,
  CalendarEventComponent,
  CalendarDetailComponent,
  CalendarActivitiesComponent
} from './maincontent/calendar';

import { ClubListComponent } from './maincontent/clublist/clublist.component';


import { ClubDetailComponent } from './maincontent/clubdetail/clubdetail.component';
import { ClubActivitiesComponent } from './maincontent/clubactivities/clubactivities.component';

import { MainPageComponent } from './maincontent/mainpage/mainpage.component';



import { ActivityButtonComponent } from './maincontent/activitybutton/activitybutton.component';
import { ArticleComponent } from './maincontent/article/article.component';
import { ArticlePreviewComponent } from './maincontent/articlepreview/articlepreview.component';
import { ArticlelistComponent } from './maincontent/articlelist/articlelist.component';
import { ItemsComponent } from './maincontent/items/items.component';
import { MenubuttonComponent } from './maincontent/menubutton/menubutton.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavcontainerComponent } from './sidenavcontainer/sidenavcontainer.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,

    SharedModule.forRoot(),
],

  declarations: [

    ActivityFilterPipe,
    OrderbyPipe,
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
    NewsPreviewComponent,
    NewsDetailsComponent,
    ClubListComponent,
    ClubActivitiesComponent,
    ClubDetailComponent,
    ActivityButtonComponent,
    ArticleComponent,
    ArticlePreviewComponent,
    ArticlelistComponent,
    ItemsComponent,
    MenubuttonComponent,
    SidenavComponent,
    SidenavcontainerComponent
  ],
  providers: [

    Log,
    ReadService,
    ReadService2,
    OrderbyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
