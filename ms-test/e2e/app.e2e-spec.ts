import { MsTestPage } from './app.po';

describe('ms-test App', function() {
  let page: MsTestPage;

  beforeEach(() => {
    page = new MsTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
