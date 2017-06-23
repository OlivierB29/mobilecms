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



import { LazyLoadImageModule } from 'ng-lazyload-image';

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
    ConfService,
    Log,
    ReadService,
    OrderbyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
