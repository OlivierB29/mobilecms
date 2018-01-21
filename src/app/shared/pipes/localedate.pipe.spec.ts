import { LocaleDatePipe } from './localedate.pipe';
import { environment } from 'environments/environment';

describe('LocaleDatePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new LocaleDatePipe();

  it('transforms string date to localedate', () => {
    const date = '2017-06-01';
    expect(pipe.transform(date)).toBe(new Date(date).toLocaleDateString(environment.locale));
  });


});
