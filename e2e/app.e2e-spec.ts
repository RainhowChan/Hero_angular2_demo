import { MyAngularFistPage } from './app.po';

describe('my-angular-fist App', () => {
  let page: MyAngularFistPage;

  beforeEach(() => {
    page = new MyAngularFistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
