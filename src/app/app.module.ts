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
import { ActivityModule } from 'app/maincontent/activity/activity.module';
import { ArticleModule } from 'app/maincontent/article/article.module';
import { CalendarModule } from 'app/maincontent/calendar/calendar.module';
// maincontent
import { NewsComponent, NewsPreviewComponent, NewsDetailsComponent } from './maincontent/news';
import { ClubListComponent, ClubDetailComponent, ClubActivitiesComponent } from './maincontent/club';
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

    SharedModule,
    ActivityModule,
    ArticleModule,
    CalendarModule,
],
  declarations: [
    AppComponent,
    BannerComponent,
    FeaturedComponent,
    FooterComponent,
    HomeComponent,
    NewsComponent,
    NewsPreviewComponent,
    NewsDetailsComponent,
    ClubListComponent,
    ClubActivitiesComponent,
    ClubDetailComponent,
    MenubuttonComponent,
    SidenavComponent,
    SidenavcontainerComponent
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    MenuService,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
