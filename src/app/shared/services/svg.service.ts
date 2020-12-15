import { Injectable } from '@angular/core';

@Injectable()
export class SvgService {
  constructor() { }

  parseFromString(svgdata: any) {

    // parse SVG
    let parser = new DOMParser();
    return parser.parseFromString(svgdata, "image/svg+xml");


  }

  serializeToString(doc: Document) {
    let s = new XMLSerializer();

    //serialize SVG content

    return s.serializeToString(doc);


  }

  g(doc: Document): SVGElement {
    var svg = doc.getElementsByTagName('svg')[0]; //Get svg element
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var g = doc.createElementNS("http://www.w3.org/2000/svg", 'g'); //Create a g element in SVG's namespace
    g.setAttribute("x", '0'); //Set g dat
    g.setAttribute("y", '0'); //Set g dat
    svg.appendChild(g);
    return g;
  }

  foreignObject(doc: Document, x: number, y: number, rectWidth: number = 32, rectHeight: number = 32) {


    let newNode = doc.createElementNS("http://www.w3.org/2000/svg", 'foreignObject'); //Create a rect in SVG's namespace
    newNode.setAttribute("x", this.centerRectangle(x, rectWidth).toString()); //Set rect data
    newNode.setAttribute("y", this.centerRectangle(y, rectHeight).toString()); //Set rect data

    newNode.setAttribute("width", rectWidth.toString()); //Set rect data
    newNode.setAttribute("height", rectHeight.toString()); //Set rect data
    newNode.setAttribute('class', 'poi');
    return newNode;
  }

  appendDiv(node: SVGElement, title = '', style = ''): any {
    // HTML div
    let newNode = document.createElement('div');


    node.appendChild(newNode);
    if (title) {
      newNode.setAttribute('title', title); // hover
    }
    if (style) {
      newNode.setAttribute('style', style);
    }
    return newNode;
  }

  appendLink(node: SVGElement, link: string): any {
    // HTML div
    let newNode = document.createElement('a');
    newNode.setAttribute('href', link);
    newNode.setAttribute('target', '_blank');
    node.appendChild(newNode);
    return newNode;
  }

  appendSpan(node: SVGElement, text: string, style: string): any {
    // HTML span
    let newNode = document.createElement('span');
    newNode.innerHTML = text;
    node.appendChild(newNode);
    newNode.setAttribute('style', style);
    return newNode;
  }

  appendImg(node: SVGElement, src: string, alt: string): any {
    // HTML img
    let newNode = document.createElement('img');
    newNode.setAttribute('src', src);
    newNode.setAttribute('alt', alt);
    node.appendChild(newNode);
    return newNode;
  }

  appendClubToMap(doc: Document, g: any, x: number, y: number, link: string, title: string, activityImg: string, width = 32, height = 32) {

    let mode = 'icon'; // icon | columns

    //newNode.setAttribute('style', 'border-width: 1px; border-style: solid; border-color: red; font-size : 16px');
    //newNode.setAttribute('style', 'background-color: white');
    //border-color: red; border-width: 1px; border-style: solid;
    let newNode = this.foreignObject(doc, x, y, width, height);
    g.appendChild(newNode);


    if (mode === 'columns') {
      let newLink = this.appendLink(newNode, link);

      let row = this.appendRow(newLink);
      let columns = this.appendTwoColumns(row);
      columns[0].innerHTML = title;
      columns[0].setAttribute('style', 'font-size: x-small');

      // display image

      this.appendImg(columns[1], activityImg, title);
    } else {
      let newDiv = this.appendDiv(newNode, title);
      let newLink = this.appendLink(newDiv, link);
      this.appendImg(newLink, activityImg, title);

    }

  }

  appendRow(node: SVGElement): any {
    // HTML img
    let row = this.appendDiv(node, '', 'display: flex');
    return row;
  }

  appendTwoColumns(node: SVGElement): any[] {

    let result = [];
    let col1 = this.appendDiv(node, '', 'flex: 50%;');
   // col1.innerHTML = 'test';
    let col2 = this.appendDiv(node, '', 'flex: 50%;');
    //col2.innerHTML = 'test';
    node.appendChild(col1);
    node.appendChild(col2);
    result.push(col1);
    result.push(col2);
    return result;
  }


  private centerRectangle(val: number, size: number): number {
    return val - size / 2;
  }

  /**
   * Considering a zoomed out regional map : Adjust position, if others POI are nearby.
   * POI are just clickable items, not really GPS oriented.
   * @param position new position
   */
  findDisplayPosition(poiPositions= [], position: Array<number> ) : Array<number>{
    let coord = [];
    position.forEach(element => {
      coord.push(element);
    });
    while(this.poiAlreadyExistsNearPosition(poiPositions, coord, 10)) {
      coord[0] -= 5;
      coord[1] -= 5;
    }

    return coord;
  }

  private poiAlreadyExistsNearPosition(poiPositions = [], position : Array<number>, approx : number) : boolean {

    let result = false;

    poiPositions.forEach((p : Array<number>) => {

      if (
          position[0] >= (p[0] - approx)
          && position[0] <= (p[0] + approx)
          &&
          position[1] >= (p[1] - approx)
          && position[1] <= (p[1] + approx)

          ) {
            result = true;
          }

    });
    return result;
  }

}
