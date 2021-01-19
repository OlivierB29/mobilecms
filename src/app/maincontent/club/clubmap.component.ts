
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Club } from 'src/app/shared/model/club';

import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { HttpClient } from '@angular/common/http';



import { ViewChild, ElementRef } from '@angular/core';
import { CoordinatesService } from 'src/app/shared/services';
import { SvgService } from 'src/app/shared/services';
import { Coordinates } from 'src/app/shared/model/coordinates';
import { Activity } from 'src/app/shared/model/activity';


/**
* Club Map
          GPS latitude, longitude    SVG X, Y
* Brest   "48.394157, -4.486726" ->  300, 300 (approx)
* Rennes  "48.111990, -1.678607" -> 1300, 400 (approx)
* Lorient "47.756652, -3.381259" ->  690, 690
*/
@Component({

  selector: 'app-my-clubmap',
  templateUrl: 'clubmap.component.html',
  styleUrls: ['clubmap.component.css']
})
export class ClubMapComponent implements OnInit {

  /**
   * SVG map
   */
  @ViewChild('mySvg', { static: false }) mySvg!: ElementRef;

  /** SVG document */
  doc!: Document ;

  /**
  * current activity name
  */
  @Input() activity: string ='';

  /**
  * list of clubs
  */
  clubs: Club[] = [];

  /**
  * list of activities
  */
 @Input() activities: Activity[] = [];

  poiPositions = <any>[];


  constructor(
    private titleService: Title,
    private router: Router,
    private dataService: ReadService,
    private coordinatesService: CoordinatesService,
    private svgService: SvgService,
    private log: Log,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {



  }


  private fetchData(): void {



    const headPromise = this.http.get(this.dataService.getUrl('description', 'head')).toPromise();
    console.log(headPromise);
    headPromise.then((res: any) => {

      console.log(res);

      let mapUrl = res.geographicdata.mapurl;

      let firstPoi = Coordinates.parse(
        res.geographicdata.firstpoi.gps,
        res.geographicdata.firstpoi.map
      );


      let secondPoi = Coordinates.parse(
        res.geographicdata.lastpoi.gps,
        res.geographicdata.lastpoi.map
      );



      // continue processing
      this.loadClubsAndSvg(mapUrl, firstPoi, secondPoi);

    }).catch((error) => {
      console.error("Head Promise rejected with ");
      console.error(error);
    });




  }

  private loadClubsAndSvg(mapUrl: string, firstPoi: Coordinates, lastPoi: Coordinates): void {


    const api = this.dataService.getIndexUrl('clubs');
    const promise = this.http.get(api).toPromise();
    console.log(promise);
    promise.then((res: any) => {
      let tmpclubs = res.map((res: any) => {
        return new Club(
          res.id,
          res.activity,
          res.department,
          res.url,
          res.title,
          res.description,
          res.coordinates
        );
      });
      console.log("Club Promise resolved with: " + JSON.stringify(res));
      if (this.activity ) {
        this.clubs = tmpclubs.filter((club : Club) => club.activity === this.activity);
      } else {
        this.clubs = tmpclubs;
      }

      // load SVG map
      this.loadSvg(mapUrl, firstPoi, lastPoi);


    }).catch((error) => {
      console.log("Club Promise rejected with " + JSON.stringify(error));
    });



  }


  private addClubsToMap(firstPoi: Coordinates, lastPoi: Coordinates): void {


    // translation vector
    let vector = new Coordinates(
      this.coordinatesService.getVector(firstPoi.gps, lastPoi.gps),
      this.coordinatesService.getVector(firstPoi.map, lastPoi.map),
    );

    // SVG g element
    let g : SVGElement = this.svgService.g(this.doc);


    this.clubs.forEach((club: Club) => {

      // display all activities or only one
      if ((!this.activity || this.activity && club.activity === this.activity) && club.coordinates !== undefined) {
        // format : "48.111990, -1.678607"
        let coord: Array<number> = this.parseCoordinates(club.coordinates);

        if (coord && coord.length === 2) {


          let result = this.coordinatesService.convertGpsToXY(coord, firstPoi, vector);

          let displayPosition = this.svgService.findDisplayPosition(this.poiPositions, result);


          this.poiPositions.push(displayPosition);

          if (this.log.isDebug()) {
            if (displayPosition[0] != result[0] && displayPosition[1] != result[1])
            this.log.debug("place " + club.title + " " + result.toString() + " --> " + displayPosition.toString());
          }

          this.log.debug('appendClubToMap ' + club.title + ' ' + displayPosition[0] + ',' + displayPosition[1]);




          this.svgService.appendClubToMap(this.doc,
            g,
            displayPosition[0],
            displayPosition[1],
            this.getClubLink(club),
            club.title,
            this.getActivityImg(club),
            32,
            32
          );
        }

      }

    });
  }





  getClubLink(club: Club): string {
    return '#/club/' + club.id;
  }



  getActivityImg(club: Club): string {
    let result = '';
    //return 'public/activities/' + club.activity + '/' + club.activity + '-32px.png';

    if(this.activities ) {
      let filter = this.activities.filter(a => a.name === club.activity);
      if (filter.length > 0) {
        result = 'public/activities/' + club.activity + '/' + filter[0].mapicon;
      }
    }

    return result;
  }


  private loadSvg(mapUrl: string, firstPoi: Coordinates, lastPoi: Coordinates): void {


    // SVG from assets
    const promise2 = this.http.get(mapUrl, { responseType: 'text' })
      .toPromise();


    promise2.then((svgdata: any) => {

      // parse SVG
      this.doc = this.svgService.parseFromString(svgdata);

      // print X,Y positions into map
      //this.debugMapPositions(this.doc);
      this.addClubsToMap(firstPoi, lastPoi);
      //  this.appendPointToMap(this.doc, '73', '933', 'X', 'http://angular.io');

      this.mySvg.nativeElement.innerHTML = this.svgService.serializeToString(this.doc);
      console.log("Promise2 resolved");


    }).catch((error) => {
      console.error("Promise2 rejected with");
      console.error(error);
    });
  }





  ngOnInit(): void {

    // path parameters
    this.route.params.forEach((params: Params) => {
      if (params['activity'] !== undefined) {
        this.activity = params['activity'];
      }
    });




    this.fetchData();
  }

  ngAfterViewInit() {
    this.log.debug('ngAfterViewInit ' + this.clubs.length);

  }






  getLogoUrl(id: string, file: string): string {
    return 'public/activities/' + id + '/' + file;
  }


  parseCoordinates(coordinates: string): Array<number> {
    let coord = coordinates.replace(' ', '');

    let strArray = coord.split(',');
    let result: Array<number> = <any>[];
    strArray.forEach((val: any) => {

      result.push(Number.parseFloat(val));
    });


    return result;
  }




}
