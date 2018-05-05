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


}
