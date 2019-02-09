import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LayoutService, MediaService } from 'src/app/shared/services';

@Component({

  selector: 'app-video',
  templateUrl: 'video.component.html',
  styleUrls: ['video.component.css']
})
export class VideoComponent implements OnInit {
  /**
  * eg: media/news/3/thumbnails
  */
  @Input() url: string;

  videoUrl: SafeUrl;

  sanitized: boolean;

  constructor(private mediaService: MediaService, private sanitizer: DomSanitizer) {


 }

 ngOnInit() {


   const embedUrl = this.mediaService.getEmbedUrl(this.url);
    //console.log(embedUrl);
    if (embedUrl) {
      this.videoUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      if (this.videoUrl) {
        this.sanitized = true;
      }
    }

 }

}
