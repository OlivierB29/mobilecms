import { LocaleDatePipe } from './localedate.pipe';

describe('LocaleDatePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new LocaleDatePipe();

  it('transforms string date to localedate', () => {
    expect(pipe.transform('2017-06-01')).toBe('01/06/2017');
  });


});
