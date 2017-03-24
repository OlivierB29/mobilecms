import { MobileCmsPage } from './app.po';

describe('mobile-cms App', () => {
  let page: MobileCmsPage;

  beforeEach(() => {
    page = new MobileCmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
