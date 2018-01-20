import { BrPipe } from './br.pipe';

describe('BrPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new BrPipe();

  it('transforms text', () => {
    expect(pipe.transform('foo\nbar')).toBe('foo<br/>bar');
  });
  it('transforms text', () => {
    expect(pipe.transform('foo\nbar\ntext')).toBe('foo<br/>bar<br/>text');
  });

});
