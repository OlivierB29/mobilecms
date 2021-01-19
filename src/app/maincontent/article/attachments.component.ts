import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImageService } from 'src/app/maincontent/image';

@Component({

  selector: 'app-attachments',
  templateUrl: 'attachments.component.html',
  styleUrls: ['attachments.component.css']
})
export class AttachmentsComponent  {

  @Input() attachments!: any[];

  /**
  * eg: media/news/3/thumbnails
  */
  @Input() recorduri: string ='';

  constructor(private imageService: ImageService) {
 }

  public getDefaultImage(picture: any): string {
    return this.imageService.getDefaultThumbnail(environment.server, this.recorduri, picture);
  }

  /**
  * https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
  */
  public getThumbnailSrcSet(picture: any): string {
    return this.imageService.getThumbnailSrcSet(environment.server, this.recorduri, picture);
  }
}
