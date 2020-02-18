const axios = require('axios');

describe('Edit Offering Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display offering data', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();
    await element(by.text('Mcdaniel Massey')).tap();
    await element(by.id('offering-edit-button')).tap();

    await waitFor(element(by.text('Mcdaniel Massey'))).toBeVisible().withTimeout(10 * 1000);
    await waitFor(element(by.id('editoffering-button'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should navigate to `offering screen` when editing is successful', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();
    await element(by.text('Mcdaniel Massey')).tap();
    await element(by.id('offering-edit-button')).tap();

    await element(by.id('editoffering-name')).clearText();
    await element(by.id('editoffering-name')).typeText('Travel to the Everest');

    await element(by.id('editoffering-button')).tap();

    await waitFor(element(by.text('Travel to the Everest'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should validate form data', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();
    await element(by.text('Mcdaniel Massey')).tap();
    await element(by.id('offering-edit-button')).tap();

    await element(by.id('editoffering-name')).clearText();
    await element(by.id('editoffering-description')).clearText();

    await element(by.id('editoffering-button')).tap();

    await expect(element(by.id('editoffering-name-error'))).toBeVisible();
    await expect(element(by.id('editoffering-name-description'))).toBeVisible();

  });

});