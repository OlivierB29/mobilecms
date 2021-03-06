import { Injectable } from '@angular/core';
import { Coordinates } from '../model/coordinates';

@Injectable()
export class CoordinatesService {
  constructor() { }

  convertGpsToXY(gps: Array<number>,  firstPoi: Coordinates,
    vector: Coordinates) : Array<number> {


    let x = firstPoi.map[0] + (this.getLongitude(gps) - firstPoi.getLongitude()) * (vector.map[0] / vector.getLongitude());

    let y = firstPoi.map[1] + (this.getLatitude(gps) - firstPoi.getLatitude()) * (vector.map[1] / vector.getLatitude());

    let result : Array<number> = <any>[];
    result.push(x);
    result.push(y);

    return result;
  }

  convertGpsToXYOld(gps: Array<number>, firstPoiGps: Array<number>, firstPoiMap: Array<number>,
    vectorGps: Array<number>, vectorMap: Array<number>) : Array<number> {


    let x = firstPoiMap[0] + (this.getLongitude(gps) - this.getLongitude(firstPoiGps)) * (vectorMap[0] / this.getLongitude(vectorGps));

    let y = firstPoiMap[1] + (this.getLatitude(gps) - this.getLatitude(firstPoiGps)) * (vectorMap[1] / this.getLatitude(vectorGps));

    let result : Array<number> = <any>[];
    result.push(x);
    result.push(y);

    return result;
  }

  /**
   * TODO : remove hard coded values ...
   * @param val
   */
  convertLongitudeToX(val : number, firstRefMapPosition : number, firstRefGpsLongitude : number, secondRefMapPosition : number, secondRefLongitude : number) : Number{



    let ratio  = secondRefMapPosition / secondRefLongitude;
    return firstRefMapPosition + (val - firstRefGpsLongitude) * ratio;
  }


  convertLatitudeToY(val : number, firstRefMapPosition: number, firstRefGpsLatitude : number, secondRefMapPosition : number, secondRefLatitude : number) : Number {
    // find two POIs on the SVG map, and obtain GPS coordinates



    let ratio  = secondRefMapPosition / secondRefLatitude;
    return firstRefMapPosition + (val - firstRefGpsLatitude) * ratio;
  }
  getCoordinates(coordinates: string) : Array<string> {
    let coord = coordinates.replace(' ', '');
   // let coordArrayStr = coord.split(',');
    return coord.split(',')
  }

  getLongitude(gps : Array<number>) {
    return gps[1];
  }


  getLatitude(gps : Array<number>) {
    return gps[0];
  }

  /**
   * Create a vector 'a->b' with two positions 'a' and 'b'
   * @param a
   * @param b
   */
  getVector(a: Array<number>, b: Array<number>) : Array<number> {
    let result : Array<number> = <any>[];
    for(let i = 0; i < a.length; i++) {
      result.push(b[i] - a[i]);
    }
    return result;
  }

}
