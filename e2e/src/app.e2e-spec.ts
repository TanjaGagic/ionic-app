import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/Books');
    });
    it('should say Inbox', () => {
      expect(page.getParagraphText()).toContain('Books');
    });
  });
});
