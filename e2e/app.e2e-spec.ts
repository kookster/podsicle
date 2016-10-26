import { PodsiclePage } from './app.po';

describe('podsicle App', function() {
  let page: PodsiclePage;

  beforeEach(() => {
    page = new PodsiclePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
