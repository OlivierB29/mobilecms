import { Component, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  moduleId: module.id,
  selector: 'app-imagelist',
  templateUrl: 'imagelist.component.html',
  styleUrls: ['imagelist.component.css']
})
export class ImageListComponent  {
  /**
  * offset for ImageModule
  */
  offset = 100;

  /**
  * default image displayed by  for ImageModule
  */
  defaultImage = environment.server + '/' + environment.public + '/resources/ring-alt-32.svg';

  /**
  * eg: media/news/3/thumbnails
  */
  @Input() recorduri: string;


  @Input() images: any[];


  @Input() lazyload = false;

  public getDefaultImage(picture: any): string {

    // default full size
    let result =  picture.url;

    if (picture && picture.thumbnails && picture.thumbnails.length > 0) {
      // set the highest thumbnail resolution, if the browser doesn't support srcset
      const index = picture.thumbnails.length - 1 ;
      if (picture.thumbnails[index].url) {
        result = environment.server + '/media/' + this.recorduri + '/thumbnails/' + picture.thumbnails[index].url;

      }
    }

    return result;
  }

  /**
  * https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
  */
  public getThumbnailSrcSet(picture: any): string {

    let result = '';
    if (picture && picture.thumbnails) {

      picture.thumbnails.forEach( th => {
        if (th.url && th.width) {
          result += environment.server + '/media/' + this.recorduri + '/thumbnails/' + th.url + ' ' + th.width + 'w,';

        }

      });
      result = result.substring(0, result.length - 1);
    }

    return result;
  }
}
