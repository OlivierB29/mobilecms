import { PropertyFilterPipe } from './propertyfilter.pipe';

describe('PropertyFilterPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new PropertyFilterPipe();

  it('transforms array 1 ', () => {
    expect(pipe.transform([{activity: 'tennis'}, {activity: 'golf'}, {activity: 'tennis'}], 'activity', 'tennis').length === 2).toBe(true);
  });
  it('transforms array 2', () => {
    expect(pipe.transform([{activity: 'tennis'}, {activity: 'golf'}, {activity: ''}], 'activity', 'tennis').length === 1).toBe(true);
  });
  it('transforms array 3', () => {
    expect(pipe.transform([{activity: 'tennis'}, {activity: 'golf'}, {foo: 'bar'}], 'activity', 'tennis').length === 1).toBe(true);
  });

});
