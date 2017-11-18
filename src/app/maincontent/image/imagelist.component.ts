import { Component, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { ImageService } from './image.service';

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

  constructor(private imageService: ImageService) {
 }

  public getDefaultImage(picture: any): string {

    return this.imageService.getDefaultImage(environment.server, this.recorduri, picture);
  }

  /**
  * https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
  */
  public getThumbnailSrcSet(picture: any): string {
    return this.imageService.getThumbnailSrcSet(environment.server, this.recorduri, picture);
  }
}
