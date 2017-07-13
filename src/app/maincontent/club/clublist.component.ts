
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


import { Club } from '../../shared/model/club';

import { Department } from '../../shared/model/department';


import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';



@Component({
  moduleId: module.id,
  selector: 'app-my-clubs-list',
  templateUrl: 'clublist.component.html',
  styleUrls: ['clublist.component.css']
})
export class ClubListComponent implements OnInit {

  @Input() activity: string;

  department: string;


  clubs: Club[] = [];


  departmentObjectList: Department[] = [];



  constructor(
    private router: Router,
    private dataService: ReadService,
    
    private log: Log,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {


    this.dataService.getAll('departments')
                                  .subscribe((data: Department[]) => this.departmentObjectList = data,
                                      error => this.log.debug('getDepartments' + error),
                                      () => this.log.debug('getDepartments complete '  +  this.departmentObjectList.length));





  this.dataService.getAll('clubs')
                                .subscribe((data: Club[]) => this.clubs = data,
                                    error => this.log.debug('ClublistComponent getClubs' + error),
                                    () => this.log.debug('getClubs complete '  +  this.clubs.length));




  }



displayClubs(departmentCode: string): void {

this.department = departmentCode;
}


getLogoUrl(id: string, file: string): string {


  return  'public/activities/' + id + '/' + file ;
}

}
