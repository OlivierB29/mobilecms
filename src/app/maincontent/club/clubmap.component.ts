
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Club } from 'src/app/shared/model/club';
import { Department } from 'src/app/shared/model/department';
import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { HttpClient } from '@angular/common/http';



import { ViewChild, ElementRef } from '@angular/core';

/**
* display a list of clubs, for a selected activity
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



  constructor(
    private titleService: Title,
    private router: Router,
    private dataService: ReadService,
    private log: Log,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {


    // load SVG from assets
    http.get('/assets/map.svg', { responseType: 'text' })
      .subscribe(svgdata => {

        // parse SVG
        let parser = new DOMParser();
        let doc = parser.parseFromString(svgdata, "image/svg+xml");

        // print X,Y positions into map
        this.debugMapPositions(doc);
        let s = new XMLSerializer();

        //serialize SVG content
        //console.log(s.serializeToString(doc));
        this.mySvg.nativeElement.innerHTML = s.serializeToString(doc);
      });

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
        y += 100;
      }
      x += 100;
    }
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


  private appendClubToMap(doc: Document, x: string, y: string, clubTitle: string, clubLink: string) {

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
    newNode.setAttribute("width", "75"); //Set rect data
    newNode.setAttribute("height", "20"); //Set rect data
    newNode.setAttribute('style', 'border-color: red; border-width: 1px; border-style: solid;');
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

}
