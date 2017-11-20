import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  public getThumbnail(server: string, recorduri: string,  picture: any): string {

    // default full size
    let result =  picture.url;
    console.log("!!!!!!!!!!!!!!!!!!" + JSON.stringify(picture));
    if (picture && picture.thumbnails && picture.thumbnails.length > 0) {
      const index = 0 ;
      if (picture.thumbnails[index].url) {
        result = server + '/media/' + recorduri + '/thumbnails/' + picture.thumbnails[index].url;
        console.log("!!!!!!!!!!!!!!!!!! --> " + result);
      }
    }

    return result;
  }


  public getDefaultImage(server: string, recorduri: string,  picture: any): string {

    // default full size
    let result =  picture.url;

    if (picture && picture.thumbnails && picture.thumbnails.length > 0) {
      // set the highest thumbnail resolution, if the browser doesn't support srcset
      const index = picture.thumbnails.length - 1 ;
      if (picture.thumbnails[index].url) {
        result = server + '/media/' + recorduri + '/thumbnails/' + picture.thumbnails[index].url;

      }
    }

    return result;
  }

  /**
  * https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
  */
  public getThumbnailSrcSet(server: string, recorduri: string, picture: any): string {

    return this.getSrcSet(server + '/media/' + recorduri + '/thumbnails/', picture);
  }

  public getSrcSet(prefix: string, picture: any): string {

    let result = '';
    if (picture && picture.thumbnails) {

      picture.thumbnails.forEach( th => {
        if (th.url && th.width) {
          result += prefix + th.url + ' ' + th.width + 'w,';

        }

      });
      result = result.substring(0, result.length - 1);
    }

    return result;
  }
}
