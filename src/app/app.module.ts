import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

// project modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ActivityModule } from 'app/maincontent/activity/activity.module';
import { ArticleModule } from 'app/maincontent/article/article.module';
import { CalendarModule } from 'app/maincontent/calendar/calendar.module';
import { NewsModule } from 'app/maincontent/news/news.module';
import { MainModule } from 'app/sidenav/main.module';
import { ClubModule } from 'app/maincontent/club/club.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ActivityModule,
    ArticleModule,
    ClubModule,
    CalendarModule,
    NewsModule,
    MainModule
],
  declarations: [
    AppComponent,
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
