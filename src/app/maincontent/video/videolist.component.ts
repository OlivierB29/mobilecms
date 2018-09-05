import { Component, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { VideoService } from './video.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({

  selector: 'app-videolist',
  templateUrl: 'videolist.component.html',
  styleUrls: ['videolist.component.css']
})
export class VideoListComponent  {

  /**
  * eg: media/news/3/thumbnails
  */
  @Input() recorduri: string;


  @Input() videos: any[];

  constructor(private imageService: VideoService, private sanitizer: DomSanitizer) {
 }


}
