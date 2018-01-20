import { MediaService } from './media.service';



describe('MediaService test', () => {
  const service = new MediaService();
  const item = JSON.parse('{"id" : "1", "images":[{"title": "tennis-2290639_640.jpg", "url": "tennis-2290639_640.jpg", "size": 106894, "mimetype": "image\/jpeg"}], "attachments":[], "media": [{   "title": "tennis-2290639_640.jpg",   "url": "tennis-2290639_640.jpg",   "size": 106894,   "mimetype": "image\/jpeg" }, { "title": "lorem ipsum.pdf", "url": "lorem ipsum.pdf", "size": 24612, "mimetype": "application\/pdf" } ] } ');

it('getImages', () => expect(service.getImages(item).length === 2).toBe(true));
it('getAttachments', () => expect(service.getAttachments(item).length === 1).toBe(true));


});
