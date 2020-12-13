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

  appendDiv(node: SVGElement): any {
    // HTML div
    let newNode = document.createElement('div');
    node.appendChild(newNode);
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

  appendImg(node: SVGElement, src: string, alt: string): any {
    // HTML div
    let newNode = document.createElement('img');
    newNode.setAttribute('src', src);
    newNode.setAttribute('alt', alt);
    node.appendChild(newNode);
    return newNode;
  }

  appendClubToMap(doc: Document, g: any, x: number, y: number, link: string, title: string, activityImg: string) {


    //newNode.setAttribute('style', 'border-width: 1px; border-style: solid; border-color: red; font-size : 16px');
    //newNode.setAttribute('style', 'background-color: white');
    //border-color: red; border-width: 1px; border-style: solid;
    let newNode = this.foreignObject(doc, x, y, 32, 32);
    g.appendChild(newNode);

    let newDiv = this.appendDiv(newNode);

    newDiv.setAttribute('title', title); // hover

    // HTML Link
    let newLink = this.appendLink(newNode, link);

    // display image
    let newImg = this.appendImg(newLink, activityImg, title);


  }



  private centerRectangle(val: number, size: number): number {
    return val - size / 2;
  }


}
