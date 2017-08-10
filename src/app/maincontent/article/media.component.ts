export abstract class MediaComponent {

    protected initMediaUrl(type: string, id: string, media: any[], mediaUri: string): any[] {
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
      return element.mimetype && element.mimetype.indexOf('image') > -1;
    }

    public abstract getItem(): any;

    getImages(): any[] {
      let result = [];

      if (this.getItem().images) {
        result = result.concat(this.getItem().images);
      }


      if (this.getItem().media) {

        result = result.concat(this.getItem().media.filter(element => this.isImage(element)));
      }

      return result;
    }

    getAttachments(): any[] {
      let result = [];

      if (this.getItem() && this.getItem().attachments) {
        result = result.concat(this.getItem().attachments);
      }

      if (this.getItem() && this.getItem().media) {
        result = result.concat(this.getItem().media.filter(element => !this.isImage(element)));
      }

      return result;
    }


}
