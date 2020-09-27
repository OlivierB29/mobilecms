import { CoordinatesService } from '../services';

export class Coordinates {

  constructor(public gps: Array<number>, public map: Array<number> ) {

  }


  getLongitude() {
    return this.gps[1];
  }


  getLatitude() {
    return this.gps[0];
  }


  public static parseCoordinates(coordinates: string) : Array<number> {
    let coord = coordinates.replace(' ', '');

    let strArray = coord.split(',');
    let result : Array<number> = [];
    strArray.forEach((val: any) => {

      result.push(Number.parseFloat(val));
    });


    return result;
  }

  public static  parse(gps: string, map: string): Coordinates {
    return new Coordinates(Coordinates.parseCoordinates(gps), Coordinates.parseCoordinates(map));
  }

  }
