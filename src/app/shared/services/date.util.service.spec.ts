import { DateUtilService } from './date.util.service';

describe('DateUtilService test', () => {
  it('month 1', () => expect(service.getMonthName(0)).toBe('January'));
  it('month 2', () => expect(service.getMonthName(11)).toBe('December'));
  it('date before 1', () => expect(service.dateBefore(new Date('2018-05-31'), new Date('2018-06-01'))).toBe(true));
  it('datetime before 2', () => expect(service.dateBefore(new Date('2018-05-31 23:59:59'), new Date('2018-06-01 00:00:00'))).toBe(true));
  it('datetime before 3', () => expect(service.dateBefore(new Date('2018-05-31 23:59:59'), new Date('2018-05-31 23:59:59'))).toBe(true));

  it('datetime beforestrict 1', () => expect(service.dateBeforeStrict(new Date('2018-05-31 23:59:58'),
   new Date('2018-05-31 23:59:59'))).toBe(true));
  it('datetime beforestrict 2', () => expect(service.dateBeforeStrict(new Date('2018-05-31 23:59:59'),
   new Date('2018-05-31 23:59:59'))).toBe(false));

  it('date after 1', () => expect(service.dateAfter(new Date('2018-01-01'), new Date('2016-12-31'))).toBe(true));
  it('datetime after 2', () => expect(service.dateAfter(new Date('2018-01-01 00:00:00'), new Date('2016-12-31 23:59:59'))).toBe(true));

  it('dateEquals 1', () => expect(service.dateEquals(new Date('2018-06-01'), new Date('2018-06-01 12:00:01'))).toBe(true));
  it('dateEquals 2', () => expect(service.dateEquals(new Date('2018-06-01 20:30:30'), new Date('2018-06-01 12:00:01'))).toBe(true));


  it('getLastDayOfMonth 1', () => expect(service.dateEquals(
    service.getLastDayOfMonth(new Date('2018-06-01')),
    new Date('2018-06-30'))
  ).toBe(true));
  it('getLastDayOfMonth 2', () => expect(service.dateEquals(
    service.getLastDayOfMonth(new Date('2018-02-10')),
    new Date('2018-02-28'))
  ).toBe(true));
  let service: DateUtilService;

  beforeEach(() => {
       service = new DateUtilService();
       service.setLang('en');
   });
});
