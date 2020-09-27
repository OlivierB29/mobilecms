
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
import { Coordinates } from 'src/app/shared/model/coordinates';

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



    const headPromise = this.http.get(this.dataService.getUrl('description', 'head')).toPromise();
    console.log(headPromise);
    headPromise.then((res: any)=>{

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

    }).catch((error)=>{
      console.error("Head Promise rejected with ");
      console.error(error);
    });




  }

  private loadClubsAndSvg(mapUrl : string, firstPoi : Coordinates, lastPoi: Coordinates): void {


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
      console.log("Club Promise resolved with: " + JSON.stringify(res));

      // load SVG map
      this.loadSvg(mapUrl, firstPoi, lastPoi);


    }).catch((error)=>{
      console.log("Club Promise rejected with " + JSON.stringify(error));
    });



  }


  private addClubsToMap(firstPoi: Coordinates, lastPoi : Coordinates): void{


    // translation vector
   let vector = new Coordinates(
      this.coordinatesService.getVector(firstPoi.gps, lastPoi.gps),
      this.coordinatesService.getVector(firstPoi.map, lastPoi.map),
    );



this.clubs.forEach((club: Club) => {


if (club.coordinates !== undefined) {
// format : "48.111990, -1.678607"
let coord : Array<number>  = this.parseCoordinates(club.coordinates);

if (coord && coord.length === 2) {


  let result = this.coordinatesService.convertGpsToXY(coord, firstPoi, vector);

  this.appendClubToMap(this.doc,
    result[0].toString(),
    result[1].toString(),
    club
    );
}

}

});



}

getClubLink(club : Club): string {
  return 'club/'+club.id;
}

getActivityImg(club : Club): string {
  return 'public/activities/'+club.activity+'/'+club.activity+'-32px.png';
}


  private loadSvg(mapUrl : string, firstPoi: Coordinates, lastPoi: Coordinates): void{


    // SVG from assets
    const promise2 = this.http.get(mapUrl, { responseType: 'text' })
    .toPromise();


    promise2.then((svgdata: any) => {

      // parse SVG
      let parser = new DOMParser();
      this.doc = parser.parseFromString(svgdata, "image/svg+xml");

      // print X,Y positions into map
      //this.debugMapPositions(this.doc);
      this.addClubsToMap(firstPoi, lastPoi);
    //  this.appendPointToMap(this.doc, '73', '933', 'X', 'http://angular.io');
      let s = new XMLSerializer();

      //serialize SVG content
      //console.log(s.serializeToString(doc));
      this.mySvg.nativeElement.innerHTML = s.serializeToString(this.doc);
      console.log("Promise2 resolved" );


    }).catch((error)=>{
      console.error("Promise2 rejected with");
      console.error(error);
    });
  }





  ngOnInit(): void {




    this.http.get<any>(this.dataService.getIndexUrl('departments'))
      .subscribe((data: Department[]) => {
        this.departmentObjectList = data;

        this.log.debug('getDepartments complete ' + this.departmentObjectList.length);

      });


      this.fetchData();
  }

 ngAfterViewInit() {
  this.log.debug('ngAfterViewInit ' + this.clubs.length);

 }


 private appendClubToMap(doc: Document, x: string, y: string, club : Club) {
  this.log.debug('appendClubToMap ' + club.title + ' ' + x + ',' + y );
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
  let rectWidth : number = club.title.length * 9;
  newNode.setAttribute("width", "32" ); //Set rect data
  newNode.setAttribute("height", "32"); //Set rect data
  newNode.setAttribute('style', 'border-width: 1px; border-style: solid; border-color: red; font-size : 16px');
  //border-color: red; border-width: 1px; border-style: solid;
  g.appendChild(newNode);

  // HTML div
  let newDiv = document.createElement('div');
  newNode.appendChild(newDiv);
  newDiv.setAttribute('title', club.title + " | " + club.activity.toUpperCase() );

  // HTML Link
  let newLink = document.createElement('a');
  newLink.setAttribute('href', this.getClubLink(club));
  //newLink.innerHTML = clubTitle;
  newDiv.appendChild(newLink);

  let newImg = document.createElement('img');
  newImg.setAttribute('src', this.getActivityImg(club));
  newImg.setAttribute('alt', club.activity);

  newLink.appendChild(newImg);


}



  private appendLinkToMap(doc: Document, x: string, y: string, clubTitle: string, clubLink: string) {
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
  /*  let newLink = document.createElement('a');
    newLink.setAttribute('href', clubLink);
    newLink.innerHTML = clubTitle;
    newDiv.appendChild(newLink);
*/
    let newImg = document.createElement('img');
    newImg.setAttribute('src', clubLink);
    newImg.setAttribute('alt', clubLink);

    newDiv.appendChild(newImg);


  }



  getLogoUrl(id: string, file: string): string {
    return 'public/activities/' + id + '/' + file;
  }


  parseCoordinates(coordinates: string) : Array<number> {
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
        this.appendLinkToMap(doc, posX, posY, '[' + posX + ',' + posY + ']', 'http://angular.io');
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
