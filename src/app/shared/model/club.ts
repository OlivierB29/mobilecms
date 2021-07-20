import { Media } from "./media";

export class Club {

  constructor(
  public id: string, //  1
  public activity: string, //  kendo
  public department: string, //  22
  public city: string, //  city name
  public url: string, //  http: // localhost
  public title: string, //  Some club
  public description: string, //  Informations
  public coordinates: string, //  coordinates,
  public media: Array<Media>
  ) { }
}
