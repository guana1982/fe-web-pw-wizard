import { AppPage } from './app.po';

describe('fe-web-pw-wizard App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate', () => {
    page.navigateTo();
  });
});
