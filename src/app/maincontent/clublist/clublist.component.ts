import { LocaleService } from '../../shared/services/locale.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


import { Club }        from '../../shared/model/club';

import { Department }        from '../../shared/model/department';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';
import { ReadService } from "../../shared/services/read.service";



@Component({
  moduleId: module.id,
  selector: 'my-clubs-list',
  templateUrl: 'clublist.component.html',
  styleUrls: ['clublist.component.css']
})
export class ClubListComponent implements OnInit {

  @Input() activity: string;

  department: string;

  //Localization
  i18n = {};

  //Server context
  context : string = '';


  clubs: Club[] = [];


  departmentObjectList: Department[] = [];



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



    this.context = this.conf.getContext();



    this.dataService.getAll('departments')
                                  .subscribe((data:Department[]) => this.departmentObjectList = data,
                                      error => this.log.debug('getDepartments'+error),
                                      () => this.log.debug('getDepartments complete ' + this.departmentObjectList.length));





  this.dataService.getAll('clubs')
                                .subscribe((data:Club[]) => this.clubs = data,
                                    error => this.log.debug('ClublistComponent getClubs'+error),
                                    () => this.log.debug('getClubs complete ' + this.clubs.length));




  }



displayClubs(departmentCode: string): void {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!! displayClubs ' + departmentCode);
this.department = departmentCode;
}


getLogoUrl(id : string, file : string) : string {
  
  console.log('!!!!!!!!!!!!!!!!!!!!!!!! getLogoUrl ' + id + ' ' + file);
  return  'public/activities/'+id+'/'+file ;
}

}
