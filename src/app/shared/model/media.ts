import { Thumbnail } from "./thumbnail";

export class Media {

  constructor(
  public mimetype: string, // "image\/jpeg"
  public width: string, //  px
  public height: string, //  px
  public url : string, // logo.jpg
  public size : number, // bytes
  public title : string,
  public thumbnails: Array<Thumbnail>


  ) { }
}

/*
"mimetype": "image\/jpeg",
            "width": "423",
            "height": "427",
            "url": "logo.jpg",
            "size": 49595,
            "title": "logo.jpg",
            "thumbnails": [
                {
                    "width": "150",
                    "height": "151",
                    "url": "logo-150.jpg"
                },
                {
                    "width": "300",
                    "height": "303",
                    "url": "logo-300.jpg"
                }
            ]

*/