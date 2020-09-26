
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Club } from 'src/app/shared/model/club';
import { Department } from 'src/app/shared/model/department';
import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { HttpClient } from '@angular/common/http';



import { ViewChild, ElementRef } from '@angular/core';
import { CoordinatesService } from 'src/app/shared/services';

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

  @ViewChild('mySvg', { static: false }) mySvg: ElementRef;



  /**
  * current activity name
  */
  @Input() activity: string;

  /**
  * list of clubs
  */
  clubs: Club[] = [];


  /**
  * list of clubs
  */
  departmentObjectList: Department[] = [];

  doc: Document = null;

  constructor(
    private titleService: Title,
    private router: Router,
    private dataService: ReadService,
    private coordinatesService : CoordinatesService,
    private log: Log,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {



  }


  private fetchData() : void {

    const api = this.dataService.getIndexUrl('clubs');
    const promise = this.http.get(api).toPromise();
    console.log(promise);
    promise.then((res: any)=>{
      this.clubs = res.map((res: any) => {
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
      console.log("Promise resolved with: " + JSON.stringify(res));

      this.loadSvg();


    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });






  }



  private addClubsToMap(): void{
          // First POI (Roscoff)
          let firstPoiMap =  [469.0, 152.0]; // X, Y
          let firstPoiGps = [48.726359, -3.986535]; // latitude, longitude

          // Second POI (Penestin)
          let secondPoiMap =  [1023.0, 837.0]; // X, Y
          let secondPoiGps = [47.494616, -2.495609]; // latitude, longitude

          // translation vector
          let vectorMap =  this.coordinatesService.getVector(firstPoiMap, secondPoiMap);
          let vectorGps = this.coordinatesService.getVector(firstPoiGps, secondPoiGps); // latitude, longitude




  this.clubs.forEach((club: Club) => {


    if (club.coordinates !== undefined) {
      // format : ["48.111990", "-1.678607"]
      let coord : Array<number>  = this.getCoordinates(club.coordinates);

      if (coord && coord.length === 2) {

        let result = this.coordinatesService.convertGpsToXY(coord, firstPoiGps, firstPoiMap, vectorGps, vectorMap);

        this.appendClubToMap(this.doc,
          result[0].toString(),
          result[1].toString(),
          club.title,
          'club/'+club.id
          );
      }

    }

  });


  }

  private loadSvg(): void{


    // SVG from assets
    const promise2 = this.http.get('/assets/map.svg', { responseType: 'text' })
    .toPromise();


    promise2.then((svgdata: any) => {

      // parse SVG
      let parser = new DOMParser();
      this.doc = parser.parseFromString(svgdata, "image/svg+xml");

      // print X,Y positions into map
      //this.debugMapPositions(this.doc);
      this.addClubsToMap();
     // this.appendPointToMap(doc, '1023', '837', 'X', 'http://angular.io');
      let s = new XMLSerializer();

      //serialize SVG content
      //console.log(s.serializeToString(doc));
      this.mySvg.nativeElement.innerHTML = s.serializeToString(this.doc);
      console.log("Promise2 resolved" );


    }).catch((error)=>{
      console.log("Promise2 rejected with ");
      console.error(error);
    });
  }


  ngOnInit(): void {




    this.http.get<any>(this.dataService.getIndexUrl('departments'))
      .subscribe((data: Department[]) => {
        this.departmentObjectList = data;

        this.log.debug('getDepartments complete ' + this.departmentObjectList.length);

      });

  /*  this.http.get<any>(this.dataService.getIndexUrl('clubs'))
      .subscribe((data: Club[]) => {
        this.clubs = data;
        this.log.debug('getClubs complete ' + this.clubs.length);



      });
*/

      this.fetchData();
  }

 ngAfterViewInit() {
  this.log.debug('ngAfterViewInit ' + this.clubs.length);

 }


  /**
   * TODO : hard coded values ...
   * @param val
   */
  convertLongitudeToX(val : number) : Number{
    let referenceMapPosition  = 469.0;
    let referenceGps  = -3.986535;
    let ratio  = 554 / 1.490926;
    return referenceMapPosition + (val - referenceGps) * ratio;
  }


  convertLatitudeToY(val : number) : Number{
    let referenceMapPosition  = 152.0;
    let referenceGps  = 48.726359;
    let ratio  = 685 / -1.231743;
    return referenceMapPosition + (val - referenceGps) * ratio;
  }



  private appendClubToMap(doc: Document, x: string, y: string, clubTitle: string, clubLink: string) {
    this.log.debug('appendClubToMap ' + clubTitle + ' ' + x + ',' + y + ' ' + clubLink);
    // SVG g element
    var svg = doc.getElementsByTagName('svg')[0]; //Get svg element
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var g = doc.createElementNS("http://www.w3.org/2000/svg", 'g'); //Create a g element in SVG's namespace
    g.setAttribute("x", '0'); //Set g dat
    g.setAttribute("y", '0'); //Set g dat
    svg.appendChild(g);

    // SVG rect
    let newNode = doc.createElementNS("http://www.w3.org/2000/svg", 'foreignObject'); //Create a rect in SVG's namespace
    newNode.setAttribute("x", x); //Set rect data
    newNode.setAttribute("y", y); //Set rect data
    let rectWidth : number = clubTitle.length * 9;
    newNode.setAttribute("width", rectWidth.toString() ); //Set rect data
    newNode.setAttribute("height", "16"); //Set rect data
    newNode.setAttribute('style', 'border-width: 1px; border-style: solid; border-color: red; font-size : 16px');
    //border-color: red; border-width: 1px; border-style: solid;
    g.appendChild(newNode);

    // HTML div
    let newDiv = document.createElement('div');
    newNode.appendChild(newDiv);

    // HTML Link
    let newLink = document.createElement('a');
    newLink.setAttribute('href', clubLink);
    newLink.innerHTML = clubTitle;
    newDiv.appendChild(newLink);
  }



  getLogoUrl(id: string, file: string): string {
    return 'public/activities/' + id + '/' + file;
  }

  getCoordinatesOld(coordinates: string) : Array<string> {
    let coord = coordinates.replace(' ', '');
   // let coordArrayStr = coord.split(',');
    return coord.split(',')
  }


  getCoordinates(coordinates: string) : Array<number> {
    let coord = coordinates.replace(' ', '');

    let strArray = coord.split(',');
    let result : Array<number> = [];
    strArray.forEach((val: any) => {

      result.push(Number.parseFloat(val));
    });


    return result;
  }

  /**
   * print X,Y positions into map
   * @param doc SVG document
   */
  private debugMapPositions(doc: Document) {
    let width = 1615;
    let height = 1001;
    let x = 0;
    let y = 0;
    while (x < width) {
      y = 0;
      while (y < height) {
        let posX = x.toString();
        let posY = y.toString();
        this.appendClubToMap(doc, posX, posY, '[' + posX + ',' + posY + ']', 'http://angular.io');
        y += 50;
      }
      x += 50;
    }
  }

  private appendPointToMap(doc: Document, x: string, y: string, clubTitle: string, clubLink: string) {

    // SVG g element
    var svg = doc.getElementsByTagName('svg')[0]; //Get svg element
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var g = doc.createElementNS("http://www.w3.org/2000/svg", 'g'); //Create a g element in SVG's namespace
    g.setAttribute("x", '0'); //Set g dat
    g.setAttribute("y", '0'); //Set g dat
    svg.appendChild(g);

    // SVG rect
    let newNode = doc.createElementNS("http://www.w3.org/2000/svg", 'foreignObject'); //Create a rect in SVG's namespace
    newNode.setAttribute("x", x); //Set rect data
    newNode.setAttribute("y", y); //Set rect data
    newNode.setAttribute("width", "2"); //Set rect data
    newNode.setAttribute("height", "2"); //Set rect data
    newNode.setAttribute('style', 'font-size : 1px; background-color: red;');
    //border-color: red; border-width: 1px; border-style: solid;
    g.appendChild(newNode);

    // HTML div
    let newDiv = document.createElement('div');
    newNode.appendChild(newDiv);

    // HTML Link
    let newLink = document.createElement('a');
    newLink.setAttribute('href', clubLink);
    newLink.innerHTML = clubTitle;
    newDiv.appendChild(newLink);
  }

}
