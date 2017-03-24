import { LocaleService } from '../../shared/services/locale.service';
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Activity }        from '../../shared/model/activity';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';
import { ReadService } from "../../shared/services/read.service";



@Component({
  moduleId: module.id,
  selector: 'my-clubs-activities',
  templateUrl: 'clubactivities.component.html',
  styleUrls: ['clubactivities.component.css']
})
export class ClubActivitiesComponent implements OnInit {


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
    private route: ActivatedRoute,
    private locale: LocaleService
  ) {
  }

  ngOnInit(): void {


  this.locale.getLocale(this.conf.getI18n() + '/maincontent/clublist/i18n',
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
  let link = ['/clubs/' , activity];
  this.router.navigate(link);
  }



getLogoUrl(id : string, file : string) : string {
  
  console.log('!!!!!!!!!!!!!!!!!!!!!!!! getLogoUrl ' + id + ' ' + file);
  return  'public/activities/'+id+'/'+file ;
}

}
