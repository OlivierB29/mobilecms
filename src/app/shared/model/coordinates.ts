export class Coordinates {

  constructor(public gps: Array<number>, public map: Array<number> ) {

  }

  getLongitude() {
    return this.gps[1];
  }


  getLatitude() {
    return this.gps[0];
  }



  }
