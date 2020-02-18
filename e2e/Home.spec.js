const axios = require('axios');

describe('Expert Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it.only('should load offerings when comming back from offering detail screen', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await element(by.text('Mcdaniel Massey')).tap();

    if (device.getPlatform() === 'android') {
      await device.pressBack(); // Android only
    } else {
      await element(by.traits(['button']))
        .atIndex(0)
        .tap();
    }

    await waitFor(element(by.text('Mcdaniel Massey'))).toBeVisible().withTimeout(10 * 1000);
  });


});