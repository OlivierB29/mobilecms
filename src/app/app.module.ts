import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { FooterComponent } from './widget/footer/footer.component';
import { HomeComponent } from './maincontent/home/home.component';
import { FeaturedComponent } from './widget/featured/featured.component';


import { BannerComponent } from './widget/banner/banner.component';


import { BrPipe, OrderbyPipe,  ActivityFilterPipe, DepartmentFilterPipe } from './shared/filters';



// Tools

import { Log, ReadService } from 'app/shared/services';

import { MenuService } from 'app/sidenav/menu.service';


// maincontent
import { NewsComponent, NewsPreviewComponent, NewsDetailsComponent } from './maincontent/news';
import {
  CalendarListComponent,
  CalendarEventComponent,
  CalendarActivitiesComponent,
  CalendarFeedComponent
} from './maincontent/calendar';

import { ClubListComponent, ClubDetailComponent, ClubActivitiesComponent } from './maincontent/club';

import { ActivityButtonComponent } from './maincontent/activitybutton/activitybutton.component';
import { ArticleComponent, ArticlePreviewComponent, ArticlelistComponent,
   AttachmentsComponent, ImageListComponent } from './maincontent/article';
import { ItemsComponent } from './maincontent/items/items.component';

import { SidenavcontainerComponent, SidenavComponent, MenubuttonComponent } from './sidenav';


import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LazyLoadImageModule,

    SharedModule.forRoot(),
],

  declarations: [

    ActivityFilterPipe,
    OrderbyPipe,
    DepartmentFilterPipe,

    BrPipe,

    AppComponent,
    BannerComponent,
    CalendarFeedComponent,
    FeaturedComponent,
    FooterComponent,

    HomeComponent,
    CalendarListComponent,
    CalendarActivitiesComponent,
    CalendarEventComponent,
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
    AttachmentsComponent,
    ImageListComponent,
    ItemsComponent,
    MenubuttonComponent,
    SidenavComponent,
    SidenavcontainerComponent
  ],
  providers: [
    Log,
    ReadService,
    MenuService,
    HttpClient,
    OrderbyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
