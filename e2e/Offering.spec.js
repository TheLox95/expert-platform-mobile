const axios = require('axios');

describe('Expert Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display offering data, including images, videos and opinions', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await element(by.text('Mcdaniel Massey')).tap();
    await waitFor(element(by.text('Mcdaniel Massey'))).toBeVisible().withTimeout(10 * 1000);
  });

  it.skip('should open image gallery when user tap image', async () => {});

  it.skip('should open video when user tap video', async () => {});

  it('should show `see expert button`', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await element(by.text('Mcdaniel Massey')).tap();
    await waitFor(element(by.id('offering-edit-button'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should navigate to expert profile when user tap button', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await element(by.text('Mcdaniel Massey')).tap();
    await element(by.id('offering-edit-button')).tap();
    await waitFor(element(by.id('editoffering-form'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should display edit button if user seeing offering is the one who created it', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await element(by.text('Mcdaniel Massey')).tap();
    await waitFor(element(by.id('offering-seeexpert-button'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should not display edit button if user seeing offering is the one who created it', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('maria@mail.com');
    await element(by.id('login-password-input')).typeText('maria123');
    await element(by.id('login-send-button')).tap();

    await element(by.text('Mcdaniel Massey')).tap();
    await waitFor(element(by.id('offering-edit-button'))).toBeNotVisible().withTimeout(10 * 1000);
  });

  it('should display edit button if user seeing offering is the one who created it', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await element(by.text('Mcdaniel Massey')).tap();
    await element(by.id('offering-edit-button')).tap();
    
    await waitFor(element(by.id('editoffering-form'))).toBeVisible().withTimeout(10 * 1000);
  });


});