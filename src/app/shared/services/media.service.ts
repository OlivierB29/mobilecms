export class MediaService {

    initMediaUrl(type: string, id: string, media: any[], mediaUri: string): any[] {
      const result = [];
      if (media) {

        media.forEach((m: any) => {
          const newMedia: any = Object.assign({}, m);
          newMedia.url = mediaUri + '/' + type + '/' + id + '/' + m.url;

          result.push(newMedia);
        });
      }
      return result;
    }

    isImage(element: any): boolean {
      return element.mimetype && element.mimetype.indexOf('image') > -1 ;
    }

    isVideo(element: any): boolean {
      let result = (element.mimetype && element.mimetype.indexOf('video') > -1 )
      ||
      (
        element.url.indexOf('youtube\.com') > -1
        || element.url.indexOf('youtu\.be') > -1
        || element.url.indexOf('vimeo') > -1
        || (element.url.indexOf('facebook') > -1 && element.url.indexOf('videos') > -1)
      );
      return result;
    }

    getEmbedUrl(url: string) {
      const youtubeId = this.getYouTubeID(url);
      let embedUrl = null;
      if (url.indexOf('youtu') > -1 && youtubeId) {
        embedUrl = 'https://www.youtube.com/embed/' + youtubeId;
      }
      if (url.indexOf('vimeo') > -1) {
        const vimeoId = this.getVimeoID(url);
        if (vimeoId) {
          embedUrl = 'https://player.vimeo.com/video/' + vimeoId;
        }
      }
      if (url.indexOf('facebook') > -1) {
        const fbId = this.getFacebookID(url);
        if (fbId) {
          embedUrl = 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F' + fbId;
        }
      }
      return embedUrl;
    }

    getFacebookID(url) {
      let ID = '';
      url = url.replace(/(>|<)/gi, '').split(/(facebook\.com\/facebook\/videos\/|player\.facebook\.com\/)/);
      if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      } else {
        ID = url;
      }
       return ID;
    }

    getVimeoID(url) {
      let ID = '';
      url = url.replace(/(>|<)/gi, '').split(/(vimeo\.com\/|player\.vimeo\.com\/)/);
      if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      } else {
        ID = url;
      }
       return ID;
    }

    getYouTubeID(url) {
      let ID = '';
      url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      } else {
        ID = url;
      }
       return ID;
    }


    isPdf(element: any): boolean {
      return element.mimetype &&  element.mimetype.indexOf('application/pdf') > -1;
    }

    getImages(item: any): any[] {
      let result = [];

      if (item.images) {
        result = result.concat(item.images);
      }


      if (item.media) {

        result = result.concat(item.media.filter(element => this.isImage(element)));
      }

      return result;
    }

    getAttachments(item: any): any[] {
      let result = [];

      if (item && item.attachments) {
        result = result.concat(item.attachments);
      }

      if (item && item.media) {
        result = result.concat(item.media.filter(element => !this.isImage(element)));
      }

      return result;
    }

    getVideos(item: any): any[] {
      let result = [];

      if (item && item.attachments) {
        result = result.concat(item.attachments.filter(element => this.isVideo(element)));
      }

      if (item && item.media) {
        result = result.concat(item.media.filter(element => this.isVideo(element)));
      }

      return result;
    }


}
