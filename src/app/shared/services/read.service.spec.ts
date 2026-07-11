import { ReadService } from './read.service';
import { environment } from 'src/environments/environment';


describe('ReadService test', () => {
  let service: ReadService;

  beforeEach(() => {
       service = new ReadService();
   });

  it('getUrl', () => expect(service.getUrl('calendar', '1')).toBe('/calendar/1'));
  it('getIndexUrl', () => expect(service.getIndexUrl('calendar')).toBe('/calendar'));



});
