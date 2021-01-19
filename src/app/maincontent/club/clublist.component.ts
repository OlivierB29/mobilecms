
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Club } from 'src/app/shared/model/club';
import { Department } from 'src/app/shared/model/department';
import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { HttpClient } from '@angular/common/http';

/**
* display a list of clubs, for a selected activity
*/
@Component({

  selector: 'app-my-clubs-list',
  templateUrl: 'clublist.component.html',
  styleUrls: ['clublist.component.css']
})
export class ClubListComponent implements OnInit {

  /**
  * current activity name
  */
  @Input() activity: string ='';

  /**
  * list of clubs
  */
  clubs: Club[] = <any>[];


  /**
  * list of clubs
  */
  departmentObjectList: any[] = [];

  /**
  * selected regional area
  */
  department: string ='';



  constructor(
    private titleService: Title,
    private router: Router,
    private dataService: ReadService,
    private log: Log,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {


    this.http.get<any>(this.dataService.getIndexUrl('departments'))
      .subscribe((data: Department[]) => {
        this.departmentObjectList = data;

      this.log.debug('getDepartments complete ' + this.departmentObjectList.length);
    });

    this.http.get<any>(this.dataService.getIndexUrl('clubs'))
      .subscribe((data: Club[]) => {
        this.clubs = data;
        this.log.debug('getClubs complete ' + this.clubs.length);
    });

  }

  displayClubs(departmentCode: string): void {
    this.department = departmentCode;
  }

  getLogoUrl(id: string, file: string): string {
    return 'public/activities/' + id + '/' + file;
  }

}
