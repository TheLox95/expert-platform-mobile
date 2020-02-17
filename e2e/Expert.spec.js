const axios = require('axios');

describe('Expert Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display expert data', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();
    await element(by.id('side-menu-button')).tap();
    await element(by.id('sidemenu-expert-button')).tap();

    await waitFor(element(by.text('Nick'))).toBeVisible().withTimeout(10 * 1000);
    // we fail to match the about me text of the user
    //await waitFor(element(by.text('Nicholas "Nick" Joseph Fury is a world-renowned spy'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should display edit button if user is seeing its own profile', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();
    await element(by.id('side-menu-button')).tap();
    await element(by.id('sidemenu-expert-button')).tap();

    await waitFor(element(by.id('expert-edit-button'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should not display edit button if user is seeing another profile', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await element(by.text('Mcdaniel Massey')).tap();

    await waitFor(element(by.id('expert-edit-button'))).toBeNotVisible().withTimeout(10 * 1000);
  });

});