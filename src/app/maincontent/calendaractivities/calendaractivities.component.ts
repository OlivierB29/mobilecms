
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Activity }        from '../../shared/model/activity';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';
import { ReadService } from "../../shared/services/read.service";



@Component({
  moduleId: module.id,
  selector: 'my-calendar-activities',
  templateUrl: 'calendaractivities.component.html',
  styleUrls: ['calendaractivities.component.css']
})
export class CalendarActivitiesComponent implements OnInit {


  //Localization
  i18n = {};

  //Server context
  context : string = '';


  activity : string;


  activityObjectList: Activity[] = [];

  constructor(
    private router: Router,
    private dataService: ReadService,
    private conf : ConfService,
    private log : Log,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {


  this.dataService.getLocale( 'maincontent/clublist',
  this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
                error => this.log.debug('Locale' + error),
                () => this.log.debug('Locale complete'));


    //path parameters
    this.route.params.forEach((params: Params) => {
      if (params['activity'] !== undefined) {
        this.activity = params['activity'];


      }

    });

    this.context = this.conf.getContext();

    this.dataService.getAll('activities')
                                  .subscribe((data:Activity[]) => this.activityObjectList = data,
                                      error => this.log.debug('getActivities'+error),
                                      () => this.log.debug('getActivities complete' + this.activityObjectList.length));




  }


  gotoActivity(activity: string): void {
  let link = ['/calendrier/' , activity];
  this.router.navigate(link);
  }



getLogoUrl(id : string, file : string) : string {
  
  console.log('!!!!!!!!!!!!!!!!!!!!!!!! getLogoUrl ' + id + ' ' + file);
  return  'public/activities/'+id+'/'+file ;
}

}
