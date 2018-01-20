import { ReadService } from './read.service';
import { environment } from 'environments/environment';


describe('ReadService test', () => {
  let service: ReadService;

  beforeEach(() => {
       service = new ReadService();
   });

  it('getUrl', () => expect(service.getUrl('calendar', '1')).toBe('/public/calendar/1.json'));
  it('getIndexUrl', () => expect(service.getIndexUrl('calendar')).toBe('/public/calendar/index/index.json'));



});
